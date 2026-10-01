import React, { useMemo, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import "../styles/interview.scss";
import { useInterview } from "../hooks/useInterview";
import LoadingState from "../../../components/LoadingState";

const reportSections = [
  {
    id: "technical",
    label: "Technical",
    fullLabel: "Technical questions",
  },
  {
    id: "behavioral",
    label: "Behavioral",
    fullLabel: "Behavioral questions",
  },
  {
    id: "roadmap",
    label: "Roadmap",
    fullLabel: "Preparation roadmap",
  },
];

const Interview = () => {
  const { report, loading, resumeLoading, getResumePdf } = useInterview();

  const { interviewId } = useParams();
  const navigate = useNavigate();
  const { state } = useLocation();

  const [activeSection, setActiveSection] = useState("technical");

  const reportData = report;

  const reportAI =
    reportData ||
    state?.interviewReport ||
    state?.reportAI ||
    (state?.technicalQuestion ? state : null);

  const jobTitle = reportAI?.jobDescription?.match(
    /Job Title:\s*([^\r\n]+)/i,
  )?.[1];

  const skillGaps = reportAI?.skillGap || [];

  const content = useMemo(() => {
    if (!reportAI) return [];

    if (activeSection === "technical") {
      return reportAI.technicalQuestion || [];
    }

    if (activeSection === "behavioral") {
      return reportAI.behavioralQuestion || [];
    }

    return reportAI.preparationPlan || [];
  }, [activeSection, reportAI]);

  const section = reportSections.find((item) => item.id === activeSection);

  const sectionTitle = section?.fullLabel || "Interview";

  const matchScore = reportAI?.matchScore || 0;

  if (loading) {
    return (
      <main className="interview-page">
        <div className="interview-loading">
          <LoadingState
            title="Preparing your interview report"
            message="Organizing your role match, questions, skill gaps, and roadmap."
          />
        </div>
      </main>
    );
  }

  return (
    <main className="interview-page">
      {resumeLoading && (
        <div
          className="resume-loading-overlay"
          role="status"
          aria-live="polite"
        >
          <div className="resume-loading-panel">
            <div className="resume-loading-icon" aria-hidden="true">
              <span />
            </div>
            <p className="section-label">AI RESUME</p>
            <h2>Creating your resume</h2>
            <p>
              Tailoring your experience to this role and preparing the PDF
              download.
            </p>
            <div className="resume-loading-line" aria-hidden="true">
              <span />
            </div>
          </div>
        </div>
      )}

      <div className="interview-shell">
        {/* Back */}
        <button
          className="back-home-button"
          onClick={() => navigate("/")}
          type="button"
        >
          <span aria-hidden="true">←</span>
          Back to home
        </button>

        {/* Header */}
        <header className="report-header">
          <div>
            <p className="report-eyebrow">AI INTERVIEW REPORT</p>

            <h1>{jobTitle || "Your interview readiness"}</h1>

            <p className="report-subtitle">
              A personalized breakdown of your current readiness, priority gaps,
              and preparation path.
            </p>
          </div>

          <div className="report-header-actions">
            <button
              className="download-resume-button"
              type="button"
              aria-label={`Download resume for ${jobTitle || "this role"}`}
              title={`Download resume for ${jobTitle || "this role"}`}
              onClick={() => getResumePdf(interviewId)}
              disabled={resumeLoading}
            >
              <span aria-hidden="true">{resumeLoading ? "•" : "↓"}</span>
              {resumeLoading ? "Preparing resume..." : "Download AI resume"}
            </button>

            {interviewId && (
              <div className="report-id">
                <span>REPORT</span>
                <strong>#{interviewId.slice(-6)}</strong>
              </div>
            )}
          </div>
        </header>

        {reportAI ? (
          <>
            {/* Readiness Hero */}
            <section className="readiness-card">
              <div className="readiness-score">
                <div
                  className="score-ring"
                  style={{
                    "--score": `${matchScore * 3.6}deg`,
                  }}
                >
                  <div className="score-inner">
                    <strong>{matchScore}%</strong>
                    <span>match</span>
                  </div>
                </div>
              </div>

              <div className="readiness-copy">
                <p className="section-label">YOUR READINESS</p>

                <h2>
                  {matchScore >= 80
                    ? "Strong foundation"
                    : matchScore >= 60
                      ? "Good foundation"
                      : "More preparation needed"}
                </h2>

                <p>
                  Your report highlights{" "}
                  <strong>{skillGaps.length} priority areas</strong> to
                  strengthen before the interview.
                </p>
              </div>

              <div className="readiness-stats">
                <div>
                  <strong>{skillGaps.length}</strong>
                  <span>Priority gaps</span>
                </div>

                <div>
                  <strong>
                    {(reportAI.technicalQuestion || []).length +
                      (reportAI.behavioralQuestion || []).length}
                  </strong>
                  <span>Questions</span>
                </div>

                <div>
                  <strong>{(reportAI.preparationPlan || []).length}</strong>
                  <span>Roadmap days</span>
                </div>
              </div>
            </section>

            {/* Priority Areas */}
            <section className="priority-section">
              <div className="section-heading">
                <div>
                  <p className="section-label">FOCUS FIRST</p>
                  <h2>Priority areas</h2>
                </div>

                <span className="section-meta">
                  {skillGaps.length} {skillGaps.length === 1 ? "area" : "areas"}
                </span>
              </div>

              {skillGaps.length ? (
                <div className="priority-grid">
                  {skillGaps.map((item) => {
                    const severity = item.severity?.toLowerCase() || "low";

                    return (
                      <article
                        className={`priority-card ${severity}`}
                        key={item.skill}
                      >
                        <div className="priority-card-top">
                          <span className="priority-icon">
                            {severity === "high"
                              ? "!"
                              : severity === "medium"
                                ? "•"
                                : "✓"}
                          </span>

                          <span className="severity">{item.severity}</span>
                        </div>

                        <h3>{item.skill}</h3>

                        <p>Focus on this area during your preparation.</p>
                      </article>
                    );
                  })}
                </div>
              ) : (
                <div className="priority-empty">
                  No priority skill gaps were identified.
                </div>
              )}
            </section>

            {/* Report Content */}
            <section className="report-section">
              {/* Section Navigation */}
              <div className="report-tabs">
                {reportSections.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    className={
                      activeSection === item.id
                        ? "report-tab active"
                        : "report-tab"
                    }
                    onClick={() => setActiveSection(item.id)}
                  >
                    {item.label}

                    <span>
                      {item.id === "technical"
                        ? reportAI.technicalQuestion?.length || 0
                        : item.id === "behavioral"
                          ? reportAI.behavioralQuestion?.length || 0
                          : reportAI.preparationPlan?.length || 0}
                    </span>
                  </button>
                ))}
              </div>

              {/* Content Header */}
              <div className="content-heading">
                <div>
                  <p className="section-label">PERSONALIZED FOR YOUR PROFILE</p>

                  <h2>{sectionTitle}</h2>
                </div>

                <span className="content-count">
                  {content.length}{" "}
                  {activeSection === "roadmap"
                    ? content.length === 1
                      ? "day"
                      : "days"
                    : content.length === 1
                      ? "question"
                      : "questions"}
                </span>
              </div>

              {/* Content */}
              <div className="report-items">
                {activeSection === "roadmap"
                  ? content.map((item) => (
                      <article className="roadmap-item" key={item.day}>
                        <div className="roadmap-day">
                          <span>DAY</span>
                          <strong>{item.day}</strong>
                        </div>

                        <div className="roadmap-content">
                          <h3>{item.focus}</h3>
                          <p>{item.tasks}</p>
                        </div>
                      </article>
                    ))
                  : content.map((item, index) => (
                      <details
                        className="question-item"
                        key={`${item.question}-${index}`}
                      >
                        <summary>
                          <div className="question-number">
                            {String(index + 1).padStart(2, "0")}
                          </div>

                          <div className="question-summary">
                            <h3>{item.question}</h3>

                            <span>
                              {item.intention || "Interview assessment"}
                            </span>
                          </div>

                          <div className="question-arrow">+</div>
                        </summary>

                        <div className="question-details">
                          <div className="assessment">
                            <span>WHAT THEY ARE ASSESSING</span>
                            <p>
                              {item.intention ||
                                "This question assesses your understanding and ability to explain the concept clearly."}
                            </p>
                          </div>

                          <div className="answer-guidance">
                            <span>ANSWER GUIDANCE</span>
                            <p>
                              {item.answer ||
                                "No answer guidance was generated for this question."}
                            </p>
                          </div>
                        </div>
                      </details>
                    ))}

                {!content.length && (
                  <div className="no-content">
                    <span>+</span>
                    <h3>No content generated yet</h3>
                    <p>There is no information available for this section.</p>
                  </div>
                )}
              </div>
            </section>

            {/* Bottom Action / Reminder */}
            <section className="report-footer">
              <div>
                <p className="section-label">NEXT STEP</p>
                <h2>Prepare around your priority gaps.</h2>
                <p>
                  Start with the highest-severity skills, then use the questions
                  above to rehearse your answers.
                </p>
              </div>

              <button type="button" onClick={() => setActiveSection("roadmap")}>
                View preparation roadmap
                <span>→</span>
              </button>
            </section>
          </>
        ) : (
          /* Empty State */
          <section className="empty-report">
            <div className="empty-icon">+</div>

            <p className="section-label">REPORT NOT LOADED</p>

            <h2>Your personalized report will appear here.</h2>

            <p>
              Generate an interview report from the home page to see your role
              match, tailored questions, skill gaps, and preparation roadmap.
            </p>

            <button type="button" onClick={() => navigate("/")}>
              Generate interview report
              <span>→</span>
            </button>
          </section>
        )}
      </div>
    </main>
  );
};

export default Interview;
