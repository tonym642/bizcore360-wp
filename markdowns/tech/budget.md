# Budget Module – Technical Notes

This section documents how the **Budget module** is built, maintained, and connected within the BizCore360 system.

### Structure
- **HTML Source:** Located at `/pages/budget.html`  
- **Logic:** Shared globally through `/assets/js/modules.js`  
- **Documentation:** Markdown files under `/markdowns/info`, `/markdowns/tech`, and `/markdowns/best practices`

### Features
- **Dynamic Section Loader:** All inner pages (Overview, Info, Tech, Analytics, Best Practices) are contained in a single HTML file and rendered dynamically using JavaScript.  
- **Shared Logic:** The `modules.js` file controls page routing, fade transitions, and Markdown rendering across all modules.  
- **Visualization:** Uses Chart.js to render revenue, expense, and profit data interactively.  
- **Markdown Rendering:** Uses Marked.js to load `.md` content without reloading pages.

### Folder Path
