import os
import logging
import numpy as np
from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.image import load_img, img_to_array

app = Flask(__name__)
CORS(app)


logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


try:
    crop_model = joblib.load('crop_prediction_model.pkl')
    label_encoder = joblib.load('label_encoder.pkl')
    logger.info("Crop model and label encoder loaded successfully.")
except Exception as e:
    crop_model = None
    label_encoder = None
    logger.error(f"Failed to load crop model or encoder: {e}")


try:
    cnn_model_path = os.path.join("model", "leaf_disease_model.h5")
    cnn_model = load_model(cnn_model_path)
    class_names = sorted(os.listdir("./dataset/train"))  
    logger.info("CNN model loaded successfully.")
except Exception as e:
    cnn_model = None
    class_names = []
    logger.error(f"Failed to load CNN model: {e}")


@app.route('/')
def home():
    return jsonify({
        "message": "Welcome to Smart Farmer API",
        "endpoints": {
            "Crop Prediction": "/predict (POST)",
            "Leaf Disease Detection": "/upload (POST)"
        }
    })


@app.route('/predict', methods=['POST'])
def predict_crop():
    if not crop_model or not label_encoder:
        return jsonify({"error": "Model or encoder not loaded."}), 500

    try:
        data = request.json
        required_fields = ['nitrogen', 'phosphorus', 'potassium', 'temperature', 'humidity', 'ph', 'rainfall']
        missing = [field for field in required_fields if field not in data]
        if missing:
            return jsonify({"error": f"Missing fields: {', '.join(missing)}"}), 400

        input_data = [float(data[field]) for field in required_fields]
        prediction = crop_model.predict([input_data])
        crop = label_encoder.inverse_transform(prediction)[0]

        return jsonify({"prediction": crop})
    except Exception as e:
        logger.error(f"Crop prediction error: {e}")
        return jsonify({"error": "Internal server error"}), 500

# Leaf Disease Detection Route
@app.route('/upload', methods=['POST'])
def predict_disease():
    if not cnn_model:
        return jsonify({"error": "CNN model not loaded."}), 500

    if 'image' not in request.files:
        return jsonify({"error": "No image uploaded"}), 400

    try:
        image = request.files['image']
        image_path = os.path.join("temp", image.filename)
        os.makedirs("temp", exist_ok=True)
        image.save(image_path)

        img = load_img(image_path, target_size=(224, 224))
        img = img_to_array(img) / 255.0
        img = np.expand_dims(img, axis=0)

        predictions = cnn_model.predict(img)
        predicted_class = class_names[np.argmax(predictions[0])]
        confidence = float(np.max(predictions[0]))

        os.remove(image_path)

        return jsonify({
            "predicted_class": predicted_class,
            "confidence": f"{confidence:.2f}"
        })
    except Exception as e:
        logger.error(f"Image classification error: {e}")
        return jsonify({"error": "Internal server error"}), 500

# Health Check
@app.route('/health', methods=['GET'])
def health():
    return jsonify({
        "crop_model": "loaded" if crop_model else "unavailable",
        "cnn_model": "loaded" if cnn_model else "unavailable"
    })

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
