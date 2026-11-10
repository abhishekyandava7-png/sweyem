/**
 * Autonomy — Autonomous Business Operations Platform
 * Client Dashboard Engine
 */

(function () {
  'use strict';

  // --- Sample Illustrative Data ---
  const state = {
    activePeriod: '30D',
    activeTab: 'overview',
    metrics: {
      revenue: '$128,450',
      revenueDelta: '+12.4%',
      orders: '1,842',
      ordersDelta: '+8.1%',
      tasks: '6,419',
      tasksDelta: '+24.6%',
      csat: '98.2%',
      csatDelta: '+1.8%'
    },
    attentionItems: [
      {
        id: 'ATT-101',
        title: 'Supplier Purchase Order: Restock SKU #4892 (Wireless Keyboards)',
        category: 'Supply Chain & Inventory',
        urgency: 'high',
        urgencyLabel: 'High Urgency',
        rationale: 'Projected stockout in 4 business days. Supplier lead time is 9 days. System prepared PO for 500 units ($14,500.00). Requires owner authorization above $10k threshold.',
        impact: 'Prevents estimated $22,400 stockout loss during end-of-month promotion.',
        agent: 'Inventory Optimization Agent',
        confidence: '99.2%',
        amount: '$14,500.00',
        timestamp: '18 minutes ago'
      },
      {
        id: 'ATT-102',
        title: 'Dynamic Price Adjustment: Holiday Surge for Tier-A Catalog',
        category: 'Revenue Operations',
        urgency: 'medium',
        urgencyLabel: 'Review Required',
        rationale: 'Competitor pricing benchmark increased by 6.2%. Price elasticity analysis indicates a +4.5% markup will increase gross margin without depressing checkout conversion.',
        impact: 'Estimated net profit gain of +$4,200 / week across 42 active SKUs.',
        agent: 'Pricing & Margin Strategy Agent',
        confidence: '96.4%',
        amount: '+$4,200/wk',
        timestamp: '1 hour ago'
      },
      {
        id: 'ATT-103',
        title: 'VIP Account Retention & Freight Compensation (Order #AUT-9921)',
        category: 'Customer Experience',
        urgency: 'normal',
        urgencyLabel: 'Policy Override',
        rationale: 'Enterprise Tier-1 client encountered custom clearance carrier delay. Suggested automated care package ($350 credit + expedited freight) exceeds standard $200 rep limit.',
        impact: 'Safeguards $48k ARR enterprise contract renewal.',
        agent: 'VIP Retention Agent',
        confidence: '98.0%',
        amount: '$350.00 Credit',
        timestamp: '3 hours ago'
      }
    ],
    recommendations: [
      {
        id: 'REC-01',
        category: 'Logistics',
        title: 'Consolidate US-East shipping carrier routing',
        benefit: 'Est. savings $2,400/mo • 14% faster transit',
        description: 'Multi-carrier telemetry shows DHL eCommerce rate card is 11% cheaper than FedEx Ground for lightweight packages in zone 2-4.',
        agent: 'Logistics Agent'
      },
      {
        id: 'REC-02',
        category: 'Growth',
        title: 'Auto-escalate unanswered enterprise inquiries after 15 min',
        benefit: '+18% inbound demo conversion rate',
        description: 'Leads followed up within 15 minutes convert at 3.2x higher rate than leads delayed over 1 hour.',
        agent: 'Sales Ops Agent'
      },
      {
        id: 'REC-03',
        category: 'Infrastructure',
        title: 'Prune redundant cloud database snapshots older than 90d',
        benefit: '$480/mo recurring cost reduction',
        description: '14 unattached test snapshots detected from previous staging migration.',
        agent: 'Cost Optimization Agent'
      }
    ],
    activities: [
      {
        id: 'ACT-501',
        time: '4 mins ago',
        agent: 'Fulfillment Agent',
        category: 'inventory',
        action: 'Rebalanced 120 units SKU #301 to West Coast Hub',
        status: 'Completed',
        statusType: 'completed',
        details: 'Calculated optimal transfer route via Regional Freight. Lowered delivery time to 1.8 days.'
      },
      {
        id: 'ACT-502',
        time: '26 mins ago',
        agent: 'Finance Agent',
        category: 'finance',
        action: 'Reconciled 248 Stripe settlements against QuickBooks Ledger',
        status: 'Completed',
        statusType: 'completed',
        details: 'Zero discrepancies found. All fees accounted and categorized into general expense.'
      },
      {
        id: 'ACT-503',
        time: '1 hour ago',
        agent: 'Support Agent',
        category: 'cx',
        action: 'Autonomously resolved 42 tier-1 return & tracking inquiries',
        status: 'Optimized',
        statusType: 'optimized',
        details: 'CSAT for autonomous interactions measured at 99.1%. Average turnaround: 12 seconds.'
      },
      {
        id: 'ACT-504',
        time: '2 hours ago',
        agent: 'Pricing Agent',
        category: 'finance',
        action: 'A/B price elasticity test initiated for Category B accessories',
        status: 'In Progress',
        statusType: 'pending',
        details: 'Monitoring 500 session cohort across checkout step 2.'
      },
      {
        id: 'ACT-505',
        time: '3 hours ago',
        agent: 'Inventory Agent',
        category: 'inventory',
        action: 'Synced safety stock buffers across 3 supplier portals',
        status: 'Completed',
        statusType: 'completed',
        details: 'Updated inventory lead times for Q4 supply chain forecast adjustments.'
      }
    ],
    chartData: {
      '7D': {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        values: [14200, 16800, 15400, 19200, 21500, 18900, 22450],
        total: '$128,450',
        growth: '+12.4% vs prev week'
      },
      '30D': {
        labels: ['Day 1', 'Day 5', 'Day 10', 'Day 15', 'Day 20', 'Day 25', 'Day 30'],
        values: [8500, 11200, 14300, 13800, 17900, 19400, 22450],
        total: '$128,450',
        growth: '+12.4% vs last month'
      },
      '90D': {
        labels: ['Oct W1', 'Oct W3', 'Nov W1', 'Nov W3', 'Dec W1', 'Dec W3'],
        values: [32000, 36500, 42000, 46100, 52400, 58200],
        total: '$378,200',
        growth: '+28.2% vs prev quarter'
      }
    }
  };

  // --- DOM Elements ---
  const el = {
    // Nav & Sidebar
    navItems: document.querySelectorAll('.nav-item'),
    tabPanes: document.querySelectorAll('.tab-pane'),
    sidebar: document.getElementById('sidebar'),
    sidebarOverlay: document.getElementById('sidebarOverlay'),
    mobileMenuBtn: document.getElementById('mobileMenuBtn'),
    sidebarCloseBtn: document.getElementById('sidebarCloseBtn'),
    
    // Topbar
    dateSelectorBtn: document.getElementById('dateSelectorBtn'),
    dateDropdown: document.getElementById('dateDropdown'),
    dateDropdownItems: document.querySelectorAll('.date-dropdown .dropdown-item'),
    dateLabel: document.getElementById('selectedDateLabel'),
    notifBtn: document.getElementById('notifBtn'),
    notifMenu: document.getElementById('notifMenu'),
    userProfileBtn: document.getElementById('userProfileBtn'),
    userDropdown: document.getElementById('userDropdown'),

    // Sections
    attentionList: document.getElementById('attentionList'),
    attentionCountBadge: document.getElementById('attentionCountBadge'),
    emptyAttention: document.getElementById('emptyAttention'),
    recommendationsList: document.getElementById('recommendationsList'),
    activityTableBody: document.getElementById('activityTableBody'),
    activityFilterBtns: document.querySelectorAll('.activity-filter-btn'),

    // Chart
    chartSvg: document.getElementById('chartSvg'),
    chartTooltip: document.getElementById('chartTooltip'),
    chartFilterBtns: document.querySelectorAll('.chart-filter-btn'),
    chartTotalValue: document.getElementById('chartTotalValue'),
    chartGrowthValue: document.getElementById('chartGrowthValue'),

    // Modals
    detailModal: document.getElementById('detailModal'),
    modalTitle: document.getElementById('modalTitle'),
    modalBody: document.getElementById('modalBody'),
    modalFooter: document.getElementById('modalFooter'),
    modalCloseBtn: document.getElementById('modalCloseBtn'),

    // Actions
    simulateAnomalyBtn: document.getElementById('simulateAnomalyBtn'),
    toastContainer: document.getElementById('toastContainer')
  };

  // --- Initialization ---
  function init() {
    setupNavigation();
    setupDropdowns();
    setupMobileMenu();
    renderAttentionQueue();
    renderRecommendations();
    renderActivityLog('all');
    setupActivityFilters();
    renderChart(state.activePeriod);
    setupChartFilters();
    setupSimulateAnomaly();
  }

  // --- Toast Feedback ---
  function showToast(message, type = 'success') {
    if (!el.toastContainer) return;
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <span class="toast-icon">✓</span>
      <span>${message}</span>
    `;
    el.toastContainer.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      setTimeout(() => toast.remove(), 250);
    }, 3200);
  }

  // --- Navigation & View Switching ---
  function setupNavigation() {
    el.navItems.forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        const tabTarget = item.getAttribute('data-tab');
        if (!tabTarget) return;

        el.navItems.forEach(nav => nav.classList.remove('active'));
        item.classList.add('active');

        el.tabPanes.forEach(pane => {
          if (pane.id === `tab-${tabTarget}`) {
            pane.classList.add('active');
          } else {
            pane.classList.remove('active');
          }
        });

        // Update topbar title
        const titleEl = document.querySelector('.page-title');
        if (titleEl) {
          const tabNames = {
            overview: 'Overview',
            operations: 'Autonomous Operations',
            agents: 'AI Agent Fleet',
            insights: 'Strategic Insights',
            integrations: 'Integrations & APIs',
            settings: 'Platform Settings'
          };
          titleEl.childNodes[0].textContent = (tabNames[tabTarget] || 'Dashboard') + ' ';
        }

        // Close mobile sidebar if open
        if (window.innerWidth <= 768) {
          closeMobileSidebar();
        }
      });
    });
  }

  // --- Mobile Sidebar ---
  function setupMobileMenu() {
    if (el.mobileMenuBtn) {
      el.mobileMenuBtn.addEventListener('click', () => {
        el.sidebar.classList.add('open');
        el.sidebarOverlay.classList.add('open');
      });
    }

    if (el.sidebarOverlay) {
      el.sidebarOverlay.addEventListener('click', closeMobileSidebar);
    }

    if (el.sidebarCloseBtn) {
      el.sidebarCloseBtn.addEventListener('click', closeMobileSidebar);
    }
  }

  function closeMobileSidebar() {
    if (el.sidebar) el.sidebar.classList.remove('open');
    if (el.sidebarOverlay) el.sidebarOverlay.classList.remove('open');
  }

  // --- Dropdowns ---
  function setupDropdowns() {
    // Date dropdown
    if (el.dateSelectorBtn && el.dateDropdown) {
      el.dateSelectorBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        closeAllDropdowns(el.dateDropdown);
        el.dateDropdown.classList.toggle('show');
      });

      el.dateDropdownItems.forEach(item => {
        item.addEventListener('click', () => {
          el.dateDropdownItems.forEach(i => i.classList.remove('active'));
          item.classList.add('active');
          const val = item.getAttribute('data-val');
          if (el.dateLabel) el.dateLabel.textContent = item.textContent;
          el.dateDropdown.classList.remove('show');
          showToast(`Dashboard date filtered to: ${item.textContent}`);
        });
      });
    }

    // Notifications menu
    if (el.notifBtn && el.notifMenu) {
      el.notifBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        closeAllDropdowns(el.notifMenu);
        el.notifMenu.classList.toggle('show');
      });
    }

    // User Profile menu
    if (el.userProfileBtn && el.userDropdown) {
      el.userProfileBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        closeAllDropdowns(el.userDropdown);
        el.userDropdown.classList.toggle('show');
      });
    }

    // Close on outer click
    document.addEventListener('click', () => {
      closeAllDropdowns();
    });
  }

  function closeAllDropdowns(except = null) {
    if (el.dateDropdown && el.dateDropdown !== except) el.dateDropdown.classList.remove('show');
    if (el.notifMenu && el.notifMenu !== except) el.notifMenu.classList.remove('show');
    if (el.userDropdown && el.userDropdown !== except) el.userDropdown.classList.remove('show');
  }

  // --- Needs Your Attention (Approval Queue) ---
  function renderAttentionQueue() {
    if (!el.attentionList) return;

    if (state.attentionItems.length === 0) {
      el.attentionList.innerHTML = '';
      if (el.emptyAttention) el.emptyAttention.classList.add('show');
      if (el.attentionCountBadge) {
        el.attentionCountBadge.textContent = '0 Pending';
        el.attentionCountBadge.classList.remove('attention');
      }
      return;
    }

    if (el.emptyAttention) el.emptyAttention.classList.remove('show');
    if (el.attentionCountBadge) {
      el.attentionCountBadge.textContent = `${state.attentionItems.length} Pending Approval`;
      el.attentionCountBadge.classList.add('attention');
    }

    el.attentionList.innerHTML = state.attentionItems.map(item => `
      <div class="attention-item urgency-${item.urgency}" id="item-${item.id}">
        <div class="attention-top">
          <div class="attention-title-area">
            <h4 class="attention-title">${escapeHtml(item.title)}</h4>
            <div class="attention-category">
              <span class="urgency-tag ${item.urgency}">${item.urgencyLabel}</span>
              <span>•</span>
              <span>${escapeHtml(item.category)}</span>
              <span>•</span>
              <span>By ${escapeHtml(item.agent)}</span>
            </div>
          </div>
          <div class="attention-amount" style="font-weight:700; color:var(--text-primary); font-size:13px;">
            ${item.amount}
          </div>
        </div>

        <div class="attention-rationale">
          <strong>Context:</strong> ${escapeHtml(item.rationale)}<br>
          <strong style="color:var(--status-success-text); margin-top:3px; display:inline-block;">Projected Benefit:</strong> ${escapeHtml(item.impact)}
        </div>

        <div class="attention-footer">
          <div class="attention-meta">
            <span>Model Confidence: <strong>${item.confidence}</strong></span> • 
            <span>${item.timestamp}</span> • 
            <span style="color:var(--text-subtle);">Simulated decision log</span>
          </div>
          <div class="attention-actions">
            <button class="btn btn-secondary btn-sm" onclick="window.AutonomyApp.reviewItem('${item.id}')">
              Review Details
            </button>
            <button class="btn btn-approve btn-sm" onclick="window.AutonomyApp.approveItem('${item.id}')">
              Approve Action
            </button>
          </div>
        </div>
      </div>
    `).join('');
  }

  function approveItem(id) {
    const idx = state.attentionItems.findIndex(i => i.id === id);
    if (idx === -1) return;

    const item = state.attentionItems[idx];
    
    // Add to recent activity log
    state.activities.unshift({
      id: 'ACT-' + Date.now().toString().slice(-4),
      time: 'Just now',
      agent: item.agent,
      category: item.category.toLowerCase().includes('supply') ? 'inventory' : 'finance',
      action: `Approved: ${item.title.split(':')[1] || item.title}`,
      status: 'Completed',
      statusType: 'completed',
      details: `Execution dispatched via autonomous workflow webhook. ${item.impact}`
    });

    // Remove from attention items
    state.attentionItems.splice(idx, 1);
    renderAttentionQueue();
    renderActivityLog('all');
    showToast(`Approved: "${item.title.slice(0, 40)}..."`);
    closeModal();
  }

  function rejectItem(id) {
    const idx = state.attentionItems.findIndex(i => i.id === id);
    if (idx === -1) return;
    const item = state.attentionItems[idx];
    state.attentionItems.splice(idx, 1);
    renderAttentionQueue();
    showToast(`Rejected recommendation: "${item.title.slice(0, 35)}..."`);
    closeModal();
  }

  function reviewItem(id) {
    const item = state.attentionItems.find(i => i.id === id);
    if (!item) return;

    el.modalTitle.textContent = 'Review Operational Action';
    el.modalBody.innerHTML = `
      <div class="detail-section">
        <span class="detail-label">Action Summary</span>
        <div style="font-size:15px; font-weight:700; color:var(--text-primary);">
          ${escapeHtml(item.title)}
        </div>
      </div>

      <div class="detail-section">
        <span class="detail-label">Agent Reasoning Chain & Evidence</span>
        <div class="detail-box">
          <p style="margin-bottom:8px;">${escapeHtml(item.rationale)}</p>
          <div style="font-size:12px; color:var(--text-secondary); line-height:1.6; border-top:1px solid var(--border-subtle); padding-top:8px;">
            <div>• <strong>Origin Agent:</strong> ${item.agent}</div>
            <div>• <strong>Inference Confidence:</strong> ${item.confidence}</div>
            <div>• <strong>Safety Verification:</strong> Passed guardrail checks (No supplier rate anomalies detected)</div>
            <div>• <strong>Rollback Available:</strong> Yes, within 60 minutes via supplier API hook</div>
          </div>
        </div>
      </div>

      <div class="detail-section">
        <span class="detail-label">Projected Business Impact</span>
        <div class="detail-box" style="background-color:var(--status-success-bg); border-color:var(--status-success-border); color:var(--status-success-text); font-weight:500;">
          ${escapeHtml(item.impact)}
        </div>
      </div>

      <p style="font-size:12px; color:var(--text-muted); font-style:italic;">
        Note: This is an illustrative demonstration environment. Approving will simulate action execution in the activity log.
      </p>
    `;

    el.modalFooter.innerHTML = `
      <button class="btn btn-secondary" onclick="window.AutonomyApp.closeModal()">Cancel</button>
      <button class="btn btn-dismiss" onclick="window.AutonomyApp.rejectItem('${item.id}')">Reject Proposal</button>
      <button class="btn btn-approve" onclick="window.AutonomyApp.approveItem('${item.id}')">Approve & Execute</button>
    `;

    openModal();
  }

  // --- AI Recommendations ---
  function renderRecommendations() {
    if (!el.recommendationsList) return;

    if (state.recommendations.length === 0) {
      el.recommendationsList.innerHTML = `
        <div style="text-align:center; padding:20px; font-size:12.5px; color:var(--text-muted);">
          No new recommendations. System is actively evaluating operational telemetry.
        </div>
      `;
      return;
    }

    el.recommendationsList.innerHTML = state.recommendations.map(rec => `
      <div class="recommendation-card" id="rec-${rec.id}">
        <div class="rec-header">
          <span class="rec-category">${rec.category}</span>
          <span style="font-size:11px; color:var(--text-subtle);">Generated today</span>
        </div>
        <h4 class="rec-title">${escapeHtml(rec.title)}</h4>
        <div class="rec-benefit-box">
          <span class="benefit-highlight">Benefit:</span>
          <span>${escapeHtml(rec.benefit)}</span>
        </div>
        <div class="rec-actions">
          <button class="btn btn-subtle btn-sm btn-dismiss" onclick="window.AutonomyApp.dismissRec('${rec.id}')">
            Dismiss
          </button>
          <button class="btn btn-secondary btn-sm" onclick="window.AutonomyApp.reviewRec('${rec.id}')">
            Review Proposal
          </button>
        </div>
      </div>
    `).join('');
  }

  function dismissRec(id) {
    const idx = state.recommendations.findIndex(r => r.id === id);
    if (idx === -1) return;
    const rec = state.recommendations[idx];
    state.recommendations.splice(idx, 1);
    renderRecommendations();
    showToast(`Dismissed recommendation: "${rec.title.slice(0, 30)}..."`);
  }

  function reviewRec(id) {
    const rec = state.recommendations.find(r => r.id === id);
    if (!rec) return;

    el.modalTitle.textContent = 'Strategic AI Recommendation';
    el.modalBody.innerHTML = `
      <div class="detail-section">
        <span class="detail-label">Strategy</span>
        <div style="font-size:15px; font-weight:700; color:var(--text-primary);">
          ${escapeHtml(rec.title)}
        </div>
      </div>

      <div class="detail-section">
        <span class="detail-label">Background & Telemetry Findings</span>
        <div class="detail-box">
          <p>${escapeHtml(rec.description)}</p>
        </div>
      </div>

      <div class="detail-section">
        <span class="detail-label">Quantified Expected Outcome</span>
        <div class="detail-box" style="background-color:var(--accent-light); border-color:var(--accent-subtle); color:var(--accent-text); font-weight:600;">
          ${escapeHtml(rec.benefit)}
        </div>
      </div>
    `;

    el.modalFooter.innerHTML = `
      <button class="btn btn-secondary" onclick="window.AutonomyApp.closeModal()">Close</button>
      <button class="btn btn-primary" onclick="window.AutonomyApp.applyRec('${rec.id}')">Apply Automated Policy</button>
    `;

    openModal();
  }

  function applyRec(id) {
    const rec = state.recommendations.find(r => r.id === id);
    if (rec) {
      showToast(`Rule applied: ${rec.title}`);
      dismissRec(id);
    }
    closeModal();
  }

  // --- Activity Log ---
  function setupActivityFilters() {
    el.activityFilterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        el.activityFilterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const cat = btn.getAttribute('data-cat') || 'all';
        renderActivityLog(cat);
      });
    });
  }

  function renderActivityLog(category = 'all') {
    if (!el.activityTableBody) return;

    const filtered = category === 'all' 
      ? state.activities 
      : state.activities.filter(a => a.category === category);

    if (filtered.length === 0) {
      el.activityTableBody.innerHTML = `
        <tr>
          <td colspan="4" style="text-align:center; padding:28px; color:var(--text-muted);">
            No automated actions found for this filter category.
          </td>
        </tr>
      `;
      return;
    }

    el.activityTableBody.innerHTML = filtered.map(act => `
      <tr>
        <td class="timestamp-text">${act.time}</td>
        <td>
          <div class="agent-name-cell">
            <div class="agent-avatar-mini">⚡</div>
            <span>${escapeHtml(act.agent)}</span>
          </div>
        </td>
        <td>
          <div style="font-weight:500; color:var(--text-primary); margin-bottom:2px;">
            ${escapeHtml(act.action)}
          </div>
          <div style="font-size:11.5px; color:var(--text-muted);">
            ${escapeHtml(act.details)}
          </div>
        </td>
        <td>
          <span class="status-badge-inline ${act.statusType}">
            ${act.status}
          </span>
        </td>
        <td style="text-align:right;">
          <button class="btn btn-subtle btn-sm" onclick="window.AutonomyApp.inspectActivity('${act.id}')">
            Inspect
          </button>
        </td>
      </tr>
    `).join('');
  }

  function inspectActivity(id) {
    const act = state.activities.find(a => a.id === id);
    if (!act) return;

    el.modalTitle.textContent = 'Autonomous Action Telemetry';
    el.modalBody.innerHTML = `
      <div class="detail-section">
        <span class="detail-label">Action Performed</span>
        <div style="font-size:14px; font-weight:700; color:var(--text-primary);">
          ${escapeHtml(act.action)}
        </div>
      </div>

      <div class="detail-section">
        <span class="detail-label">Execution Trace</span>
        <div class="detail-box">
          <div style="display:flex; justify-content:space-between; margin-bottom:6px; font-size:12px;">
            <span>Agent: <strong>${escapeHtml(act.agent)}</strong></span>
            <span>Recorded: <strong>${act.time}</strong></span>
          </div>
          <p style="margin-top:6px;">${escapeHtml(act.details)}</p>
          <div style="margin-top:10px; padding-top:8px; border-top:1px dashed var(--border-subtle); font-family:monospace; font-size:11.5px; color:var(--text-muted);">
            Status: HTTP 200 OK • Webhook Verified • Latency 240ms • Signature valid
          </div>
        </div>
      </div>

      <div class="detail-section">
        <span class="detail-label">Reversible Status</span>
        <div class="detail-box" style="font-size:12px;">
          ✓ Fully audited in ledger. Automated rollback window is active for 24 hours.
        </div>
      </div>
    `;

    el.modalFooter.innerHTML = `
      <button class="btn btn-secondary" onclick="window.AutonomyApp.closeModal()">Close</button>
      <button class="btn btn-primary" onclick="window.AutonomyApp.closeModal(); window.AutonomyApp.showToast('Audit report downloaded');">
        Export Audit Trace
      </button>
    `;

    openModal();
  }

  // --- Performance SVG Chart ---
  function setupChartFilters() {
    el.chartFilterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        el.chartFilterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const period = btn.getAttribute('data-period') || '30D';
        state.activePeriod = period;
        renderChart(period);
      });
    });
  }

  function renderChart(period) {
    if (!el.chartSvg) return;
    const data = state.chartData[period] || state.chartData['30D'];

    if (el.chartTotalValue) el.chartTotalValue.textContent = data.total;
    if (el.chartGrowthValue) el.chartGrowthValue.textContent = data.growth;

    const width = 640;
    const height = 200;
    const padding = { top: 25, right: 30, bottom: 35, left: 55 };
    const chartW = width - padding.left - padding.right;
    const chartH = height - padding.top - padding.bottom;

    const maxVal = Math.max(...data.values) * 1.15;
    const minVal = 0;

    // Generate points
    const points = data.values.map((v, i) => {
      const x = padding.left + (i / (data.values.length - 1)) * chartW;
      const y = padding.top + chartH - ((v - minVal) / (maxVal - minVal)) * chartH;
      return { x, y, value: v, label: data.labels[i] };
    });

    // Create SVG path string
    let pathD = `M ${points[0].x} ${points[0].y}`;
    for (let i = 1; i < points.length; i++) {
      const p0 = points[i - 1];
      const p1 = points[i];
      const mx = (p0.x + p1.x) / 2;
      pathD += ` C ${mx} ${p0.y}, ${mx} ${p1.y}, ${p1.x} ${p1.y}`;
    }

    // Area path
    const areaD = `${pathD} L ${points[points.length - 1].x} ${padding.top + chartH} L ${points[0].x} ${padding.top + chartH} Z`;

    // Horizontal grid lines
    const gridLines = [0, 0.33, 0.66, 1].map(pct => {
      const y = padding.top + chartH * (1 - pct);
      const val = Math.round((minVal + pct * (maxVal - minVal)) / 1000) * 1000;
      return `
        <line x1="${padding.left}" y1="${y}" x2="${width - padding.right}" y2="${y}" stroke="#f1f5f9" stroke-width="1" />
        <text x="${padding.left - 8}" y="${y + 3}" fill="#94a3b8" font-size="10" text-anchor="end">$${val >= 1000 ? (val/1000) + 'k' : val}</text>
      `;
    }).join('');

    // X-axis labels
    const xLabels = points.map(p => `
      <text x="${p.x}" y="${height - 12}" fill="#94a3b8" font-size="10" text-anchor="middle">${p.label}</text>
    `).join('');

    // Interactive dots
    const dots = points.map((p, i) => `
      <circle class="chart-dot" data-idx="${i}" cx="${p.x}" cy="${p.y}" r="4" fill="#ffffff" stroke="#4f46e5" stroke-width="2" style="cursor:pointer;" />
    `).join('');

    el.chartSvg.setAttribute('viewBox', `0 0 ${width} ${height}`);
    el.chartSvg.innerHTML = `
      <defs>
        <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#4f46e5" stop-opacity="0.12" />
          <stop offset="100%" stop-color="#4f46e5" stop-opacity="0.0" />
        </linearGradient>
      </defs>
      ${gridLines}
      ${xLabels}
      <path d="${areaD}" fill="url(#chartGradient)" />
      <path d="${pathD}" fill="none" stroke="#4f46e5" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
      ${dots}
    `;

    // Add tooltip interactivity
    const dotElements = el.chartSvg.querySelectorAll('.chart-dot');
    dotElements.forEach(dot => {
      dot.addEventListener('mouseenter', (e) => {
        const idx = parseInt(dot.getAttribute('data-idx'), 10);
        const pt = points[idx];
        dot.setAttribute('r', '6');
        dot.setAttribute('fill', '#4f46e5');

        if (el.chartTooltip) {
          el.chartTooltip.style.display = 'block';
          el.chartTooltip.innerHTML = `<strong>$${pt.value.toLocaleString()}</strong> <span style="opacity:0.75;">(${pt.label})</span>`;
          
          const svgRect = el.chartSvg.getBoundingClientRect();
          const relativeX = (pt.x / width) * svgRect.width;
          const relativeY = (pt.y / height) * svgRect.height;
          
          el.chartTooltip.style.left = `${relativeX}px`;
          el.chartTooltip.style.top = `${relativeY}px`;
        }
      });

      dot.addEventListener('mouseleave', () => {
        dot.setAttribute('r', '4');
        dot.setAttribute('fill', '#ffffff');
        if (el.chartTooltip) el.chartTooltip.style.display = 'none';
      });
    });
  }

  // --- Modal Helpers ---
  function openModal() {
    if (el.detailModal) el.detailModal.classList.add('show');
  }

  function closeModal() {
    if (el.detailModal) el.detailModal.classList.remove('show');
  }

  if (el.modalCloseBtn) {
    el.modalCloseBtn.addEventListener('click', closeModal);
  }

  if (el.detailModal) {
    el.detailModal.addEventListener('click', (e) => {
      if (e.target === el.detailModal) closeModal();
    });
  }

  // --- Simulate Anomaly Demo Trigger ---
  function setupSimulateAnomaly() {
    if (el.simulateAnomalyBtn) {
      el.simulateAnomalyBtn.addEventListener('click', () => {
        const newId = 'ATT-' + (104 + Math.floor(Math.random() * 900));
        const newItem = {
          id: newId,
          title: 'Unusual Ad Spend Velocity Spike (Meta Ads - Retargeting Campaign #3)',
          category: 'Marketing Operations',
          urgency: 'high',
          urgencyLabel: 'Attention Required',
          rationale: 'Cost-per-acquisition climbed 28% in past 90 minutes due to audience saturation. Agent proposes throttling daily cap from $1,200 to $650 until creative refresh is ready.',
          impact: 'Avoids estimated $1,850 in inefficient ad spend over next 48 hours.',
          agent: 'Growth & Performance Agent',
          confidence: '97.8%',
          amount: 'Save $1,850',
          timestamp: 'Just now'
        };

        state.attentionItems.unshift(newItem);
        renderAttentionQueue();
        showToast('Simulated event triggered: Anomaly detected & added to approval queue.');
      });
    }
  }

  // Helper
  function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  // Expose global interface for inline buttons
  window.AutonomyApp = {
    approveItem,
    rejectItem,
    reviewItem,
    dismissRec,
    reviewRec,
    applyRec,
    inspectActivity,
    closeModal,
    showToast
  };

  // Run on load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
