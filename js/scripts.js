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
function loadPage(page) {
  const mainContent = document.getElementById("mainContent");
  if (!mainContent) {
    console.error("Main content container not found.");
    return;
  }

  // Show loading spinner
  mainContent.innerHTML = `
    <div class="text-center py-5">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      <p class="mt-3">Loading ${page.replace(".html", "")}...</p>
    </div>
  `;

  // Fetch and fade in new content
  fetch(`pages/${page}`)
    .then(res => {
      if (!res.ok) throw new Error("Page not found");
      return res.text();
    })
    .then(data => {
      mainContent.style.opacity = 0;
      setTimeout(() => {
        mainContent.innerHTML = data;
        mainContent.style.transition = "opacity 0.3s ease-in-out";
        mainContent.style.opacity = 1;
        window.scrollTo(0, 0);
      }, 150);
    })
    .catch(err => {
      mainContent.innerHTML = `
        <div class="alert alert-danger text-center mt-5">
          ⚠️ Error loading <strong>${page}</strong>: ${err.message}
        </div>
      `;
      console.error(err);
    });
}

// Alert utility
function showAlert(id) {
  const alertBox = document.getElementById(id);
  if (!alertBox) return;
  alertBox.classList.remove("d-none");
  setTimeout(() => alertBox.classList.add("d-none"), 2500);
}
