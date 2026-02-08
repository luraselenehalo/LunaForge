const toYaml = (obj, indent = 0) => {
  if (obj === null || typeof obj !== "object") {
    return `${obj}`;
  }
  const pad = "  ".repeat(indent);
  return Object.entries(obj)
    .map(([key, value]) => {
      if (value && typeof value === "object") {
        return `${pad}${key}:\n${toYaml(value, indent + 1)}`;
      }
      return `${pad}${key}: ${value}`;
    })
    .join("\n");
};

const parseYaml = (yaml) => {
  const lines = yaml.split("\n").filter((line) => line.trim().length > 0);
  const result = {};
  lines.forEach((line) => {
    const [key, ...rest] = line.split(":");
    result[key.trim()] = rest.join(":").trim();
  });
  return result;
};

export default {
  init: () => ({ output: "" }),
  render: (container, state) => {
    container.innerHTML = `
      <div class="form-group">
        <label for="yaml-input">Input</label>
        <textarea id="yaml-input" placeholder="Paste JSON or simple YAML"></textarea>
      </div>
      <div class="form-group">
        <label for="yaml-direction">Direction</label>
        <select id="yaml-direction">
          <option value="json-to-yaml">JSON → YAML</option>
          <option value="yaml-to-json">YAML → JSON</option>
        </select>
        <p class="helper-text">YAML converter supports simple key-value pairs.</p>
      </div>
      <button class="button" id="yaml-convert">Convert</button>
      <div class="form-group">
        <label for="yaml-output">Output</label>
        <textarea id="yaml-output" readonly>${state.output}</textarea>
      </div>
    `;

    const output = container.querySelector("#yaml-output");
    container.querySelector("#yaml-convert").addEventListener("click", () => {
      const input = container.querySelector("#yaml-input").value;
      const direction = container.querySelector("#yaml-direction").value;
      try {
        if (direction === "json-to-yaml") {
          const parsed = JSON.parse(input);
          state.output = toYaml(parsed);
        } else {
          const parsed = parseYaml(input);
          state.output = JSON.stringify(parsed, null, 2);
        }
        output.value = state.output;
      } catch (error) {
        output.value = `Conversion error: ${error.message}`;
      }
    });
  },
  destroy: (container) => {
    container.innerHTML = "";
  },
};
