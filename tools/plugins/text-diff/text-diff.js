export default {
  init: () => ({ output: "" }),
  render: (container, state) => {
    container.innerHTML = `
      <div class="form-group">
        <label for="text-left">Original Text (A)</label>
        <textarea id="text-left" placeholder="Enter original text..."></textarea>
      </div>
      <div class="form-group">
        <label for="text-right">Modified Text (B)</label>
        <textarea id="text-right" placeholder="Enter modified text..."></textarea>
      </div>
      <button class="button" id="text-diff">Compare Texts</button>
      <div class="output-display" id="text-output" style="display: none;" aria-live="polite"></div>
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
        output.innerHTML = "<p style='color: var(--success);'>✓ No differences found.</p>";
        output.style.display = "block";
        return;
      }
      output.innerHTML = `
        <p style="margin-bottom: 1rem; color: var(--accent);">Found ${diffs.length} difference(s):</p>
        <ul class="list" style="text-align: left;">
          ${diffs
            .map(
              (diff) => `
            <li style="border-left: 3px solid var(--accent); padding-left: 1rem;">
              <strong>Line ${diff.line}</strong><br />
              <span style="color: var(--danger);">A:</span> ${diff.left || "(empty)"}<br />
              <span style="color: var(--success);">B:</span> ${diff.right || "(empty)"}
            </li>
          `
            )
            .join("")}
        </ul>
      `;
      output.style.display = "block";
    });
  },
  destroy: (container) => {
    container.innerHTML = "";
  },
};
