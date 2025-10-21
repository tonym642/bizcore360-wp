// BizCore360 base script (moved to /js/scripts.js)
document.addEventListener("DOMContentLoaded", () => {
  console.log("BizCore360 assets loaded successfully.");

  // Default load (Dashboard)
  if (typeof loadPage === 'function') {
    loadPage("dashboard");
  }

  // Attach click handlers to menu links with null checks
  document.querySelectorAll("[data-page]").forEach(link => {
    if (link) {
      link.addEventListener("click", e => {
        e.preventDefault();
        const page = link.getAttribute("data-page");
        if (page && typeof loadPage === 'function') loadPage(page);

        // Highlight active link
        document.querySelectorAll("[data-page]").forEach(l => l.classList.remove("active"));
        link.classList.add("active");
      });
    }
  });
});

// Global delegating click handler: route any element with data-page to loadPage
document.addEventListener("click", (e) => {
  const link = e.target.closest("[data-page]");
  if (link) {
    e.preventDefault();
    const page = link.getAttribute("data-page");
    if (page && typeof loadPage === 'function') loadPage(page);
  }
});

// Load any page into main content area
async function loadPage(page) {
  try {
    // Normalize page path: allow callers to pass "foo" or "foo.html" or "pages/foo.html"
    let normalized = String(page || "").trim();
    if (normalized.startsWith('pages/')) normalized = normalized.replace(/^pages\//, '');
    if (!normalized.endsWith('.html')) normalized = `${normalized}.html`;

    const response = await fetch(`pages/${normalized}`);
    if (!response.ok) throw new Error(`Failed to load ${normalized} (status ${response.status})`);
    const content = await response.text();

    // Prefer #mainContent, fallback to #pageContent or #main
    const mainContent = document.getElementById("mainContent") || document.getElementById("pageContent") || document.getElementById("main");
    if (!mainContent) {
      console.error("Main content container not found.");
      return;
    }

  mainContent.innerHTML = content;
  console.log("Page loaded:", normalized);
  // Wait for HTML to render, then initialize scripts safely
  setTimeout(() => initPageScripts(normalized), 100);
// Page-specific script initialization
function initPageScripts(page) {
  // Example: Budget page save button
  if (page === "budget.html") {
    const saveBtn = document.querySelector("#saveBudgetBtn");
    if (saveBtn) {
      saveBtn.addEventListener("click", handleBudgetSave);
    }
  }
  // Add more page-specific initializations here as needed
}

function handleBudgetSave(e) {
  e.preventDefault();
  const yearInput = document.querySelector('input[placeholder="2025"]');
  const expenseInput = document.querySelector('input[placeholder="0.00"]');
  const notesInput = document.querySelector("textarea");

  const data = {
    year: yearInput ? yearInput.value : "",
    expenses: expenseInput ? expenseInput.value : "",
    notes: notesInput ? notesInput.value : "",
  };

  localStorage.setItem("budgetData", JSON.stringify(data));
  alert("Budget saved locally!");
}
  } catch (error) {
    console.error("Error loading page:", error);
    const mainContent = document.getElementById("mainContent") || document.getElementById("pageContent") || document.getElementById("main");
    if (mainContent) {
      mainContent.innerHTML = `
        <div class="alert alert-warning m-4">
          ⚠️ Could not load ${page}. Please check that it exists in /pages/.
        </div>`;
    }
  }
}

// Alert utility
function showAlert(id) {
  const alertBox = document.getElementById(id);
  if (!alertBox) return;
  alertBox.classList.remove("d-none");
  setTimeout(() => alertBox.classList.add("d-none"), 2500);
}
