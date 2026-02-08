const buildCharset = ({ lower, upper, numbers, symbols }) => {
  let chars = "";
  if (lower) chars += "abcdefghijklmnopqrstuvwxyz";
  if (upper) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  if (numbers) chars += "0123456789";
  if (symbols) chars += "!@#$%^&*()-_=+[]{};:,.<>?";
  return chars;
};

const secureRandom = (max) => {
  const array = new Uint32Array(1);
  window.crypto.getRandomValues(array);
  return array[0] % max;
};

export default {
  init: () => ({ generated: "" }),
  render: (container, state) => {
    container.innerHTML = `
      <div class="form-group">
        <label for="pw-length">Length</label>
        <input id="pw-length" type="number" min="8" max="128" value="16" />
      </div>
      <div class="checkbox-group">
        <label><input type="checkbox" id="pw-lower" checked /> Lowercase (a-z)</label>
        <label><input type="checkbox" id="pw-upper" checked /> Uppercase (A-Z)</label>
        <label><input type="checkbox" id="pw-numbers" checked /> Numbers (0-9)</label>
        <label><input type="checkbox" id="pw-symbols" /> Symbols (!@#$...)</label>
      </div>
      <button class="button" id="pw-generate">Generate Password</button>
      <div class="form-group">
        <label for="pw-output">Generated Password</label>
        <input id="pw-output" type="text" readonly value="${state.generated}" />
      </div>
    `;

    const output = container.querySelector("#pw-output");
    container.querySelector("#pw-generate").addEventListener("click", () => {
      const length = Number(container.querySelector("#pw-length").value);
      const options = {
        lower: container.querySelector("#pw-lower").checked,
        upper: container.querySelector("#pw-upper").checked,
        numbers: container.querySelector("#pw-numbers").checked,
        symbols: container.querySelector("#pw-symbols").checked,
      };
      const charset = buildCharset(options);
      if (!charset) {
        output.value = "Select at least one character set.";
        return;
      }
      let password = "";
      for (let index = 0; index < length; index += 1) {
        password += charset[secureRandom(charset.length)];
      }
      state.generated = password;
      output.value = password;
    });
  },
  destroy: (container) => {
    container.innerHTML = "";
  },
};
