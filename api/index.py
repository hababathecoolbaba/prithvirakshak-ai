from datetime import datetime, timezone
from typing import Literal
from uuid import uuid4

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field


app = FastAPI(
    title="PRITHVIRAKSHAK AI API",
    description="Prototype backend for hyper-local severe-weather and disaster intelligence.",
    version="0.1.0",
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def utc_now():
    return datetime.now(timezone.utc).isoformat()


alerts = [
    {
        "id": "ALT-001",
        "level": "ORANGE",
        "hazard": "Severe Thunderstorm",
        "location": "Jaipur Prototype Zone",
        "arrival": "30-60 min",
        "confidence": "High",
        "status": "Pending Authority Review",
        "source": "Prototype Simulation",
        "updated_at": utc_now(),
    },
    {
        "id": "ALT-002",
        "level": "YELLOW",
        "hazard": "Heavy Rainfall",
        "location": "Demo Ward 8",
        "arrival": "60-90 min",
        "confidence": "Medium",
        "status": "Monitoring",
        "source": "Prototype Simulation",
        "updated_at": utc_now(),
    },
]


incidents = [
    {
        "id": "INC-001",
        "priority": "P0",
        "category": "Flooding",
        "location": "Hospital Access Road - Demo",
        "description": "Possible emergency access obstruction.",
        "status": "Authority Review",
        "verified": False,
        "created_at": utc_now(),
    },
    {
        "id": "INC-002",
        "priority": "P1",
        "category": "Road Blockage",
        "location": "Major Underpass - Demo",
        "description": "Water accumulation affecting traffic movement.",
        "status": "Received",
        "verified": False,
        "created_at": utc_now(),
    },
]


resources = [
    {
        "id": "RES-001",
        "name": "Ambulances",
        "total": 12,
        "available": 8,
        "status": "Available",
    },
    {
        "id": "RES-002",
        "name": "Rescue Teams",
        "total": 8,
        "available": 5,
        "status": "Available",
    },
    {
        "id": "RES-003",
        "name": "Water Pumps",
        "total": 16,
        "available": 11,
        "status": "Available",
    },
    {
        "id": "RES-004",
        "name": "Road Clearance Teams",
        "total": 6,
        "available": 3,
        "status": "Partially Deployed",
    },
    {
        "id": "RES-005",
        "name": "Electrical Crews",
        "total": 7,
        "available": 5,
        "status": "Available",
    },
]


class IncidentCreate(BaseModel):
    category: str = Field(min_length=2, max_length=100)
    location: str = Field(min_length=2, max_length=250)
    description: str = Field(min_length=5, max_length=2000)
    contact: str | None = Field(default=None, max_length=150)


class AssistantRequest(BaseModel):
    message: str = Field(min_length=1, max_length=1000)
    location: str | None = Field(default="Jaipur", max_length=150)


class IncidentAssignRequest(BaseModel):
    team: str = Field(default="Response Team Alpha", max_length=150)


class AlertModifyRequest(BaseModel):
    note: str = Field(default="Authority modification requested.", max_length=500)


@app.get("/")
def root():
    return {
        "platform": "PRITHVIRAKSHAK AI",
        "service": "FastAPI Backend",
        "status": "online",
        "prototype": True,
    }


@app.get("/api/health")
def health():
    return {
        "status": "healthy",
        "service": "PRITHVIRAKSHAK API",
        "prototype": True,
        "timestamp": utc_now(),
    }


@app.get("/api/risk/{location}")
def get_location_risk(location: str):
    cleaned_location = location.strip()

    if not cleaned_location:
        raise HTTPException(
            status_code=400,
            detail="Location is required.",
        )

    return {
        "location": cleaned_location,
        "risk_level": "ORANGE",
        "action_level": "BE PREPARED",
        "hazard": "Severe Thunderstorm",
        "arrival": "30-60 min",
        "duration": "45-90 min",
        "confidence": "High",
        "prototype": True,
        "source": "Prototype Simulation",
        "what": "Severe thunderstorm conditions may affect the selected area.",
        "where": cleaned_location,
        "when": "Demo window: 30-60 minutes",
        "action": [
            "Follow official local warnings.",
            "Move indoors if severe weather approaches.",
            "Avoid low-lying or waterlogged roads.",
            "Keep emergency communication available.",
        ],
        "why": [
            "Simulated storm cell is moving toward the locality.",
            "Prototype rainfall intensity is increasing.",
            "Local impact analysis indicates possible transport disruption.",
        ],
        "possible_impacts": [
            "Urban waterlogging",
            "Road disruption",
            "Reduced mobility",
            "Emergency access delays",
        ],
        "updated_at": utc_now(),
    }


@app.get("/api/alerts")
def get_alerts():
    return {
        "count": len(alerts),
        "alerts": alerts,
        "prototype": True,
    }


@app.get("/api/nowcast")
def get_nowcast():
    return {
        "location": "Jaipur Prototype Zone",
        "prototype": True,
        "direction": "East to North-East",
        "confidence": "High",
        "frames": [
            {
                "time": "NOW",
                "severity": "ORANGE",
                "message": "Severe thunderstorm detected in prototype zone.",
            },
            {
                "time": "+15 MIN",
                "severity": "ORANGE",
                "message": "Storm cell continues toward eastern locality.",
            },
            {
                "time": "+30 MIN",
                "severity": "ORANGE",
                "message": "Possible heavy rainfall impact increases.",
            },
            {
                "time": "+60 MIN",
                "severity": "YELLOW",
                "message": "Prototype system projects gradual weakening.",
            },
            {
                "time": "+120 MIN",
                "severity": "GREEN",
                "message": "Prototype risk expected to reduce.",
            },
        ],
        "updated_at": utc_now(),
    }


@app.get("/api/shelters")
def get_shelters():
    return {
        "prototype": True,
        "shelters": [
            {
                "id": "SH-001",
                "name": "Community Relief Centre A",
                "distance_km": 1.8,
                "status": "Demo Operational",
                "capacity_status": "Available",
                "location": "Jaipur Prototype Zone",
            },
            {
                "id": "SH-002",
                "name": "Government School Relief Point",
                "distance_km": 3.2,
                "status": "Demo Operational",
                "capacity_status": "Limited",
                "location": "Jaipur Prototype Zone",
            },
            {
                "id": "SH-003",
                "name": "District Community Hall",
                "distance_km": 4.6,
                "status": "Demo Verification Required",
                "capacity_status": "Unknown",
                "location": "Jaipur Prototype Zone",
            },
        ],
    }


@app.get("/api/resources")
def get_resources():
    return {
        "prototype": True,
        "resources": resources,
    }


@app.get("/api/incidents")
def get_incidents():
    return {
        "count": len(incidents),
        "incidents": incidents,
        "prototype": True,
    }


@app.post("/api/incidents", status_code=201)
def create_incident(report: IncidentCreate):
    new_incident = {
        "id": f"INC-{uuid4().hex[:6].upper()}",
        "priority": "P2",
        "category": report.category,
        "location": report.location,
        "description": report.description,
        "contact": report.contact,
        "status": "Received",
        "verified": False,
        "created_at": utc_now(),
    }

    incidents.insert(0, new_incident)

    return {
        "message": "Incident report received.",
        "incident": new_incident,
        "prototype": True,
    }


@app.post("/api/assistant")
def assistant(request: AssistantRequest):
    text = request.message.lower().strip()
    location = request.location or "selected area"

    if "risk" in text:
        response = (
            f"Prototype analysis for {location}: the current simulated risk level "
            "is ORANGE due to severe thunderstorm conditions. "
            "This is not an official warning."
        )

    elif "warning" in text or "explain" in text:
        response = (
            "The prototype warning is based on a simulated storm cell, "
            "increasing rainfall intensity and possible local transport impacts. "
            "Official warnings must take priority."
        )

    elif "storm" in text or "moving" in text:
        response = (
            "Prototype nowcast indicates simulated movement toward the east "
            "to north-east. Open the Nowcast page for the projected timeline."
        )

    elif "shelter" in text:
        response = (
            "The prototype shelter service can show nearby relief locations. "
            "Operational shelter status must be verified before relying on it."
        )

    elif "route" in text:
        response = (
            "Use the Lower-Risk Route interface to compare routes against "
            "simulated hazard zones. A lower-risk route is not guaranteed safe."
        )

    elif "what should i do" in text or "what do i do" in text:
        response = (
            "Follow official instructions first. Move indoors during severe weather, "
            "avoid waterlogged roads and keep emergency communication available."
        )

    elif "emergency" in text or "contact" in text:
        response = (
            "Use the Emergency Services section for verified emergency resources. "
            "In a production deployment, official local emergency contacts would "
            "be supplied from authorized sources."
        )

    else:
        response = (
            "I can explain local weather risk, warning reasons, storm movement, "
            "preparedness, shelters, emergency services and lower-risk routing. "
            "This prototype assistant does not replace official emergency guidance."
        )

    return {
        "response": response,
        "location": location,
        "prototype": True,
        "information_hierarchy": [
            "Official Warning",
            "Observed Weather",
            "Verified Platform Data",
            "Approved Guidance",
            "AI Explanation",
        ],
        "timestamp": utc_now(),
    }


@app.post("/api/authority/alerts/{alert_id}/approve")
def approve_alert(alert_id: str):
    alert = next(
        (
            item
            for item in alerts
            if item["id"] == alert_id
        ),
        None,
    )

    if not alert:
        raise HTTPException(
            status_code=404,
            detail="Alert not found.",
        )

    alert["status"] = "Approved for Demo Distribution"
    alert["updated_at"] = utc_now()

    return {
        "message": "Alert approved.",
        "alert": alert,
    }


@app.post("/api/authority/alerts/{alert_id}/modify")
def modify_alert(
    alert_id: str,
    payload: AlertModifyRequest,
):
    alert = next(
        (
            item
            for item in alerts
            if item["id"] == alert_id
        ),
        None,
    )

    if not alert:
        raise HTTPException(
            status_code=404,
            detail="Alert not found.",
        )

    alert["status"] = "Modification Requested"
    alert["authority_note"] = payload.note
    alert["updated_at"] = utc_now()

    return {
        "message": "Alert modification requested.",
        "alert": alert,
    }


@app.post("/api/authority/alerts/{alert_id}/reject")
def reject_alert(alert_id: str):
    alert = next(
        (
            item
            for item in alerts
            if item["id"] == alert_id
        ),
        None,
    )

    if not alert:
        raise HTTPException(
            status_code=404,
            detail="Alert not found.",
        )

    alert["status"] = "Rejected"
    alert["updated_at"] = utc_now()

    return {
        "message": "Alert rejected.",
        "alert": alert,
    }


@app.post("/api/authority/incidents/{incident_id}/assign")
def assign_incident(
    incident_id: str,
    assignment: IncidentAssignRequest,
):
    incident = next(
        (
            item
            for item in incidents
            if item["id"] == incident_id
        ),
        None,
    )

    if not incident:
        raise HTTPException(
            status_code=404,
            detail="Incident not found.",
        )

    incident["status"] = "Assigned to Response Team"
    incident["assigned_team"] = assignment.team
    incident["assigned_at"] = utc_now()

    return {
        "message": "Incident assigned.",
        "incident": incident,
    }


@app.get("/api/disaster-pulse")
def disaster_pulse():
    return {
        "overall": "ORANGE",
        "prototype": True,
        "systems": {
            "weather": "RED",
            "flooding": "ORANGE",
            "roads": "ORANGE",
            "power": "YELLOW",
            "hospitals": "GREEN",
            "communications": "GREEN",
        },
        "possible_failure_cascade": [
            "Extreme Rainfall",
            "Flooding",
            "Road Closure",
            "Traffic Disruption",
            "Ambulance Delay",
            "Hospital Access Risk",
        ],
        "updated_at": utc_now(),
    }


@app.get("/api/system-health")
def system_health():
    return {
        "status": "Operational with prototype services",
        "systems": [
            {
                "name": "Weather API",
                "status": "Prototype",
            },
            {
                "name": "Alert Engine",
                "status": "Operational",
            },
            {
                "name": "AI Assistant",
                "status": "Operational",
            },
            {
                "name": "Incident Gateway",
                "status": "Operational",
            },
            {
                "name": "Notification Gateway",
                "status": "Prototype",
            },
        ],
        "timestamp": utc_now(),
    }
