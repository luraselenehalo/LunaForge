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
  score = value;
  scoreEl.textContent = `${score}`;
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

const loadGame = async () => {
  const gameId = getQueryParam("id");
  if (!gameId) {
    navigate("/games/index.html");
    return;
  }

  const games = await loadGames({ registry: gameRegistry, container: document.querySelector("#game-errors") });
  const game = games.find((item) => item.manifest.id === gameId);
  if (!game) {
    updateMessage("Game not found.");
    return;
  }

  activeManifest = game.manifest;
  title.textContent = game.manifest.name;
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
