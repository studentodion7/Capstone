from flask import Flask, jsonify, request
import random
import numpy as np  # Kept from your version

app = Flask(__name__)

# 1. Required Health Check (Requirement 9.2)
@app.get("/health")
def health():
    return jsonify({"status": "ok", "service": "ml-service"})

# 2. Required Recommendations Route (Requirement 12.3)
@app.get("/recommendations/<int:user_id>")
def recommendations(user_id: int):
    catalog = ["Mechanical Keyboard", "UltraWide Monitor", "Wireless Headset", "Gaming Mouse", "4K Webcam"]
    random.seed(user_id)
    picks = random.sample(catalog, 3)
    return jsonify({"user_id": user_id, "recommendations": picks})

# 3. Required Metrics Endpoint (Requirement 3.C / 12.3)
@app.get("/metrics")
def metrics():
    # This allows Prometheus to scrape the service without errors
    return "shopmicro_ml_requests_total 1\n", 200, {"Content-Type": "text/plain; version=0.0.4"}

# 4. Your custom predict route (Optional/Custom)
@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    features = np.array(data['features']).reshape(1, -1)
    # Simple logic to keep it running
    prediction = np.sum(features) * 0.5
    return jsonify({"prediction": prediction})

# 5. MUST run on port 5000
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
