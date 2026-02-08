export default {
  init: () => ({ output: "" }),
  render: (container, state) => {
    container.innerHTML = `
      <div class="form-group">
        <label for="url-input">Input</label>
        <input id="url-input" type="text" placeholder="Paste text or URL" />
      </div>
      <div class="form-group">
        <label for="url-action">Action</label>
        <select id="url-action">
          <option value="encode">Encode</option>
          <option value="decode">Decode</option>
        </select>
      </div>
      <button class="button" id="url-run">Run</button>
      <div class="form-group">
        <label for="url-output">Output</label>
        <input id="url-output" type="text" readonly value="${state.output}" />
      </div>
    `;

    const output = container.querySelector("#url-output");
    container.querySelector("#url-run").addEventListener("click", () => {
      const value = container.querySelector("#url-input").value;
      const action = container.querySelector("#url-action").value;
      state.output = action === "encode" ? encodeURIComponent(value) : decodeURIComponent(value);
      output.value = state.output;
    });
  },
  destroy: (container) => {
    container.innerHTML = "";
  },
};
