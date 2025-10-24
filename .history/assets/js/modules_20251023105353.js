// modules.js
// Shared logic controlling all BizCore360 module pages dynamically

const moduleName = document.body.getAttribute("data-module");
console.log("✅ modules.js loaded successfully");

// ---------------------------
// Page Loader Logic
// ---------------------------

function showPage(page) {
  const contentDiv = document.getElementById("page-content");
  if (!contentDiv) {
    console.error("❌ #page-content element not found");
    return;
  }

  console.log(`🔄 Switching to page: ${page}`);

  // Fade-out transition
  contentDiv.classList.remove("show");

  setTimeout(() => {
    let html = "";

    switch (page) {
      case "overview":
        html = `
          <h4 class="fw-semibold mb-3 text-dark">Budget Overview</h4>
          <p>This section provides a quick view of your business budget.</p>
          <ul>
            <li>Product Sales: $18,500</li>
            <li>Service Income: $7,200</li>
            <li>Other Income: $800</li>
            <li><strong>Total Revenue: $26,500</strong></li>
          </ul>
        `;
        break;

      case "info":
        html = `
          <h4 class="fw-semibold mb-3 text-dark">Information</h4>
          <p>This module helps you plan and track your monthly business budget.</p>
          <p>Use it to manage revenues, expenses, and profit goals.</p>
        `;
        break;

      case "ai-agent":
        html = `
          <h4 class="fw-semibold mb-3 text-dark">AI Agent</h4>
          <p>The AI Agent will soon help analyze and optimize your budgets.</p>
          <em>Feature coming soon...</em>
        `;
        break;

      case "tech":
        html = `
          <h4 class="fw-semibold mb-3 text-dark">Tech Details</h4>
          <p>This page shows internal notes about how this module is built and maintained.</p>
        `;
        break;

      case "analytics":
        html = `
          <h4 class="fw-semibold mb-3 text-dark">Analytics</h4>
          <p>Visualize trends and insights based on budget data.</p>
          <canvas id="budgetChart"></canvas>
        `;
        break;

      case "best-practices":
        html = `
          <h4 class="fw-semibold mb-3 text-dark">Best Practices</h4>
          <p>Follow these key financial guidelines to maintain healthy business cash flow:</p>
          <ul>
            <li>Track expenses weekly</li>
            <li>Separate business and personal accounts</li>
            <li>Plan for taxes each quarter</li>
          </ul>
        `;
        break;

      default:
        html = `<p>Page not found.</p>`;
    }

    // Update page content and fade-in
    contentDiv.innerHTML = html;
    contentDiv.classList.add("show");

    // Optional chart rendering for analytics
    if (page === "analytics") {
      const ctx = document.getElementById("budgetChart");
      if (ctx) {
        new Chart(ctx, {
          type: "bar",
          data: {
            labels: ["Jan", "Feb", "Mar", "Apr", "May"],
            datasets: [
              {
                label: "Revenue ($)",
                data: [18000, 20000, 22000, 25000, 27000],
                borderWidth: 1
              }
            ]
          },
          options: {
            responsive: true,
            scales: {
              y: { beginAtZero: true }
            }
          }
        });
      }
    }

  }, 200); // End of setTimeout
}

// ---------------------------
// Utilities
// ---------------------------
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Make showPage available globally
window.showPage = showPage;
console.log("✅ showPage function exposed globally");
