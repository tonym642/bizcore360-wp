// ==========================================
// BizCore360 – Global Configuration (v2.0)
// ==========================================

// 🔧 Detect environment: Localhost vs Deployed
const BASE_URL = window.location.hostname.includes("vercel.app")
  ? "https://bizcore360-ai.vercel.app" // your deployed domain
  : "http://127.0.0.1:5500";           // local Live Server address

// Make BASE_URL globally available
window.BASE_URL = BASE_URL;
console.log("🔧 Config loaded - BASE_URL set to:", BASE_URL);

// ==========================================
// 🌐 API Connection Utilities
// ==========================================

/**
 * Generic POST request to BizCore360 backend or OpenAI API proxy
 * @param {string} endpoint - The API route (e.g., '/api/openai')
 * @param {Object} payload - JSON data to send
 * @returns {Promise<Object>} - Parsed response or error
 */
async function postToAPI(endpoint, payload = {}) {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) throw new Error(`API Error: ${response.status}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("⚠️ API request failed:", error);
    return { error: error.message };
  }
}

// ==========================================
// 🧩 Placeholder functions for modular calls
// ==========================================

/**
 * Example global utility that can be reused anywhere.
 * Call this inside module pages (like /pages/polls.html)
 * when you need to perform an AI request.
 */
async function getExampleAIResponse(prompt) {
  const payload = {
    prompt: prompt || "Say hello from BizCore360 AI.",
  };

  const result = await postToAPI("/api/openai", payload);
  console.log("🤖 AI Response:", result);
  return result;
}

// ==========================================
// 🧠 Module-Specific Guards (optional future use)
// ==========================================

// Prevents scripts from trying to modify non-existent elements.
function safeSetHTML(id, html) {
  const el = document.getElementById(id);
  if (el) el.innerHTML = html;
  else console.warn(`⏩ Skipped: #${id} not found.`);
}

// ==========================================
// ✅ Initialization Log
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  console.log("BizCore360 config initialized successfully.");
});
