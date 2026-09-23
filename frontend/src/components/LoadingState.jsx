import React from "react";
import "./loading-state.scss";

const LoadingState = ({ eyebrow = "GEN-AI STUDIO", title, message }) => {
  return (
    <div className="loading-state" role="status" aria-live="polite">
      <div className="loading-state-mark" aria-hidden="true">
        <span>G</span>
      </div>
      <p className="loading-state-eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      <p className="loading-state-message">{message}</p>
      <div className="loading-state-progress" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
    </div>
  );
};

export default LoadingState;
