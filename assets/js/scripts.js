// BizCore360 base script
document.addEventListener("DOMContentLoaded", () => {
  console.log("BizCore360 assets loaded successfully.");

  // Default load (Dashboard)
  loadPage("dashboard.html");

  // Attach click handlers to menu links
  document.querySelectorAll("[data-page]").forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const page = link.getAttribute("data-page");
      loadPage(page);

      // Highlight active link
      document.querySelectorAll("[data-page]").forEach(l => l.classList.remove("active"));
      link.classList.add("active");
    });
  });
});

// ✅ FINAL BIZCORE360 Dynamic Page Loader
async function loadPage(page) {
  try {
    console.log("🔍 Trying to load page:", page);

    // Always fetch from /pages/
    const response = await fetch(`pages/${page}`);

    if (!response.ok) throw new Error(`Failed to load ${page}`);

    const content = await response.text();

    // Flexible container targeting
    const container =
      document.getElementById("mainContent") ||
      document.getElementById("pageContent") ||
      document.getElementById("main");

    if (!container) {
      console.error("❌ No valid content container found.");
      return;
    }

    container.innerHTML = content;
    console.log(`✅ Loaded page: ${page}`);
  } catch (error) {
    console.error("⚠️ Error loading page:", error);
    const fallback =
      document.getElementById("mainContent") ||
      document.getElementById("pageContent") ||
      document.getElementById("main");
    if (fallback)
      fallback.innerHTML = `
        <div class="alert alert-warning m-4">
          ⚠️ Could not load <strong>${page}</strong>.<br>
          Make sure the file exists in the <code>/pages/</code> folder.
        </div>`;
  }
}

// Alert utility
function showAlert(id) {
  const alertBox = document.getElementById(id);
  if (!alertBox) return;
  alertBox.classList.remove("d-none");
  setTimeout(() => alertBox.classList.add("d-none"), 2500);
}

<!-- forced-sync: 2025-10-21 17:41:54 -->
