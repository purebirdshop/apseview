import DonutChart from '../components/DonutChart.jsx';
import GroupBarChart from '../components/GroupBarChart.jsx';
import ClipLoader from 'react-spinners/ClipLoader'; // Progress spinner
import DatesDrawer from '../components/DatesDrawer.jsx';
import { useDateController } from "../hooks/useDateController";

const friendlyDate = (uglyDate) => {
  const date = new Date(uglyDate);
  date.setDate(date.getDate() + 1);

  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  }).format(date);
}

const Dashboard = ({
  loading,
  groupBarData = {},
  groupTotals = [],
  grandTotalData = 0
}) => {
  const { startDate, endDate  } = useDateController();
  const friendlyStart = friendlyDate(startDate);
  const friendlyEnd = friendlyDate(endDate);

  
  return (
    <div>
      <DatesDrawer
        anchor="bottom"
        selectedStart={friendlyStart}
        selectedEnd={friendlyEnd}
      />
      <div className="dashboard-content" id="content">
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', minHeight: '768px', padding: '4rem' }}>
            <ClipLoader color="#3498db" size={60} />
          </div>
        ) : groupTotals && groupTotals.length > 0 ? (
          <>
            <div className="pie-chart-cluster">
              <DonutChart donutData={groupTotals} grandTotal={grandTotalData} />
            </div>
              
            <div className="bar-chart-cluster">
              {Object.entries(groupBarData).map(([groupName, categories]) => (
                <GroupBarChart
                  key={groupName}
                  groupName={groupName}
                  grandTotal={grandTotalData}
                  groupBarData={categories}
                />
              ))}
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
