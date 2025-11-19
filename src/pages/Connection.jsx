import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { verifyUser } from "../services/api";

const Connection = ({ onLogin, user }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/dashboard", { replace: true });
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const data = await verifyUser(email);
      if (data.success) {
        onLogin(data.token, data.cmUserData);
      } else {
        setError("Email not allowed.");
      }
    } catch (err) {
      console.error("Error in handleSubmit:", err);
      setError("Error connecting. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto", padding: "2rem" }}>
      <h2>Sign in with your email</h2>

      {user ? (
        <p>Redirecting...</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: "100%", padding: "0.5rem", marginBottom: "1rem" }}
          />
          <button type="submit" disabled={loading}>
            {loading ? "Connecting..." : "Connect"}
          </button>
        </form>
      )}

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default Connection;
