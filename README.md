# 🛒 ShopMicro Production Platform

[![CI/CD](https://img.shields.io/badge/CI--CD-passing-brightgreen)](https://github.com/your-repo/actions)  
[![Docker](https://img.shields.io/badge/Docker-ready-blue)](https://hub.docker.com/repository/docker/yourrepo/shopmicro)  
[![Terraform](https://img.shields.io/badge/Terraform-ready-blueviolet)](https://www.terraform.io/)  
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

---
## 
[![Component Diagram](assets/component-diagram.png)]

---

## 📑 Table of Contents

1. 🧠 About  
2. 📁 Project Tree  
3. ⚙️ Prerequisites  
4. ☁️ Deployment Setup  
5. 🚀 How to Run Locally  
6. ☁️ How to Deploy to AWS  
7. 🧪 Verification & Testing  
8. 🔐 Security Controls  
9. 🛠 Backup & Restore  
10. 📌 Rollback Procedure  
11. 🚧 Known Limitations  
12. 🖼 Architecture Diagram  
13. 📄 License  

---

## 🧠 About

ShopMicro is a **production-grade microservices e-commerce platform** built for **scalability, security, observability, and automation**.  

Features:

- **React frontend**  
- **Node.js backend API**  
- **Python ML recommendation service**  
- **PostgreSQL + Redis**  

Key DevOps & Infrastructure:

- Docker & Kubernetes  
- Terraform Infrastructure as Code  
- CI/CD pipelines  
- Observability (Prometheus, Grafana, Loki, Tempo)  
- Policy-as-code validation  
- Backup & recovery  

Deployed on **AWS (EKS)**.

---

## 📁 Project Tree
Capstone/
├── .github/
│   └── workflows/
│       ├── ci-cd-deploy.yml
│       ├── ci-cd-drift-detection.yml
│       └── ci-cd-terraform.yml
│
├── backend/
│   ├── Dockerfile
│   ├── package.json
│   ├── package-lock.json
│   └── server.js
│
├── frontend/
│   ├── Dockerfile
│   ├── package.json
│   ├── package-lock.json
│   ├── nginx/
│   ├── public/
│   └── src/
│       ├── assets/
│       │   └── react.svg
│       ├── App.jsx
│       ├── App.css
│       ├── index.css
│       └── main.jsx
│
├── ml-service/
│   ├── Dockerfile
│   ├── app.py
│   └── requirements.txt
│
├── k8s/
│   ├── app-config.yaml
│   ├── backend-deployment.yaml
│   ├── backend-hpa.yaml
│   ├── backend-service.yaml
│   ├── backend-servicemonitor.yaml
│   ├── frontend-deployment.yaml
│   ├── frontend-service.yaml
│   ├── ml-deployment.yaml
│   ├── ml-service.yaml
│   ├── postgres-deployment.yaml
│   ├── postgres-service.yaml
│   ├── postgres-pvc.yaml
│   ├── redis-deployment.yaml
│   ├── redis-service.yaml
│   ├── db-backup-configmap.yaml
│   ├── db-backup-cronjob.yaml
│   ├── db-backup-pvc.yaml
│   ├── networkpolicy.yaml
│   ├── ingress.yaml
│   ├── prometheusalert.yaml
│   ├── iam_policy.json
│   ├── trust-policy.json
│   └── EBS-CustomPolicy.json
│
├── progres/
│   └── init.sql
│
├── runbooks/
│   └── backend-outage.md
│
├── assets/
│
└── docker-compose.yml



---

## ⚙️ Prerequisites

- Terraform >= 1.6  
- AWS CLI configured  
- kubectl  
- Helm  
- Docker  
- GitHub repository with secrets configured  

---

## ☁️ Deployment Setup

Terraform provisions:

- **VPC** (Public + Private Subnets)  
- **AWS EKS Cluster**  
- **ALB Ingress Controller**  
- **IAM Roles & Service Accounts (IRSA)**  

---

## Component Diagram

---

## 🚀 How to Run Locally

1. Clone the repository:

```bash
git clone https://github.com/your-repo/shopmicro.git
cd shopmicro

2. Build Docker images:

```
docker build -t shopmicro/frontend ./frontend
docker build -t shopmicro/backend ./backend
docker build -t shopmicro/ml-service ./ml-service

3. Deploy locally with minikube or kind.

How to Deploy to AWS
Step 1: Deploy Infrastructure

```
cd infrastructure/terraform/environments/dev
terraform init
terraform apply

Step 2: Connect to EKS

```
aws eks update-kubeconfig --region us-east-1 --name shopmicro-dev

Step 3: Deploy Kubernetes Resources

```
kubectl apply -f k8s/

Verification & Testing

```
kubectl get pods -n shopmicro
kubectl get ingress -n shopmicro
kubectl get hpa -n shopmicro
kubectl get pvc -n shopmicro

```
Observability

Access Grafana:

```
kubectl port-forward svc/monitoring-grafana 3000:80 -n monitoring

```
Dashboards:

Platform Overview

Backend Health

Logs & Traces Correlation

SLIs & SLOs:

Request success rate

P95 latency < 300ms

99% success rate over 7 days

```

Security Controls

Private worker nodes

No public SSH

IRSA enabled

Kubernetes Secrets for sensitive data

NetworkPolicies enforced

Encrypted EBS volumes

Least-privilege IAM roles

Policy-as-code validation

```
Backup & Restore

Automated daily PostgreSQL backups via CronJob.

Manual restore: 

```

kubectl exec -it <postgres-pod> -n shopmicro -- bash
psql -U postgres shopmicro < backup.sql

```
Rollback Procedure

kubectl rollout history deployment/backend -n shopmicro
kubectl rollout undo deployment/backend -n shopmicro
kubectl rollout status deployment/backend -n shopmicro

```


