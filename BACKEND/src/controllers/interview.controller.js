const pdfParse = require("pdf-parse");
const {
  generateInterviewReport,
  getResumePdf,
} = require("../services/ai.services");
const interviewReportModel = require("../models/interviewReport.models.js");

async function generateInterviewReportController(req, res) {
  const resumeContent = await new pdfParse.PDFParse(
    Uint8Array.from(req.file.buffer),
  ).getText();
  const { selfDescription, jobDescription } = req.body;

  const interviewReportbyAi = await generateInterviewReport({
    resume: resumeContent.text,
    selfDescription,
    jobDescription,
  });

  const interviewReport = await interviewReportModel.create({
    user: req.user.id,
    resume: resumeContent.text,
    selfDescription,
    jobDescription,
    ...interviewReportbyAi,
  });
  res.status(201).json({
    message: "Interview Report generated successfully",
    interviewReport,
  });
}

async function getInteviewReportbyIdController(req, res) {
  console.log("ENTERED CONTROLLER");
  const { interviewId } = req.params;
  console.log("Interview ID:", interviewId);
  console.log("Logged in user:", req.user._id);

  const interviewReport = await interviewReportModel.findOne({
    _id: interviewId,
    user: req.user.id,
  });
  console.log(interviewReport);
  console.log("QUERY FINISHED");

  if (!interviewReport) {
    console.log("NOT FOUND");

    return res.status(404).json({
      message: "Intevriew Report not found",
    });
    console.log("SENDING RESPONSE");
  }
  return res.status(200).json({
    message: "Interview Report found Succesfully",
    interviewReport,
  });
}

async function getAllInterviewController(req, res) {
  const interviewReports = await interviewReportModel
    .find({ user: req.user._id })
    .sort({ createdAt: -1 })
    .select(
      "-resume -selfDescription -jobDescription -__v -technicalQuestions -behaviouralQuestions -skillGap -preparationPlan",
    );
  res.status(200).json({
    message: "Interview Reports fetched successfully",
    interviewReports,
  });
}

async function getResumePdfController(req, res) {
  const { interviewId } = req.params;
  const interviewReport = await interviewReportModel.findById(interviewId);

  if (!interviewReport) {
    return res.status(404).json({ message: "Interview Report not found" });
  }

  const { resume, selfDescription, jobDescription } = interviewReport;

  const pdfBuffer = await getResumePdf({
    resume,
    selfDescription,
    jobDescription,
  });

  res.set({
    "Content-Type": "application/pdf",
    "Content-Disposition": `attachment; filename=resume_${interviewId}.pdf`,
  });

  res.send(pdfBuffer);
}

module.exports = {
  generateInterviewReportController,
  getInteviewReportbyIdController,
  getAllInterviewController,
  getResumePdfController,
};
