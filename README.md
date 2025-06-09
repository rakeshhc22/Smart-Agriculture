# 🌾 Smart Agriculture System – AI-Powered Decision Support for Farmers

An intelligent, modular platform that integrates **crop prediction**, **soil health monitoring**, and **plant disease detection** into a unified, web-based system. Developed with the goal of empowering small-scale farmers through precision agriculture and accessible AI technology.

---

## 🧠 Objective

To bridge the gap between traditional farming and modern agricultural technology by providing small and marginal farmers with a decision-support platform powered by machine learning and deep learning. The system aims to:
- Predict the most suitable crop for cultivation based on soil and weather parameters.
- Provide soil health evaluation and fertilizer recommendations.
- Detect crop diseases from leaf images and suggest treatments.

---

## 💻 Technologies Used

### 🔹 Frontend
- **React.js** – For building an intuitive and interactive user interface.
- **HTML/CSS/JSX** – For structuring and styling components.

### 🔹 Backend
- **Flask (Python)** – Handles API endpoints, data processing, and model inference.

### 🔹 Machine Learning & Deep Learning
- **Random Forest Classifier** – For predicting the most suitable crop.
- **CNN (Convolutional Neural Network)** – For plant disease detection from leaf images.
- **Rule-Based Logic** – For soil health assessment and fertilizer recommendations.
- **TensorFlow / Keras** – Used for deep learning model deployment.

### 🔹 Database / APIs
- **OpenWeather API** – (Optional) For real-time weather data input.
- **Custom agricultural datasets** – Used for model training and testing.

---

## 🔑 Key Features

### 🌱 Crop Prediction
- Input soil parameters like Nitrogen (N), Phosphorus (P), Potassium (K), pH, temperature, humidity, and rainfall.
- Predicts the optimal crop to grow using a trained **Random Forest** model.

### 🧪 Soil Health & Fertilizer Recommendation
- Evaluates soil nutrient levels.
- Provides rule-based fertilizer suggestions categorized as Deficient, Balanced, or Excessive.

### 🌿 Plant Disease Detection
- Upload leaf images to identify diseases such as **blight**, **rust**, or **leaf spot**.
- Trained **CNN model** provides real-time diagnosis and treatment suggestions.

### 📊 Unified Platform
- All functionalities integrated into a single web interface.
- Results are visualized for better decision-making.
- Mobile-friendly and usable by farmers with minimal digital experience.

---

## 🛠️ System Architecture

### Frontend
- Built with **React** for real-time interactivity.
- Clean layout for data input (soil parameters or image upload).
- Displays results using responsive cards and charts.

### Backend
- Developed in **Flask**.
- Routes data to ML/DL models and returns predictions to the frontend.
- Includes preprocessing modules for tabular and image data.

---

## 🔄 Workflow

User Input (Soil Params / Leaf Image)
⬇
React Frontend Interface
⬇
Flask Backend Server
⬇ ⬇ ⬇
Crop Prediction Soil Analysis Disease Detection
(Random Forest) (Rule Logic) (CNN with TensorFlow)
⬇
Recommendation Output
⬇
Frontend Display to User


---

## 🧪 Model Performance

- **Crop Prediction Accuracy**: 94% using Random Forest.
- **Disease Detection Accuracy**: 96% using CNN.
- **Soil Health Impact**: Up to 20% improvement in fertility (simulated outcomes).
- **Usability**: Positive feedback from 90%+ test users.

---

## 📁 Folder Structure

/smart-agriculture-system
├── client/ # React Frontend
│ └── src/
│ ├── components/
│ ├── pages/
│ └── App.jsx
├── server/ # Flask Backend
│ ├── models/
│ ├── routes/
│ └── app.py
├── models/ # ML/CNN trained models
├── datasets/ # Soil, crop, and plant image datasets
└── README.md # Project Documentation


---

## 🔧 Installation & Setup

### Backend (Flask)
```bash
cd server
pip install -r requirements.txt
python app.py

cd client
npm install
npm start

🙋‍♂️ Author
Rakesh H C
rakeshchandru21@gmail.com
