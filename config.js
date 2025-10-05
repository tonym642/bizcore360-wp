// config.js

async function createFocusGroup() {
  const setupContainer = document.getElementById("setup-container");
  const personasContainer = document.getElementById("personas-container");

  // Show loading spinner
  setupContainer.innerHTML = `
    <div class="text-center py-5">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      <p class="mt-3">Creating your focus group personas...</p>
    </div>
  `;

  try {
    const response = await fetch("/api/openai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        prompt:
          "Create 11 AI personas for a focus group covering marketing, finance, HR, legal, and operations roles. Provide a name, role, short bio, and personality trait for each.",
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "OpenAI request failed");
    }

    // Display response
    setupContainer.classList.add("d-none");
    personasContainer.classList.remove("d-none");

    personasContainer.innerHTML = `
      <div class="card p-4 shadow-sm">
        <h3>🧠 Your AI Focus Group</h3>
        <pre>${JSON.stringify(data, null, 2)}</pre>
      </div>
    `;
  } catch (error) {
    console.error("Error:", error);
    setupContainer.innerHTML = `
      <div class="alert alert-danger">
        ⚠️ Error creating focus group: ${error.message}
      </div>
    `;
  }
}

// Run automatically when the page loads
createFocusGroup();
