import React, { useState, useEffect } from 'react';
import { fetchCampuses } from '../services/api';
import '../App.css'; // optional CSS for styling

const Header = ({ user, onViewChange, onCampusChange }) => {
  const [activeView, setActiveView] = useState('All');
  const [campuses, setCampuses] = useState([]);
  const [activeCampus, setActiveCampus] = useState('');

  // Handle view button clicks
  const handleViewClick = (view) => {
    setActiveView(view);
    if (onViewChange) onViewChange(view);
  };

  // Fetch campuses on mount
  useEffect(() => {
    const loadCampuses = async () => {
      try {
        const result = await fetchCampuses();

        console.log('Raw campuses API response:', result); 

        // Normalize the response to always be an array
        const campusArray = Array.isArray(result)
          ? result
          : result?.records || result?.data || [];

        setCampuses(campusArray);

        /* 
        left off here... trying to get campus id passed, instead ofcampus name. 
        Although, we really need to pass both ids. Or we need to build our own
        json object that is just the service, and its ids.
        */
        if (campusArray.length > 0) {
          setActiveCampus(campusArray[0].metrics.id || campusArray[0]);
          console.log(campusArray[0].metrics.id)
          if (onCampusChange) onCampusChange(campusArray[0].metrics.id || campusArray[0]);
        }
      } catch (err) {
        console.error('Error loading campuses:', err);
        setCampuses([]); // fallback to empty array
      }
    };

    loadCampuses();
  }, [onCampusChange]);

  // Handle campus selection change
  const handleCampusChange = (e) => {
    const newCampus = e.target.value;
    setActiveCampus(newCampus);
    if (onCampusChange) onCampusChange(newCampus);
  };

  return (
    <header className="header">
      <div className="logo-left">
        <h3>Client Logo</h3>
      </div>

      <nav className="nav">
        {['All', 'Region', 'Campus'].map((view) => (
          <button
            key={view}
            className={`nav-button ${activeView === view ? 'active' : ''}`}
            onClick={() => handleViewClick(view)}
          >
            {view}
          </button>
        ))}

        <select value={activeCampus} onChange={handleCampusChange}>
          {Array.isArray(campuses) && campuses.length > 0 ? (
            campuses.map((campus) => (
              <option key={campus.id || campus.name} value={campus.metrics.id}>
                {campus.name}
              </option>
            ))
          ) : (
            <option disabled>Loading Campuses...</option>
          )}
        </select>
      </nav>

      <div className="logo-right user-info">
        {user ? (
          <p>
            {user.user?.name || user.user?.email || 'Unknown User'}
          </p>
        ) : (
          <p>Loading user...</p>
        )}
      </div>
    </header>
  );
};

export default Header;
