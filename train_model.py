import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import accuracy_score
import joblib


file_path = 'indiancrop_dataset.csv'
data = pd.read_csv(r'C:\Users\rakes\Desktop\major-project\indiancrop_dataset.csv')

features = ['N_SOIL', 'P_SOIL', 'K_SOIL', 'TEMPERATURE', 'HUMIDITY', 'ph', 'RAINFALL']
target = 'CROP'

X = data[features]
y = data[target]


label_encoder = LabelEncoder()
y_encoded = label_encoder.fit_transform(y)


X_train, X_test, y_train, y_test = train_test_split(X, y_encoded, test_size=0.2, random_state=42)


model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)


y_pred = model.predict(X_test)
accuracy = accuracy_score(y_test, y_pred)
print(f"Model Accuracy: {accuracy * 100:.2f}%")


joblib.dump(model, 'crop_prediction_model.pkl')
joblib.dump(label_encoder, 'label_encoder.pkl')

print("Model and label encoder saved successfully!")
