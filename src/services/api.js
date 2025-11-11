import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_VERCEL_BASE_URL

export const verifyUser = async (email) => {
  try {
    const res = await axios.get(`${API_BASE_URL}/api/metrics/verify-user`, {
      // /api/metrics/verify-user?email=drmatt@awakenchurch.com
      params:{
        email:email
      }
    });
    return res.data; // whatever the API returns
  } catch (error) {
    console.error('Error verifying user:', error);
    return null;
  }
};

// export const fetchDashboardData = async (campus, startDate, endDate, view) => {
export const fetchDashboardData = async (campus,startDate,endDate) => {
  try {
    const res = await axios.get(`${API_BASE_URL}/api/metrics/all-records-by-campus-grouped`, {
      params: {
        campus_id:campus,
        startDate,
        // startDate:startDate,
        endDate
        // endDate:endDate
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
