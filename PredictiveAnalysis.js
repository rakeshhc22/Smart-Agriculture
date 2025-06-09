import React, { useState } from 'react';
import axios from 'axios';
import '../CSS/CropAnalysis.css';
import {
  FaHome,
  FaSeedling,
  FaChartLine,
  FaWater,
  FaCog,
  FaSignOutAlt,
} from 'react-icons/fa';

function CropPrediction() {
  const [formData, setFormData] = useState({
    nitrogen: '',
    phosphorus: '',
    potassium: '',
    temperature: '',
    humidity: '',
    ph: '',
    rainfall: '',
  });

  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setPrediction(null);
    setLoading(true);

    try {
      const response = await axios.post('http://127.0.0.1:5000/predict', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      setTimeout(() => {
        setPrediction(response.data.prediction);
        setLoading(false);
        setShowPopup(true);
      }, 3000);
    } catch (err) {
      console.error('Error details:', err);
      setError('Failed to connect to the server. Please ensure the backend is running.');
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-container">
      <nav className="sidebar">
             <h1>CROP PREDICTION</h1>
            <a href="/dashboard"><FaHome /> Home</a>
            <a href="/settings"><FaCog /> Settings</a>
            <a href="/"><FaSignOutAlt /> Logout</a>
            </nav>

      <div className="predict-crop-container">
        <form onSubmit={handleSubmit} className="input-container">
          <label>Nitrogen :</label>
          <input type="number" name="nitrogen" value={formData.nitrogen} onChange={handleChange} required />
          
          <label>Phosphorus :</label>
          <input type="number" name="phosphorus" value={formData.phosphorus} onChange={handleChange} required />
          
          <label>Potassium :</label>
          <input type="number" name="potassium" value={formData.potassium} onChange={handleChange} required />
          
          <label>Temperature:</label>
          <input type="number" name="temperature" value={formData.temperature} onChange={handleChange} required />
          
          <label>Humidity:</label>
          <input type="number" name="humidity" value={formData.humidity} onChange={handleChange} required />
          
          <label>pH Level:</label>
          <input type="number" step="0.1" name="ph" value={formData.ph} onChange={handleChange} required />
          
          <label>Rainfall (mm):</label>
          <input type="number" name="rainfall" value={formData.rainfall} onChange={handleChange} required />
          
          <button type="submit">Predict</button>
        </form>

        {loading && <div className="loader-container"><div className="loader"></div></div>}

        {showPopup && (
          <>
            <div className="overlay"></div>
            <div className="popup">
              <h2>Prediction Result</h2>
              <p>{prediction}</p>
              <button className="back-button" onClick={() => setShowPopup(false)}>Back</button>
            </div>
          </>
        )}

        {error && (
          <div className="error">
            <h3>Error:</h3>
            <p>{error}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default CropPrediction;
