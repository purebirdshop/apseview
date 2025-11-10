import React, { useEffect } from 'react';
import { months, buildDateString } from '../utils/helper';

const MonthYearToggle = ({ month, year, onMonthChange, onYearChange, disableForwardMonth, disableForwardYear, onDateUpdate }) => {

  useEffect(() => {
    // When month/year changes, calculate new start/end date
    const startDate = buildDateString(year, month, 14);
    const endDate = buildDateString(year, month, 15);
    if (onDateUpdate) onDateUpdate(startDate, endDate);
  }, [month, year, onDateUpdate]);

  return (
    <div className="month-year-toggle" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
      {/* Month */}
      <button onClick={onMonthChange.decrement} disabled={false}>{'<'}</button>
      <span>{months[month]}</span>
      <button onClick={onMonthChange.increment} disabled={disableForwardMonth}>{'>'}</button>

      <span>|</span>

      {/* Year */}
      <button onClick={onYearChange.decrement} disabled={false}>{'<'}</button>
      <span>{year}</span>
      <button onClick={onYearChange.increment} disabled={disableForwardYear}>{'>'}</button>
    </div>
  );
};

export default MonthYearToggle;
