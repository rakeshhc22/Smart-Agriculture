import React, { useState } from "react";
import {
  FaHome,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";
import "../CSS/irrigation.css";

function App() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleUpload = async () => {
    if (!image) return;

    setLoading(true);
    setResult(null);

    const formData = new FormData();
    formData.append("image", image);

    try {
      const res = await fetch("http://127.0.0.1:5000/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error("Upload error:", err);
      setResult({ error: "Failed to get prediction" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-container">
      <nav className="sidebar">
        <h1>Disease Detection </h1>
        <a href="/dashboard"><FaHome /> Home</a>
        <a href="/settings"><FaCog /> Settings</a>
        <a href="/"><FaSignOutAlt /> Logout</a>
      </nav>

      <div className="main">
        <div className="transparent-box">
          <h2>Leaf Disease Detection 🌿</h2>
          <input type="file" accept="image/*" onChange={handleImageChange} />
          <br />
          {preview && <img src={preview} alt="Preview" />}
          <br />
          <button onClick={handleUpload}>Predict Disease</button>
        </div>
      </div>

    
      {loading && (
        <div className="overlay">
          <div className="spinner"></div>
        </div>
      )}

   
      {result && result.predicted_class && !loading && (
        <div className="modal">
          <div className="modal-content">
            <h3>Prediction Result</h3>
            <p><strong>Disease:</strong> {result.predicted_class}</p>
            <p><strong>Confidence:</strong> {result.confidence}</p>
            <button onClick={() => setResult(null)}>Close</button>
          </div>
        </div>
      )}

  
      {result && result.error && !loading && (
        <div className="modal">
          <div className="modal-content">
            <h3>Error</h3>
            <p style={{ color: "red" }}>{result.error}</p>
            <button onClick={() => setResult(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
