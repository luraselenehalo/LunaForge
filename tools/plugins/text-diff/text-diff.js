export default {
  init: () => ({ output: "" }),
  render: (container, state) => {
    container.innerHTML = `
      <div class="form-group">
        <label for="text-left">Text A</label>
        <textarea id="text-left"></textarea>
      </div>
      <div class="form-group">
        <label for="text-right">Text B</label>
        <textarea id="text-right"></textarea>
      </div>
      <button class="button" id="text-diff">Compare</button>
      <div class="panel" id="text-output" aria-live="polite"></div>
    `;

    const output = container.querySelector("#text-output");
    container.querySelector("#text-diff").addEventListener("click", () => {
      const leftLines = container.querySelector("#text-left").value.split("\n");
      const rightLines = container.querySelector("#text-right").value.split("\n");
      const max = Math.max(leftLines.length, rightLines.length);
      const diffs = [];
      for (let i = 0; i < max; i += 1) {
        if (leftLines[i] !== rightLines[i]) {
          diffs.push({ line: i + 1, left: leftLines[i] ?? "", right: rightLines[i] ?? "" });
        }
      }
      if (!diffs.length) {
        output.innerHTML = "<p>No differences found.</p>";
        return;
      }
      output.innerHTML = `
        <ul class="list">
          ${diffs
            .map(
              (diff) => `
            <li>
              <strong>Line ${diff.line}</strong><br />
              A: ${diff.left}<br />
              B: ${diff.right}
            </li>
          `
            )
            .join("")}
        </ul>
      `;
    });
  },
  destroy: (container) => {
    container.innerHTML = "";
  },
};
