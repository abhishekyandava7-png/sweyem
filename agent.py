import webbrowser

async def run_strategic_agent(user_id, goal):
    """
    Executes the agentic workflow.
    If 'Approve' or 'Execute' is in the goal, it runs in EXECUTION mode (simulating tools).
    Otherwise, it runs in PLANNING mode (research).
    """
    
    if "Approve" in goal or "Execute" in goal:
        # EXECUTION MODE (Simulated Tools)
        actions = []
        
        # Tool 1: Price Adjustment
        actions.append({
            "tool": "Shopify API",
            "action": "Update Price",
            "details": "Discount 'X-Phone' by 15%",
            "status": "Success"
        })
        
        # Tool 2: Email Staff
        actions.append({
            "tool": "Gmail API",
            "action": "Draft Email",
            "details": "Notify Warehouse Mgr about halt in procurement",
            "status": "Draft Created"
        })
        
        return {
            "status": "Strategy Executed", 
            "actions": actions, 
            "user_id": user_id,
            "timestamp": "January 25, 2026" # Using fixed date as per request or we can use datetime
        }

    else:
        # PLANNING MODE
        # 1. Planning: Breaking down the vision
        roadmap = [f"Analyzing Q1 risk for {goal}", "Synthesizing investor reports", "Optimizing SWOT analysis"]
        
        # 2. Execution: Activating a research tool (Wow factor for CEOs)
        webbrowser.open(f"https://www.google.com/search?q={goal.replace(' ', '+')}+strategic+forecast")
        
        return {"status": "Complete", "roadmap": roadmap, "user_id": user_id}