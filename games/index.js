import { loadGames } from "../core/game-loader.js";
import { gameRegistry } from "./modules/game-registry.js";

const container = document.querySelector("#games-container");

const renderCard = (game) => {
  const card = document.createElement("div");
  card.className = "card";
  card.innerHTML = `
    <span class="badge">${game.manifest.category ?? "Game"}</span>
    <h3>${game.manifest.name}</h3>
    <p>${game.manifest.description}</p>
    <a class="button secondary" href="/games/play.html?id=${game.manifest.id}">Play</a>
  `;
  return card;
};

const renderGames = async () => {
  const games = await loadGames({ registry: gameRegistry, container });
  container.innerHTML = "";
  games.forEach((game) => container.appendChild(renderCard(game)));
};

renderGames();
