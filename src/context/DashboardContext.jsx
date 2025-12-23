import React, { createContext, useContext, useState, useMemo } from 'react';
import { getScans, LINES } from '../data/mockData';

const DashboardContext = createContext();

export const useDashboard = () => useContext(DashboardContext);

export const DashboardProvider = ({ children }) => {
  // Global Filters
  const [filters, setFilters] = useState({
    search: '',
    casting: '',
    workstation: '',
    date: '2025-05-23', // Defaulting to the demo date
    startTime: '',
    endTime: '',
    lineId: null, // null = all
    shift: 'Shift 1' // For Screen 6
  });

  const [globalScans, setGlobalScans] = useState(getScans());

  // Derived Data based on Filters
  const filteredScans = useMemo(() => {
    return globalScans.filter(scan => {
      if (filters.search && !scan.heatCode.toLowerCase().includes(filters.search.toLowerCase())) return false;
      if (filters.lineId && scan.lineId !== filters.lineId) return false;
      // Date/Time filtering logic could leverage moment/date-fns, simplistic here
      return true;
    });
  }, [filters, globalScans]);

  // Derived KPIs
  const kpiStats = useMemo(() => {
    const total = filteredScans.length;
    const reject = filteredScans.filter(s => s.status === 'Reject').length;
    const error = filteredScans.filter(s => s.status === 'Error').length;
    const success = filteredScans.filter(s => s.status === 'Success').length;
    return { total, reject, error, success };
  }, [filteredScans]);

  const updateFilter = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
        search: '',
        casting: '',
        workstation: '',
        date: '2025-05-23',
        startTime: '',
        endTime: '',
        lineId: null,
        shift: 'Shift 1'
    });
  };

  const value = {
    lines: LINES,
    scans: filteredScans,
    allScans: globalScans,
    stats: kpiStats,
    filters,
    updateFilter,
    clearFilters
  };

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
};
