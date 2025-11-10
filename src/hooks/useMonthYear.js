// src/hooks/useMonthYear.js
import { useState } from 'react';
import { getCurrentMonthYear } from '../utils/helper';

export const useMonthYear = () => {
  const { month: currentMonth, year: currentYear } = getCurrentMonthYear();
  const [month, setMonth] = useState(currentMonth);
  const [year, setYear] = useState(currentYear);

  const incrementMonth = () => {
    let newMonth = month + 1;
    let newYear = year;
    if (newMonth > 11) {
      newMonth = 0;
      newYear += 1;
    }
    if (newYear > currentYear || (newYear === currentYear && newMonth > currentMonth)) return;
    setMonth(newMonth);
    setYear(newYear);
  };

  const decrementMonth = () => {
    let newMonth = month - 1;
    let newYear = year;
    if (newMonth < 0) {
      newMonth = 11;
      newYear -= 1;
    }
    setMonth(newMonth);
    setYear(newYear);
  };

  const incrementYear = () => {
    if (year >= currentYear) return;
    setYear((y) => y + 1);
  };

  const decrementYear = () => {
    setYear((y) => y - 1);
  };

  const isMonthForwardDisabled = year === currentYear && month === currentMonth;
  const isMonthBackDisabled = false; // allow unlimited backward navigation
  const isYearForwardDisabled = year >= currentYear;
  const isYearBackDisabled = false;

  return {
    month,
    year,
    incrementMonth,
    decrementMonth,
    incrementYear,
    decrementYear,
    isMonthForwardDisabled,
    isMonthBackDisabled,
    isYearForwardDisabled,
    isYearBackDisabled,
  };
};
