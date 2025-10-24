/**
 * BizCore360 Universal Module Page Controller (v3)
 * - Horizontal icon+title menu (Overview, Info, AI Agent, Tech)
 * - Role-based visibility for Tech tab
 * - Reusable across all modules
 */

function initModulePage(config) {
  const { name, title, info, aiEndpoint } = config;
  const storageKey = `${name}Data`;

  // Get user role (default = viewer)
  const role = (window.currentUser && window.currentUser.role) || "viewer";

  // --- Build Menu HTML ---
  let menuHTML = `
    <div class="d-flex flex-wrap gap-3 mb-4" id="moduleMenu">
      <button class="btn btn-light border shadow-sm d-flex align-items-center gap-2 active" data-bs-target="#main" type="button">
        <i class="bi bi-speedometer2 fs-5 text-primary"></i>
        <span class="fw-medium">Overview</span>
      </button>

      <button class="btn btn-light border shadow-sm d-flex align-items-center gap-2" data-bs-target="#info" type="button">
        <i class="bi bi-info-circle fs-5 text-secondary"></i>
        <span class="fw-medium">Info</span>
      </button>

      <button class="btn btn-light border shadow-sm d-flex align-items-center gap-2" data-bs-target="#ai" type="button">
        <i class="bi bi-robot fs-5 text-success"></i>
        <span class="fw-medium">AI Agent</span>
      </button>
  `;

  // Show Tech tab only for admin/developer
  if (["admin", "developer"].includes(role)) {
    menuHTML += `
      <button class="btn btn-light border shadow-sm d-flex align-items-center gap-2" data-bs-target="#tech" type="button">
        <i class="bi bi-gear fs-5 text-muted"></i>
        <span class="fw-medium">Tech</span>
      </button>
    `;
  }

  menuHTML += `</div>`;

  // Inject Menu into the page
  const cardBody = document.querySelector('.card-body');
  if (cardBody && !document.getElementById('moduleMenu')) {
    cardBody.insertAdjacentHTML('afterbegin', menuHTML);
  }

  // --- Setup Titles ---
  document.getElementById('moduleTitle').textContent = title;
  document.getElementById('mainTabTitle').textContent = title + " Overview";
  document.getElementById('infoText').textContent = info;

  // --- Handle Menu Switching ---
  const buttons = document.querySelectorAll('#moduleMenu button');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      // deactivate all
      buttons.forEach(b => b.classList.remove('active'));
      // activate clicked
      btn.classList.add('active');
      // show tab content
      const targetId = btn.getAttribute('data-bs-target');
      document.querySelectorAll('.tab-pane').forEach(pane => {
        pane.classList.remove('show', 'active');
      });
      document.querySelector(targetId).classList.add('show', 'active');
    });
  });

  // --- Load saved data ---
  const saved = localStorage.getItem(storageKey);
  if (saved) renderData(JSON.parse(saved));

  // --- AI Form Handler ---
  const aiForm = document.getElementById('aiForm');
  if (aiForm) {
    aiForm.addEventListener('submit', async function (e) {
      e.preventDefault();
      const input = document.getElementById('aiInput').value.trim();
      if (!input) return alert("Please enter some data for the AI to process.");

      const result = {
        input,
        output: `AI processed data for module: ${name}`,
        timestamp: new Date().toISOString()
      };

      document.getElementById('aiOutput').innerHTML = `
        <div class="alert alert-success mt-3">
          <strong>AI Response:</strong> ${result.output}
        </div>`;

      localStorage.setItem(storageKey, JSON.stringify(result));
      renderData(result);
    });
  }

  // --- Render Overview + Tech ---
  function renderData(result) {
    const overview = document.getElementById('moduleData');
    if (overview) {
      overview.innerHTML = `
        <div class="card bg-light p-3">
          <p><strong>Last Run:</strong> ${new Date(result.timestamp).toLocaleString()}</p>
          <p><strong>Result:</strong> ${result.output}</p>
        </div>`;
    }

    const tech = document.getElementById('techData');
    if (tech) {
      tech.textContent = JSON.stringify({
        module: name,
        version: "3.0.0",
        ai_endpoint: aiEndpoint,
        storage: "localStorage",
        last_updated: result.timestamp,
        data: result
      }, null, 2);
    }
  }
}

// --- Inject Styling Globally ---
const style = document.createElement('style');
style.textContent = `
#moduleMenu .btn {
  border-radius: 10px;
  transition: all 0.2s ease-in-out;
  padding: 8px 14px;
}
#moduleMenu .btn.active, #moduleMenu .btn:focus, #moduleMenu .btn:hover {
  background-color: #f5f8ff;
  border-color: #0d6efd;
  color: #0d6efd;
}
#moduleMenu .btn span {
  font-size: 0.95rem;
}
`;
document.head.appendChild(style);
