/**
 * BizCore360 Universal Module Page Controller (v5)
 * - Horizontal menu (Overview, Info, AI Agent, Tech)
 * - Role-based visibility for Tech tab
 * - Universal AI Chat interface
 * - Voice input + File upload support
 */

function initModulePage(config) {
  const { name, title, info, aiEndpoint } = config;
  const storageKey = `${name}Data`;
  const role = (window.currentUser && window.currentUser.role) || "viewer";

  // Build module menu
  let menuHTML = `
    <div class="d-flex flex-wrap gap-3 mb-4" id="moduleMenu">
      <button class="btn btn-light border shadow-sm d-flex align-items-center gap-2 active" data-bs-target="#main">
        <i class="bi bi-speedometer2 fs-5 text-primary"></i><span class="fw-medium">Overview</span>
      </button>
      <button class="btn btn-light border shadow-sm d-flex align-items-center gap-2" data-bs-target="#info">
        <i class="bi bi-info-circle fs-5 text-secondary"></i><span class="fw-medium">Info</span>
      </button>
      <button class="btn btn-light border shadow-sm d-flex align-items-center gap-2" data-bs-target="#ai">
        <i class="bi bi-robot fs-5 text-success"></i><span class="fw-medium">AI Agent</span>
      </button>`;

  if (["admin", "developer"].includes(role)) {
    menuHTML += `
      <button class="btn btn-light border shadow-sm d-flex align-items-center gap-2" data-bs-target="#tech">
        <i class="bi bi-gear fs-5 text-muted"></i><span class="fw-medium">Tech</span>
      </button>`;
  }

  menuHTML += `</div>`;

  const cardBody = document.querySelector('.card-body');
  if (cardBody && !document.getElementById('moduleMenu')) cardBody.insertAdjacentHTML('afterbegin', menuHTML);

  document.getElementById('moduleTitle').textContent = title;
  document.getElementById('mainTabTitle').textContent = `${title} Overview`;
  document.getElementById('infoText').textContent = info;

  // Handle switching between tabs
  const buttons = document.querySelectorAll('#moduleMenu button');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const target = btn.dataset.bsTarget;
      document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('show', 'active'));
      document.querySelector(target).classList.add('show', 'active');
    });
  });

  // Load saved AI data
  const saved = localStorage.getItem(storageKey);
  if (saved) renderData(JSON.parse(saved));

  // --- Inject universal AI chat interface ---
  const aiTab = document.getElementById('ai');
  if (aiTab && !document.getElementById('chatContainer')) {
    aiTab.innerHTML = `
      <h5 class="fw-semibold mb-3">AI Agent</h5>
      <div class="border rounded-3 p-3 bg-light" style="min-height:320px;max-height:500px;overflow-y:auto;" id="chatContainer">
        <div id="chatMessages" class="d-flex flex-column gap-3"></div>
      </div>
      <div class="d-flex align-items-center mt-3 border rounded-pill px-3 py-2 bg-white shadow-sm position-relative">
        <!-- Hidden file input -->
        <input type="file" id="fileInput" multiple hidden accept="image/*,.pdf,.doc,.docx,.txt" />
        <!-- + Button -->
        <button class="btn btn-link text-secondary p-0 me-2" id="chatAdd">
          <i class="bi bi-plus-circle fs-5"></i>
        </button>
        <!-- Text input -->
        <input type="text" id="chatInput" class="form-control border-0 flex-grow-1" placeholder="Type a message..." />
        <!-- Mic -->
        <button class="btn btn-link text-secondary p-0 ms-2 me-2" id="chatMic">
          <i class="bi bi-mic fs-5"></i>
        </button>
        <!-- Send -->
        <button class="btn btn-primary rounded-circle d-flex align-items-center justify-content-center" id="chatSend" style="width:36px;height:36px;">
          <i class="bi bi-send-fill text-white fs-6"></i>
        </button>
      </div>`;
    setupChat(aiEndpoint);
  }

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
        version: "5.0.0",
        ai_endpoint: aiEndpoint,
        storage: "localStorage",
        last_updated: result.timestamp,
        data: result
      }, null, 2);
    }
  }
}

/* --- UNIVERSAL CHAT BEHAVIOR (Voice + Upload) --- */
function setupChat(aiEndpoint) {
  const chatMessages = document.getElementById("chatMessages");
  const chatInput = document.getElementById("chatInput");
  const chatSend = document.getElementById("chatSend");
  const chatAdd = document.getElementById("chatAdd");
  const chatMic = document.getElementById("chatMic");
  const fileInput = document.getElementById("fileInput");

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

    addMessage("🤖 Thinking...", "ai");

    // Simulated AI response (replace with fetch(aiEndpoint) later)
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

  // --- Voice Input (SpeechRecognition API) ---
  if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;

    chatMic.addEventListener("click", () => {
      recognition.start();
      chatMic.classList.add("text-primary");
    });

    recognition.onresult = event => {
      const transcript = event.results[0][0].transcript;
      chatInput.value = transcript;
      chatMic.classList.remove("text-primary");
    };

    recognition.onerror = () => chatMic.classList.remove("text-primary");
    recognition.onend = () => chatMic.classList.remove("text-primary");
  } else {
    chatMic.disabled = true;
    chatMic.title = "Voice input not supported on this browser";
  }

  // --- File Upload (+) ---
  chatAdd.addEventListener("click", () => fileInput.click());
  fileInput.addEventListener("change", () => {
    const files = Array.from(fileInput.files);
    files.forEach(file => {
      addMessage(`📎 Uploaded: ${file.name}`, "user");
    });
    fileInput.value = ""; // reset
  });
}

// --- Styling ---
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
#moduleMenu .btn span { font-size: 0.95rem; }
#chatContainer { background-color: #fafafa; }
#chatMessages::-webkit-scrollbar { width: 6px; }
#chatMessages::-webkit-scrollbar-thumb { background-color: #ccc; border-radius: 4px; }
`;
document.head.appendChild(style);
