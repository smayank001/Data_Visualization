import React from 'react';
import { Search, Calendar, Clock } from 'lucide-react';
import '../../styles/components/Dashboard.css';

const FilterBar = ({ filters = {}, onUpdate }) => {
  // Helpers to handle change
  const handleChange = (key, val) => {
     if (onUpdate) onUpdate(key, val);
  };

  return (
    <div className="filter-bar">
      <div className="search-group">
        <div className="search-input-wrapper">
          <input 
            type="text" 
            placeholder="Search" 
            className="search-input" 
            value={filters.search || ''}
            onChange={(e) => handleChange('search', e.target.value)} 
          />
          <Search className="search-icon" size={18} />
        </div>
      </div>

      <div className="filters-group">
        <select className="dropdown" value={filters.casting || ''} onChange={(e) => handleChange('casting', e.target.value)}>
           <option value="">Select Casting</option>
           <option value="Finishing13">Finishing13</option>
        </select>
        
        <select className="dropdown" value={filters.workstation || ''} onChange={(e) => handleChange('workstation', e.target.value)}>
           <option value="">Select Workstation</option>
           <option value="FL13OCR2">FL13OCR2</option>
        </select>
        
        <div className="date-picker">
          <input type="date" value={filters.date || ''} onChange={(e) => handleChange('date', e.target.value)} style={{border:'none', background:'transparent', color:'inherit'}} />
        </div>
        
        <div className="time-picker">
          <input type="time" value={filters.startTime || ''} onChange={(e) => handleChange('startTime', e.target.value)} style={{width: 80, border:'none', background:'transparent', color:'inherit'}} />
          <span className="to-label">TO</span>
          <input type="time" value={filters.endTime || ''} onChange={(e) => handleChange('endTime', e.target.value)} style={{width: 80, border:'none', background:'transparent', color:'inherit'}} />
        </div>

        <button className="apply-btn" onClick={() => console.log('Filters Applied')}>Apply</button>
      </div>
    </div>
  );
};

export default FilterBar;
