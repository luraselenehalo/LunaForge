export default function createGame({ container, onScore, onMessage, onGameOver }) {
  let timer = null;
  let remaining = 10;
  let score = 0;

  const render = () => {
    container.innerHTML = `
      <div id="aim-area" style="position:relative; height:320px; border-radius:16px; background:#0b0f1a;"></div>
      <p class="helper-text" id="aim-timer">Time left: ${remaining}s</p>
    `;
  };

  const spawnTarget = () => {
    const area = container.querySelector("#aim-area");
    const target = document.createElement("button");
    target.className = "button";
    target.style.position = "absolute";
    target.style.width = "32px";
    target.style.height = "32px";
    target.style.borderRadius = "50%";
    target.style.padding = "0";
    target.style.left = `${Math.random() * 260}px`;
    target.style.top = `${Math.random() * 260}px`;
    target.addEventListener("click", () => {
      score += 1;
      onScore(score);
      target.remove();
      spawnTarget();
    });
    area.appendChild(target);
  };

  const start = () => {
    score = 0;
    remaining = 10;
    onScore(0);
    onMessage("Click the targets.");
    render();
    spawnTarget();
    timer = window.setInterval(() => {
      remaining -= 1;
      container.querySelector("#aim-timer").textContent = `Time left: ${remaining}s`;
      if (remaining <= 0) {
        stop();
        onGameOver(score);
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

  return { start, reset, stop, destroy: stop };
}
