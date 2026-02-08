import { getQueryParam, navigate } from "../core/router.js";
import { loadGames } from "../core/game-loader.js";
import { gameRegistry } from "./modules/game-registry.js";
import { getLeaderboard, saveScore, clearLeaderboard } from "./leaderboard/leaderboard.js";

const container = document.querySelector("#game-board");
const title = document.querySelector("#game-title");
const description = document.querySelector("#game-description");
const scoreEl = document.querySelector("#game-score");
const messageEl = document.querySelector("#game-message");
const leaderboardList = document.querySelector("#leaderboard-list");
const clearButton = document.querySelector("#leaderboard-clear");
const restartButton = document.querySelector("#game-restart");
const backButton = document.querySelector("#game-back");

let activeGame = null;
let activeManifest = null;
let score = 0;

const updateScore = (value) => {
  const oldScore = score;
  score = value;
  scoreEl.textContent = `${score}`;
  
  // Animate score change
  if (value > oldScore) {
    scoreEl.style.transform = "scale(1.2)";
    scoreEl.style.color = "var(--success)";
    setTimeout(() => {
      scoreEl.style.transition = "all 0.3s ease";
      scoreEl.style.transform = "scale(1)";
      scoreEl.style.color = "";
    }, 150);
  }
};

const updateMessage = (value) => {
  messageEl.textContent = value;
};

const renderLeaderboard = () => {
  if (!activeManifest) return;
  const entries = getLeaderboard(activeManifest.id);
  leaderboardList.innerHTML = entries.length
    ? entries
        .map((entry) => `<li>${entry.score} <span class="helper-text">${new Date(entry.date).toLocaleString()}</span></li>`)
        .join("")
    : "<li>No scores yet. Be the first!</li>";
};

const handleGameOver = (finalScore) => {
  updateMessage("Game over. Score saved.");
  saveScore(activeManifest.id, finalScore);
  renderLeaderboard();
};

const showLoading = () => {
  container.innerHTML = `
    <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 300px; gap: 1rem;">
      <div class="loading" style="width: 50px; height: 50px;"></div>
      <p class="helper-text">Loading game...</p>
    </div>
  `;
  title.textContent = "Loading...";
  description.textContent = "";
};

const loadGame = async () => {
  const gameId = getQueryParam("id");
  if (!gameId) {
    navigate("/games/index.html");
    return;
  }

  showLoading();

  const games = await loadGames({ registry: gameRegistry, container: document.querySelector("#game-errors") });
  const game = games.find((item) => item.manifest.id === gameId);
  if (!game) {
    updateMessage("Game not found.");
    return;
  }

  activeManifest = game.manifest;
  
  // Animate title change
  title.style.opacity = 0;
  setTimeout(() => {
    title.textContent = game.manifest.name;
    title.style.transition = "opacity 0.3s ease";
    title.style.opacity = 1;
  }, 150);
  
  description.textContent = game.manifest.description;
  updateScore(0);
  updateMessage("Ready when you are.");

  activeGame = game.module({
    container,
    onScore: updateScore,
    onMessage: updateMessage,
    onGameOver: handleGameOver,
  });

  activeGame.start?.();
  renderLeaderboard();
};

restartButton.addEventListener("click", () => {
  if (activeGame?.reset) {
    updateScore(0);
    activeGame.reset();
  }
});

backButton.addEventListener("click", () => navigate("/games/index.html"));

clearButton.addEventListener("click", () => {
  if (!activeManifest) return;
  clearLeaderboard(activeManifest.id);
  renderLeaderboard();
});

loadGame();
