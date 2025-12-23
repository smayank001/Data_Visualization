import React from 'react';
import { Outlet } from 'react-router-dom';
import '../styles/index.css';

const MainLayout = () => {
  return (
    <div className="layout-container">
      {/* Header Placeholder - can be componentized later */}
      <header style={{ 
        height: '60px', 
        background: 'var(--bg-header)', 
        borderBottom: '1px solid var(--border-color)',
        display: 'flex',
        alignItems: 'center',
        padding: '0 20px'
      }}>
        <div className="logo" style={{ fontWeight: 'bold', fontSize: '1.2rem', color: '#fff' }}>
          MUNJAL KIRIU
        </div>
      </header>

      <main style={{ padding: '0px', minHeight: 'calc(100vh - 60px)' }}>
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
