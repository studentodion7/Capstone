# Backend Outage Runbook

## Scenario
Backend pod enters CrashLoopBackOff state.

---

## Detection

- Alert triggered: HighErrorRate
- Grafana dashboard shows spike errors
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

### Preventive Measures
- Add pre-deployment smoke test
- Improve readiness/liveness probes
- Add canary deployment
