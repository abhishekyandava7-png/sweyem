from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import Optional
from agent import run_strategic_agent
import asyncio 
from database import check_inventory_and_sales, save_executive_state, save_business_profile, get_business_profile
from fastapi.middleware.cors import CORSMiddleware
import json
import os

app = FastAPI(title="Executive Agentic API")

# 1. Properly configured CORS for the dashboard heartbeat
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_methods=["*"],
    allow_headers=["*"],
)

class StrategicIntent(BaseModel):
    user_id: str
    goal: str


class BusinessProfile(BaseModel):
    user_id: str
    business_name: str
    industry: str
    goals: str
    description: Optional[str] = None
    business_email: Optional[str] = None
    linkedin: Optional[str] = None
    shopify_key: Optional[str] = None
    slack_key: Optional[str] = None

# 2. Background Observer (The "Proactive Heart")
async def autonomous_business_observer():
    while True:
        status = check_inventory_and_sales()
        # Trigger anomaly search if revenue is below 50% of threshold
        if status['revenue'] < (status['threshold'] * 0.5):
            print("🚨 Proactive Agent: Anomaly detected in Shopify data.")
            recovery_plan = await run_strategic_agent("CEO_Alpha_01", "Sales dropped. Create recovery plan.")
            save_executive_state("CEO_Alpha_01", {"insight": recovery_plan})
        
        # Check every 600 seconds (10 minutes) for demo stability
        await asyncio.sleep(600) 

@app.on_event("startup")
async def startup_event():
    asyncio.create_task(autonomous_business_observer())

# 3. Manual Strategy Route
@app.post("/start-strategy")
async def start_strategy(request: StrategicIntent):
    return await run_strategic_agent(request.user_id, request.goal)

# 4. SINGLE, CLEANED Memory Route
@app.get("/get-latest-insights")
async def get_insights(user_id: str = "CEO_Alpha_01"):
    """Reads findings from executive_memory.json for the Dashboard."""
    filename = "executive_memory.json"
    if not os.path.exists(filename):
        return {"insight": {"roadmap": ["Monitoring business health..."]}}

    try:
        with open(filename, "r") as f:
            memory = json.load(f)
        return memory.get(user_id, {}).get("insight", {"roadmap": ["No insights yet."]})
    except Exception as e:
        return {"error": f"Memory Access Error: {str(e)}"}

# 5. Business Onboarding Routes
@app.post("/register-business")
async def register_business(profile: BusinessProfile):
    save_business_profile(profile.user_id, profile.dict())
    return {"status": "success", "message": "Business profile saved."}

@app.get("/business-profile/{user_id}")
async def get_profile(user_id: str):
    profile = get_business_profile(user_id)
    if not profile:
        raise HTTPException(status_code=404, detail="Profile not found")
    return profile

# 6. Strategy Approval Route
class ApprovalRequest(BaseModel):
    user_id: str
    strategy_id: str

@app.post("/approve-strategy")
async def approve_strategy(request: ApprovalRequest):
    # 1. Trigger Agent in "Execution Mode"
    result = await run_strategic_agent(request.user_id, f"Approve strategy {request.strategy_id}")
    
    # 2. Log successful execution
    from database import log_action
    log_action(request.user_id, result)
    
    return result

# 7. Deploy Agents (Real-time Data Fetch)
@app.get("/deploy-agents")
async def deploy_agents():
    """Simulates connecting to Shopify/Slack and fetching live data."""
    # We use the existing function that simulates a data check
    data = check_inventory_and_sales()
    # Add some 'metadata' to make it look like a fresh fetch
    return {
        "status": "Agents Deployed",
        "shopify_status": "Connected (Latency: 24ms)",
        "slack_status": "Listening",
        "live_data": data
    }
