export default {
  init: () => ({ output: "" }),
  render: (container, state) => {
    container.innerHTML = `
      <div class="form-group">
        <label for="json-input">JSON Input</label>
        <textarea id="json-input" placeholder='{"moon": true}'></textarea>
      </div>
      <button class="button" id="json-format">Format JSON</button>
      <div class="form-group">
        <label for="json-output">Formatted Output</label>
        <textarea id="json-output" readonly>${state.output}</textarea>
      </div>
      <div class="notice" id="json-status" aria-live="polite"></div>
    `;

    const output = container.querySelector("#json-output");
    const status = container.querySelector("#json-status");
    container.querySelector("#json-format").addEventListener("click", () => {
      const input = container.querySelector("#json-input").value;
      try {
        const parsed = JSON.parse(input);
        state.output = JSON.stringify(parsed, null, 2);
        output.value = state.output;
        status.textContent = "Valid JSON ✅";
      } catch (error) {
        status.textContent = `Invalid JSON: ${error.message}`;
      }
    });
  },
  destroy: (container) => {
    container.innerHTML = "";
  },
};
