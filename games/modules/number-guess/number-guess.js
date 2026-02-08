export default function createGame({ container, onScore, onMessage, onGameOver }) {
  let target = 0;
  let attempts = 0;

  const render = () => {
    container.innerHTML = `
      <p>Guess a number between 1 and 100.</p>
      <input id="guess-input" type="number" min="1" max="100" />
      <button class="button" id="guess-submit">Submit</button>
      <p class="helper-text" id="guess-hint"></p>
    `;
  };

  const start = () => {
    target = Math.floor(Math.random() * 100) + 1;
    attempts = 0;
    onScore(0);
    onMessage("Make your first guess.");
    render();
    const hint = container.querySelector("#guess-hint");
    container.querySelector("#guess-submit").addEventListener("click", () => {
      const value = Number(container.querySelector("#guess-input").value);
      if (!value) return;
      attempts += 1;
      if (value === target) {
        const score = Math.max(0, 100 - attempts * 5);
        onScore(score);
        onGameOver(score);
        hint.textContent = `Correct! It took ${attempts} tries.`;
      } else if (value < target) {
        hint.textContent = "Too low. Try higher.";
      } else {
        hint.textContent = "Too high. Try lower.";
      }
    });
  };

  const reset = () => start();
  const stop = () => {};

  render();
  return { start, reset, stop, destroy: () => container.innerHTML = "" };
}
