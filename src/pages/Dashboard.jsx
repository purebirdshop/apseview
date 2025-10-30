import React from 'react';
import Header from '../components/Header';
import ChartComponent from '../components/ChartComponent';
import { useDashboard } from '../hooks/useDashboard';

const Dashboard = () => {
  const {
    user,
    view,
    setView,
    campus,
    setCampus,
    startDate,
    endDate,
    data,
  } = useDashboard();

  return (
    <div>
      <Header onViewChange={setView} onCampusChange={setCampus} user={user} />
      <div className="dashboard-content">
        <p>
        <strong>{view}</strong> View , Campus: {campus} | {startDate} - {endDate}
        </p>
        {/* {console.log(data)} */}
        <ChartComponent data={data} />
      </div>
    </div>
  );
};

export default Dashboard;
