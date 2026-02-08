const randomKey = (length) => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const buffer = new Uint8Array(length);
  window.crypto.getRandomValues(buffer);
  return Array.from(buffer, (value) => chars[value % chars.length]).join("");
};

export default {
  init: () => ({ key: randomKey(32) }),
  render: (container, state) => {
    container.innerHTML = `
      <div class="form-group">
        <label for="api-length">Key length</label>
        <input id="api-length" type="number" min="16" max="128" value="32" />
      </div>
      <button class="button" id="api-generate">Generate Key</button>
      <div class="form-group">
        <label for="api-output">API Key</label>
        <input id="api-output" type="text" readonly value="${state.key}" />
      </div>
    `;

    const output = container.querySelector("#api-output");
    container.querySelector("#api-generate").addEventListener("click", () => {
      const length = Number(container.querySelector("#api-length").value);
      state.key = randomKey(length);
      output.value = state.key;
    });
  },
  destroy: (container) => {
    container.innerHTML = "";
  },
};
