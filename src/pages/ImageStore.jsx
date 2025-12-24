import React, { useState } from 'react';
import { useDashboard } from '../context/DashboardContext';
import { X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ImageStore = () => {
    const { allScans } = useDashboard();
    const [selectedImage, setSelectedImage] = useState(null);
    const navigate = useNavigate();

    return (
        <div style={{ padding: 20 }}>
            <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom: 20}}>
               <h2 style={{color: '#fff', margin: 0}}>Image Store</h2>
               <button onClick={() => navigate('/ocr-history')} style={{padding: '8px 16px', background: '#333', color: 'white', border: '1px solid #555', borderRadius: 4, cursor:'pointer'}}>
                  « BACK TO REPORTS
               </button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 20 }}>
                {allScans.map(scan => (
                    <div 
                        key={scan.id} 
                        style={{ border: '1px solid #444', padding: 10, borderRadius: 8, cursor: 'pointer', background: '#1e1e1e' }}
                        onClick={() => setSelectedImage(scan)}
                    >
                        <div style={{ height: 150, background: '#333', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#888' }}>
                            IMG PREVIEW
                        </div>
                        <div style={{ marginTop: 10, color: '#fff', fontSize: '0.8rem' }}>
                            <div><strong>{scan.heatCode}</strong></div>
                            <div>{scan.timestamp}</div>
                            <div style={{ color: scan.status === 'Success' ? '#4caf50' : '#f44336' }}>{scan.status}</div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal */}
            {selectedImage && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                    background: 'rgba(0,0,0,0.8)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000
                }} onClick={() => setSelectedImage(null)}>
                    <div style={{ background: '#fff', padding: 20, borderRadius: 8, maxWidth: 600, width: '90%' }} onClick={e => e.stopPropagation()}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
                            <h3>Scan Detail: {selectedImage.heatCode}</h3>
                            <button onClick={() => setSelectedImage(null)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X /></button>
                        </div>
                        <div style={{ height: 300, background: '#eee', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            FULL RESOLUTION IMAGE
                        </div>
                        <div style={{ marginTop: 20 }}>
                            <p><strong>Timestamp:</strong> {selectedImage.timestamp}</p>
                            <p><strong>Asset:</strong> {selectedImage.assetType}</p>
                            <p><strong>Status:</strong> {selectedImage.status}</p>
                            <p><strong>Validation:</strong> {selectedImage.validation}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ImageStore;
