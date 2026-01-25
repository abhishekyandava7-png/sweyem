const API_URL = "http://127.0.0.1:8000";

const chatHistoryEl = document.getElementById('chatHistory');
const userQueryInput = document.getElementById('userQuery');

// Heuristic responses for demo purposes (since we don't have a dedicated LLM chat endpoint active in main.py yet,
// or we can try to hit /start-strategy if it fits, but that returns a strategy object, not chat).
// We will simulate the AI analysis based on keywords.
const knowledgeBase = {
    "sales": "Based on Shopify data, sales are trending upwards by 12% week-over-week. Top performing region is North America.",
    "revenue": "Current monthly revenue is $124,500, which is ahead of the target by 8%.",
    "risk": "There is a potential overstock risk for SKU-001 (Wireless Headphones). Recommended action: 15% discount.",
    "inventory": "Inventory levels are healthy across 85% of SKUs. Low stock alerts are active for 'Smart Watch Gen 2'.",
    "prediction": "My predictive model forecasts a 20% surge in demand next month due to seasonal trends.",
    "default": "I can analyze that. Could you be more specific? I can track Sales, Inventory, Risks, or Predictions."
};

document.addEventListener('DOMContentLoaded', () => {
    loadChatHistory();
});

function handleEnter(e) {
    if (e.key === 'Enter') sendMessage();
}

async function sendMessage() {
    const text = userQueryInput.value.trim();
    if (!text) return;

    // 1. Add User Message
    addMessage(text, 'human');
    saveMessage(text, 'human');
    userQueryInput.value = '';

    // 2. Show Typing Indicator
    const typingId = showTyping();

    // 3. Simulate AI delay or Fetch
    setTimeout(async () => {
        removeTyping(typingId);

        let responseText = knowledgeBase["default"];
        const lowerText = text.toLowerCase();

        // Simple keyword matching
        for (const key in knowledgeBase) {
            if (lowerText.includes(key)) {
                responseText = knowledgeBase[key];
                break;
            }
        }

        // 4. Add AI Message
        addMessage(responseText, 'ai');
        saveMessage(responseText, 'ai');

    }, 1500);
}

function addMessage(text, sender) {
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('message', sender);

    const bubble = document.createElement('div');
    bubble.classList.add('bubble');
    bubble.innerText = text;

    msgDiv.appendChild(bubble);
    chatHistoryEl.appendChild(msgDiv);
    chatHistoryEl.scrollTop = chatHistoryEl.scrollHeight;
}

function showTyping() {
    const id = 'typing-' + Date.now();
    const msgDiv = document.createElement('div');
    msgDiv.id = id;
    msgDiv.classList.add('message', 'ai');
    msgDiv.innerHTML = '<div class="typing">AI is analyzing...</div>';
    chatHistoryEl.appendChild(msgDiv);
    chatHistoryEl.scrollTop = chatHistoryEl.scrollHeight;
    return id;
}

function removeTyping(id) {
    const el = document.getElementById(id);
    if (el) el.remove();
}

function saveMessage(text, sender) {
    const history = JSON.parse(localStorage.getItem('chat_history') || '[]');
    history.push({ text, sender });
    localStorage.setItem('chat_history', JSON.stringify(history));
}

function loadChatHistory() {
    const history = JSON.parse(localStorage.getItem('chat_history') || '[]');
    history.forEach(msg => addMessage(msg.text, msg.sender));
}
