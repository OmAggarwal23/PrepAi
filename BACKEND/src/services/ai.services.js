const { GoogleGenAI } = require("@google/genai");
const { z } = require("zod");
const { zodToJsonSchema } = require("zod-to-json-schema");
const puppeteer = require("puppeteer");

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_GENAI_API_KEY,
});

const interviewReportSchema = z.object({
  matchScore: z
    .number()
    .describe(
      "A score between 0 to 100 indicating how well the candidate's profile matches the job description",
    ),
  technicalQuestions: z
    .array(
      z.object({
        question: z
          .string()
          .describe(
            "The technical question that can be asked in the interview",
          ),
        intention: z
          .string()
          .describe("The intention of interviewer behind asking this question"),
        answer: z
          .string()
          .describe(
            "How to answer this question, what points to cover, what approach to take etc. ",
          ),
      }),
    )
    .describe(
      "Technical questions that can be aksed in the interview along with their intention and how to answer them",
    ),

  behaviouralQuestions: z
    .array(
      z.object({
        question: z
          .string()
          .describe(
            "The behavioural question that can be asked in the interview",
          ),
        intention: z
          .string()
          .describe("The intention of interviewer behind asking this question"),
        answer: z
          .string()
          .describe(
            "How to answer this question, what points to cover, what approach to take etc. ",
          ),
      }),
    )
    .describe(
      "Behavioural questions that can be asked in the interview along with their intentiona and how to answer them",
    ),

  skillGap: z
    .array(
      z.object({
        skill: z.string().describe("The skills which the candidate is lacking"),
        severity: z
          .enum(["low", "medium", "high"])
          .describe(
            "The severity of the skill gap, i.e. how important is this skill for the job",
          ),
      }),
    )
    .describe(
      "List of skill gaps in the candidate's profile along with their severity",
    ),

  preparationPlan: z
    .array(
      z.object({
        day: z
          .number()
          .describe("The day number in the preparation plan, starting from 1"),
        focus: z
          .string()
          .describe(
            "The main focus of this day in the preparation plan, e.g. data structures, system design, mock interviews etc.",
          ),
        tasks: z
          .array(z.string())
          .describe(
            "List of tasks to be done on this day to follow the preparation plan, e.g. read a specific book or about a specific topic etc.",
          ),
      }),
    )
    .describe(
      "A day-wise preparation plan for the candidate to follow in order to prepare for the interview effectively",
    ),

  title: z
    .string()
    .describe(
      "The title of the job for which the interview reprot is being generated",
    ),
});

async function generateInterviewReport({
  resume,
  selfDescription,
  jobDescription,
}) {
  const prompt = `Generate an interview report for a candidate with following details:
    Resume: ${resume}
    Self Description: ${selfDescription}
    Job Description: ${jobDescription}
    Generate an interview report.

You MUST return JSON that exactly follows the provided response schema.

Generate:

- matchScore
- 10 technicalQuestions
- the answer to each question should be precise and completely explainable
- 5 behaviouralQuestions
- the answer to each question should be precise and completely explainable
- at least 5 skillGap entries
- a 7-day preparationPlan

Do not invent any additional fields.
Do not leave any array empty.`;

  const response = await ai.models.generateContent({
    model: "gemini-3.5-flash-lite",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: z.toJSONSchema(interviewReportSchema),
    },
  });

  console.log(response.text);
  return JSON.parse(response.text);
}

async function geneatePdffromHTML(htmlContent) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setContent(htmlContent, { waitUntil: "networkidle0" });

  const pdfBuffer = await page.pdf({
    format: "A4",
    margin: {
      top: "20mm",
      bottom: "20mm",
      left: "15mm",
      right: "15mm",
    },
  });
  await browser.close();

  return pdfBuffer;
}

async function getResumePdf({ resume, selfDescription, jobDescription }) {
  const resumePdfSchema = z.object({
    html: z
      .string()
      .describe(
        "The HTML content of the resume which can be converted to PDF using any library like puppeteer",
      ),
  });

  const prompt = `Generate html resume PDF for a candidate with the following details: 
  Resume: ${resume}
  Self Description: ${selfDescription}
  Job Description: ${jobDescription}
  
  The response should be a JSON object with a single field "html" which contains the HTML content of the resume which can be converted into PDF using any library like puppeteer
  The resume should be tailored for the given job description and should highlight the candidate's strengths and relevant experience. The HTML content should be well-formatted and structured, making it easy to read and visual appeal
  The content of the resume should not sound like it's generated by ai and should be close as possible to a real huma-written resume.
  You can highlight the content using some colors or different font styles but the overall design should be simple and professional.
  The content sjould be ATS friendly, i.e., it should be easily parsable by ats system without losing important information.
  The resume should not be so lengthy, it should be ideally 1 full page long when converted to PDF, (it should cover 1 page entirely)(recommended). Focus on quality rather than quantity and make sure to include all the the relevant information that can increase the candidate's chances of getting an interview call for given job decription. `;

  const response = await ai.models.generateContent({
    model: "gemini-3.5-flash-lite",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: z.toJSONSchema(resumePdfSchema),
    },
  });

  const jsonContent = JSON.parse(response.text);

  const pdfBuffer = await geneatePdffromHTML(jsonContent.html);

  return pdfBuffer;
}

module.exports = { generateInterviewReport, getResumePdf };
