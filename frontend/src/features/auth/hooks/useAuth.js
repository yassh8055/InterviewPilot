import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../auth.context";
import { getMe, login, logout, register } from "../services/auth.api";

export const useAuth = () => {
  const context = useContext(AuthContext);
  const { user, setUser, loading, setLoading } = context;
  const [error, setError] = useState("");

  const handleLogin = async ({ email, password }) => {
    setError("");
    setLoading(true);
    try {
      const data = await login({ email, password });
      if (!data?.user) {
        throw new Error(data?.message || "Login failed");
      }
      setUser(data.user);
      return true;
    } catch (err) {
      setError(err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async ({ username, email, password }) => {
    setError("");
    setLoading(true);
    try {
      const data = await register({ username, email, password });
      if (!data?.user) {
        throw new Error(data?.message || "Registration failed");
      }
      setUser(data.user);
      return true;
    } catch (err) {
      setError(err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    setLoading(true);
    try {
      const data = await logout({ email, password });
      setUser(null);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const getAndSetUser = async () => {
      try {
        const data = await getMe();
        setUser(data.user);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    getAndSetUser();
  }, []);

  return { user, loading, error, handleLogin, handleLogout, handleRegister };
};
