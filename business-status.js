const storeData = {
    "Mumbai": [
        { name: "Andheri West Hub", employees: 12, monthlyRev: "$45,000", annualRev: "$540,000", contribution: 35 },
        { name: "Bandra Flagship", employees: 18, monthlyRev: "$75,000", annualRev: "$900,000", contribution: 55 },
        { name: "Dadar Outlet", employees: 8, monthlyRev: "$12,000", annualRev: "$144,000", contribution: 10 }
    ],
    "Delhi": [
        { name: "Connaught Place", employees: 15, monthlyRev: "$60,000", annualRev: "$720,000", contribution: 40 },
        { name: "Saket Mall", employees: 10, monthlyRev: "$40,000", annualRev: "$480,000", contribution: 30 },
        { name: "Vasant Kunj", employees: 12, monthlyRev: "$48,000", annualRev: "$576,000", contribution: 30 }
    ],
    "Bangalore": [
        { name: "Indiranagar", employees: 14, monthlyRev: "$55,000", annualRev: "$660,000", contribution: 45 },
        { name: "Whitefield", employees: 16, monthlyRev: "$65,000", annualRev: "$780,000", contribution: 55 }
    ],
    "Hyderabad": [
        { name: "Hitech City", employees: 20, monthlyRev: "$80,000", annualRev: "$960,000", contribution: 60 },
        { name: "Jubilee Hills", employees: 12, monthlyRev: "$50,000", annualRev: "$600,000", contribution: 40 }
    ]
};

function renderStores() {
    const citySelect = document.getElementById('citySelect');
    const selectedCity = citySelect.value;
    const resultsContainer = document.getElementById('storeResults');
    const cityTitle = document.getElementById('selectedCityTitle');

    if (!selectedCity) {
        resultsContainer.innerHTML = '<p class="placeholder-text">Please select a city to view store analytics.</p>';
        cityTitle.style.display = 'none';
        return;
    }

    const stores = storeData[selectedCity];
    cityTitle.style.display = 'block';
    cityTitle.innerHTML = `Analyzing Stores in <span style="color:var(--secondary)">${selectedCity}</span>`;

    let html = '<div class="stores-grid">';

    stores.forEach(store => {
        html += `
        <div class="store-card fade-in">
            <div class="store-name">${store.name}</div>
            
            <div class="store-metric">
                <span class="label">Employees</span>
                <span class="value">${store.employees}</span>
            </div>
            <div class="store-metric">
                <span class="label">Monthly Rev</span>
                <span class="value">${store.monthlyRev}</span>
            </div>
            <div class="store-metric">
                <span class="label">Annual Rev</span>
                <span class="value">${store.annualRev}</span>
            </div>
            
            <div class="store-metric" style="margin-top: 15px;">
                <span class="label">Contribution</span>
                <span class="value">${store.contribution}%</span>
            </div>
            <div class="contribution-bar">
                <div class="contribution-fill" style="width: ${store.contribution}%"></div>
            </div>
        </div>
        `;
    });

    html += '</div>';
    resultsContainer.innerHTML = html;
}
