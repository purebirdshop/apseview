import { useState, useEffect } from "react";

export const useConnection = () => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [initializing, setInitializing] = useState(true);

  const connect = (jwtToken) => {
    setToken(jwtToken);
    const payload = JSON.parse(atob(jwtToken.split(".")[1]));
    setUser({
      email: payload.email,
      campus_id: payload.campus_id,
    });
    localStorage.setItem("connectionToken", jwtToken);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("connectionToken");
  };

  // Restore login on page load
  useEffect(() => {
    const savedToken = localStorage.getItem("connectionToken");

    if (savedToken) {
      connect(savedToken);
    }

    setInitializing(false); // 🚀 Finished restoring state
  }, []);

  return { user, token, connect, logout, initializing };
};
