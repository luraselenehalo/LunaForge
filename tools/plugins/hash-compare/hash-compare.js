export default {
  init: () => ({ result: "" }),
  render: (container, state) => {
    container.innerHTML = `
      <div class="form-group">
        <label for="hash-a">First Hash</label>
        <input id="hash-a" type="text" placeholder="Paste first hash here..." />
      </div>
      <div class="form-group">
        <label for="hash-b">Second Hash</label>
        <input id="hash-b" type="text" placeholder="Paste second hash here..." />
      </div>
      <button class="button" id="hash-compare">Compare Hashes</button>
      <div class="output-display" id="hash-result" style="display: none; margin-top: 1rem; text-align: center;" aria-live="polite"></div>
    `;

    const result = container.querySelector("#hash-result");
    container.querySelector("#hash-compare").addEventListener("click", () => {
      const a = container.querySelector("#hash-a").value.trim();
      const b = container.querySelector("#hash-b").value.trim();
      if (!a || !b) {
        result.innerHTML = "<span style='color: var(--warning);'>⚠ Please enter both hashes to compare.</span>";
        result.style.display = "block";
        return;
      }
      const match = a === b;
      state.result = match ? "Match" : "No match";
      result.innerHTML = match 
        ? "<span style='color: var(--success); font-size: 1.2rem;'>✓ Hashes Match!</span>"
        : "<span style='color: var(--danger); font-size: 1.2rem;'>✗ Hashes Do Not Match</span>";
      result.style.display = "block";
    });
  },
  destroy: (container) => {
    container.innerHTML = "";
  },
};
