const toTitle = (text) =>
  text
    .toLowerCase()
    .split(/\s+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

const toSnake = (text) => text.trim().toLowerCase().replace(/\s+/g, "_");
const toKebab = (text) => text.trim().toLowerCase().replace(/\s+/g, "-");

export default {
  init: () => ({ output: "" }),
  render: (container, state) => {
    container.innerHTML = `
      <div class="form-group">
        <label for="case-input">Input text</label>
        <textarea id="case-input"></textarea>
      </div>
      <div class="form-group">
        <label for="case-style">Style</label>
        <select id="case-style">
          <option value="upper">UPPERCASE</option>
          <option value="lower">lowercase</option>
          <option value="title">Title Case</option>
          <option value="snake">snake_case</option>
          <option value="kebab">kebab-case</option>
        </select>
      </div>
      <button class="button" id="case-convert">Convert</button>
      <div class="form-group">
        <label for="case-output">Output</label>
        <textarea id="case-output" readonly>${state.output}</textarea>
      </div>
    `;

    const output = container.querySelector("#case-output");
    container.querySelector("#case-convert").addEventListener("click", () => {
      const input = container.querySelector("#case-input").value;
      const style = container.querySelector("#case-style").value;
      const map = {
        upper: input.toUpperCase(),
        lower: input.toLowerCase(),
        title: toTitle(input),
        snake: toSnake(input),
        kebab: toKebab(input),
      };
      state.output = map[style] ?? input;
      output.value = state.output;
    });
  },
  destroy: (container) => {
    container.innerHTML = "";
  },
};
