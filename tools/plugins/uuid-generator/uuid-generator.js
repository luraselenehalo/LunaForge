const generateUuid = () => {
  if (window.crypto?.randomUUID) {
    return window.crypto.randomUUID();
  }
  const template = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx";
  return template.replace(/[xy]/g, (char) => {
    const random = (window.crypto.getRandomValues(new Uint8Array(1))[0] % 16) | 0;
    const value = char === "x" ? random : (random & 0x3) | 0x8;
    return value.toString(16);
  });
};

export default {
  init: () => ({ uuid: generateUuid() }),
  render: (container, state) => {
    container.innerHTML = `
      <button class="button" id="uuid-new">Generate UUID</button>
      <div class="form-group">
        <label for="uuid-output">UUID</label>
        <input id="uuid-output" type="text" readonly value="${state.uuid}" />
      </div>
    `;

    const output = container.querySelector("#uuid-output");
    container.querySelector("#uuid-new").addEventListener("click", () => {
      state.uuid = generateUuid();
      output.value = state.uuid;
    });
  },
  destroy: (container) => {
    container.innerHTML = "";
  },
};
