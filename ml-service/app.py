from flask import Flask, jsonify, request
import random
import numpy as np  

app = Flask(__name__)


@app.get("/health")
def health():
    return jsonify({"status": "ok", "service": "ml-service"})


@app.get("/recommendations/<int:user_id>")
def recommendations(user_id: int):
    catalog = ["Mechanical Keyboard", "UltraWide Monitor", "Wireless Headset", "Gaming Mouse", "4K Webcam"]
    random.seed(user_id)
    picks = random.sample(catalog, 3)
    return jsonify({"user_id": user_id, "recommendations": picks})


@app.get("/metrics")
def metrics():
    return "shopmicro_ml_requests_total 1\n", 200, {"Content-Type": "text/plain; version=0.0.4"}


@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    features = np.array(data['features']).reshape(1, -1)

    prediction = np.sum(features) * 0.5
    return jsonify({"prediction": prediction})


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
