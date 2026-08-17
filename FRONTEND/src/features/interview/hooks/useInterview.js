import {
  getAllInterviewReports,
  generateInterviewReportbyId,
  generateInterviewReport,
  getResumePdf,
} from "../services/interview.api";
import { useContext, useEffect } from "react";
import { InterviewContext } from "../interview.context";
import { useParams } from "react-router";

export const useInterview = () => {
  const context = useContext(InterviewContext);
  const { interviewId } = useParams();
  if (!context) {
    throw new Error("useInterview must be used within an Interview Provider");
  }

  const { loading, setLoading, report, setReport, reports, setReports } =
    context;

  const generateReport = async ({
    jobDescription,
    selfDescription,
    resumeFile,
  }) => {
    setLoading(true);

    try {
      const response = await generateInterviewReport({
        jobDescription,
        selfDescription,
        resumeFile,
      });

      setReport(response.interviewReport);

      return response.interviewReport;
    } catch (error) {
      console.error("Generate Report Error:", error);
      throw error; // <-- IMPORTANT
    } finally {
      setLoading(false);
    }
  };

  //   const getReportbyId = async (interviewId) => {
  //     setLoading(true);
  //     let response = null;
  //     try {
  //       response = await generateInterviewReportbyId(interviewId);
  //       setReport(response.interviewReport);
  //     } catch (error) {
  //       console.log(error);
  //       return null;
  //     } finally {
  //       setLoading(false);
  //     }
  //     return response.interviewReport;
  //   };

  const getReportbyId = async (interviewId) => {
    console.log("========== API CALL ==========");
    console.log("GET REPORT START");

    setLoading(true);

    try {
      const response = await generateInterviewReportbyId(interviewId);

      console.log("GET SUCCESS");
      console.log(response);

      setReport(response.interviewReport);

      console.log("REPORT SAVED");

      return response.interviewReport;
    } catch (error) {
      console.log("GET FAILED");
      console.error(error);
      return null;
    } finally {
      console.log("LOADING FALSE");
      setLoading(false);
    }
  };

  const getReports = async () => {
    setLoading(true);
    let response = null;
    try {
      response = await getAllInterviewReports();
      setReport(response.interviewReport);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
    return response.interviewReport;
  };
  //   useEffect(() => {
  //     if (interviewId) {
  //       getReportbyId(interviewId);
  //     } else {
  //       getReports();
  //     }
  //   }, [interviewId]);

  const getResumepdf = async (interviewId) => {
    setLoading(true);
    let response = null;
    try {
      response = await getResumePdf({ interviewId });
      const url = window.URL.createObjectURL(
        new Blob([response], { type: "application/pdf" }),
      );
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `resume_${interviewId}.pdf`);
      document.body.appendChild(link);
      link.click();
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    report,
    reports,
    generateReport,
    getReportbyId,
    getReports,
    getResumepdf,
  };
};
