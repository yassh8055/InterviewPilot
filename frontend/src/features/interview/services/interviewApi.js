import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

export const generateInterviewReport = async (
  jobDescription,
  selfDescription,
  resumeFile,
) => {
  const formData = new FormData();
  formData.append("jobDescription", jobDescription);
  formData.append("selfDescription", selfDescription);
  formData.append("resumeFile", resumeFile);

  const response =await api.post("/api/interview/generate", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const getInterviewReportById = async (interviewId) => {
  const response =await api.post(`/api/interview/report/${interviewId}`);
  return response.data;
};

export const getAllInterviewReports =async  (  ) => {
  const response = await api.post(`/api/interview/`);
  return response.data;
};
