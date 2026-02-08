export default function createGame({ container, onScore, onMessage, onGameOver }) {
  let clicks = 0;
  let timer = null;
  let remaining = 5;

  const render = () => {
    container.innerHTML = `
      <p>Click the button quickly before the timer runs out.</p>
      <button class="button" id="click-target">Click me</button>
      <p class="helper-text" id="click-timer">Time left: ${remaining}s</p>
    `;
  };

  const start = () => {
    clicks = 0;
    remaining = 5;
    onScore(0);
    onMessage("Ready... go!");
    render();
    const target = container.querySelector("#click-target");
    target.addEventListener("click", () => {
      clicks += 1;
      onScore(clicks);
    });
    timer = window.setInterval(() => {
      remaining -= 1;
      container.querySelector("#click-timer").textContent = `Time left: ${remaining}s`;
      if (remaining <= 0) {
        stop();
        onGameOver(clicks);
      }
    }, 1000);
  };

  const reset = () => {
    stop();
    start();
  };

  const stop = () => {
    if (timer) window.clearInterval(timer);
    timer = null;
  };

  render();
  return { start, reset, stop, destroy: () => container.innerHTML = "" };
}
