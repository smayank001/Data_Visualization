import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area,
  BarChart, Bar, PieChart, Pie, Cell
} from 'recharts';
import '../styles/components/Analytics.css';

// --- Mock Data ---

const performanceData = [
  { time: '07:00', expected: 250, actual: 240, rejection: 5 },
  { time: '09:00', expected: 250, actual: 238, rejection: 12 },
  { time: '11:00', expected: 250, actual: 330, rejection: 3 },
  { time: '13:00', expected: 250, actual: 300, rejection: 25 },
  { time: '15:00', expected: 250, actual: 295, rejection: 0 },
  { time: '17:00', expected: 250, actual: 290, rejection: 0 }, // Drop off after this?
  { time: '19:00', expected: 250, actual: 0, rejection: 0 },
  { time: '21:00', expected: 250, actual: 0, rejection: 0 },
  { time: '05:00', expected: 250, actual: 0, rejection: 0 },
];

const qualityData = [
  { time: '07:00', rejection: 2 },
  { time: '09:00', rejection: 7 },
  { time: '11:00', rejection: 1 },
  { time: '13:00', rejection: 10 },
  { time: '15:00', rejection: 0 },
  { time: '17:00', rejection: 3 },
  { time: '19:00', rejection: 0 },
  { time: '06:00', rejection: 8 },
];

const overviewData = [
  { name: 'GOOD', value: 60, color: '#00843D' },
  { name: 'NG', value: 30, color: '#D32F2F' },
  { name: 'ERROR', value: 10, color: '#FBC02D' },
];

const shiftData = [
  { name: 'Shift 1', expected: 600, actual: 550 },
  { name: 'Shift 2', expected: 350, actual: 300 },
  { name: 'Shift 3', expected: 500, actual: 450 },
];

import { useDashboard } from '../context/DashboardContext';

// ... other imports ...

import { useNavigate } from 'react-router-dom';

const Analytics = () => {
  const { stats, updateFilter } = useDashboard();
  const navigate = useNavigate();

  const handleChartClick = (data) => {
    if (data && data.activePayload) {
       const time = data.activeLabel;
       // Mock logic: Update global time filter and navigate
       updateFilter('startTime', time);
       navigate('/line-detail/13'); // Default to Line 13 for demo drill down
    }
  };
  
  return (
    <div className="analytics-page">
      {/* ... header ... */}
      
      <div className="analytics-grid">
        {/* Left Column */}
        <div className="analytics-left">
          
          {/* Performance Chart */}
          <div className="chart-card large">
            <h3>Performance</h3>
            <div className="chart-wrapper">
               <ResponsiveContainer width="100%" height={250}>
                 <AreaChart data={performanceData} onClick={handleChartClick} style={{cursor: 'pointer'}}>
                   <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#333" />
                   <XAxis dataKey="time" stroke="#666" fontSize={12} />
                   <YAxis stroke="#666" fontSize={12} />
                   <Tooltip contentStyle={{background: '#333', border: 'none'}} />
                   <Legend verticalAlign="top" height={36}/>
                   <Line type="monotone" dataKey="expected" stroke="#1976d2" strokeDasharray="5 5" name="Expected Production" dot={false} />
                   <Area type="monotone" dataKey="actual" stroke="#00e676" fill="#00e676" fillOpacity={0.2} name="Actual Production" />
                   <Line type="monotone" dataKey="rejection" stroke="#d32f2f" name="Rejection" dot={false} />
                 </AreaChart>
               </ResponsiveContainer>
            </div>
            {/* KPI Overlay Box in Chart like in image */}
            <div className="chart-kpi-row">
               <div className="chart-kpi-box blue">
                 <span>EXPECTED PRODUCTION</span>
                 <strong>368</strong>
               </div>
               <div className="chart-kpi-box green">
                 <span>ACTUAL PRODUCTION</span>
                 <strong>327</strong>
               </div>
               <div className="chart-kpi-box grey">
                 <span>AVG CYCLE TIME</span>
                 <strong>63.70 sec</strong>
               </div>
               <div className="chart-kpi-box red">
                 <span>REJECTION</span>
                 <strong>21</strong>
               </div>
            </div>
          </div>

          {/* Quality Chart */}
          <div className="chart-card">
            <h3>Quality</h3>
            <div className="chart-wrapper">
              <ResponsiveContainer width="100%" height={150}>
                <BarChart data={qualityData}>
                   <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#333" />
                   <XAxis dataKey="time" stroke="#666" fontSize={10} />
                   <YAxis stroke="#666" fontSize={10} />
                   <Bar dataKey="rejection" fill="#ef5350" name="Rejection" barSize={20} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Availability Timeline */}
          <div className="chart-card">
            <h3>Availability</h3>
            {/* Custom Timeline Visual */}
            <div className="timeline-legend">
               <span className="legend-item"><span className="dot green"></span> Run Time :05:47:11</span>
               <span className="legend-item"><span className="dot red"></span> Unplanned Down Time :01:21:44</span>
            </div>
            <div className="timeline-bar-container">
               <div className="timeline-segment red" style={{width: '5%'}}></div>
               <div className="timeline-segment green" style={{width: '25%'}}></div>
               <div className="timeline-segment grey" style={{width: '70%'}}></div>
            </div>
            <div className="timeline-axis">
               <span>08:00</span><span>12:00</span><span>16:00</span><span>20:00</span><span>00:00</span><span>04:00</span>
            </div>
            {/* KPI Footer for Availability */}
            <div className="availability-kpis">
               <div className="kpi-avail green">
                 <span>RUN TIME</span>
                 <strong>05:47:11</strong>
               </div>
               <div className="kpi-avail red">
                 <span>UNPLANNED DOWN TIME</span>
                 <strong>01:21:44</strong>
               </div>
               <div className="kpi-avail yellow">
                 <span>PLANNED DOWN TIME</span>
                 <strong>00:00:00</strong>
               </div>
            </div>
          </div>

        </div>

        {/* Right Column */}
        <div className="analytics-right">
          
          {/* Overview Donut */}
          <div className="chart-card">
            <div className="card-header-select">
               <h3>Overview</h3>
               <select className="select-box"><option>Last 30 days</option></select>
            </div>
            <div className="chart-wrapper donut-wrapper">
               <ResponsiveContainer width="100%" height={220}>
                 <PieChart>
                   <Pie
                     data={overviewData}
                     cx="50%"
                     cy="50%"
                     innerRadius={60}
                     outerRadius={90}
                     dataKey="value"
                     paddingAngle={0}
                   >
                     {overviewData.map((entry, index) => (
                       <Cell key={`cell-${index}`} fill={entry.color} />
                     ))}
                   </Pie>
                   <Legend verticalAlign="bottom" height={36} iconType="circle"/>
                 </PieChart>
               </ResponsiveContainer>
               {/* Center Text Trick */}
               <div className="donut-center-text">
                  <span>60%</span>
               </div>
            </div>
          </div>

          {/* Shift Wise Production */}
          <div className="chart-card">
             <div className="card-header-select">
               <h3>Shift WiseProduction</h3>
               <select className="select-box"><option>Last 30 days</option></select>
            </div>
             <div className="chart-wrapper">
               <ResponsiveContainer width="100%" height={200}>
                 <BarChart data={shiftData}>
                   <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#333" />
                   <XAxis dataKey="name" stroke="#666" fontSize={12} />
                   <YAxis stroke="#666" fontSize={12} />
                   <Legend />
                   <Bar dataKey="expected" fill="#1976d2" name="Expected" />
                   <Bar dataKey="actual" fill="#00e676" name="Actual" />
                 </BarChart>
               </ResponsiveContainer>
            </div>
          </div>

          {/* OEE Gauge / Stats */}
          <div className="chart-card oee-card">
             <h3>OEE:</h3>
             <div className="oee-circle-container">
                <div className="oee-circle">
                   <span>83.23%</span>
                </div>
             </div>
             <div className="oee-stats-row">
                <div className="oee-stat">
                   <span>A</span>
                   <strong>80.94%</strong>
                </div>
                <div className="oee-stat green-bg">
                   <span>P</span>
                   <strong>109.88%</strong>
                </div>
                <div className="oee-stat">
                   <span>Q</span>
                   <strong>93.58%</strong>
                </div>
             </div>
             <div className="oee-footer">
                <button>GO TO CONTROL CHARTS</button>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Analytics;
