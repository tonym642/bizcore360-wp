// modules.js
// Handles page switching for all module inner menus (Budget, Balance Sheet, etc.)

function showPage(page) {
  const contentDiv = document.getElementById("page-content");
  if (!contentDiv) return;

  switch (page) {
    case "overview":
      contentDiv.innerHTML = `
        <h5 class="fw-semibold mb-2 text-dark">Budget Overview</h5>
        <p>Demo Budget – Small Business</p>
        <p><strong>Revenue:</strong><br>
          Product Sales: $18,500<br>
          Service Income: $7,200<br>
          Other Income: $800
        </p>
        <p><strong>Operating Expenses:</strong><br>
          Rent & Utilities: $3,000<br>
          Payroll & Benefits: $9,000<br>
          Marketing & Advertising: $1,200<br>
          Office Supplies: $350<br>
          Insurance: $400<br>
          Software Subscriptions: $250<br>
          Travel & Meals: $450<br>
          Miscellaneous: $200
        </p>
        <p><strong>Total Expenses:</strong> $14,850<br>
        <strong>Net Profit:</strong> $11,650</p>
        <p class="text-muted">Notes: Strong month with moderate ad spend and lower utility costs.</p>
      `;
      break;

    case "info":
      contentDiv.innerHTML = `
        <h5 class="fw-semibold mb-2 text-dark">Info</h5>
        <p>This section includes detailed information about the budget process.</p>
      `;
      break;

    case "ai-agent":
      contentDiv.innerHTML = `
        <h5 class="fw-semibold mb-2 text-dark">AI Agent</h5>
        <p>The AI Agent will analyze your budget patterns and offer suggestions.</p>
      `;
      break;

    case "tech":
      contentDiv.innerHTML = `
        <h5 class="fw-semibold mb-2 text-dark">Tech</h5>
        <p>Technical information about the budget module is documented here.</p>
      `;
      break;
  }
}
