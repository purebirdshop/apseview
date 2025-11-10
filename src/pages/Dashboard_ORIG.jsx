import Header from '../components/Header.jsx';
import ChartComponent from '../components/ChartComponent.jsx';
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

  const handleDateUpdate = (startDate, endDate) => {
    const params = new URLSearchParams({
      view,
      campus,
      startDate,
      endDate
    });
    navigate(`?${params.toString()}`, { replace: true });
  };

  const {
    user,
    view,
    setView,
    campus,
    setCampus,
    startDate,
    endDate,
    loading,
    data,
  } = useDashboard();

  return (
    <div>
      <Header onViewChange={setView} onCampusChange={setCampus} user={user} />
      <div className="dashboard-content">

        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem' }}>
            <ClipLoader color="#3498db" size={60} />
          </div>
        ) : data ? (
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
            <ChartComponent data={data} />
          </>
        ) : (
          <p style={{ textAlign: 'center', padding: '2rem' }}>No data available.</p>
        )}

        
        {/* 

        I want to add a horizontal toggle for the month and year that will
        appear just above the cahrts. It will select the present month and 
        present year. user cannot toggle past this month / year. So if the 
        month is "current month" and the year is "current year", the forward 
        toggle on both is disabled. If year is moved back to last year, the 
        month toggle becomes enabled. The user can now toggle forward. Whent 
        the user toggle past December, the month will cycle back to January, 
        and the year will increase. The same should happen in reverse, if you 
        cycle back to December from January. The toggles should look somewhat 
        like this: 
        
        "< [current month] > | < [current year] >"

        Changing either of these values will update the url params for start date 
        and end date. The day value in those dates should be the 14th 
        and the 15th.

        */}
      </div>
    </div>
  );
};

export default Dashboard;
