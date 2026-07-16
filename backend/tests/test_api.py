import pytest
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_health():
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json()["status"] in ["healthy", "degraded"]

def test_metadata():
    response = client.get("/api/v1/metadata")
    assert response.status_code == 200
    data = response.json()
    assert "records" in data
    assert "version" in data

def test_portfolio_summary():
    response = client.get("/api/v1/portfolio/summary")
    assert response.status_code == 200
    json_resp = response.json()
    assert json_resp["success"] is True
    assert "data" in json_resp
    assert "metadata" in json_resp

def test_policy_simulate():
    payload = {
      "min_grade": "B",
      "max_dti": 32.0,
      "min_income": 60000.0,
      "max_loan": 25000.0
    }
    response = client.post("/api/v1/policy/simulate", json=payload)
    assert response.status_code == 200
    json_resp = response.json()
    assert json_resp["success"] is True
    assert "approval_rate" in json_resp["data"]
    assert "recommendation" in json_resp["data"]
