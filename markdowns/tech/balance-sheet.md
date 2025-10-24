# Balance Sheet Module – Technical Notes

This document describes the technical foundation of the **Balance Sheet module** within BizCore360.

### Structure
- **HTML File:** `pages/balance-sheet.html`  
- **Script:** `/assets/js/modules.js` (shared logic)  
- **Documentation:** Markdown files for Info, Tech, and Best Practices.

### Features
- **Unified JS Engine:** Uses `modules.js` to dynamically switch sections and load Markdown content.  
- **Chart Integration:** Visual summaries of asset allocation and debt ratios are built using Chart.js.  
- **Reusable Markdown Loader:** The same script logic applies across all financial modules.

### Folder Path
