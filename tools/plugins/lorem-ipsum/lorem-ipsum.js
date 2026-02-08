const paragraph =
  "LunaForge brings lunar-inspired clarity to developer tools, blending calm interfaces with powerful workflows.";

export default {
  init: () => ({ output: "" }),
  render: (container, state) => {
    container.innerHTML = `
      <div class="form-group">
        <label for="lorem-count">Paragraphs</label>
        <input id="lorem-count" type="number" min="1" max="8" value="2" />
      </div>
      <button class="button" id="lorem-generate">Generate</button>
      <div class="form-group">
        <label for="lorem-output">Output</label>
        <textarea id="lorem-output" readonly>${state.output}</textarea>
      </div>
    `;

    const output = container.querySelector("#lorem-output");
    container.querySelector("#lorem-generate").addEventListener("click", () => {
      const count = Number(container.querySelector("#lorem-count").value);
      state.output = Array.from({ length: count }, () => paragraph).join("\n\n");
      output.value = state.output;
    });
  },
  destroy: (container) => {
    container.innerHTML = "";
  },
};
