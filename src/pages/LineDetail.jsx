import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Cell } from 'recharts';
import '../styles/components/LineDetail.css';
import { useDashboard } from '../context/DashboardContext';

const LineDetail = () => {
  const { lineId } = useParams();
  const navigate = useNavigate();
  const { lines, allScans } = useDashboard();
  
  // Filter scans for this line (mock logic)
  // Default to line 13 if no ID
  const currentLineId = parseInt(lineId) || 13;
  const lineScans = allScans.filter(s => s.lineId === currentLineId);

  // Mock bar data derived from scans
  const chartData = [
     { name: 'Green', value: lineScans.filter(s => s.status === 'Success').length, color: '#008000' },
     { name: 'Red', value: lineScans.filter(s => s.status === 'Reject').length, color: '#ff0000' }
  ];

  return (
    <div className="line-detail-container">
      {/* Sidebar */}
      <div className="detail-sidebar">
        <div className="sidebar-logo">
          <h1>SIEMENS</h1>
        </div>
        
        <div className="sidebar-section">
          <h3>LINE STATUS</h3>
          <div className="line-status-grid">
             {lines.map(line => (
               <button 
                 key={line.id} 
                 className={`line-btn ${line.status === 'success' ? 'green' : 'red'}`}
                 onClick={() => navigate(`/line-detail/${line.id}`)}
               >
                 {line.name.toUpperCase()}
               </button>
             ))}
          </div>
        </div>

        <div className="sidebar-section">
          <h3>CAMERA STATUS LINE-13</h3>
          <div className="camera-status-row">
            <button className="camera-btn red">OCR 1</button>
            <button className="camera-btn green">OCR 2</button>
          </div>
        </div>

        <div className="sidebar-section history-filter">
          <h3>FILTER OCR HISTORY</h3>
          <div className="filter-grid">
             <div className="filter-box">LINE NO. <span>{currentLineId}</span></div>
             <div className="filter-box">DATE <span>2024-04-04</span></div>
             <div className="filter-box">TIME <span>12:00-1:00</span></div>
             <div className="filter-box">OCR NO. <span>1</span></div>
          </div>
           {/* Link to reports */}
           <div style={{marginTop: 10, textAlign: 'center'}}>
              <Link to="/ocr-history" style={{color: '#009688', fontWeight: 'bold'}}>View OCR History »</Link>
           </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="detail-main">
        {/* Top KPI Row */}
        <div className="detail-top-row">
           <div className="kpi-box purple">
             <span>TOTAL SCAN PART</span>
             <strong>{lineScans.length}</strong>
           </div>
           <div className="kpi-box yellow-full">
             <span>Download</span>
             <strong>PDF/EXCEL</strong>
           </div>
           
           <div className="image-store-box">
              <button>IMAGE STORE ☑</button>
           </div>
           
           <div className="detail-chart-panel">
              <h3>SCAN DATA AT LINE -{currentLineId}</h3>
              <div className="detail-chart-legend">
                 <span>SCANNED PARTS</span>
                 <span>SCANNED REJECTS</span>
              </div>
              <ResponsiveContainer width={300} height={150}>
                <BarChart data={chartData} barSize={40}>
                   <CartesianGrid strokeDasharray="3 3" vertical={false} />
                   <XAxis dataKey="name" />
                   <YAxis />
                   <Bar dataKey="value">
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                   </Bar>
                </BarChart>
              </ResponsiveContainer>
           </div>
        </div>

        {/* Table Section */}
        <div className="detail-table-container">
           <table className="detail-table">
             <thead>
               <tr>
                 <th>HEAT CODE</th>
                 <th>TIME STAMP</th>
                 <th>ASSEST TYPE</th>
                 <th>STATUS</th>
                 <th>VALIDATION</th>
               </tr>
             </thead>
             <tbody>
               {lineScans.map((row, i) => (
                 <tr key={i} className={i % 2 === 0 ? 'even' : 'odd'}>
                   <td className={row.heatCode === 'None' ? 'grey-bg' : ''}>{row.heatCode}</td>
                   <td>{row.timestamp}</td>
                   <td>{row.assetType}</td>
                   <td>{row.status}</td>
                   <td className={row.validation === 'IMAGE' ? 'blue-text' : ''}>{row.validation}</td>
                 </tr>
               ))}
             </tbody>
           </table>
        </div>
      </div>
    </div>
  );
};

export default LineDetail;
