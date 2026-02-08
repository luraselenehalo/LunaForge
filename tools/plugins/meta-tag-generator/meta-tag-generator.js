export default {
  init: () => ({ output: "" }),
  render: (container, state) => {
    container.innerHTML = `
      <div class="form-group">
        <label for="meta-title">Title</label>
        <input id="meta-title" type="text" placeholder="LunaForge" />
      </div>
      <div class="form-group">
        <label for="meta-description">Description</label>
        <input id="meta-description" type="text" placeholder="Developer tools under the moon." />
      </div>
      <div class="form-group">
        <label for="meta-url">URL</label>
        <input id="meta-url" type="url" placeholder="https://example.com" />
      </div>
      <div class="form-group">
        <label for="meta-image">Image URL</label>
        <input id="meta-image" type="url" placeholder="https://example.com/og.png" />
      </div>
      <button class="button" id="meta-generate">Generate Tags</button>
      <div class="form-group">
        <label for="meta-output">Meta Tags</label>
        <textarea id="meta-output" readonly>${state.output}</textarea>
      </div>
    `;

    const output = container.querySelector("#meta-output");
    container.querySelector("#meta-generate").addEventListener("click", () => {
      const title = container.querySelector("#meta-title").value.trim();
      const description = container.querySelector("#meta-description").value.trim();
      const url = container.querySelector("#meta-url").value.trim();
      const image = container.querySelector("#meta-image").value.trim();
      state.output = `\
<meta name="title" content="${title}">
<meta name="description" content="${description}">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${description}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${image}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${title}">
<meta name="twitter:description" content="${description}">
<meta name="twitter:image" content="${image}">
      `.trim();
      output.value = state.output;
    });
  },
  destroy: (container) => {
    container.innerHTML = "";
  },
};
