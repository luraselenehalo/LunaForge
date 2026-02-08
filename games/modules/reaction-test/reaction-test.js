export default function createGame({ container, onScore, onMessage, onGameOver }) {
  let startTime = 0;
  let timeout = null;
  let active = false;

  const render = () => {
    container.innerHTML = `
      <p>Click the button when it turns green.</p>
      <button class="button secondary" id="reaction-button">Wait...</button>
    `;
  };

  const start = () => {
    render();
    onMessage("Get ready...");
    const button = container.querySelector("#reaction-button");
    active = false;
    button.disabled = true;
    const delay = 1000 + Math.random() * 2000;
    timeout = window.setTimeout(() => {
      active = true;
      button.disabled = false;
      button.textContent = "Click!";
      button.style.background = "var(--success)";
      startTime = performance.now();
      onMessage("Now!");
    }, delay);

    button.addEventListener("click", () => {
      if (!active) return;
      const reaction = Math.round(performance.now() - startTime);
      const score = Math.max(0, 1000 - reaction);
      onScore(score);
      onGameOver(score);
    });
  };

  const reset = () => {
    stop();
    start();
  };

  const stop = () => {
    if (timeout) window.clearTimeout(timeout);
    timeout = null;
  };

  render();
  return { start, reset, stop, destroy: () => container.innerHTML = "" };
}
