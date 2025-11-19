import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { fetchDashboardData } from "../services/api";

export const useDashboard = (profile) => {
  const location = useLocation();

  const [view, setView] = useState("All");
  const [campus, setCampus] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [groupBarData, setGroupBarData] = useState({});
  const [groupTotals, setGroupTotals] = useState([]);
  const [grandTotalData, setGrandTotalData] = useState(0);

  // Extract campus from URL or fallback
  useEffect(() => {
            const params = new URLSearchParams(location.search);
            const campusParam = params.get("campus");
            const urlStart = params.get("startDate")
            const urlEnd = params.get("endDate")

    // hardcoded for MVP TODO: need to fix this default campus. This should instead pull the campus from the user's authentication.
    // attempted to fix, as profile.campus_id is returning undefined half of the time...
    if (campusParam) {
      setCampus(campusParam);
    } else if (!campus) {
      const defaultCampus = 65637; 
      setCampus(defaultCampus);
    }

    setStartDate(urlStart);
    setEndDate(urlEnd);

  }, [location.search]);
  // TODO: Need. to fix this... React Hook useEffect has a missing dependency: 'campus'.

  // Fetch dashboard data when campus/start/endDate change
  useEffect(() => {
    if (location.pathname !== "/dashboard") return;
    if (!campus) return;

    const loadDashboard = async () => {
      setLoading(true);
      try {
        const data = await fetchDashboardData(campus, startDate, endDate);

        const records = data.records || {};
        const barData = {};
        const totals = [];

        Object.entries(records).forEach(([groupName, groupData]) => {
          if (["grand-total", "date_range", "groups"].includes(groupName)) return;

          barData[groupName] = (groupData.allRecords || []).map(r => ({
            name: r.records.name || `Category ${r.category_id}`,
            total: r.records["sub-total"] || 0,
          }));

          totals.push({
            groupName,
            total: groupData.total || 0,
          });
        });


        setGroupBarData(barData);
        setGroupTotals(totals);
        setGrandTotalData(records["grand-total"] || 0);

        // Optionally set date range
        if ((!startDate || !endDate) && records.date_range) {
          setStartDate(records.date_range.start);
          setEndDate(records.date_range.end);
        }

      } catch (err) {
        console.error("Error loading dashboard data:", err);
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, [location.pathname, campus, startDate, endDate]);

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
