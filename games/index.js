import { loadGames } from "../core/game-loader.js";
import { gameRegistry } from "./modules/game-registry.js";

const container = document.querySelector("#games-container");

// Show loading skeleton
const showLoading = () => {
  container.innerHTML = Array(6).fill(0).map(() => `
    <div class="card" style="min-height: 200px;">
      <div class="skeleton" style="height: 20px; width: 80px; margin-bottom: 1rem;"></div>
      <div class="skeleton" style="height: 24px; width: 150px; margin-bottom: 0.75rem;"></div>
      <div class="skeleton" style="height: 60px; width: 100%; margin-bottom: 1rem;"></div>
      <div class="skeleton" style="height: 40px; width: 120px;"></div>
    </div>
  `).join('');
};

const renderCard = (game, index) => {
  const card = document.createElement("div");
  card.className = "card";
  card.style.animationDelay = `${index * 0.1}s`;
  card.innerHTML = `
    <span class="badge">${game.manifest.category ?? "Game"}</span>
    <h3>${game.manifest.name}</h3>
    <p>${game.manifest.description}</p>
    <a class="button secondary" href="/games/play.html?id=${game.manifest.id}">Play</a>
  `;
  return card;
};

const renderGames = async () => {
  showLoading();
  
  const games = await loadGames({ registry: gameRegistry, container });
  container.innerHTML = "";
  games.forEach((game, index) => container.appendChild(renderCard(game, index)));
  
  // Trigger reveal animations
  if (window.revealElements) {
    window.revealElements(container);
  }
};

renderGames();
