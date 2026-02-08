export default {
  init: () => ({ output: "" }),
  render: (container, state) => {
    container.innerHTML = `
      <div class="form-group">
        <label for="space-input">Text to Clean</label>
        <textarea id="space-input" placeholder="Paste text with extra whitespace..."></textarea>
      </div>
      <div class="checkbox-group">
        <label><input type="checkbox" id="space-trim" checked /> Trim whitespace from line starts/ends</label>
        <label><input type="checkbox" id="space-collapse" checked /> Collapse multiple spaces into one</label>
      </div>
      <button class="button" id="space-clean">Clean Whitespace</button>
      <div class="form-group">
        <label for="space-output">Cleaned Output</label>
        <textarea id="space-output" readonly>${state.output}</textarea>
      </div>
    `;

    const output = container.querySelector("#space-output");
    container.querySelector("#space-clean").addEventListener("click", () => {
      const input = container.querySelector("#space-input").value;
      const trim = container.querySelector("#space-trim").checked;
      const collapse = container.querySelector("#space-collapse").checked;
      const lines = input.split("\n").map((line) => (trim ? line.trim() : line));
      let cleaned = lines.join("\n");
      if (collapse) {
        cleaned = cleaned.replace(/\s+/g, " ");
      }
      state.output = cleaned;
      output.value = state.output;
    });
  },
  destroy: (container) => {
    container.innerHTML = "";
  },
};
