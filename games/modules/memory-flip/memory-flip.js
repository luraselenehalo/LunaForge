export default function createGame({ container, onScore, onMessage, onGameOver }) {
  let first = null;
  let lock = false;
  let matches = 0;

  const cards = ["🌙", "⭐", "🚀", "🪐", "🌙", "⭐", "🚀", "🪐"].sort(
    () => Math.random() - 0.5
  );

  const render = () => {
    container.innerHTML = `
      <div class="card-grid" style="grid-template-columns: repeat(4, minmax(60px, 1fr));">
        ${cards
          .map(
            (icon, index) => `
          <button class="card" data-index="${index}" style="align-items:center; justify-content:center; font-size:1.5rem;">
            <span aria-hidden="true">?</span>
          </button>
        `
          )
          .join("")}
      </div>
    `;
  };

  const start = () => {
    matches = 0;
    onScore(0);
    onMessage("Find all pairs.");
    render();
    container.querySelectorAll("button[data-index]").forEach((button) => {
      button.addEventListener("click", () => {
        if (lock || button.dataset.revealed) return;
        const index = Number(button.dataset.index);
        button.textContent = cards[index];
        button.dataset.revealed = "true";
        if (!first) {
          first = { index, button };
          return;
        }
        if (cards[first.index] === cards[index]) {
          matches += 1;
          onScore(matches);
          first = null;
          if (matches === cards.length / 2) {
            onGameOver(matches);
          }
        } else {
          lock = true;
          window.setTimeout(() => {
            first.button.textContent = "?";
            first.button.dataset.revealed = "";
            button.textContent = "?";
            button.dataset.revealed = "";
            first = null;
            lock = false;
          }, 600);
        }
      });
    });
  };

  const reset = () => {
    first = null;
    lock = false;
    start();
  };

  render();
  return { start, reset, stop: () => {}, destroy: () => container.innerHTML = "" };
}
