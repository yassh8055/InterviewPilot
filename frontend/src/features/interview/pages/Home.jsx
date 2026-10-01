import React, { useRef, useState } from "react";
import "../styles/home.scss";
import { useInterview } from "../hooks/useInterview";
import { useNavigate } from "react-router";
import { logout } from "../../auth/services/auth.api";
import LoadingState from "../../../components/LoadingState";

const Home = () => {
  const { loading, generateReport, reports } = useInterview();

  const [jobDescription, setJobDescription] = useState("");
  const [selfDescription, setSelfDescription] = useState("");
  const [resumeFileName, setResumeFileName] = useState("");
  const [loggingOut, setLoggingOut] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [generationError, setGenerationError] = useState("");

  const resumeFileRef = useRef();
  const navigate = useNavigate();

  const reportList = Array.isArray(reports)
    ? reports
    : reports
      ? [reports]
      : [];

  const handleGenerateReport = async () => {
    const resumeFile = resumeFileRef.current?.files?.[0];

    setGenerating(true);
    setGenerationError("");

    try {
      const data = await generateReport(
        jobDescription,
        selfDescription,
        resumeFile,
      );

      if (data?._id) {
        navigate(`/interview/${data._id}`);
      }
    } catch (error) {
      setGenerationError(error.message);
    } finally {
      setGenerating(false);
    }
  };

  const handleLogout = async () => {
    setLoggingOut(true);

    try {
      await logout();
      window.location.assign("/login");
    } catch (error) {
      setLoggingOut(false);
    }
  };

  if (loading) {
    return (
      <main className="home">
        <div className="home-loading">
          <LoadingState
            title="Loading your interview workspace"
            message="Gathering your saved reports and preparing your next session."
          />
        </div>
      </main>
    );
  }

  return (
    <main className="home">
      {/* =====================================================
          HEADER
      ===================================================== */}

      <header className="home-header">
        <button
          className="brand-lockup"
          onClick={() => navigate("/")}
          type="button"
        >
          <span className="brand-mark">G</span>
          <span>Gen-AI Studio</span>
        </button>

        <button
          className="logout-button"
          onClick={handleLogout}
          disabled={loggingOut}
          type="button"
        >
          <span>{loggingOut ? "Signing out..." : "Sign out"}</span>

          <span
            className={loggingOut ? "button-spinner" : "button-arrow"}
            aria-hidden="true"
          >
            {loggingOut ? "" : "↗"}
          </span>
        </button>
      </header>

      <section className="home-content">
        {/* ===================================================
            HERO
        =================================================== */}

        <section className="home-intro">
          <p className="eyebrow">AI-POWERED INTERVIEW PREP</p>

          <h1>
            Prepare for the role.
            <span> Not just the interview.</span>
          </h1>

          <p className="intro-copy">
            Give us the job description and your background. We'll turn them
            into a focused interview report built around what you actually need
            to prepare.
          </p>

          <div className="feature-list" aria-label="What your report includes">
            <span className="feature-item">Role-fit analysis</span>

            <span className="feature-item">Personalized questions</span>

            <span className="feature-item">Preparation roadmap</span>
          </div>
        </section>

        {/* ===================================================
            REPORT GENERATOR
        =================================================== */}

        <section className="generator-card">
          <div className="generator-heading">
            <div>
              <p className="section-kicker">BUILD YOUR REPORT</p>

              <h2>Tell us about the interview.</h2>
            </div>

            <span className="generator-status">
              {generating ? "Analyzing..." : "3 steps"}
            </span>
          </div>

          {/* STEP 01 */}

          <div className="generator-step role-step">
            <div className="step-number">01</div>

            <div className="step-content">
              <div className="step-heading">
                <div>
                  <span className="step-label">TARGET ROLE</span>

                  <h3>What are you applying for?</h3>
                </div>

                <span className="required-label">Required</span>
              </div>

              <textarea
                id="jobDescription"
                name="jobDescription"
                value={jobDescription}
                onChange={(event) => setJobDescription(event.target.value)}
                placeholder="Paste the job description, responsibilities, required skills, and qualifications..."
              />

              <p className="field-hint">
                Include the full job description for a more relevant role
                analysis.
              </p>
            </div>
          </div>

          <div className="step-divider" />

          {/* STEP 02 */}

          <div className="generator-step">
            <div className="step-number">02</div>

            <div className="step-content">
              <div className="step-heading">
                <div>
                  <span className="step-label">YOUR BACKGROUND</span>

                  <h3>Give us context about your experience.</h3>
                </div>

                <span className="optional-label">Recommended</span>
              </div>

              <div className="background-grid">
                {/* Resume */}

                <div className="background-field">
                  <span className="field-title">Resume</span>

                  <label className="file-label" htmlFor="resume">
                    <span className="file-icon" aria-hidden="true">
                      ↑
                    </span>

                    <span className="file-copy">
                      <strong>{resumeFileName || "Upload your resume"}</strong>

                      <small>
                        {resumeFileName
                          ? "PDF selected"
                          : "PDF format · max 10 MB"}
                      </small>
                    </span>

                    <span className="file-action">Browse</span>
                  </label>

                  <input
                    ref={resumeFileRef}
                    hidden
                    type="file"
                    name="resume"
                    id="resume"
                    accept=".pdf"
                    onChange={(event) =>
                      setResumeFileName(event.target.files?.[0]?.name || "")
                    }
                  />
                </div>

                {/* Self description */}

                <div className="background-field self-field">
                  <label htmlFor="selfDescription" className="field-title">
                    About you
                  </label>

                  <textarea
                    id="selfDescription"
                    name="selfDescription"
                    value={selfDescription}
                    onChange={(event) => setSelfDescription(event.target.value)}
                    placeholder="Tell us briefly about your experience, strengths, projects, or what you're currently learning..."
                  />
                </div>
              </div>

              <p className="field-hint">
                You can use either your resume or self-description. Using both
                gives the report more context.
              </p>
            </div>
          </div>

          {/* GENERATE */}

          <div className="generator-action">
            <div className="action-copy">
              <span>READY TO PREPARE?</span>
              <p>
                Your report will include role match, questions, skill gaps, and
                a preparation roadmap.
              </p>
            </div>

            <button
              onClick={handleGenerateReport}
              className="primary-button"
              disabled={generating || !jobDescription.trim()}
              aria-busy={generating}
              type="button"
            >
              <span>
                {generating
                  ? "Generating report..."
                  : "Generate interview report"}
              </span>

              <span
                className={generating ? "button-spinner" : "button-arrow"}
                aria-hidden="true"
              >
                {generating ? "" : "→"}
              </span>
            </button>
          </div>

          {generationError && (
            <p className="form-error" role="alert">
              {generationError}
            </p>
          )}
        </section>
      </section>

      {/* =====================================================
          REPORT LIBRARY
      ===================================================== */}

      <section className="reports-section" aria-labelledby="reports-heading">
        <div className="reports-heading">
          <div>
            <p className="section-kicker">YOUR PREPARATION LIBRARY</p>

            <h2 id="reports-heading">Recent interview plans</h2>
          </div>

          <span className="report-count">
            {reportList.length} {reportList.length === 1 ? "plan" : "plans"}
          </span>
        </div>

        {reportList.length > 0 ? (
          <ul className="reports-list">
            {reportList.map((report, index) => (
              <li
                className="report-card"
                key={report._id}
                onClick={() => navigate(`/interview/${report._id}`)}
                tabIndex={0}
                role="button"
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    navigate(`/interview/${report._id}`);
                  }
                }}
              >
                <div className="report-index">
                  {String(index + 1).padStart(2, "0")}
                </div>

                <div className="report-details">
                  <span className="report-type">INTERVIEW REPORT</span>

                  <h3>{report.title || "Untitled Position"}</h3>

                  <p>
                    Created {new Date(report.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <span className="report-arrow" aria-hidden="true">
                  ↗
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <div className="empty-reports">
            <span className="empty-mark" aria-hidden="true">
              +
            </span>

            <div>
              <h3>No interview plans yet</h3>

              <p>Your generated reports will appear here for quick access.</p>
            </div>
          </div>
        )}
      </section>
    </main>
  );
};

export default Home;
