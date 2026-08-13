import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

/**
 * @description Service to generate interview report based on your self description, job description and resume
 */
export const generateInterviewReport = async ({
  jobDescription,
  selfDescription,
  resumeFile,
}) => {
  const formData = new FormData();
  formData.append("jobDescription", jobDescription);
  formData.append("selfDescription", selfDescription);
  formData.append("resume", resumeFile);

  const response = await api.post("/api/interview/", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

/**
 * @description Service to get interview Report by interviewId
 */
export const generateInterviewReportbyId = async (interviewId) => {
  console.log("Calling backend...");

  const response = await api.get(`/api/interview/report/${interviewId}`);

  console.log("Backend responded!");

  return response.data;
};

/**
 * @description Service ot get all interview report of logged in user
 */
export const getAllInterviewReports = async () => {
  const response = await api.get("/api/interview/");

  return response.data;
};

export const getResumePdf = async ({ interviewId }) => {
  const response = await api.post(
    `/api/interview/resume/pdf/${interviewId}`,
    null,
    {
      responseType: "blob",
    },
  );

  return response.data;
};
