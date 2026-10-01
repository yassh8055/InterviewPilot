import { useContext, useEffect, useState } from "react";
import {
  getAllInterviewReports,
  generateInterviewReport,
  getInterviewReportById,
  generateResumePdf,
} from "../services/interviewApi";
import { interviewContext } from "../interviewContext";
import { useParams } from "react-router";

export const useInterview = () => {
  const { interviewId } = useParams();
  const [resumeLoading, setResumeLoading] = useState(false);
  const Context = useContext(interviewContext);

  if (!Context) {
    throw new Error("use Interview must be used with interview provider");
  }

  const { loading, setLoading, report, setReport, reports, setReports } =
    Context;

  const generateReport = async (
    jobDescription,
    selfDescription,
    resumeFile,
  ) => {
    setLoading(true);
    try {
      const response = await generateInterviewReport(
        jobDescription,
        selfDescription,
        resumeFile,
      );
      setReport(response.interviewReport);
      return response.interviewReport;
    } catch (err) {
      console.log("error in hook while getting report", err);
      throw new Error(
        err.response?.data?.message || "Unable to generate the interview report",
      );
    } finally {
      setLoading(false);
    }
  };

  const getReportById = async (interviewId) => {
    setLoading(true);
    try {
      const response = await getInterviewReportById(interviewId);
      setReport(response.interviewReport);
      return response.interviewReport;
    } catch (err) {
      console.log("error in hook while getting report", err);
    } finally {
      setLoading(false);
    }
  };

  const getAllReports = async () => {
    setLoading(true);
    try {
      const response = await getAllInterviewReports();
      setReports(response.interviewReport);
      return response.interviewReport;
    } catch (err) {
      console.log("error in hook while getting report", err);
    } finally {
      setLoading(false);
    }
  };

  const getResumePdf = async (interviewReportId) => {
    setResumeLoading(true)
    let response = null
    try {
      response = await generateResumePdf({ interviewReportId })
      const url = window.URL.createObjectURL(new Blob([response], { type: "application/pdf" }));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `resume_${interviewReportId}.pdf`);
      document.body.appendChild(link);
      link.click();
    } catch (err) {
      console.log(err)
    } finally {
      setResumeLoading(false)
    }

  }

  useEffect(() => {
    if (interviewId) {
      getReportById(interviewId);
    } else {
      getAllReports();
    }
  }, [interviewId]);

  return {
    loading,
    resumeLoading,
    reports,
    report,
    generateReport,
    getReportById,
    getAllReports,
    getResumePdf,
  };
};
