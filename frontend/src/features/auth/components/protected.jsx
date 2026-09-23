import React from "react";
import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router";
import LoadingState from "../../../components/LoadingState";
const Protected = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <main className="auth-page">
        <LoadingState
          title="Checking your workspace"
          message="Verifying your session before we open your interview studio."
        />
      </main>
    );
  }

  if (!user) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default Protected;
