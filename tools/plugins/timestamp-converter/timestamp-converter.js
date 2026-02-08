const toDateString = (timestamp) => {
  const date = new Date(Number(timestamp) * 1000);
  return date.toISOString();
};

export default {
  init: () => ({ output: "" }),
  render: (container, state) => {
    container.innerHTML = `
      <div class="form-group">
        <label for="timestamp-input">Unix timestamp (seconds)</label>
        <input id="timestamp-input" type="number" placeholder="1700000000" />
      </div>
      <button class="button" id="timestamp-to-date">Convert to Date</button>
      <div class="form-group">
        <label for="date-input">ISO Date</label>
        <input id="date-input" type="text" placeholder="2024-01-01T00:00:00Z" />
      </div>
      <button class="button secondary" id="date-to-timestamp">Convert to Timestamp</button>
      <div class="form-group">
        <label for="timestamp-output">Output</label>
        <input id="timestamp-output" type="text" readonly value="${state.output}" />
      </div>
    `;

    const output = container.querySelector("#timestamp-output");
    container.querySelector("#timestamp-to-date").addEventListener("click", () => {
      const value = container.querySelector("#timestamp-input").value;
      state.output = value ? toDateString(value) : "";
      output.value = state.output;
    });

    container.querySelector("#date-to-timestamp").addEventListener("click", () => {
      const value = container.querySelector("#date-input").value;
      const date = new Date(value);
      state.output = Number.isNaN(date.getTime()) ? "Invalid date" : Math.floor(date.getTime() / 1000);
      output.value = state.output;
    });
  },
  destroy: (container) => {
    container.innerHTML = "";
  },
};
