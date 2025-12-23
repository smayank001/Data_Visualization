import React from 'react';
import { Camera, Scan, Layers, XCircle, AlertTriangle } from 'lucide-react';
import '../../styles/components/Dashboard.css';

const KPICards = ({ stats }) => {
  return (
    <div className="kpi-container">
      {/* Scan Reject */}
      <div className="kpi-card">
        <div className="kpi-icon-wrapper">
          <Scan className="kpi-icon" color="#d32f2f" size={24} />
          <XCircle className="kpi-sub-icon" color="#d32f2f" size={12} />
        </div>
        <div className="kpi-content">
          <span className="kpi-label">Scan Reject</span>
          {stats ? <span className="kpi-value red">{stats.reject}</span> : <div className="kpi-underline red"></div>}
        </div>
      </div>

      {/* Scan Error */}
      <div className="kpi-card">
        <div className="kpi-icon-wrapper">
          <Scan className="kpi-icon" color="#fbc02d" size={24} />
          <AlertTriangle className="kpi-sub-icon" color="#fbc02d" size={12} />
        </div>
        <div className="kpi-content">
          <span className="kpi-label">Scan Error</span>
          {stats ? <span className="kpi-value yellow">{stats.error}</span> : <div className="kpi-underline yellow"></div>}
        </div>
      </div>

      {/* Scan Success */}
      <div className="kpi-card">
        <div className="kpi-icon-wrapper">
          <Layers className="kpi-icon" color="#388e3c" size={24} />
        </div>
        <div className="kpi-content">
          <span className="kpi-label">Scan Success</span>
          {stats ? <span className="kpi-value green">{stats.success}</span> : <div className="kpi-underline green"></div>}
        </div>
      </div>

      {/* Total */}
      <div className="kpi-card">
        <div className="kpi-icon-wrapper">
          <Layers className="kpi-icon" color="#1976d2" size={24} />
        </div>
        <div className="kpi-content">
          <span className="kpi-label">Total</span>
          {stats ? <span className="kpi-value blue">{stats.total}</span> : <div className="kpi-underline blue"></div>}
        </div>
      </div>
    </div>
  );
};

export default KPICards;
