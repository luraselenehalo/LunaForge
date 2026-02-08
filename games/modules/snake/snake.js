export default function createGame({ container, onScore, onMessage, onGameOver }) {
  const size = 15;
  let snake = [{ x: 7, y: 7 }];
  let direction = { x: 1, y: 0 };
  let food = { x: 3, y: 3 };
  let timer = null;

  const render = () => {
    container.innerHTML = `<canvas id="snake-canvas" width="300" height="300" style="border-radius:16px; background:#0b0f1a;"></canvas>`;
  };

  const draw = () => {
    const canvas = container.querySelector("#snake-canvas");
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const cell = canvas.width / size;
    ctx.fillStyle = "#7c8cff";
    snake.forEach((segment) => ctx.fillRect(segment.x * cell, segment.y * cell, cell - 2, cell - 2));
    ctx.fillStyle = "#facc15";
    ctx.fillRect(food.x * cell, food.y * cell, cell - 2, cell - 2);
  };

  const move = () => {
    const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
    if (head.x < 0 || head.y < 0 || head.x >= size || head.y >= size) {
      stop();
      onGameOver(snake.length - 1);
      return;
    }
    if (snake.some((segment) => segment.x === head.x && segment.y === head.y)) {
      stop();
      onGameOver(snake.length - 1);
      return;
    }
    snake.unshift(head);
    if (head.x === food.x && head.y === food.y) {
      onScore(snake.length - 1);
      food = { x: Math.floor(Math.random() * size), y: Math.floor(Math.random() * size) };
    } else {
      snake.pop();
    }
    draw();
  };

  const handleKey = (event) => {
    if (event.key === "ArrowUp" && direction.y === 0) direction = { x: 0, y: -1 };
    if (event.key === "ArrowDown" && direction.y === 0) direction = { x: 0, y: 1 };
    if (event.key === "ArrowLeft" && direction.x === 0) direction = { x: -1, y: 0 };
    if (event.key === "ArrowRight" && direction.x === 0) direction = { x: 1, y: 0 };
  };

  const start = () => {
    snake = [{ x: 7, y: 7 }];
    direction = { x: 1, y: 0 };
    food = { x: Math.floor(Math.random() * size), y: Math.floor(Math.random() * size) };
    onScore(0);
    onMessage("Use arrow keys to move.");
    render();
    draw();
    window.addEventListener("keydown", handleKey);
    timer = window.setInterval(move, 180);
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
