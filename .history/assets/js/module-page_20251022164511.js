document.addEventListener("DOMContentLoaded", function () {
  const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
  tooltipTriggerList.map(function (el) {
    return new bootstrap.Tooltip(el);
  });
});

function initModulePage(config) {
  const { name, title, info, aiEndpoint } = config;
  const storageKey = `${name}Data`;

  document.getElementById('moduleTitle').textContent = title;
  document.getElementById('mainTabTitle').textContent = title + " Overview";
  document.getElementById('infoText').textContent = info;

  const saved = localStorage.getItem(storageKey);
  if (saved) renderData(JSON.parse(saved));

  const aiForm = document.getElementById('aiForm');
  if (!aiForm) return console.warn(`AI form not found for module: ${name}`);

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

  function renderData(result) {
    document.getElementById('moduleData').innerHTML = `
      <div class="card bg-light p-3">
        <p><strong>Last Run:</strong> ${new Date(result.timestamp).toLocaleString()}</p>
        <p><strong>Result:</strong> ${result.output}</p>
      </div>`;

    document.getElementById('techData').textContent = JSON.stringify({
      module: name,
      version: "1.0.0",
      ai_endpoint: aiEndpoint,
      storage: "localStorage",
      last_updated: result.timestamp,
      data: result
    }, null, 2);
  }
}
