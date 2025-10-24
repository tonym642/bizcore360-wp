<div class="container-fluid p-4">
  <div class="card shadow-sm rounded-3">
    <div class="card-body">
      <h4 class="mb-3 fw-semibold text-primary" id="moduleTitle"></h4>

      <!-- Simplified Menu -->
      <div class="d-flex flex-wrap gap-3 mb-4" id="moduleMenu">
        <button class="btn btn-light border shadow-sm d-flex align-items-center gap-2 active" data-bs-toggle="tab" data-bs-target="#main" type="button" role="tab">
          <i class="bi bi-speedometer2 fs-5 text-primary"></i>
          <span class="fw-medium">Overview</span>
        </button>

        <button class="btn btn-light border shadow-sm d-flex align-items-center gap-2" data-bs-toggle="tab" data-bs-target="#info" type="button" role="tab">
          <i class="bi bi-info-circle fs-5 text-secondary"></i>
          <span class="fw-medium">Info</span>
        </button>

        <button class="btn btn-light border shadow-sm d-flex align-items-center gap-2" data-bs-toggle="tab" data-bs-target="#ai" type="button" role="tab">
          <i class="bi bi-robot fs-5 text-success"></i>
          <span class="fw-medium">AI Agent</span>
        </button>

        <button class="btn btn-light border shadow-sm d-flex align-items-center gap-2" data-bs-toggle="tab" data-bs-target="#tech" type="button" role="tab">
          <i class="bi bi-gear fs-5 text-muted"></i>
          <span class="fw-medium">Tech</span>
        </button>
      </div>

      <!-- Tab Content -->
      <div class="tab-content mt-3" id="moduleTabsContent">

        <!-- MAIN TAB -->
        <div class="tab-pane fade show active" id="main" role="tabpanel">
          <h5 class="fw-semibold" id="mainTabTitle"></h5>

          <!-- Budget Form -->
          <form id="budgetForm" class="needs-validation" novalidate>
            <div class="row mb-3 flex-row align-items-center">
              <div class="col-5 col-md-4 d-flex align-items-center justify-content-md-end justify-content-start">
                <label for="budgetMonth" class="form-label fw-medium w-100 text-md-end text-start mb-0">Month</label>
              </div>
              <div class="col-7 col-md-8">
                <input type="month" class="form-control text-start" id="budgetMonth" required />
              </div>
            </div>

            <div class="row mb-3 flex-row align-items-center">
              <div class="col-5 col-md-4 d-flex align-items-center justify-content-md-end justify-content-start">
                <label for="budgetYear" class="form-label fw-medium w-100 text-md-end text-start mb-0">Year</label>
              </div>
              <div class="col-7 col-md-8">
                <input type="number" class="form-control text-start" id="budgetYear" placeholder="2025" min="2000" max="2100" />
              </div>
            </div>

            <div class="row mb-3 flex-row align-items-center">
              <div class="col-5 col-md-4 d-flex align-items-center justify-content-md-end justify-content-start">
                <label for="totalIncome" class="form-label fw-medium w-100 text-md-end text-start mb-0">Total Income ($)</label>
              </div>
              <div class="col-7 col-md-8">
                <input type="number" class="form-control text-start" id="totalIncome" placeholder="0.00" step="0.01" />
              </div>
            </div>

            <div class="row mb-3 flex-row align-items-center">
              <div class="col-5 col-md-4 d-flex align-items-center justify-content-md-end justify-content-start">
                <label for="totalExpenses" class="form-label fw-medium w-100 text-md-end text-start mb-0">Total Expenses ($)</label>
              </div>
              <div class="col-7 col-md-8">
                <input type="number" class="form-control text-start" id="totalExpenses" placeholder="0.00" step="0.01" />
              </div>
            </div>

            <div class="row mb-3 flex-row align-items-start">
              <div class="col-5 col-md-4 d-flex align-self-start justify-content-md-end justify-content-start">
                <label for="budgetNotes" class="form-label fw-medium w-100 text-md-end text-start mb-0">Notes</label>
              </div>
              <div class="col-7 col-md-8">
                <textarea class="form-control text-start" id="budgetNotes" rows="3" placeholder="Add budget notes..."></textarea>
              </div>
            </div>

            <div class="text-end">
              <button type="reset" class="btn btn-outline-secondary me-2">Clear</button>
              <button type="submit" class="btn btn-primary">Save Budget</button>
            </div>
          </form>

          <div id="budgetAlert" class="alert alert-success mt-3 d-none" role="alert">
            ✅ Budget saved successfully!
          </div>
        </div>

        <!-- INFO TAB -->
        <div class="tab-pane fade" id="info" role="tabpanel">
          <h5 class="fw-semibold">About This Page</h5>
          <p id="infoText" class="text-secondary"></p>
        </div>

        <!-- AI AGENT TAB -->
        <div class="tab-pane fade" id="ai" role="tabpanel">
          <h5 class="fw-semibold">AI Agent</h5>
          <form id="aiForm" class="mt-3">
            <div class="mb-3">
              <label class="form-label">Ask the Budget AI</label>
              <textarea class="form-control" id="aiInput" rows="3" placeholder="e.g., Suggest how to reduce my expenses"></textarea>
            </div>
            <button type="submit" class="btn btn-primary">Run with AI</button>
          </form>
          <div id="aiOutput" class="mt-3"></div>
        </div>

        <!-- TECH TAB -->
        <div class="tab-pane fade" id="tech" role="tabpanel">
          <h5 class="fw-semibold">Technical Information</h5>
          <pre class="bg-light p-3 rounded small" id="techData"></pre>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- Inline style for spacing & highlight -->
<style>
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
</style>

<!-- Page Logic -->
<script>
initModulePage({
  name: "budget",
  title: "Budget Planner",
  info: "This page allows you to record and analyze your income and expenses, save your monthly budget, and run AI suggestions for optimization.",
  aiEndpoint: "/api/budget/run"
});

document.getElementById('budgetForm').addEventListener('submit', function(e){
  e.preventDefault();
  document.getElementById('budgetAlert').classList.remove('d-none');
  setTimeout(() => document.getElementById('budgetAlert').classList.add('d-none'), 3000);
});
</script>
