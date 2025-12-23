import React, { useState } from 'react';
import { useDashboard } from '../context/DashboardContext';
import { Eye, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import '../styles/components/Reports.css';

const Reports = () => {
  const { allScans } = useDashboard(); // Use allScans or filteredScans? Image implies specific report filters.
  const [reportFilters, setReportFilters] = useState({
      shift: 'Shift 1',
      date: '2026-01-01'
  });
  const [modalImage, setModalImage] = useState(null);

  // Mock Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Format date helper
  const formatDateParts = (timestamp) => {
      // Mock parsing "05-23-2025 09:20:22 AM"
      const dateObj = new Date(timestamp); 
      // Fallback for mock strings if Date parse fails (mock data uses MM-DD-YYYY)
      // simplistic split for demo
      const parts = timestamp.split(' ')[0].split('-'); // 05, 23, 2025
      return { 
          year: parts[2] || '2026', 
          month: 'Jan', // Mock logic for demo
          day: parts[1] || '01',
          time: timestamp.split(' ')[1] || '11:09'
      };
  };

  const offset = (currentPage - 1) * itemsPerPage;
  const currentRows = allScans.slice(offset, offset + itemsPerPage);

  return (
    <div className="reports-page">
       <div className="reports-header-row">
          <h2>Reports</h2>
       </div>

       <div className="reports-controls">
          <select className="shift-select" value={reportFilters.shift} onChange={(e) => setReportFilters({...reportFilters, shift: e.target.value})}>
             <option>Shift 1</option>
             <option>Shift 2</option>
             <option>Shift 3</option>
          </select>

          <div className="report-date-picker">
             <Calendar size={18} />
             <input 
               type="date" 
               value={reportFilters.date} 
               onChange={(e) => setReportFilters({...reportFilters, date: e.target.value})} 
             />
          </div>
       </div>

       <div className="reports-table-container">
          <table className="reports-table">
             <thead>
                <tr>
                   <th>YEAR ⬍</th>
                   <th>MONTH ⬍</th>
                   <th>DAY ⬍</th>
                   <th>TIME</th>
                   <th>READ VALUE</th>
                   <th>ASSET TYPE</th>
                   <th>STATUS</th>
                   <th>REASON FOR NG/ERROR</th>
                   <th>IMAGE</th>
                </tr>
             </thead>
             <tbody>
                {currentRows.map((row, i) => {
                    const { year, month, day, time } = formatDateParts(row.timestamp);
                    return (
                        <tr key={i} className={row.status === 'Reject' ? 'row-reject' : (row.status === 'Error' ? 'row-error' : '')}>
                           <td>{year}</td>
                           <td>{month}</td>
                           <td>{day}</td>
                           <td>{time}</td>
                           <td>{row.heatCode}</td>
                           <td>{row.assetType}</td>
                           <td>
                              <span className={`status-text ${row.status.toLowerCase()}`}>{row.status.toUpperCase()}</span>
                           </td>
                           <td>-</td>
                           <td>
                              <button className="view-image-btn" onClick={() => setModalImage(row.id)}>
                                 <Eye size={16} /> View Image
                              </button>
                           </td>
                        </tr>
                    );
                })}
             </tbody>
          </table>
       </div>

       <div className="reports-footer">
          <button className="page-btn" disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)}><ChevronLeft size={16}/></button>
          <span>1-3 of 45</span> {/* Mock count */}
          <button className="page-btn" onClick={() => setCurrentPage(p => p + 1)}><ChevronRight size={16}/></button>
       </div>

       {/* Image Modal */}
       {modalImage && (
         <div className="image-modal-overlay" onClick={() => setModalImage(null)}>
            <div className="image-modal-content" onClick={e => e.stopPropagation()}>
               <h3>Scan Image Preview</h3>
               <div className="placeholder-image">
                  No Image Data (Mock)
               </div>
               <button onClick={() => setModalImage(null)}>Close</button>
            </div>
         </div>
       )}
    </div>
  );
};

export default Reports;
