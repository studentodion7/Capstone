FROM python:3.12-slim

WORKDIR /app

COPY requirements.txt .

RUN apt-get update && apt-get install -y curl && rm -rf /var/lib/apt/lists/*

# Kept your timeout logic - good for stability!
RUN pip install --no-cache-dir --default-timeout=100 -r requirements.txt

COPY . .

# CHANGE: Port must be 5000 to match the Capstone Backend & K8s Specs
EXPOSE 5000

# CHANGE: Fixed port to 5000 to match the app
HEALTHCHECK CMD curl -f http://localhost:5000/health || exit 1

CMD ["python", "app.py"]
