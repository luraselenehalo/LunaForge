const csvToJson = (csv) => {
  const [headerLine, ...rows] = csv.trim().split("\n");
  const headers = headerLine.split(",").map((header) => header.trim());
  return rows.map((row) => {
    const values = row.split(",").map((value) => value.trim());
    return headers.reduce((acc, header, index) => ({ ...acc, [header]: values[index] || "" }), {});
  });
};

const jsonToCsv = (json) => {
  const data = Array.isArray(json) ? json : [json];
  const headers = Object.keys(data[0] || {});
  const lines = data.map((item) => headers.map((header) => item[header] ?? "").join(","));
  return [headers.join(","), ...lines].join("\n");
};

export default {
  init: () => ({ output: "" }),
  render: (container, state) => {
    container.innerHTML = `
      <div class="form-group">
        <label for="csv-input">Input</label>
        <textarea id="csv-input" placeholder="Paste CSV or JSON"></textarea>
      </div>
      <div class="form-group">
        <label for="csv-direction">Direction</label>
        <select id="csv-direction">
          <option value="csv-to-json">CSV → JSON</option>
          <option value="json-to-csv">JSON → CSV</option>
        </select>
      </div>
      <button class="button" id="csv-convert">Convert</button>
      <div class="form-group">
        <label for="csv-output">Output</label>
        <textarea id="csv-output" readonly>${state.output}</textarea>
      </div>
    `;

    const output = container.querySelector("#csv-output");
    container.querySelector("#csv-convert").addEventListener("click", () => {
      const input = container.querySelector("#csv-input").value;
      const direction = container.querySelector("#csv-direction").value;
      try {
        if (direction === "csv-to-json") {
          const parsed = csvToJson(input);
          state.output = JSON.stringify(parsed, null, 2);
        } else {
          const parsed = JSON.parse(input);
          state.output = jsonToCsv(parsed);
        }
        output.value = state.output;
      } catch (error) {
        output.value = `Conversion error: ${error.message}`;
      }
    });
  },
  destroy: (container) => {
    container.innerHTML = "";
  },
};
