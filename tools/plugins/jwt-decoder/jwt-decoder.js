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
        <textarea id="jwt-input" placeholder="Paste your JWT token here..."></textarea>
      </div>
      <button class="button" id="jwt-decode">Decode Token</button>
      <div class="output-display" id="jwt-output" style="display: none;"></div>
    `;

    const output = container.querySelector("#jwt-output");
    container.querySelector("#jwt-decode").addEventListener("click", () => {
      const token = container.querySelector("#jwt-input").value.trim();
      if (!token) {
        output.innerHTML = "<p style='color: var(--danger);'>Please provide a JWT token to decode.</p>";
        output.style.display = "block";
        return;
      }
      try {
        const [header, payload] = token.split(".");
        state.header = JSON.stringify(decodePart(header), null, 2);
        state.payload = JSON.stringify(decodePart(payload), null, 2);
        output.innerHTML = `
          <div style="margin-bottom: 1rem;">
            <label style="display: block; margin-bottom: 0.5rem; color: var(--accent);">Header</label>
            <textarea readonly style="min-height: 80px;">${state.header}</textarea>
          </div>
          <div>
            <label style="display: block; margin-bottom: 0.5rem; color: var(--accent);">Payload</label>
            <textarea readonly style="min-height: 120px;">${state.payload}</textarea>
          </div>
        `;
        output.style.display = "block";
      } catch (error) {
        output.innerHTML = `<p style='color: var(--danger);'>Invalid token format: ${error.message}</p>`;
        output.style.display = "block";
      }
    });
  },
  destroy: (container) => {
    container.innerHTML = "";
  },
};
