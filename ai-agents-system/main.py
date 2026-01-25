import os
from dotenv import load_dotenv

load_dotenv()
from fastapi import FastAPI, HTTPException, WebSocket
from pydantic import BaseModel
from typing import Optional, List, Dict, Any
import asyncio
import json
from datetime import datetime
import anthropic
from enum import Enum

app = FastAPI()

# ============= MODELS =============

class MetricData(BaseModel):
    metric_name: str
    value: float
    timestamp: datetime
    source: str

class AgentRole(str, Enum):
    OBSERVER = "observer"
    ANALYST = "analyst"
    DECISION_MAKER = "decision_maker"
    EXECUTOR = "executor"

class DecisionRequest(BaseModel):
    business_context: str
    metrics: List[MetricData]
    decision_threshold: float = 0.7
    autonomous: bool = False

class AgentResponse(BaseModel):
    agent_role: AgentRole
    analysis: str
    confidence: float
    recommendation: Optional[str] = None
    next_agent: Optional[AgentRole] = None

class DecisionOutcome(BaseModel):
    decision: str
    justification: str
    confidence: float
    simulated_outcomes: List[Dict[str, Any]]
    requires_approval: bool

# ============= AGENT SYSTEM =============

class AIAgentOrchestrator:
    def __init__(self):
        self.client = anthropic.Anthropic()
        self.model = "claude-sonnet-4-20250514"
        self.agents = {
            AgentRole.OBSERVER: self._create_observer_prompt,
            AgentRole.ANALYST: self._create_analyst_prompt,
            AgentRole.DECISION_MAKER: self._create_decision_maker_prompt,
            AgentRole.EXECUTOR: self._create_executor_prompt,
        }
    
    def _create_observer_prompt(self, metrics: List[MetricData]) -> str:
        metrics_str = "\n".join([
            f"- {m.metric_name}: {m.value} (from {m.source} at {m.timestamp})"
            for m in metrics
        ])
        return f"""You are the OBSERVER agent. Your role is to continuously monitor business metrics and detect anomalies.

Current Metrics:
{metrics_str}

Task:
1. Identify any unusual patterns or deviations from expected ranges
2. Flag metrics that need immediate attention
3. Summarize the current state of business operations
4. Provide confidence score (0-1) for your observations

Respond in JSON format:
{{
    "observations": "your observations",
    "anomalies_detected": ["list of anomalies"],
    "severity": "low/medium/high",
    "confidence": 0.0-1.0,
    "summary": "brief summary"
}}"""

    def _create_analyst_prompt(self, observations: str, metrics: List[MetricData]) -> str:
        return f"""You are the ANALYST agent. Your role is to dive deep into detected anomalies and identify root causes and trends.

Previous Observations:
{observations}

Raw Data Points: {len(metrics)} metrics collected

Task:
1. Analyze the root causes of detected anomalies
2. Identify trends (upward, downward, cyclical)
3. Compare against historical patterns (simulate if unavailable)
4. Assess business impact
5. Provide confidence in your analysis

Respond in JSON format:
{{
    "root_causes": ["cause1", "cause2"],
    "trends": ["trend1", "trend2"],
    "business_impact": "description",
    "risk_level": "low/medium/high",
    "confidence": 0.0-1.0,
    "analysis_summary": "brief summary"
}}"""

    def _create_decision_maker_prompt(self, analysis: str, business_context: str) -> str:
        return f"""You are the DECISION-MAKER agent. Your role is to simulate decisions and recommend optimal actions.

Business Context: {business_context}

Analysis Summary: {analysis}

Task:
1. Generate 3 possible decisions/actions
2. For each decision, simulate potential outcomes
3. Assess pros and cons
4. Recommend the best course of action with justification
5. Determine if human approval is needed

Respond in JSON format:
{{
    "possible_decisions": [
        {{
            "action": "description",
            "potential_outcome": "what would happen",
            "pros": ["pro1", "pro2"],
            "cons": ["con1", "con2"],
            "success_probability": 0.0-1.0
        }}
    ],
    "recommended_decision": "the best action",
    "justification": "why this is best",
    "confidence": 0.0-1.0,
    "requires_human_approval": true/false,
    "approval_reason": "if applicable"
}}"""

    def _create_executor_prompt(self, decision: str, metrics: List[MetricData]) -> str:
        return f"""You are the EXECUTOR agent. Your role is to create an actionable execution plan.

Approved Decision: {decision}

Current Metrics: {len(metrics)} data points available

Task:
1. Break down the decision into concrete steps
2. Identify required resources/dependencies
3. Set success metrics and KPIs to monitor
4. Define rollback/contingency plans
5. Create a timeline with milestones

Respond in JSON format:
{{
    "execution_plan": [
        {{
            "step": "step description",
            "duration": "time required",
            "resources": ["resource1", "resource2"],
            "dependencies": ["dependency1"]
        }}
    ],
    "success_metrics": ["metric1", "metric2"],
    "contingency_plans": ["plan1", "plan2"],
    "timeline_days": 0-365,
    "confidence": 0.0-1.0
}}"""

    async def call_agent(self, role: AgentRole, prompt: str) -> Dict[str, Any]:
        """Call Claude API for specific agent role"""
        try:
            message = self.client.messages.create(
                model=self.model,
                max_tokens=1024,
                messages=[{"role": "user", "content": prompt}]
            )
            response_text = message.content[0].text
            
            # Try to parse JSON from response
            try:
                if "```json" in response_text:
                    json_str = response_text.split("```json")[1].split("```")[0].strip()
                    return json.loads(json_str)
                elif "{" in response_text:
                    start = response_text.index("{")
                    end = response_text.rindex("}") + 1
                    return json.loads(response_text[start:end])
            except:
                return {"raw_response": response_text}
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Agent call failed: {str(e)}")

    async def orchestrate(self, decision_request: DecisionRequest) -> DecisionOutcome:
        """Orchestrate all 4 agents in sequence"""
        
        # Agent 1: Observer - Monitor metrics
        observer_prompt = self._create_observer_prompt(decision_request.metrics)
        observer_result = await self.call_agent(AgentRole.OBSERVER, observer_prompt)
        
        # Agent 2: Analyst - Analyze observations
        analyst_prompt = self._create_analyst_prompt(
            json.dumps(observer_result),
            decision_request.metrics
        )
        analyst_result = await self.call_agent(AgentRole.ANALYST, analyst_prompt)
        
        # Agent 3: Decision Maker - Recommend decision
        decision_prompt = self._create_decision_maker_prompt(
            json.dumps(analyst_result),
            decision_request.business_context
        )
        decision_result = await self.call_agent(AgentRole.DECISION_MAKER, decision_prompt)
        
        # Agent 4: Executor - Create execution plan
        executor_prompt = self._create_executor_prompt(
            decision_result.get("recommended_decision", ""),
            decision_request.metrics
        )
        executor_result = await self.call_agent(AgentRole.EXECUTOR, executor_prompt)
        
        # Compile final outcome
        confidence = min([
            observer_result.get("confidence", 0.5),
            analyst_result.get("confidence", 0.5),
            decision_result.get("confidence", 0.5),
            executor_result.get("confidence", 0.5)
        ])
        
        requires_approval = (
            decision_result.get("requires_human_approval", False) or
            confidence < decision_request.decision_threshold
        )
        
        return DecisionOutcome(
            decision=decision_result.get("recommended_decision", "No decision"),
            justification=decision_result.get("justification", ""),
            confidence=confidence,
            simulated_outcomes=decision_result.get("possible_decisions", []),
            requires_approval=requires_approval
        )

# ============= API ENDPOINTS =============

orchestrator = AIAgentOrchestrator()
approval_queue = []

@app.post("/api/agents/process-decision")
async def process_decision(request: DecisionRequest) -> Dict[str, Any]:
    """Process a decision through all 4 agents"""
    try:
        outcome = await orchestrator.orchestrate(request)
        
        if outcome.requires_approval:
            approval_queue.append({
                "id": len(approval_queue),
                "timestamp": datetime.now(),
                "outcome": outcome.dict(),
                "status": "pending"
            })
            return {
                "status": "pending_approval",
                "approval_id": len(approval_queue) - 1,
                "outcome": outcome.dict()
            }
        else:
            return {
                "status": "approved",
                "outcome": outcome.dict(),
                "executed": request.autonomous
            }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/agents/approve-decision/{approval_id}")
async def approve_decision(approval_id: int, approved: bool) -> Dict[str, Any]:
    """Human approval checkpoint"""
    if approval_id >= len(approval_queue):
        raise HTTPException(status_code=404, detail="Approval request not found")
    
    approval_queue[approval_id]["status"] = "approved" if approved else "rejected"
    return {
        "message": "Decision approved" if approved else "Decision rejected",
        "approval_id": approval_id
    }

@app.get("/api/agents/pending-approvals")
async def get_pending_approvals() -> List[Dict[str, Any]]:
    """Get all pending approvals"""
    return [item for item in approval_queue if item["status"] == "pending"]

@app.post("/api/agents/health")
async def health_check() -> Dict[str, str]:
    """Health check endpoint"""
    return {"status": "healthy", "timestamp": datetime.now().isoformat()}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)