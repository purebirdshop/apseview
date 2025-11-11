import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Header from "./components/Header";
import Login from "./pages/Login";
import About from "./pages/About";
import Contact from "./pages/Contact";
import { useAuth } from "./hooks/useAuth.js";
import { useDashboard } from "./hooks/useDashboard.js";
import PrivacyPolicy from "./pages/PrivacyPolicy.jsx";
import TermsOfService from "./pages/TermsOfService.jsx";
import "./App.css";

// Protected route
const ProtectedRoute = ({ user, children }) => {
  const location = useLocation();
  if (!user) {
    return <Navigate to="/contact" state={{ from: location }} replace />;
  }
  return children;
};

function App() {
  // useAuth now manages the user internally
  const { user, handleCredentialResponse, logout } = useAuth();

  // Always call the hook — it handles conditional loading internally
  const {
    view,
    setView,
    campus,
    setCampus,
    startDate,
    endDate,
    loading,
    groupBarData,
    groupTotals,
    grandTotalData,
  } = useDashboard();

  return (
    <div className="App">
      <Header
        user={user}
        onViewChange={setView}
        onCampusChange={setCampus}
        onLogout={logout} // use the logout from the hook
      />

      <Routes>
        <Route path="/login" element={<Login onLogin={handleCredentialResponse} />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy" element={<PrivacyPolicy /> } />
        <Route path="/privacy-policy" element={<PrivacyPolicy /> } />
        <Route path="/terms" element={<TermsOfService /> } />
        <Route path="/tos" element={<TermsOfService /> } />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute user={user}>
              <Dashboard
                view={view}
                campus={campus}
                startDate={startDate}
                endDate={endDate}
                loading={loading}
                groupBarData={groupBarData}
                groupTotals={groupTotals}
                grandTotalData={grandTotalData}
              />
            </ProtectedRoute>
          }
        />

        <Route
          path="*"
          element={<Navigate to={user ? "/dashboard" : "/login"} replace />}
        />
      </Routes>
    </div>
  );
}

export default App;
