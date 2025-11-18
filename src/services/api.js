import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_VERCEL_BASE_URL

export const verifyUser = async (email) => {
  try {
    const res = await axios.post(`${API_BASE_URL}/api/connection`, { email });
    return res.data;
  } catch (error) {
    console.error("Error verifying user:", error);
    return { success: false };
  }
};


// export const fetchDashboardData = async (campus, startDate, endDate, view) => {
export const fetchDashboardData = async (campus,startDate,endDate) => {
  try {
    const res = await axios.get(`${API_BASE_URL}/api/metrics/all-records-by-campus-grouped`, {
      params: {
        campus_id:campus,
        startDate,
        endDate
      },
    });

    return res.data;
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    return [];
  }
};

export const fetchCampuses = async () => {
  try {
    const res = await axios.get(`${API_BASE_URL}/api/metrics/all-campus-data`);
    return res.data;
  } catch (error) {
    console.error('Error fetching campus list:', error);
    return [];
  }
};
