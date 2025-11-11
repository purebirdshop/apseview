import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { fetchDashboardData } from "../services/api";

export const useDashboard = () => {
  const location = useLocation();
  const [view, setView] = useState("All");
  const [campus, setCampus] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [groupBarData, setGroupBarData] = useState([]);
  const [groupTotals, setGroupTotals] = useState([]);
  const [grandTotalData, setGrandTotalData] = useState([]);

  useEffect(() => {
    // Only fetch data if on /dashboard
    if (location.pathname !== "/dashboard") return;

    const loadDashboard = async () => {
      setLoading(true);
      try {
        const data = await fetchDashboardData();
        setGroupBarData(data.groupBarData || []);
        setGroupTotals(data.groupTotals || []);
        setGrandTotalData(data.grandTotalData || []);
        // initialize other state as needed
      } catch (err) {
        console.error("Error loading dashboard data:", err);
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, [location.pathname]);

  return {
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
  };
};
