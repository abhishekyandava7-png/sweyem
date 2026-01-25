const API_URL = "http://127.0.0.1:8000";
const USER_ID = localStorage.getItem('user_id') || "CEO_Alpha_01";

document.addEventListener('DOMContentLoaded', () => {
    // Check Persistence
    const savedApproval = localStorage.getItem('strategy_approved_data');
    if (savedApproval) {
        renderApprovedState(JSON.parse(savedApproval));
    }

    const approveBtn = document.querySelector('.action-btn.approve');
    if (approveBtn) {
        approveBtn.addEventListener('click', handleApproval);
    }
});

async function handleApproval(e) {
    if (e) e.preventDefault(); // Stop any default form submission

    const btn = document.querySelector('.action-btn.approve');
    if (!btn) return; // Button might be gone if already rendered

    const originalText = btn.innerText;

    // 1. Loading State
    btn.disabled = true;
    btn.innerText = "⏳ Deploying Agents...";
    btn.style.background = "#64748b"; // muted gray

    try {
        // 2. API Call
        const response = await fetch(`${API_URL}/approve-strategy`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                user_id: USER_ID,
                strategy_id: "RISK-Q1-001"
            })
        });

        if (response.ok) {
            const result = await response.json();

            // Save to LocalStorage for persistence
            localStorage.setItem('strategy_approved_data', JSON.stringify(result));

            // 3. Update UI to "Approved" State
            renderApprovedState(result);
            showToast("Strategy Deployed Successfully! 🚀");
        } else {
            throw new Error("API Failed");
        }

    } catch (e) {
        console.error(e);
        btn.innerText = "❌ Error. Try Again.";
        btn.style.background = "#ff4b4b";
        setTimeout(() => {
            btn.disabled = false;
            btn.innerText = originalText;
            btn.style.background = ""; // Reset to CSS default
        }, 3000);
    }
}

function renderApprovedState(data) {
    const riskCard = document.querySelector('.risk-card');

    // Replace the button area with the status panel
    // Detailed Status Block as requested
    const statusHtml = `
        <div class="approved-panel slide-up" style="margin-top: 20px; background: rgba(16, 185, 129, 0.1); border: 1px solid #10b981; padding: 20px; border-radius: 8px;">
            <h3 style="color: #10b981; margin: 0 0 10px 0;">✅ STRATEGY APPROVED & IN-PROGRESS</h3>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; font-size: 0.95rem;">
                <div>
                    <span style="color: var(--text-muted);">Authorized By:</span><br>
                    <strong style="color: var(--text-main);">Strategic CEO User</strong>
                </div>
                <div>
                    <span style="color: var(--text-muted);">Date of Execution:</span><br>
                    <strong style="color: var(--text-main);">${data.timestamp}</strong>
                </div>
            </div>
            
            <hr style="border: 0; border-top: 1px solid rgba(16, 185, 129, 0.2); margin: 15px 0;">
            
            <h4 style="margin: 0 0 10px 0; font-size: 1rem; color: var(--text-main);">Agent Actions Executed:</h4>
            <ul style="list-style: none; padding: 0;">
                ${data.actions.map(action => `
                    <li style="margin-bottom: 8px; font-size: 0.9rem;">
                        <span style="background: var(--bg-body); padding: 2px 6px; border-radius: 4px; border: 1px solid var(--border); font-size: 0.8rem;">${action.tool}</span>
                        <span style="color: var(--text-main); margin-left: 8px;">${action.details}</span>
                        <span style="color: #10b981; float: right;">✔ ${action.status}</span>
                    </li>
                `).join('')}
            </ul>
        </div>
    `;

    // Find the button and replace it (or append after)
    // Actually, let's remove the button and append this.
    const btn = document.querySelector('.action-btn.approve');
    btn.style.display = 'none';

    const container = document.createElement('div');
    container.innerHTML = statusHtml;
    riskCard.appendChild(container);
}

function showToast(msg) {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.innerText = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
}
