export default {
  init: () => ({ result: "" }),
  render: (container, state) => {
    container.innerHTML = `
      <div class="form-group">
        <label for="hash-a">Hash A</label>
        <input id="hash-a" type="text" placeholder="Paste hash" />
      </div>
      <div class="form-group">
        <label for="hash-b">Hash B</label>
        <input id="hash-b" type="text" placeholder="Paste hash" />
      </div>
      <button class="button" id="hash-compare">Compare</button>
      <div class="panel" aria-live="polite" id="hash-result"></div>
    `;

    const result = container.querySelector("#hash-result");
    container.querySelector("#hash-compare").addEventListener("click", () => {
      const a = container.querySelector("#hash-a").value.trim();
      const b = container.querySelector("#hash-b").value.trim();
      if (!a || !b) {
        result.innerHTML = "<p>Enter both hashes to compare.</p>";
        return;
      }
      state.result = a === b ? "Match" : "No match";
      result.innerHTML = `<p><strong>${state.result}</strong></p>`;
    });
  },
  destroy: (container) => {
    container.innerHTML = "";
  },
};
