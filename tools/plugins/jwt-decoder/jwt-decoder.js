const decodePart = (part) => {
  const padded = part.replace(/-/g, "+").replace(/_/g, "/");
  const json = decodeURIComponent(
    atob(padded)
      .split("")
      .map((char) => `%${char.charCodeAt(0).toString(16).padStart(2, "0")}`)
      .join("")
  );
  return JSON.parse(json);
};

export default {
  init: () => ({ header: "", payload: "", error: "" }),
  render: (container, state) => {
    container.innerHTML = `
      <div class="form-group">
        <label for="jwt-input">JWT Token</label>
        <textarea id="jwt-input" placeholder="Paste JWT here"></textarea>
      </div>
      <button class="button" id="jwt-decode">Decode</button>
      <div class="panel" aria-live="polite" id="jwt-output"></div>
    `;

    const output = container.querySelector("#jwt-output");
    container.querySelector("#jwt-decode").addEventListener("click", () => {
      const token = container.querySelector("#jwt-input").value.trim();
      if (!token) {
        output.innerHTML = "<p>Provide a JWT token to decode.</p>";
        return;
      }
      try {
        const [header, payload] = token.split(".");
        state.header = JSON.stringify(decodePart(header), null, 2);
        state.payload = JSON.stringify(decodePart(payload), null, 2);
        output.innerHTML = `
          <div class="form-group">
            <label>Header</label>
            <textarea readonly>${state.header}</textarea>
          </div>
          <div class="form-group">
            <label>Payload</label>
            <textarea readonly>${state.payload}</textarea>
          </div>
        `;
      } catch (error) {
        output.innerHTML = `<p>Invalid token format: ${error.message}</p>`;
      }
    });
  },
  destroy: (container) => {
    container.innerHTML = "";
  },
};
