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
        <h2>{view} View</h2>
        <p>
          Campus: {campus} | {startDate.toLocaleDateString()} - {endDate.toLocaleDateString()}
        </p>
        <ChartComponent data={data} />
      </div>
    </div>
  );
};

export default Dashboard;
