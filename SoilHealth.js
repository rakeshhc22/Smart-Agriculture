import React, { useState } from 'react';
import '../CSS/soilhealth.css';
import {
  FaHome,
  FaSeedling,
  FaChartLine,
  FaWater,
  FaCog,
  FaSignOutAlt,
} from 'react-icons/fa';

const fertilizerDict = {
  NHigh: `The Nitrogen value of your soil is high.
1. Add sawdust or fine woodchips to your soil – the carbon in them absorbs excess nitrogen.
   This helps reduce nitrogen levels naturally by balancing the carbon-to-nitrogen ratio.
2. Plant heavy nitrogen feeders – tomatoes, corn, broccoli, cabbage.
   These crops utilize large amounts of nitrogen, helping to lower its concentration in soil.
3. Water the soil deeply to leach nitrogen away.
   This process flushes out excess nitrogen below the root zone where it can't harm plants.
4. Avoid high nitrogen fertilizers like urea or ammonium nitrate.
   These will only increase nitrogen levels further, worsening the imbalance.`,

  NLow: `The Nitrogen value is low.
Try these:
1. Add compost or manure.
   These organic materials are rich in nitrogen and release it slowly into the soil.
2. Use nitrogen-rich fertilizers like urea.
   They provide a quick nitrogen boost, improving plant growth and leaf development.
3. Plant legumes – they fix nitrogen from the air.
   Legumes like peas and beans have root nodules that naturally enrich the soil with nitrogen.
4. Practice crop rotation with nitrogen-fixing plants.
   This maintains soil fertility and reduces dependency on chemical fertilizers.`,

  PHigh: `Phosphorous content is high.
Please consider the following:
1. Avoid adding phosphate-based fertilizers.
   Overuse can lead to nutrient imbalance and environmental runoff issues.
2. Balance soil nutrients with organic compost.
   Compost helps moderate phosphorus availability and adds other essential nutrients.
3. Grow crops that use more phosphorus like cereals.
   These help absorb excess phosphorus and make better use of the soil's nutrient content.`,

  PLow: `Phosphorous level is low.
Do the following:
1. Add bone meal or rock phosphate.
   These organic sources release phosphorus slowly and improve root development.
2. Apply composted manure.
   It not only adds phosphorus but also enhances soil texture and microbial life.
3. Consider phosphate-based fertilizers like DAP.
   Diammonium phosphate is effective in correcting phosphorus deficiencies quickly.`,

  KHigh: `Potassium level is high.
You may do the following:
1. Avoid potash-based fertilizers.
   Adding more will worsen the potassium surplus and may hinder uptake of other nutrients.
2. Increase organic matter in the soil.
   Organic matter helps regulate nutrient availability and buffers excessive potassium.
3. Add gypsum if soil gets too compact.
   Gypsum improves soil structure, allowing roots to access nutrients more efficiently.`,

  KLow: `Potassium level is low.
Suggestions:
1. Add muriate of potash (MOP) or sulfate of potash (SOP).
   These fertilizers are rich in potassium and can help restore optimal levels.
2. Use banana peels, composted ash.
   These natural sources add potassium and improve soil organic content.
3. Grow potassium-loving plants like potatoes or carrots.
   These can indicate the effectiveness of potassium amendments over time.`
};

const Dashboard = () => {
  const [formData, setFormData] = useState({
    nitrogen: '',
    phosphorus: '',
    potassium: '',
    cropType: '',
  });

  const [loading, setLoading] = useState(false);
  const [recommendation, setRecommendation] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setRecommendation('');
    setShowPopup(false);

    setTimeout(() => {
      const { nitrogen, phosphorus, potassium, cropType } = formData;
      const N = parseInt(nitrogen);
      const P = parseInt(phosphorus);
      const K = parseInt(potassium);
      let condition = '';

      if (N < 50) condition = 'NLow';
      else if (N > 200) condition = 'NHigh';
      else if (P < 30) condition = 'PLow';
      else if (P > 150) condition = 'PHigh';
      else if (K < 30) condition = 'KLow';
      else if (K > 150) condition = 'KHigh';

      const rec = fertilizerDict[condition] || 'Your soil nutrient levels seem balanced. No action needed.';
      setRecommendation(`For ${cropType}, ${rec}`);
      setLoading(false);
      setShowPopup(true);
    }, 3000);
  };

  return (
    <div className="dashboard-container">
      <nav className="sidebar">
        <h1>SOIL HEALTH</h1>
        <a href="/dashboard"><FaHome /> Home</a>
        <a href="/settings"><FaCog /> Settings</a>
        <a href="/"><FaSignOutAlt /> Logout</a>
      </nav>

      <div className="main-content">
        {!loading && (
          <div className="form-section">
            <h2>Soil Nutrient Form</h2>
            <form onSubmit={handleSubmit} className="nutrient-form">
              <label>
                Nitrogen:
                <input
                  type="number"
                  name="nitrogen"
                  value={formData.nitrogen}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                Phosphorus:
                <input
                  type="number"
                  name="phosphorus"
                  value={formData.phosphorus}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                Potassium:
                <input
                  type="number"
                  name="potassium"
                  value={formData.potassium}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                Crop Type:
                <input
                  type="text"
                  name="cropType"
                  value={formData.cropType}
                  onChange={handleChange}
                  required
                />
              </label>
              <button type="submit" disabled={loading}>
                Submit
              </button>
            </form>
          </div>
        )}

        {loading && <div className="loader-container"><div className="loader"></div></div>}

        {showPopup && (
          <div className="overlay">
            <div className="popup">
              <h3>Fertilizer Recommendation:</h3>
              <div className="recommendation-content">
                {recommendation.split('\n').map((line, index) => {
                  if (line.match(/^\d+\./)) {
                    return <li key={index}>{line.replace(/^\d+\.\s*/, '')}</li>;
                  } else if (line.trim() === '') {
                    return null;
                  } else {
                    return <p key={index}><strong>{line}</strong></p>;
                  }
                })}
              </div>
              <button onClick={() => setShowPopup(false)}>Close</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
