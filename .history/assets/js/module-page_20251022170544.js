/**
 * BizCore360 Universal Module Page Controller (v4)
 * - Horizontal icon+title menu (Overview, Info, AI Agent, Tech)
 * - Role-based visibility for Tech tab
 * - Universal AI chat interface
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
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const targetId = btn.getAttribute('data-bs-target');
      document.querySelectorAll('.tab-pane').forEach(pane => {
        pane.classList.remove('show', 'active');
      });
      document.querySelector(targetId).classList.add('show', 'active');
    });
  });

  // --- Load saved AI data ---
  const saved = localStorage.getItem(storageKey);
  if (saved) renderData(JSON.parse(saved));

  // --- Universal AI Chat Interface Setup ---
  const aiTab = document.getElementById('ai');
  if (aiTab && !document.getElementById('chatContainer')) {
    aiTab.innerHTML = `
      <h5 class="fw-semibold mb-3">AI Agent</h5>
      <div class="border rounded-3 p-3 bg-light" style="min-height: 320px; max-height: 500px; overflow-y: auto;" id="chatContainer">
        <div id="chatMessages" class="d-flex flex-column gap-3"></div>
      </div>
      <div class="d-flex align-items-center mt-3 border rounded-pill px-3 py-2 bg-white shadow-sm">
        <button class="btn btn-link text-secondary p-0 me-2" id="chatAdd">
          <i class="bi bi-plus-circle fs-5"></i>
        </button>
        <input type="text" id="chatInput" class="form-control border-0 flex-grow-1" placeholder="Type a message..." />
        <button class="btn btn-link text-secondary p-0 ms-2 me-2" id="chatMic">
          <i class="bi bi-mic fs-5"></i>
        </button>
        <button class="btn btn-primary rounded-circle d-flex align-items-center justify-content-center" id="chatSend" style="width: 36px; height: 36px;">
          <i class="bi bi-send-fill text-white fs-6"></i>
        </button>
      </div>
    `;

    setupChat(aiEndpoint);
  }

  // --- Render Overview + Tech Tabs ---
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
        version: "4.0.0",
        ai_endpoint: aiEndpoint,
        storage: "localStorage",
        last_updated: result.timestamp,
        data: result
      }, null, 2);
    }
  }
}

/* --- Setup Universal Chat Behavior --- */
function setupChat(aiEndpoint) {
  const chatInput = document.getElementById("chatInput");
  const chatSend = document.getElementById("chatSend");
  const chatMessages = document.getElementById("chatMessages");

  if (!chatInput || !chatSend || !chatMessages) return;

  function addMessage(text, sender = "user") {
    const msg = document.createElement("div");
    msg.className = sender === "user"
      ? "align-self-end bg-primary text-white rounded-3 px-3 py-2"
      : "align-self-start bg-secondary-subtle text-dark rounded-3 px-3 py-2";
    msg.style.maxWidth = "75%";
    msg.innerText = text;
    chatMessages.appendChild(msg);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  chatSend.addEventListener("click", async () => {
    const text = chatInput.value.trim();
    if (!text) return;
    addMessage(text, "user");
    chatInput.value = "";

    // Simulated AI response (replace with real fetch later)
    addMessage("🤖 Thinking...", "ai");

    // You can later replace this with a call like:
    // const response = await fetch(aiEndpoint, { method: 'POST', body: JSON.stringify({ prompt: text }) });
    setTimeout(() => {
      chatMessages.lastChild.innerText = `🤖 AI: Here's a generated response to "${text}".`;
    }, 1000);
  });

  chatInput.addEventListener("keypress", e => {
    if (e.key === "Enter") {
      e.preventDefault();
      chatSend.click();
    }
  });
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
#chatContainer {
  background-color: #fafafa;
}
#chatMessages::-webkit-scrollbar {
  width: 6px;
}
#chatMessages::-webkit-scrollbar-thumb {
  background-color: #ccc;
  border-radius: 4px;
}
`;
document.head.appendChild(style);
