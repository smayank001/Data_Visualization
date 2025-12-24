import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Dashboard from './pages/Dashboard';
// Placeholder imports for pages
// const Dashboard = () => <div style={{padding: 20}}><h2>Screen 1: Initial Dashboard</h2></div>;
import DashboardFiltered from './pages/DashboardFiltered';
// const DashboardFiltered = () => <div style={{padding: 20}}><h2>Screen 2: Filtered Dashboard</h2></div>;
import Analytics from './pages/Analytics';
// const Analytics = () => <div style={{padding: 20}}><h2>Screen 3: Analytics</h2></div>;
import LineStatus from './pages/LineStatus';
// const LineStatus = () => <div style={{padding: 20}}><h2>Screen 4: Status Overview</h2></div>;
import LineDetail from './pages/LineDetail';
import Reports from './pages/Reports';
import ImageStore from './pages/ImageStore';
// const LineDetail = () => <div style={{padding: 20}}><h2>Screen 5: Line 13 Detail</h2></div>;

import { DashboardProvider } from './context/DashboardContext';

function App() {
  return (
    <DashboardProvider>
      <Router>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="dashboard-filtered" element={<DashboardFiltered />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="line-status" element={<LineStatus />} />
            <Route path="line-detail/:lineId" element={<LineDetail />} />
            <Route path="ocr-history" element={<Reports />} />
            <Route path="image-store" element={<ImageStore />} />
          </Route>
        </Routes>
      </Router>
    </DashboardProvider>
  );
}

export default App;
