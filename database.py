import json
import os

DB_FILE = "executive_memory.json"

def load_memory():
    if os.path.exists(DB_FILE):
        try:
            with open(DB_FILE, 'r') as f:
                return json.load(f)
        except json.JSONDecodeError:
            return {}
    return {}

def save_memory(memory):
    with open(DB_FILE, 'w') as f:
        json.dump(memory, f, indent=4)

def save_executive_state(user_id, data):
    """Saves the agent's autonomous insights or general state."""
    memory = load_memory()
    # Merge if possible or overwrite? Requirement implies saving state.
    # We will simply update the key for now.
    if user_id in memory:
        if isinstance(memory[user_id], dict) and isinstance(data, dict):
             memory[user_id].update(data)
        else:
             memory[user_id] = data
    else:
        memory[user_id] = data
        
    save_memory(memory)
    print(f"✅ State Updated for {user_id}")

def get_executive_state(user_id):
    memory = load_memory()
    return memory.get(user_id, {})

def check_inventory_and_sales():
    """Simulates a business platform (like Shopify) providing live data."""
    # We are simulating a 'Low Revenue' anomaly for the demo
    return {
        "revenue": 1200,        # Current sales (Anomaly level)
        "threshold": 1000,     # Normal expected revenue
        "inventory_count": 12
    }

def save_business_profile(user_id, profile_data):
    """Saves business credentials and details."""
    save_executive_state(user_id, {"business_profile": profile_data})

def get_business_profile(user_id):
    """Retrieves business credentials."""
    state = get_executive_state(user_id)
    return state.get("business_profile", None)

def log_action(user_id, action_details):
    """Logs an executed action to memory."""
    memory = load_memory()
    if user_id not in memory:
        memory[user_id] = {}
    
    if "action_log" not in memory[user_id]:
        memory[user_id]["action_log"] = []
        
    memory[user_id]["action_log"].append(action_details)
    save_memory(memory)
    print(f"✅ Action Logged for {user_id}")