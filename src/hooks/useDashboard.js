import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { verifyUser, fetchDashboardData } from '../services/api';

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
    searchParams.get('startDate') ? new Date(searchParams.get('startDate')) : yesterday
  );
  const [endDate, setEndDate] = useState(
    searchParams.get('endDate') ? new Date(searchParams.get('endDate')) : today
  );
  const [data, setData] = useState([]);

  // Verify user on mount
  useEffect(() => {
    const checkUser = async () => {
      const hardCodedEmail = 'drmatt@awakenchurch.com';
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
      startDate: startDate.toISOString().split('T')[0],
      endDate: endDate.toISOString().split('T')[0],
    });
    navigate(`?${params.toString()}`, { replace: true });
  }, [view, campus, startDate, endDate, navigate]);

  // Fetch data whenever filters change **after user verification**
  useEffect(() => {
    if (!user) return; // don't fetch until user is verified

    const loadData = async () => {
      const result = await fetchDashboardData(campus, startDate, endDate, view);
      setData(result);
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
    data,
  };
};
