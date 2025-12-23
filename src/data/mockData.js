// src/data/mockData.js

// Mock Data for Lines
export const LINES = [
  { id: 5, name: 'Line 5', status: 'error' },
  { id: 13, name: 'Line 13', status: 'success' },
  { id: 8, name: 'Line 8', status: 'error' },
  { id: 17, name: 'Line 17', status: 'success' },
  { id: 12, name: 'Line 12', status: 'success' },
  { id: 18, name: 'Line 18', status: 'success' },
];

// Mock Data for Scans (Used in all screens)
const SAMPLE_SCANS = [
  { id: 1, heatCode: "6R5F19A2", timestamp: "05-23-2025 09:20:22 AM", assetType: "Disk", status: "Reject", lineId: 13, ocrId: 1, validation: "N/A" },
  { id: 2, heatCode: "None", timestamp: "05-23-2025 09:20:51 AM", assetType: "Disk", status: "Reject", lineId: 13, ocrId: 1, validation: "IMAGE" },
  { id: 3, heatCode: "None", timestamp: "05-23-2025 09:25:48 AM", assetType: "Disk", status: "Reject", lineId: 5, ocrId: 1, validation: "IMAGE" },
  { id: 4, heatCode: "6R5E20A2", timestamp: "05-23-2025 09:27:17 AM", assetType: "Disk", status: "Success", lineId: 13, ocrId: 2, validation: "N/A" },
  { id: 5, heatCode: "None", timestamp: "05-23-2025 09:27:23 AM", assetType: "Disk", status: "Reject", lineId: 8, ocrId: 1, validation: "IMAGE" },
  { id: 6, heatCode: "6R5E20A2", timestamp: "05-23-2025 09:27:50 AM", assetType: "Disk", status: "Success", lineId: 13, ocrId: 2, validation: "N/A" },
  { id: 7, heatCode: "6R5E20A2", timestamp: "05-23-2025 09:28:05 AM", assetType: "Disk", status: "Success", lineId: 13, ocrId: 1, validation: "N/A" },
  { id: 8, heatCode: "None", timestamp: "05-23-2025 09:28:25 AM", assetType: "Disk", status: "Error", lineId: 13, ocrId: 1, validation: "IMAGE" },
  { id: 9, heatCode: "6R5E20A2", timestamp: "05-23-2025 09:28:41 AM", assetType: "Disk", status: "Success", lineId: 17, ocrId: 1, validation: "N/A" },
  { id: 10, heatCode: "6R5F19A2", timestamp: "05-23-2025 09:30:00 AM", assetType: "Disk", status: "Success", lineId: 13, ocrId: 1, validation: "N/A" },
  { id: 11, heatCode: "None", timestamp: "05-23-2025 09:31:00 AM", assetType: "Disk", status: "Reject", lineId: 13, ocrId: 2, validation: "IMAGE" },
  { id: 12, heatCode: "6R5E20A2", timestamp: "05-23-2025 09:32:00 AM", assetType: "Disk", status: "Success", lineId: 12, ocrId: 1, validation: "N/A" },
  // Add more bulk data for realism
  ...Array.from({ length: 50 }).map((_, i) => ({
    id: 100 + i,
    heatCode: Math.random() > 0.3 ? `6R5E${20 + i}A2` : "None",
    timestamp: "05-23-2025 10:00:00 AM",
    assetType: "Disk",
    status: Math.random() > 0.8 ? "Reject" : (Math.random() > 0.9 ? "Error" : "Success"),
    lineId: [5, 13, 8, 17, 12, 18][Math.floor(Math.random() * 6)],
    ocrId: Math.random() > 0.5 ? 1 : 2,
    validation: Math.random() > 0.8 ? "IMAGE" : "N/A"
  }))
];

export const getScans = () => SAMPLE_SCANS;

// Analytics Data mocking based on context
export const getPerformanceData = (lineId = null) => {
  // Returns generic data, but could be filtered by lineId
  return [
    { time: '07:00', expected: 250, actual: 240, rejection: 5 },
    { time: '09:00', expected: 250, actual: 238, rejection: 12 },
    { time: '11:00', expected: 250, actual: 330, rejection: 3 },
    { time: '13:00', expected: 250, actual: 300, rejection: 25 },
    { time: '15:00', expected: 250, actual: 295, rejection: 0 },
    { time: '17:00', expected: 250, actual: 290, rejection: 0 },
    { time: '19:00', expected: 250, actual: 0, rejection: 0 },
    { time: '21:00', expected: 250, actual: 0, rejection: 0 },
    { time: '05:00', expected: 250, actual: 0, rejection: 0 },
  ];
};
