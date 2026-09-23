import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  return (
    <AuthContext value={{ user, setUser, loading, setLoading }}>
      {children}
    </AuthContext>
  );
};
