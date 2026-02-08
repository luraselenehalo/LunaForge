import { loadTools } from "../core/game-loader.js";
import { toolRegistry } from "./plugins/plugin-registry.js";

const container = document.querySelector("#tool-container");

const groupByCategory = (items) =>
  items.reduce((acc, item) => {
    const category = item.manifest.category || "Other";
    if (!acc[category]) acc[category] = [];
    acc[category].push(item);
    return acc;
  }, {});

const renderTool = (tool) => {
  const card = document.createElement("div");
  card.className = "card";
  card.innerHTML = `
    <span class="badge">${tool.manifest.category}</span>
    <h3>${tool.manifest.name}</h3>
    <p>${tool.manifest.description}</p>
    <button class="button secondary">Open Tool</button>
  `;
  const button = card.querySelector("button");
  button.addEventListener("click", () => {
    const modal = document.querySelector("#tool-modal");
    const modalContent = document.querySelector("#tool-modal-content");
    const modalTitle = document.querySelector("#tool-modal-title");
    modalTitle.textContent = tool.manifest.name;
    modalContent.innerHTML = "";
    const state = tool.module.init?.() || {};
    tool.module.render(modalContent, state);
    modal.showModal();
    modal.querySelector("#tool-modal-close").onclick = () => {
      tool.module.destroy?.(modalContent, state);
      modal.close();
    };
  });
  return card;
};

const renderTools = async () => {
  const tools = await loadTools({ registry: toolRegistry, container });
  const grouped = groupByCategory(tools);
  container.innerHTML = "";
  Object.entries(grouped).forEach(([category, items]) => {
    const section = document.createElement("section");
    section.className = "panel";
    section.innerHTML = `<h2>${category}</h2>`;
    const grid = document.createElement("div");
    grid.className = "card-grid";
    items.forEach((tool) => grid.appendChild(renderTool(tool)));
    section.appendChild(grid);
    container.appendChild(section);
  });
};

renderTools();
