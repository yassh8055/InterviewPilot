import { createContext, useState } from "react";

export const interviewContext = createContext();

export const InterviewProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState(null);
  const [reports, setReports] = useState(null);

  return (
    <interviewContext.Provider
      value={{ loading, setLoading, report, setReport, reports, setReports }}
    >
      {children}
    </interviewContext.Provider>
  );
};
