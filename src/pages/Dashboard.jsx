import Header from '../components/Header.jsx';
import DonutChart from '../components/DonutChart.jsx';
import GroupBarChart from '../components/GroupBarChart.jsx';
import { useDashboard } from '../hooks/useDashboard.js';
import ClipLoader from 'react-spinners/ClipLoader'; // Progress spinner

const Dashboard = () => {

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
    grandTotalData
  } = useDashboard();

  return (
    <div>
      <Header onViewChange={setView} onCampusChange={setCampus} user={user} />

      <div className="dashboard-content" id="content" >
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', minHeight:'768px', padding: '4rem' }}>
            <ClipLoader color="#3498db" size={60} />
          </div>
        ) : groupTotals.length > 0 ? (
          <>
            <p>
              <strong>{view}</strong> View , Campus: {campus} | {startDate} - {endDate}
            </p>

            <div style={{width:"100%", display:"flex", flexWrap:"wrap"}}>
              <DonutChart donutData={groupTotals} grandTotal={grandTotalData} />
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
