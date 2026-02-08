import { validateManifest, formatErrors } from "./plugin-validator.js";

export const loadPlugins = async ({ registry, container, type }) => {
  const results = [];

  for (const manifestUrl of registry) {
    try {
      const response = await fetch(manifestUrl);
      if (!response.ok) {
        throw new Error(`Failed to fetch manifest: ${response.status}`);
      }
      const manifest = await response.json();
      const validation = validateManifest(manifest, type);

      if (!validation.valid) {
        renderError(container, manifestUrl, validation.errors);
        continue;
      }

      const module = await import(manifest.entry);
      if (!module?.default) {
        renderError(container, manifestUrl, ["Plugin entry must export a default module."]);
        continue;
      }

      results.push({ manifest, module: module.default });
    } catch (error) {
      renderError(container, manifestUrl, [error.message]);
    }
  }

  return results;
};

const renderError = (container, source, errors) => {
  if (!container) return;
  const alert = document.createElement("div");
  alert.className = "notice";
  alert.setAttribute("role", "alert");
  alert.innerText = `Plugin skipped: ${source}\n${formatErrors(errors)}`;
  container.appendChild(alert);
};
