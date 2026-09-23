import React, { useContext, useState } from "react";
import "../auth.form.scss";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";
import LoadingState from "../../../components/LoadingState";

const Register = () => {
  const { loading, error, handleRegister } = useAuth();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const success = await handleRegister({ username, email, password });

    if (success) {
      navigate("/login");
    }
  };

  if (loading) {
    return (
      <main className="auth-page">
        <LoadingState
          title="Creating your workspace"
          message="Setting up your private interview studio."
        />
      </main>
    );
  }
  return (
    <main className="auth-page">
      <div className="auth-shell">
        <section className="auth-showcase">
          <p className="auth-kicker">GEN-AI INTERVIEW STUDIO</p>
          <h1>Your experience deserves a sharper story.</h1>
          <p>
            Create a calm, structured place to turn your background into
            confident interview answers.
          </p>
          <div className="auth-signal">
            <span className="signal-dot" />
            <span>One workspace for every opportunity</span>
          </div>
        </section>

        <div className="form-container">
          <div className="form-heading">
            <span className="form-mark">G</span>
            <div>
              <p className="form-kicker">START FRESH</p>
              <h2>Create your account</h2>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="username">Username</label>
              <input
                onChange={(e) => setUsername(e.target.value)}
                type="text"
                id="username"
                name="username"
                placeholder="Your name"
              />
            </div>

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
                placeholder="Create a password"
              />
            </div>
            {error && <p className="form-error">{error}</p>}

            <button className="button primary-button">Create account</button>
          </form>
          <p className="auth-switch">
            Already have an account? <Link to={"/login"}>Sign in</Link>
          </p>
        </div>
      </div>
    </main>
  );
};
export default Register;
