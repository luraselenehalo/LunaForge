const hexToRgb = (hex) => {
  const sanitized = hex.replace("#", "");
  if (![3, 6].includes(sanitized.length)) return null;
  const value = sanitized.length === 3
    ? sanitized.split("").map((c) => c + c).join("")
    : sanitized;
  const num = parseInt(value, 16);
  return { r: (num >> 16) & 255, g: (num >> 8) & 255, b: num & 255 };
};

const rgbToHex = (r, g, b) =>
  `#${[r, g, b]
    .map((value) => Number(value).toString(16).padStart(2, "0"))
    .join("")}`;

export default {
  init: () => ({ output: "" }),
  render: (container, state) => {
    container.innerHTML = `
      <div class="form-group">
        <label for="hex-input">HEX</label>
        <input id="hex-input" type="text" placeholder="#7c8cff" />
      </div>
      <div class="form-group">
        <label>RGB</label>
        <div style="display:flex; gap:0.5rem;">
          <input id="rgb-r" type="number" min="0" max="255" placeholder="R" />
          <input id="rgb-g" type="number" min="0" max="255" placeholder="G" />
          <input id="rgb-b" type="number" min="0" max="255" placeholder="B" />
        </div>
      </div>
      <button class="button" id="color-convert">Convert</button>
      <div class="form-group">
        <label for="color-output">Output</label>
        <input id="color-output" type="text" readonly value="${state.output}" />
      </div>
      <div class="notice" id="color-swatch" style="height:48px; border-radius:12px;"></div>
    `;

    const output = container.querySelector("#color-output");
    const swatch = container.querySelector("#color-swatch");
    container.querySelector("#color-convert").addEventListener("click", () => {
      const hex = container.querySelector("#hex-input").value.trim();
      const r = container.querySelector("#rgb-r").value;
      const g = container.querySelector("#rgb-g").value;
      const b = container.querySelector("#rgb-b").value;
      if (hex) {
        const rgb = hexToRgb(hex);
        state.output = rgb ? `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` : "Invalid HEX";
        swatch.style.background = rgb ? hex : "transparent";
      } else if (r && g && b) {
        state.output = rgbToHex(r, g, b);
        swatch.style.background = state.output;
      } else {
        state.output = "Provide HEX or RGB values.";
        swatch.style.background = "transparent";
      }
      output.value = state.output;
    });
  },
  destroy: (container) => {
    container.innerHTML = "";
  },
};
