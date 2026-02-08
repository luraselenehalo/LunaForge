const flatten = (obj, prefix = "") => {
  if (obj === null || typeof obj !== "object") {
    return { [prefix]: obj };
  }
  return Object.entries(obj).reduce((acc, [key, value]) => {
    const path = prefix ? `${prefix}.${key}` : key;
    return { ...acc, ...flatten(value, path) };
  }, {});
};

export default {
  init: () => ({ report: "" }),
  render: (container, state) => {
    container.innerHTML = `
      <div class="form-group">
        <label for="json-left">Original JSON (A)</label>
        <textarea id="json-left" placeholder='{"example": "value1"}'></textarea>
      </div>
      <div class="form-group">
        <label for="json-right">Modified JSON (B)</label>
        <textarea id="json-right" placeholder='{"example": "value2"}'></textarea>
      </div>
      <button class="button" id="json-compare">Compare JSON</button>
      <div class="output-display" id="json-diff-output" style="display: none;" aria-live="polite"></div>
    `;

    const output = container.querySelector("#json-diff-output");
    container.querySelector("#json-compare").addEventListener("click", () => {
      try {
        const left = JSON.parse(container.querySelector("#json-left").value || "{}");
        const right = JSON.parse(container.querySelector("#json-right").value || "{}");
        const leftFlat = flatten(left);
        const rightFlat = flatten(right);
        const allKeys = new Set([...Object.keys(leftFlat), ...Object.keys(rightFlat)]);
        const diffs = [];
        allKeys.forEach((key) => {
          if (leftFlat[key] !== rightFlat[key]) {
            diffs.push({ key, left: leftFlat[key], right: rightFlat[key] });
          }
        });
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
                <strong>${diff.key}</strong><br />
                <span style="color: var(--danger);">A:</span> ${JSON.stringify(diff.left)}<br />
                <span style="color: var(--success);">B:</span> ${JSON.stringify(diff.right)}
              </li>
            `
              )
              .join("")}
          </ul>
        `;
        output.style.display = "block";
      } catch (error) {
        output.innerHTML = `<p style='color: var(--danger);'>Invalid JSON: ${error.message}</p>`;
        output.style.display = "block";
      }
    });
  },
  destroy: (container) => {
    container.innerHTML = "";
  },
};
