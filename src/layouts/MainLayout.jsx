import React, { useState } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { LayoutDashboard, FileText, Menu, X } from 'lucide-react';
import '../styles/index.css';
import '../styles/layouts/MainLayout.css';

const MainLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="layout-container">
      {/* Mobile Toggle Button */}
      <button className="mobile-toggle" onClick={toggleSidebar}>
        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Overlay for mobile */}
      <div 
        className={`sidebar-overlay ${isSidebarOpen ? 'visible' : ''}`}
        onClick={closeSidebar}
      />
      
      {/* Sidebar */}
      <aside className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        {/* Logo Section */}
        <div className="sidebar-logo">
          <h1>LOGO</h1>
        </div>

        {/* Navigation */}
        <nav className="sidebar-nav">
           {/* Dashboard Link */}
           <NavLink 
             to="/analytics" 
             className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}
             onClick={closeSidebar}
           >
             <LayoutDashboard size={20} />
             <span>Dashboard</span>
           </NavLink>

           {/* Report Link */}
           <NavLink 
             to="/ocr-history" 
             className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}
             onClick={closeSidebar}
           >
             <FileText size={20} />
             <span>Report</span>
           </NavLink>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
