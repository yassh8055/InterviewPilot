import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

export const register = async ({ username, email, password }) => {
  try {
    const response = await api.post("/api/auth/register", {
      username,
      email,
      password,
    });

    return response.data;
  } catch (err) {
    throw err.response?.data?.message || "Registration failed";
  }
};

export const login = async ({ email, password }) => {
  try {
    const response = await api.post("/api/auth/login", {
      email,
      password,
    });
    return response.data;
  } catch (err) {
    console.log("Error while login", err);
   throw err.response?.data?.message || "Login failed";
  }
};

export const logout = async () => {
  try {
    const response = await api.get("/api/auth/logout");
    return response.data;
  } catch (err) {
    console.log("Error while logout", err);
  }
};

export const getMe = async () => {
  try {
    const response = await api.get("/api/auth/get-me");
    return response.data;
  } catch (err) {
    console.log("Error while getMe", err);
  }
};
