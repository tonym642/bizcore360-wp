// modules.js
// Shared logic controlling all BizCore360 module pages dynamically

const moduleName = document.body.getAttribute("data-module");

// ---------- LOAD MARKDOWN ----------
async function loadMarkdown(pageType) {
  const filePath = `/markdowns/${pageType}/${moduleName}.md`;
  const contentDiv = document.getElementById("page-content");
  try {
    const response = await fetch(filePath);
    if (!response.ok) throw new Error("File not found");
    const text = await response.text();
    contentDiv.innerHTML = marked.parse(text);
  } catch (error) {
    contentDiv.innerHTML = `<p style="color:#999;">No markdown found for <strong>${moduleName}</strong> (${pageType}).</p>`;
    console.error(error);
  }
}

// ---------- MAIN PAGE SWITCHER (WITH FADE) ----------
function showPage(page) {
  const contentDiv = document.getElementById("page-content");
  contentDiv.classList.remove("show");
  contentDiv.classList.add("fade");

  setTimeout(() => {
    contentDiv.innerHTML = "";

    switch (page) {
      case "overview":
        loadOverview();
        break;
      case "info":
        loadMarkdown("info");
        break;
      case "tech":
        loadMarkdown("tech");
        break;
      case "best-practices":
        loadMarkdown("best practices");
        break;
      case "analytics":
        loadAnalytics();
        break;
      case "ai-agent":
        loadAIAgent();
        break;
      default:
        contentDiv.innerHTML = `<p>Section not found.</p>`;
    }

    setTimeout(() => contentDiv.classList.add("show"), 50);
  }, 200);
}

// ---------- BUDGET OVERVIEW ----------
function loadOverview() {
  const contentDiv = document.getElementById("page-content");
  contentDiv.innerHTML = `
    <h4 class="fw-bold mb-3">Budget Overview</h4>
    <p>The <strong>Budget Overview</strong> provides a concise snapshot of how your resources are distributed and utilized across categories. It’s the perfect place to monitor financial balance, identify inefficiencies, and stay aligned with your business goals.</p>

    <div class="row mt-4">
      <div class="col-md-4">
        <div class="p-3 border rounded-3 shadow-sm bg-light">
          <h6 class="fw-semibold mb-2">💰 Total Revenue</h6>
          <h3 class="fw-bold text-success">$248,000</h3>
          <p class="small text-muted mb-0">All sources of income this quarter</p>
        </div>
      </div>
      <div class="col-md-4">
        <div class="p-3 border rounded-3 shadow-sm bg-light">
          <h6 class="fw-semibold mb-2">💸 Total Expenses</h6>
          <h3 class="fw-bold text-danger">$172,000</h3>
          <p class="small text-muted mb-0">Operational and variable costs</p>
        </div>
      </div>
      <div class="col-md-4">
        <div class="p-3 border rounded-3 shadow-sm bg-light">
          <h6 class="fw-semibold mb-2">📈 Net Profit</h6>
          <h3 class="fw-bold text-primary">$76,000</h3>
          <p class="small text-muted mb-0">Remaining after all expenses</p>
        </div>
      </div>
    </div>

    <div class="mt-5">
      <h5 class="fw-semibold mb-3">Category Breakdown</h5>
      <ul>
        <li><strong>Fixed Expenses:</strong> Rent, utilities, insurance — reviewed quarterly for efficiency.</li>
        <li><strong>Variable Costs:</strong> Marketing, production, logistics — optimized monthly based on ROI.</li>
        <li><strong>Growth Allocation:</strong> 20% of net profit is redirected to expansion and R&D initiatives.</li>
      </ul>
      <p class="mt-3">Your goal is to keep operating costs under <strong>70%</strong> of total revenue while ensuring enough liquidity for growth opportunities.</p>
    </div>
  `;
}

// ---------- BUDGET ANALYTICS ----------
function loadAnalytics() {
  const contentDiv = document.getElementById("page-content");
  contentDiv.innerHTML = `
    <h4 class="fw-bold mb-4">Budget Analytics</h4>
    <p>Explore your financial trends visually. These charts highlight income, expenses, and net profit patterns across time, giving you actionable insights for smarter planning.</p>

    <div class="row mt-4">
      <div class="col-md-6 mb-4">
        <canvas id="revenueExpensesChart"></canvas>
      </div>
      <div class="col-md-6 mb-4">
        <canvas id="profitTrendChart"></canvas>
      </div>
    </div>

    <div class="row">
      <div class="col-md-4">
        <div class="border rounded-3 p-3 bg-light shadow-sm">
          <h6 class="fw-semibold mb-2">💡 Insight</h6>
          <p class="small mb-0">Revenue growth outpaces expenses by <strong>12%</strong> on average this quarter — indicating healthy operational leverage.</p>
        </div>
      </div>
      <div class="col-md-4">
        <div class="border rounded-3 p-3 bg-light shadow-sm">
          <h6 class="fw-semibold mb-2">📊 Efficiency</h6>
          <p class="small mb-0">Expenses remain under <strong>68%</strong> of revenue — maintaining your target margin for profitability.</p>
        </div>
      </div>
      <div class="col-md-4">
        <div class="border rounded-3 p-3 bg-light shadow-sm">
          <h6 class="fw-semibold mb-2">📅 Forecast</h6>
          <p class="small mb-0">If current trends continue, projected Q2 net profit could exceed <strong>$90,000</strong>.</p>
        </div>
      </div>
    </div>
  `;

  renderBudgetCharts();
}

// ---------- BUDGET CHARTS ----------
function renderBudgetCharts() {
  const revenueExpensesCtx = document.getElementById("revenueExpensesChart");
  const profitTrendCtx = document.getElementById("profitTrendChart");

  if (!revenueExpensesCtx || !profitTrendCtx) return;

  // Chart 1: Revenue vs Expenses
  new Chart(revenueExpensesCtx, {
    type: "bar",
    data: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      datasets: [
        {
          label: "Revenue",
          data: [12000, 15000, 14000, 18000, 16000, 20000],
          backgroundColor: "rgba(54,162,235,0.7)",
          borderRadius: 6,
        },
        {
          label: "Expenses",
          data: [8000, 9000, 9500, 10000, 10500, 11000],
          backgroundColor: "rgba(255,99,132,0.7)",
          borderRadius: 6,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: "bottom" },
        title: { display: true, text: "Revenue vs Expenses (6-Month Overview)" },
      },
      scales: {
        y: { beginAtZero: true, ticks: { stepSize: 5000 } },
      },
    },
  });

  // Chart 2: Net Profit Trend
  new Chart(profitTrendCtx, {
    type: "line",
    data: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      datasets: [
        {
          label: "Net Profit",
          data: [4000, 6000, 4500, 8000, 5500, 9000],
          borderColor: "rgba(75,192,192,1)",
          backgroundColor: "rgba(75,192,192,0.2)",
          tension: 0.35,
          fill: true,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: "bottom" },
        title: { display: true, text: "Net Profit Trend (6-Month Performance)" },
      },
      scales: {
        y: { beginAtZero: true, ticks: { stepSize: 2000 } },
      },
    },
  });
}

// ---------- AI AGENT PLACEHOLDER ----------
function loadAIAgent() {
  const contentDiv = document.getElementById("page-content");
  contentDiv.innerHTML = `
    <h4 class="fw-bold mb-3">AI Agent</h4>
    <p>The AI Agent will soon help you analyze <strong>${capitalize(moduleName)}</strong> data, detect trends, and recommend optimization strategies.</p>
    <p><em>Coming soon...</em></p>
  `;
}

// ---------- UTILITIES ----------
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
window.showPage = showPage;
