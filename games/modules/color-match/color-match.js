const palette = [
  { name: "Blue", value: "#3b82f6" },
  { name: "Pink", value: "#ec4899" },
  { name: "Green", value: "#22c55e" },
  { name: "Orange", value: "#f97316" },
];

export default function createGame({ container, onScore, onMessage, onGameOver }) {
  let round = 0;
  let score = 0;
  let target = palette[0];

  const render = () => {
    container.innerHTML = `
      <p>Pick the swatch that matches: <strong id="color-target">${target.name}</strong></p>
      <div style="display:flex; gap:0.75rem; flex-wrap:wrap;">
        ${palette
          .map(
            (item) => `
          <button class="button secondary" data-color="${item.name}" style="background:${item.value}; color:#0b0f1a;">
            ${item.name}
          </button>
        `
          )
          .join("")}
      </div>
    `;
  };

  const nextRound = () => {
    round += 1;
    target = palette[Math.floor(Math.random() * palette.length)];
    render();
    if (round > 10) {
      onGameOver(score);
      return;
    }
    container.querySelectorAll("button[data-color]").forEach((button) => {
      button.addEventListener("click", () => {
        if (button.dataset.color === target.name) {
          score += 1;
          onScore(score);
        }
        nextRound();
      });
    });
  };

  const start = () => {
    round = 0;
    score = 0;
    onScore(0);
    onMessage("Match quickly.");
    nextRound();
  };

  const reset = () => start();

  return { start, reset, stop: () => {}, destroy: () => container.innerHTML = "" };
}
