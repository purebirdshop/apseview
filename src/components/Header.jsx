import React, { useState, useEffect } from 'react';
import { fetchCampuses } from '../services/api';
import logo from '../assets/apse-color-logo.png';
import '../App.css';

const Header = ({ user, onViewChange }) => {
  const [activeView, setActiveView] = useState('All');
  const [campuses, setCampuses] = useState([]);
  const [selectedCampusId, setSelectedCampusId] = useState(109844);

  const handleViewClick = (view) => {
    setActiveView(view);
    if (onViewChange) onViewChange(view);
  };

  useEffect(() => {
    const loadCampuses = async () => {
      try {
        const result = await fetchCampuses();

        const campusArray = Array.isArray(result)
          ? result
          : result?.records || result?.data || [];

        setCampuses(campusArray);
      } catch (err) {
        console.error('Error loading campuses:', err);
        setCampuses([]);
      }
    };

    loadCampuses();
  }, []);

  return (
    <header className="header">
      <div className="logo-left">
        <img alt="View the Apse" src={logo} />
      </div>

      <nav className="nav">
        {[
          // 'All',
          // 'Region',
          'Campus'
        ].map((view) => (
          <button
            key={view}
            className={`nav-button ${activeView === view ? 'active' : ''}`}
            onClick={() => handleViewClick(view)}
          >
            {view}
          </button>
        ))}

        <select
          value={selectedCampusId}
          onChange={(e) => setSelectedCampusId(Number(e.target.value))}
        >
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
          <p>{user.user?.name || user.user?.email || 'Unknown User'}</p>
        ) : (
          <p>Loading user...</p>
        )}
      </div>
    </header>
  );
};

export default Header;
