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
        <label for="json-left">JSON A</label>
        <textarea id="json-left"></textarea>
      </div>
      <div class="form-group">
        <label for="json-right">JSON B</label>
        <textarea id="json-right"></textarea>
      </div>
      <button class="button" id="json-compare">Compare JSON</button>
      <div class="panel" id="json-diff-output" aria-live="polite"></div>
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
          output.innerHTML = "<p>No differences found.</p>";
          return;
        }
        output.innerHTML = `
          <ul class="list">
            ${diffs
              .map(
                (diff) => `
              <li>
                <strong>${diff.key}</strong><br />
                A: ${JSON.stringify(diff.left)}<br />
                B: ${JSON.stringify(diff.right)}
              </li>
            `
              )
              .join("")}
          </ul>
        `;
      } catch (error) {
        output.innerHTML = `<p>Invalid JSON: ${error.message}</p>`;
      }
    });
  },
  destroy: (container) => {
    container.innerHTML = "";
  },
};
