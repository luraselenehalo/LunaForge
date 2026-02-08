export default function createGame({ container, onScore, onMessage, onGameOver }) {
  const prompt = "LunaForge powers developers with calm, offline-ready tools.";
  let startTime = 0;

  const render = () => {
    container.innerHTML = `
      <p><strong>Prompt:</strong> ${prompt}</p>
      <textarea id="typing-input" placeholder="Start typing..."></textarea>
      <button class="button" id="typing-finish">Finish</button>
    `;
  };

  const start = () => {
    render();
    onMessage("Type the prompt and hit finish.");
    const input = container.querySelector("#typing-input");
    input.addEventListener("focus", () => {
      if (!startTime) startTime = performance.now();
    });
    container.querySelector("#typing-finish").addEventListener("click", () => {
      if (!startTime) return;
      const endTime = performance.now();
      const minutes = (endTime - startTime) / 60000;
      const words = input.value.trim().split(/\s+/).length;
      const accuracy = input.value.trim() === prompt ? 1 : 0.7;
      const wpm = Math.round((words / minutes) * accuracy);
      onScore(wpm);
      onGameOver(wpm);
    });
  };

  const reset = () => {
    startTime = 0;
    start();
  };

  return { start, reset, stop: () => {}, destroy: () => container.innerHTML = "" };
}
