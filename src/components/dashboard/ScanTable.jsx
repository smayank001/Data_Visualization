import { Link } from 'react-router-dom';

const ScanTable = ({ rows = [], nextLink }) => {
  return (
    <div className="scan-table-container">
      {/* ... existing table code ... */}
      <table className="scan-table">
        <thead>
          <tr>
            <th>Heat Code</th>
            <th>Time Stamp</th>
            <th>Asset Type</th>
            <th>Status</th>
            <th></th> 
          </tr>
        </thead>
        <tbody>
           {rows.length === 0 ? (
             <tr><td colSpan="5" style={{height: '300px'}}></td></tr>
           ) : (
             rows.map((row, index) => (
               <tr key={index}>
                 <td>{row.heatCode}</td>
                 <td>{row.timestamp}</td>
                 <td>{row.assetType}</td>
                 <td>
                    <span className={`status-indicator ${row.status === 'Success' ? 'green' : row.status === 'Reject' ? 'red' : 'yellow'}`}>●</span> Scan {row.status}
                 </td>
                 <td>
                    <button className="validate-btn">Validate</button>
                 </td>
               </tr>
             ))
           )}
        </tbody>
      </table>
      <div className="table-footer">
        {nextLink ? (
           <Link to={nextLink} style={{textDecoration: 'none', color: 'inherit'}}>
              <span className="next-page">NEXT_PAGE »</span>
           </Link>
        ) : (
           <span className="next-page">NEXT_PAGE »</span>
        )}
      </div>
    </div>
  );
};

export default ScanTable;
