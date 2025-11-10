import { useCallback } from 'react';
import Header from '../components/Header.jsx';
import DonutChart from '../components/DonutChart.jsx';
import GroupBarChart from '../components/GroupBarChart.jsx';
// import StraightPieChart from '../components/StraightPieChart.jsx';
import { useDashboard } from '../hooks/useDashboard.js';
import { useMonthYear } from '../hooks/useMonthYear.js';
import MonthYearToggle from '../components/MonthYearToggle.jsx';
import { useNavigate } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader'; // Progress spinner

const Dashboard = () => {
  const navigate = useNavigate();
  const {
    month,
    year,
    incrementMonth,
    decrementMonth,
    incrementYear,
    decrementYear,
    isMonthForwardDisabled,
    isYearForwardDisabled
  } = useMonthYear();

  const {
    user,
    view,
    setView,
    campus,
    setCampus,
    startDate,
    endDate,
    loading,
    groupBarData,
    groupTotals,
  } = useDashboard();

const handleDateUpdate = useCallback(
  (startDate, endDate) => {
    const params = new URLSearchParams({
      view,
      campus,
      startDate,
      endDate,
    }, 300);
    navigate(`?${params.toString()}`, { replace: true });
  },
  [view, campus, navigate] // dependencies only when these change
);

  return (
    <div>
      <Header onViewChange={setView} onCampusChange={setCampus} user={user} />

      <div className="dashboard-content">
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem' }}>
            <ClipLoader color="#3498db" size={60} />
          </div>
        ) : groupTotals.length > 0 ? (
          <>
            <p>
              <strong>{view}</strong> View , Campus: {campus} | {startDate} - {endDate}
            </p>

              <MonthYearToggle
                month={month}
                year={year}
                onMonthChange={{ increment: incrementMonth, decrement: decrementMonth }}
                onYearChange={{ increment: incrementYear, decrement: decrementYear }}
                disableForwardMonth={isMonthForwardDisabled}
                disableForwardYear={isYearForwardDisabled}
                onDateUpdate={handleDateUpdate}
              />

            <div style={{width:"100%", display:"flex", flexWrap:"wrap"}}>
              {/* <div style={{width:"50%",display:"flex",flexWrap:"wrap"}}> */}
                <DonutChart donutData={groupTotals} />
              {/* </div> */}
              <div style={{width:"50%",display:"flex",flexWrap:"wrap"}}>
                {Object.entries(groupBarData).map(([groupName, categories]) => ((
                  <GroupBarChart key={groupName} groupBarData={categories} groupName={groupName} />
                )))}
              </div>
            </div>
          </>
        ) : (
          <p style={{ textAlign: 'center', padding: '2rem' }}>No data available.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
