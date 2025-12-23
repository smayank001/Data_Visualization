import React from 'react';
import KPICards from '../components/dashboard/KPICards';
import FilterBar from '../components/dashboard/FilterBar';
import ScanTable from '../components/dashboard/ScanTable';
import { useDashboard } from '../context/DashboardContext';

const Dashboard = () => {
  const { stats, filters, updateFilter } = useDashboard();
  
  // Implicit rule: If no filters active, show static-like state or full totals?
  // Screen 1 usually implies "No filters selected" but shows totals.
  // We pass "stats" now, so KPICards will render dynamic numbers.
  
  return (
    <div className="p-5" style={{ padding: '20px' }}>
      <FilterBar filters={filters} onUpdate={updateFilter} />
      <KPICards stats={stats} />
      <ScanTable rows={[]} nextLink="/dashboard-filtered" /> {/* Initially empty per Image 1 */}
    </div>
  );
};

export default Dashboard;
