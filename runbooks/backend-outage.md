# Backend Outage Runbook

## Scenario
Backend pod enters CrashLoopBackOff state.

---

## Detection

- Alert triggered: HighErrorRate
- Grafana dashboard shows spike in 5xx errors
- Users report failed API requests

---

## Diagnosis

Check pod status:

kubectl get pods -n shopmicro

Check logs:

kubectl logs deployment/backend -n shopmicro

Describe pod for events:

kubectl describe pod <pod-name> -n shopmicro

---

## Mitigation

Rollback deployment:

kubectl rollout undo deployment/backend -n shopmicro

---

## Verification

Check rollout status:

kubectl rollout status deployment/backend -n shopmicro

Confirm pods are running:

kubectl get pods -n shopmicro

Test endpoint:

curl http://<ingress-host>/health

---

## Postmortem

### Root Cause
(e.g., broken Docker image, missing env variable)

### Impact
(Users experienced 5xx errors for 12 minutes)

### Preventive Measures
- Add pre-deployment smoke test
- Improve readiness/liveness probes
- Add canary deployment
