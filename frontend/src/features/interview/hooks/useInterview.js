import { useContext, useEffect } from "react";
import {
  getAllInterviewReports,
  generateInterviewReport,
  getInterviewReportById,
} from "../services/interviewApi";
import { interviewContext } from "../interviewContext";
import { useParams } from "react-router";

export const useInterview = () => {
  const { interviewId } = useParams();
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

  useEffect(() => {
    if (interviewId) {
      getReportById(interviewId);
    } else {
      getAllReports();
    }
  },[interviewId]);

  return {
    loading,
    reports,
    report,
    generateReport,
    getReportById,
    getAllReports,
  };
};
