export default {
  init: () => ({ output: "" }),
  render: (container, state) => {
    container.innerHTML = `
      <div class="form-group">
        <label for="line-input">Lines</label>
        <textarea id="line-input" placeholder="One item per line"></textarea>
      </div>
      <label><input type="checkbox" id="line-dedup" checked /> Remove duplicates</label>
      <button class="button" id="line-sort">Sort Lines</button>
      <div class="form-group">
        <label for="line-output">Output</label>
        <textarea id="line-output" readonly>${state.output}</textarea>
      </div>
    `;

    const output = container.querySelector("#line-output");
    container.querySelector("#line-sort").addEventListener("click", () => {
      const lines = container
        .querySelector("#line-input")
        .value.split("\n")
        .map((line) => line.trim())
        .filter((line) => line.length > 0);
      const sorted = lines.sort((a, b) => a.localeCompare(b));
      const dedup = container.querySelector("#line-dedup").checked;
      const unique = dedup ? Array.from(new Set(sorted)) : sorted;
      state.output = unique.join("\n");
      output.value = state.output;
    });
  },
  destroy: (container) => {
    container.innerHTML = "";
  },
};
