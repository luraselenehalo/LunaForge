export default {
  init: () => ({ output: "" }),
  render: (container, state) => {
    container.innerHTML = `
      <div class="form-group">
        <label for="url-input">Text to Process</label>
        <textarea id="url-input" placeholder="Enter text or URL to encode/decode..."></textarea>
      </div>
      <div class="form-group">
        <label for="url-action">Action</label>
        <select id="url-action">
          <option value="encode">URL Encode</option>
          <option value="decode">URL Decode</option>
        </select>
      </div>
      <button class="button" id="url-run">Process</button>
      <div class="form-group">
        <label for="url-output">Result</label>
        <textarea id="url-output" readonly>${state.output}</textarea>
      </div>
    `;

    const output = container.querySelector("#url-output");
    container.querySelector("#url-run").addEventListener("click", () => {
      const value = container.querySelector("#url-input").value;
      const action = container.querySelector("#url-action").value;
      try {
        state.output = action === "encode" ? encodeURIComponent(value) : decodeURIComponent(value);
        output.value = state.output;
      } catch (error) {
        output.value = `Error: ${error.message}`;
      }
    });
  },
  destroy: (container) => {
    container.innerHTML = "";
  },
};
