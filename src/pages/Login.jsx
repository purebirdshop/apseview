import React, { useEffect } from "react";

const Login = ({ onLogin }) => {
  useEffect(() => {
    /* globalgoogle */
    // Initialize Google Identity Services
    window.google.accounts.id.initialize({
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      callback: handleCredentialResponse,
    });

    // Render Google sign-in button
    window.google.accounts.id.renderButton(
      document.getElementById("googleSignInDiv"),
      { theme: "outline", size: "large", width: 300 }
    );
  }, []);

  const handleCredentialResponse = (response) => {
    // Decode JWT token from Google
    const userObject = parseJwt(response.credential);
    onLogin(userObject);
  };

  const parseJwt = (token) => {
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
          .join("")
      );
      return JSON.parse(jsonPayload);
    } catch (e) {
      console.error("Error decoding token", e);
      return null;
    }
  };

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        backgroundColor: "#f5f5f5",
      }}
    >
      <h2>Welcome to ApseView</h2>
      <p>Sign in with Google to continue</p>
      <div id="googleSignInDiv"></div>
    </div>
  );
};

export default Login;
