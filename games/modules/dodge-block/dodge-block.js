export default function createGame({ container, onScore, onMessage, onGameOver }) {
  let player = { x: 120 };
  let block = { x: 80, y: -40 };
  let timer = null;
  let score = 0;

  const render = () => {
    container.innerHTML = `
      <div id="dodge-area" style="position:relative; height:320px; background:#0b0f1a; border-radius:16px; overflow:hidden;">
        <div id="player" style="position:absolute; bottom:12px; left:${player.x}px; width:32px; height:32px; background:var(--accent); border-radius:8px;"></div>
        <div id="block" style="position:absolute; top:${block.y}px; left:${block.x}px; width:32px; height:32px; background:var(--danger); border-radius:8px;"></div>
      </div>
      <p class="helper-text">Use arrow keys to move.</p>
    `;
  };

  const movePlayer = (direction) => {
    player.x = Math.max(0, Math.min(260, player.x + direction));
    container.querySelector("#player").style.left = `${player.x}px`;
  };

  const tick = () => {
    block.y += 8;
    if (block.y > 320) {
      block.y = -40;
      block.x = Math.floor(Math.random() * 260);
      score += 1;
      onScore(score);
    }
    const blockEl = container.querySelector("#block");
    blockEl.style.top = `${block.y}px`;
    blockEl.style.left = `${block.x}px`;

    if (block.y > 260 && Math.abs(block.x - player.x) < 28) {
      stop();
      onGameOver(score);
    }
  };

  const start = () => {
    score = 0;
    block = { x: 80, y: -40 };
    player = { x: 120 };
    onScore(0);
    onMessage("Avoid the block.");
    render();
    window.addEventListener("keydown", handleKey);
    timer = window.setInterval(tick, 100);
  };

  const handleKey = (event) => {
    if (event.key === "ArrowLeft") movePlayer(-20);
    if (event.key === "ArrowRight") movePlayer(20);
  };

  const reset = () => {
    stop();
    start();
  };

  const stop = () => {
    if (timer) window.clearInterval(timer);
    timer = null;
    window.removeEventListener("keydown", handleKey);
  };

  return { start, reset, stop, destroy: stop };
}
