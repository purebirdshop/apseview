import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import { verifyUser } from "../services/api";

export const useAuth = () => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("apse_user");
    return saved ? JSON.parse(saved) : null;
  });

  const handleCredentialResponse = async (credentialResponse) => {
    try {
      const decoded = jwtDecode(credentialResponse.credential); // default import used
      const email = decoded.email;
      const verifiedUser = await verifyUser(email);
      setUser(verifiedUser);
    } catch (err) {
      console.error("Failed to verify user:", err);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("apse_user");
    if (window.google?.accounts?.id) window.google.accounts.id.disableAutoSelect();
  };

  return { user, handleCredentialResponse, logout, setUser };
};
