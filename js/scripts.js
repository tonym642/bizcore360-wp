// BizCore360 base script (moved to /js/scripts.js)
document.addEventListener("DOMContentLoaded", () => {
  console.log("BizCore360 assets loaded successfully.");

  // Default load (Dashboard)
  if (typeof loadPage === 'function') {
    loadPage("dashboard");
  }

  // Attach click handlers to menu links
  document.querySelectorAll("[data-page]").forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const page = link.getAttribute("data-page");
      if (page && typeof loadPage === 'function') loadPage(page);

      // Highlight active link
      document.querySelectorAll("[data-page]").forEach(l => l.classList.remove("active"));
      link.classList.add("active");
    });
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
    const response = await fetch(`pages/${page}`);
    if (!response.ok) throw new Error(`Failed to load ${page}`);
    const content = await response.text();

    // Prefer #mainContent, fallback to #pageContent or #main
    const mainContent = document.getElementById("mainContent") || document.getElementById("pageContent") || document.getElementById("main");
    if (!mainContent) {
      console.error("Main content container not found.");
      return;
    }

    mainContent.innerHTML = content;
    console.log(`✅ Loaded page: ${page}`);
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
