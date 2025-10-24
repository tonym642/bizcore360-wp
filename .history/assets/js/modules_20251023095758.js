// modules.js
// Shared script controlling all module pages dynamically (Budget, Cash Flow, etc.)

const moduleName = document.body.getAttribute("data-module");

// Load markdown files dynamically (Info, Tech, Best Practices)
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

// ---------- PAGE SWITCHER WITH FADE EFFECT ----------
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

// ---------- PAGE CONTENT LOADERS ----------
function loadOverview() {
  const contentDiv = document.getElementById("page-content");
  contentDiv.innerHTML = `
    <h4 class="fw-bold mb-3">${capitalize(moduleName)} Overview</h4>
    <p>The <strong>${capitalize(moduleName)}</strong> module provides an overview of your key performance indicators and financial structure.</p>
    <ul>
      <li><strong>Revenue:</strong> Track total inflows from products or services.</li>
      <li><strong>Operating Expenses:</strong> Manage costs associated with daily operations.</li>
      <li><strong>Net Profit:</strong> Review the remaining balance after expenses.</li>
    </ul>
    <p>Use this dashboard to stay proactive and maintain strong financial health across your operations.</p>
  `;
}

function loadAnalytics() {
  const contentDiv = document.getElementById("page-content");
  contentDiv.innerHTML = `
    <h4 class="fw-bold mb-4">${capitalize(moduleName)} Analytics</h4>
    <div class="row">
      <div class="col-md-6 mb-4"><canvas id="chart1"></canvas></div>
      <div class="col-md-6 mb-4"><canvas id="chart2"></canvas></div>
    </div>
  `;
  renderGenericCharts();
}

function loadAIAgent() {
  const contentDiv = document.getElementById("page-content");
  contentDiv.innerHTML = `
    <h4 class="fw-bold mb-3">AI Agent</h4>
    <p>The AI Agent will soon help you analyze <strong>${capitalize(moduleName)}</strong> data, detect trends, and recommend optimization strategies.</p>
    <p><em>Coming soon...</em></p>
  `;
}

// ---------- CHART RENDERERS ----------
function renderGenericCharts() {
  const ctx1 = document.getElementById("chart1");
  const ctx2 = document.getElementById("chart2");

  if (!ctx1 || !ctx2) return;

  // Chart 1: Revenue vs Expenses
  new Chart(ctx1, {
    type: "bar",
    data: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      datasets: [
        {
          label: "Revenue",
          data: [12000, 15000, 14000, 18000, 16000, 20000],
          backgroundColor: "rgba(54,162,235,0.6)",
        },
        {
          label: "Expenses",
          data: [8000, 9000, 9500, 10000, 10500, 11000],
          backgroundColor: "rgba(255,99,132,0.6)",
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: "bottom" },
        title: { display: true, text: "Revenue vs Expenses" },
      },
    },
  });

  // Chart 2: Profit Trend
  new Chart(ctx2, {
    type: "line",
    data: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      datasets: [
        {
          label: "Net Profit",
          data: [4000, 6000, 4500, 8000, 5500, 9000],
          borderColor: "rgba(75,192,192,1)",
          backgroundColor: "rgba(75,192,192,0.2)",
          tension: 0.3,
          fill: true,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: "bottom" },
        title: { display: true, text: "Net Profit Trend" },
      },
    },
  });
}

// ---------- UTILITIES ----------
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}