import { loadPlugins } from "../core/plugin-loader.js";
import { toolRegistry } from "./plugins/plugin-registry.js";

const container = document.querySelector("#tool-container");

// Show loading skeleton
const showLoading = () => {
  container.innerHTML = `
    <div class="panel reveal">
      <div class="skeleton" style="height: 32px; width: 200px; margin-bottom: 1.5rem;"></div>
      <div class="card-grid">
        ${Array(6).fill(0).map(() => `
          <div class="card" style="min-height: 200px;">
            <div class="skeleton" style="height: 20px; width: 80px; margin-bottom: 1rem;"></div>
            <div class="skeleton" style="height: 24px; width: 150px; margin-bottom: 0.75rem;"></div>
            <div class="skeleton" style="height: 60px; width: 100%; margin-bottom: 1rem;"></div>
            <div class="skeleton" style="height: 40px; width: 120px;"></div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
};

const groupByCategory = (items) =>
  items.reduce((acc, item) => {
    const category = item.manifest.category || "Other";
    if (!acc[category]) acc[category] = [];
    acc[category].push(item);
    return acc;
  }, {});

const renderTool = (tool, index) => {
  const card = document.createElement("div");
  card.className = "card";
  card.style.animationDelay = `${index * 0.1}s`;
  card.innerHTML = `
    <span class="badge">${tool.manifest.category}</span>
    <h3>${tool.manifest.name}</h3>
    <p>${tool.manifest.description}</p>
    <button class="button secondary">Open Tool</button>
  `;
  const button = card.querySelector("button");
  button.addEventListener("click", () => {
    const modal = document.querySelector("#tool-modal");
    const modalInner = modal.querySelector(".tool-modal-inner");
    const modalContent = document.querySelector("#tool-modal-content");
    const modalTitle = document.querySelector("#tool-modal-title");
    const closeBtn = modal.querySelector("#tool-modal-close");
    
    // Close modal first if it's already open
    if (modal.open) {
      modal.close();
    }
    
    // Reset animation by removing and re-adding the inner container
    const parent = modalInner.parentNode;
    const newInner = modalInner.cloneNode(true);
    parent.replaceChild(newInner, modalInner);
    
    // Get fresh references after clone
    const freshContent = newInner.querySelector("#tool-modal-content");
    const freshTitle = newInner.querySelector("#tool-modal-title");
    const freshCloseBtn = newInner.querySelector("#tool-modal-close");
    
    // Set up fresh
    freshTitle.textContent = tool.manifest.name;
    
    // Initialize and render tool
    const state = tool.module.init?.() || {};
    tool.module.render(freshContent, state);
    
    // Show modal
    modal.showModal();
    
    // Set up close handler
    freshCloseBtn.onclick = () => {
      tool.module.destroy?.(freshContent, state);
      modal.close();
    };
    
    // Also close on backdrop click
    modal.onclick = (e) => {
      if (e.target === modal) {
        freshCloseBtn.click();
      }
    };
  });
  return card;
};

const renderTools = async () => {
  showLoading();
  
  const tools = await loadPlugins({ registry: toolRegistry, container, type: "tool" });
  const grouped = groupByCategory(tools);
  container.innerHTML = "";
  
  let sectionIndex = 0;
  Object.entries(grouped).forEach(([category, items]) => {
    const section = document.createElement("section");
    section.className = "panel reveal";
    section.style.animationDelay = `${sectionIndex * 0.2}s`;
    section.innerHTML = `<h2>${category}</h2>`;
    const grid = document.createElement("div");
    grid.className = "card-grid";
    items.forEach((tool, index) => grid.appendChild(renderTool(tool, index)));
    section.appendChild(grid);
    container.appendChild(section);
    sectionIndex++;
  });
  
  // Trigger reveal animations
  if (window.revealElements) {
    window.revealElements(container);
  }
};

renderTools();
