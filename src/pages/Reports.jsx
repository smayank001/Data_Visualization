import React, { useState } from 'react';
import { useDashboard } from '../context/DashboardContext';
import { Eye, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import '../styles/components/Reports.css';

const Reports = () => {
  const { allScans, filters, updateFilter } = useDashboard(); 
  const navigate = useNavigate();
  const [modalImage, setModalImage] = useState(null);

  // Mock Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Filter logic can happen here or via context derived stats unique to reports?
  // Let's filter locally for the specific report table helper if needed or use global
  const reportRows = allScans.filter(s => {
       // Apply global filters
       if(filters.date && !s.timestamp.includes(filters.date)) return false;
       if(filters.shift && filters.shift !== 'All') {
           // mock shift logic
           return true; 
       }
       return true;
  });

  const formatDateParts = (timestamp) => {
// ... existing helper logic ...
  };

  const offset = (currentPage - 1) * itemsPerPage;
  const currentRows = reportRows.slice(offset, offset + itemsPerPage); // Use filtered rows

  return (
    <div className="reports-page">
       <div className="reports-header-row">
          <div style={{display:'flex', alignItems:'center', gap: 10}}>
             <button onClick={() => navigate('/line-detail/13')} style={{background: 'none', border:'none', color: '#1a237e', cursor:'pointer', fontSize: 24}}>«</button>
             <h2>Reports</h2>
          </div>
          {/* Mock Download Buttons found in constraint */}
          <div style={{display:'flex', gap: 10}}>
             <button onClick={() => alert("Downloading CSV Report...")} style={{padding: '5px 10px', background: '#4CAF50', color:'#fff', border:'none', cursor:'pointer'}}>Download CSV</button>
             <button onClick={() => alert("Downloading PDF Report...")} style={{padding: '5px 10px', background: '#2196F3', color:'#fff', border:'none', cursor:'pointer'}}>Download PDF</button>
          </div>
       </div>

       <div className="reports-controls">
          <select 
             className="shift-select" 
             value={filters.shift || 'Shift 1'} 
             onChange={(e) => updateFilter('shift', e.target.value)}
          >
             <option>Shift 1</option>
             <option>Shift 2</option>
             <option>Shift 3</option>
          </select>

          <div className="report-date-picker">
             <Calendar size={18} />
             <input 
               type="date" 
               value={filters.date || ''} 
               onChange={(e) => updateFilter('date', e.target.value)} 
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
                              <button className="view-image-btn" onClick={() => navigate('/image-store')}>
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
