import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { verifyUser, fetchDashboardData } from '../services/api';
import formatDate from '../utils/helper';

export const useDashboard = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  // State
  const [user, setUser] = useState(null);
  const [view, setView] = useState(searchParams.get('view') || 'All');
  const [campus, setCampus] = useState(searchParams.get('campus') || 'Main');
  const [startDate, setStartDate] = useState(
    searchParams.get('startDate') || formatDate(yesterday)
  );
  const [endDate, setEndDate] = useState(
    searchParams.get('endDate') || formatDate(today)
  );
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  // Processed data for charts
  const [groupPieData, setGroupPieData] = useState({});
  const [groupTotals, setGroupTotals] = useState([]);
  const [groupBarData, setGroupBarData] = useState([]);
  const [grandTotalData, setGrandTotalData] = useState()

  // Verify user on mount
  useEffect(() => {
    const checkUser = async () => {
      const hardCodedEmail = 'jasontylerb@gmail.com';
      const verifiedUser = await verifyUser(hardCodedEmail);
      setUser(verifiedUser);
    };
    checkUser();
  }, []);

  // Sync state -> URL params
  useEffect(() => {
    const params = new URLSearchParams({
      view,
      campus,
      startDate,
      endDate
    });
    navigate(`?${params.toString()}`, { replace: true });
  }, [view, campus, startDate, endDate, navigate]);

  // Load raw data and process for charts
  useEffect(() => {
    if (!user) return;

    const loadData = async () => {
      setLoading(true);
      try {
        const result = await fetchDashboardData(65637, startDate, endDate, view);
        setData(result);

        const pieDataObj = {};
        const donutDataObj = [];
        const barDataObj = {};

        for (const [groupName, group] of Object.entries(result.records || {})) {
          if(groupName === "grand-total"){
            setGrandTotalData(group);
          }
          if (groupName === "grand-total" || groupName === "groups") continue;
          const pieData = (group.allRecords || []).map((record) => {
            const total = record.records?.["sub-total"] || 0;
            const name = `${record.records?.name}: ${record.records?.["sub-total"] || 0}`;
            const label = record.records?.name;

            donutDataObj.push({ name, total, label });

            return { name, total, label};
          });

          pieDataObj[groupName] = pieData;
        }

        for (const [groupName, group] of Object.entries(result.records || {})) {

          if (groupName === "grand-total" || groupName === "groups") continue;
          const categories = (group.allRecords || []).map((record) => ({
            name: `${record.records.name}`, // need sub-category name to be mapped here....
            total: record.records?.["sub-total"] || 0,
          }));

          barDataObj[groupName] = categories;
        }

        setGroupPieData(pieDataObj);
        setGroupTotals(donutDataObj);
        setGroupBarData(barDataObj);

      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setData(null);
        setGroupPieData({});
        setGroupTotals([]);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [user, campus, startDate, endDate, view]);

  return {
    user,
    view,
    setView,
    campus,
    setCampus,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    loading,
    data,
    groupPieData,
    groupBarData,
    groupTotals,
    grandTotalData
  };
};
