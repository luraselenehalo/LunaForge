export default function createGame({ container, onScore, onMessage, onGameOver }) {
  const options = ["rock", "paper", "scissors"];
  let round = 0;
  let score = 0;

  const render = () => {
    container.innerHTML = `
      <p>Choose your move.</p>
      <div style="display:flex; gap:0.5rem; flex-wrap:wrap;">
        ${options
          .map(
            (option) => `<button class="button secondary" data-choice="${option}">${option}</button>`
          )
          .join("")}
      </div>
      <p class="helper-text" id="rps-status"></p>
    `;
  };

  const decideWinner = (player, cpu) => {
    if (player === cpu) return "draw";
    if (
      (player === "rock" && cpu === "scissors") ||
      (player === "paper" && cpu === "rock") ||
      (player === "scissors" && cpu === "paper")
    ) {
      return "win";
    }
    return "lose";
  };

  const start = () => {
    round = 0;
    score = 0;
    onScore(0);
    onMessage("Best of five.");
    render();
    const status = container.querySelector("#rps-status");
    container.querySelectorAll("button[data-choice]").forEach((button) => {
      button.addEventListener("click", () => {
        const player = button.dataset.choice;
        const cpu = options[Math.floor(Math.random() * options.length)];
        const result = decideWinner(player, cpu);
        round += 1;
        if (result === "win") score += 1;
        onScore(score);
        status.textContent = `Round ${round}: You chose ${player}, CPU chose ${cpu}. Result: ${result}.`;
        if (round >= 5) {
          onGameOver(score);
        }
      });
    });
  };

  const reset = () => start();

  return { start, reset, stop: () => {}, destroy: () => container.innerHTML = "" };
}
