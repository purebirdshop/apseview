import DonutChart from '../components/DonutChart.jsx';
import GroupBarChart from '../components/GroupBarChart.jsx';
import ClipLoader from 'react-spinners/ClipLoader'; // Progress spinner

const Dashboard = ({
  loading,
  groupBarData = {},
  groupTotals = [],
  grandTotalData = 0
}) => {
  return (
    <div>
      <div className="dashboard-content" id="content">
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', minHeight: '768px', padding: '4rem' }}>
            <ClipLoader color="#3498db" size={60} />
          </div>
        ) : groupTotals && groupTotals.length > 0 ? (
          <>
            <h3>Monthly</h3>

            <div style={{ width: "100%", display: "flex", flexWrap: "wrap" }}>
              <DonutChart donutData={groupTotals} grandTotal={grandTotalData} />
              
              <div style={{ width: "50%", display: "flex", flexWrap: "wrap" }}>
                {Object.entries(groupBarData).map(([groupName, categories]) => (
                  <GroupBarChart
                    key={groupName}
                    groupName={groupName}
                    groupBarData={categories} // expects [{ name, total }, ...]
                  />
                ))}
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
