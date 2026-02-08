export default {
  init: () => ({ output: "" }),
  render: (container, state) => {
    container.innerHTML = `
      <div class="form-group">
        <label for="grad-color-1">Color 1</label>
        <input id="grad-color-1" type="color" value="#7c8cff" />
      </div>
      <div class="form-group">
        <label for="grad-color-2">Color 2</label>
        <input id="grad-color-2" type="color" value="#141a2b" />
      </div>
      <div class="form-group">
        <label for="grad-angle">Angle</label>
        <input id="grad-angle" type="number" min="0" max="360" value="135" />
      </div>
      <button class="button" id="grad-generate">Generate</button>
      <div class="form-group">
        <label for="grad-output">CSS</label>
        <input id="grad-output" type="text" readonly value="${state.output}" />
      </div>
      <div class="notice" id="grad-preview" style="height:48px; border-radius:12px;"></div>
    `;

    const output = container.querySelector("#grad-output");
    const preview = container.querySelector("#grad-preview");
    container.querySelector("#grad-generate").addEventListener("click", () => {
      const color1 = container.querySelector("#grad-color-1").value;
      const color2 = container.querySelector("#grad-color-2").value;
      const angle = container.querySelector("#grad-angle").value;
      state.output = `linear-gradient(${angle}deg, ${color1}, ${color2})`;
      output.value = state.output;
      preview.style.background = state.output;
    });
  },
  destroy: (container) => {
    container.innerHTML = "";
  },
};
