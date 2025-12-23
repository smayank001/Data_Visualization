import React from 'react';
import KPICards from '../components/dashboard/KPICards';
import FilterBar from '../components/dashboard/FilterBar';
import ScanTable from '../components/dashboard/ScanTable';
import { useDashboard } from '../context/DashboardContext';

const DashboardFiltered = () => {
  const { stats, filters, updateFilter, scans } = useDashboard();

  return (
    <div className="p-5" style={{ padding: '20px' }}>
      <FilterBar filters={filters} onUpdate={updateFilter} />
      <KPICards stats={stats} />
      {/* Show actual filtered scans */}
      <ScanTable rows={scans} nextLink="/analytics" />
    </div>
  );
};

export default DashboardFiltered;
