import React, { useState } from "react";
import "../auth.form.scss";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";
import LoadingState from "../../../components/LoadingState";

const Login = () => {
  const { loading, error, handleLogin } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await handleLogin({ email, password });
    if (success) {
      navigate("/");
    }
  };
  if (loading) {
    return (
      <main className="auth-page">
        <LoadingState
          title="Opening your workspace"
          message="Signing you in and preparing your interview studio."
        />
      </main>
    );
  }
  return (
    <main className="auth-page">
      <div className="auth-shell">
        <section className="auth-showcase">
          <p className="auth-kicker">GEN-AI INTERVIEW STUDIO</p>
          <h1>Walk into your next interview prepared.</h1>
          <p>
            Build focused preparation plans from your experience, the role, and
            the questions that matter most.
          </p>
          <div className="auth-signal">
            <span className="signal-dot" />
            <span>Private workspace · Ready when you are</span>
          </div>
        </section>

        <div className="form-container">
          <div className="form-heading">
            <span className="form-mark">G</span>
            <div>
              <p className="form-kicker">WELCOME BACK</p>
              <h2>Sign in</h2>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                id="email"
                name="email"
                placeholder="you@example.com"
              />
            </div>

            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
              />
            </div>
            {error && <p className="form-error">{error}</p>}

            <button className="button primary-button">Sign in</button>
          </form>
          <p className="auth-switch">
            New to Gen-AI? <Link to={"/register"}>Create an account</Link>
          </p>
        </div>
      </div>
    </main>
  );
};
export default Login;
