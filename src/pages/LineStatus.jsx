import React from 'react';
import '../styles/components/LineStatus.css';
import { useNavigate } from 'react-router-dom';
import { useDashboard } from '../context/DashboardContext';

const LineStatus = () => {
  const navigate = useNavigate();
  const { lines } = useDashboard();

  return (
    <div className="line-status-page">
      <div className="line-status-header">
        <h1>Line Status Overview</h1>
      </div>
      
      <div className="line-grid">
        {lines.map(line => (
          <div 
            key={line.id} 
            className={`line-card ${line.status}`}
            onClick={() => navigate(`/line-detail/${line.id}`)}
          >
            <div className="line-name">{line.name}</div>
            <div className="line-indicator">
              {line.status === 'success' ? 'RUNNING' : 'STOPPED'}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LineStatus;
