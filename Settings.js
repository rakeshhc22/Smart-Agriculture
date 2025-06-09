import React, { useState } from "react";
import "../CSS/Settings.css";
import {
  FaHome,
  FaCog,
  FaSignOutAlt
} from "react-icons/fa";

const Settings = () => {
  const [irrigationSchedule, setIrrigationSchedule] = useState("morning");
  const [soilMoistureThreshold, setSoilMoistureThreshold] = useState(30);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [preferredCrop, setPreferredCrop] = useState("Wheat");

  const handleSave = () => {
    alert("Settings saved successfully!");
  };

  return (
    <div className="dashboard-container">
      <nav className="sidebar">
        <h1>SETTING</h1>
        <a href="/dashboard"><FaHome /> Home</a>
        <a href="/settings"><FaCog /> Settings</a>
        <a href="/"><FaSignOutAlt /> Logout</a>
      </nav>

      <div className="settings-content">
        <div className="settings-row">
          
          <div className="settings-section">
            <h2>User Profile & Security</h2>
            <label>
              Full Name:
              <input type="text" placeholder="John Doe" />
            </label>
            <label>
              Email:
              <input type="email" placeholder="john@example.com" />
            </label>
            <label>
              Password:
              <input type="password" placeholder="Change password" />
            </label>
            <label>
              Two-Factor Authentication:
              <input type="checkbox" />
            </label>
          </div>

          
          <div className="settings-section">
            <h2>Preferences & Notifications</h2>
            <label>
              Region:
              <select>
                <option>Bengaluru</option>
                <option>Pune</option>
                <option>Hyderabad</option>
              </select>
            </label>
            <label>
              Preferred Crop:
              <select value={preferredCrop} onChange={(e) => setPreferredCrop(e.target.value)}>
                <option>Wheat</option>
                <option>Rice</option>
                <option>Maize</option>
              </select>
            </label>
            <label>
              Enable Notifications:
              <input
                type="checkbox"
                checked={notificationsEnabled}
                onChange={() => setNotificationsEnabled(!notificationsEnabled)}
              />
            </label>
            <label>
              Dark Mode:
              <input
                type="checkbox"
                checked={darkMode}
                onChange={() => setDarkMode(!darkMode)}
              />
            </label>
          </div>
        </div>

        
        <button className="save-button" onClick={handleSave}>Save Settings</button>
      </div>
    </div>
  );
};

export default Settings;
