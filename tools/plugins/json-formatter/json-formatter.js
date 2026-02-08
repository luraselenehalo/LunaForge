export default {
  init: () => ({ output: "" }),
  render: (container, state) => {
    container.innerHTML = `
      <div class="form-group">
        <label for="json-input">JSON Input</label>
        <textarea id="json-input" placeholder='Paste your JSON here...'></textarea>
      </div>
      <button class="button" id="json-format">Format JSON</button>
      <div class="form-group">
        <label for="json-output">Formatted Output</label>
        <textarea id="json-output" readonly>${state.output}</textarea>
      </div>
      <div class="output-display" id="json-status" style="display: none; margin-top: 1rem;" aria-live="polite"></div>
    `;

    const output = container.querySelector("#json-output");
    const status = container.querySelector("#json-status");
    container.querySelector("#json-format").addEventListener("click", () => {
      const input = container.querySelector("#json-input").value;
      try {
        const parsed = JSON.parse(input);
        state.output = JSON.stringify(parsed, null, 2);
        output.value = state.output;
        status.innerHTML = "<span style='color: var(--success);'>✓ Valid JSON</span>";
        status.style.display = "block";
      } catch (error) {
        status.innerHTML = `<span style='color: var(--danger);'>✗ Invalid JSON: ${error.message}</span>`;
        status.style.display = "block";
      }
    });
  },
  destroy: (container) => {
    container.innerHTML = "";
  },
};
