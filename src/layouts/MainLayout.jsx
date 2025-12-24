import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { LayoutDashboard, FileText } from 'lucide-react';
import '../styles/index.css';

const MainLayout = () => {
  return (
    <div className="layout-container" style={{ display: 'flex', height: '100vh', width: '100vw', overflow: 'hidden', background: '#f5f7fa' }}>
      
      {/* Sidebar - Matching the black/dark-blue sidebar in image */}
      <aside style={{ 
        width: '260px', 
        background: '#0a0e17', // Very dark blue/black
        color: '#fff',
        display: 'flex', 
        flexDirection: 'column',
        borderRight: '1px solid #1f2937'
      }}>
        {/* Logo Section */}
        <div style={{ padding: '30px 24px', marginBottom: '20px' }}>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', letterSpacing: '1px' }}>LOGO</h1>
        </div>

        {/* Navigation */}
        <nav style={{ flex: 1, padding: '0 12px' }}>
           {/* Dashboard Link - Pointing to Analytics to match the "Dashboard" view in image */}
           <NavLink 
             to="/analytics" 
             className={({ isActive }) => 
               isActive ? "nav-item active" : "nav-item"
             }
             style={({ isActive }) => ({
               display: 'flex',
               alignItems: 'center',
               gap: '12px',
               padding: '12px 16px',
               borderRadius: '8px',
               marginBottom: '8px',
               textDecoration: 'none',
               color: isActive ? '#fff' : '#9ca3af',
               background: isActive ? '#1f2937' : 'transparent', // Dark grey active state like image
               fontWeight: 500
             })}
           >
             <LayoutDashboard size={20} />
             <span>Dashboard</span>
           </NavLink>

           {/* Report Link */}
           <NavLink 
             to="/ocr-history" 
             className={({ isActive }) => 
               isActive ? "nav-item active" : "nav-item"
             }
             style={({ isActive }) => ({
               display: 'flex',
               alignItems: 'center',
               gap: '12px',
               padding: '12px 16px',
               borderRadius: '8px',
               marginBottom: '8px',
               textDecoration: 'none',
               color: isActive ? '#fff' : '#9ca3af',
               background: isActive ? '#1f2937' : 'transparent',
               fontWeight: 500
             })}
           >
             <FileText size={20} />
             <span>Report</span>
           </NavLink>
        </nav>
      </aside>

      {/* Main Content Area - Light background from image */}
      <main style={{ flex: 1, overflowY: 'auto', position: 'relative' }}>
         {/* Top "Dashboard" Header inside main content if needed, or just content */}
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
