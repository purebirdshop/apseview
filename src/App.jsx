import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Header from "./components/Header";
import Connection from "./pages/Connection.jsx";
import About from "./pages/About";
import Contact from "./pages/Contact";
import { useConnection } from "./hooks/useConnection.js";
import { useDashboard } from "./hooks/useDashboard.js";
import PrivacyPolicy from "./pages/PrivacyPolicy.jsx";
import TermsOfService from "./pages/TermsOfService.jsx";
import "./App.css";
import Footer from "./components/Footer.jsx";
import ServiceConnections from "./pages/ServiceConnections.jsx";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

// Protected route
// const ProtectedRoute = ({ user, initializing, children }) => {
const ProtectedRoute = ({ children }) => {
  // const location = useLocation();

  // if (initializing) {
  //   return <div>Loading...</div>; // or a spinner
  // }

  // if (!user) {
  //   return <Navigate to="/login" state={{ from: location }} replace />;
  // }
  return children;
};

function App() {
  const { user, profile, connect, logout } = useConnection();
  const {
    view,
    setView,
    campus,
    setCampus,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    loading,
    groupBarData,
    groupTotals,
    grandTotalData,
  } = useDashboard(profile);

  // Optional: show a loading screen until we know if the user is connected
  return (
  <ThemeProvider theme={darkTheme}>
    <CssBaseline />
      <div className="app">
        <Header
          user={user}
          onViewChange={setView}
          onCampusChange={setCampus}
          onLogout={logout}
        />
        <main className="content">
          <Routes>
            <Route path="/login" element={<Connection user={user} onLogin={connect} />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />

            <Route
              path="/dashboard"
              element={
                <ProtectedRoute user={user}>
                  <Dashboard
                    view={view}
                    campus={campus}
                    startDate={startDate}
                    setStartDate={setStartDate}
                    endDate={endDate}
                    setEndDate={setEndDate}
                    loading={loading}
                    groupBarData={groupBarData}
                    groupTotals={groupTotals}
                    grandTotalData={grandTotalData}
                  />
                </ProtectedRoute>
              }
            />

            <Route
              path="/services"
              element={
                <ProtectedRoute user={user}>
                  <ServiceConnections />
                </ProtectedRoute>
              }
            />

            <Route
              path="*"
              element={<Navigate to={user ? "/dashboard" : "/login"} replace />}
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}


export default App;
