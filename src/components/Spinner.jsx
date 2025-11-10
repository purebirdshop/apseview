import React from 'react';
import '../App.css';

const Spinner = ({ size = 48, color = '#3498db', text = 'Loading...' }) => {
  return (
    <div className="spinner-container">
      <div
        className="spinner"
        style={{
          width: size,
          height: size,
          borderTopColor: color,
        }}
      ></div>
      {text && <p className="spinner-text">{text}</p>}
    </div>
  );
};

export default Spinner;
