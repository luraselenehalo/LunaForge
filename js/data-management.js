import { exportData, downloadJson, importData } from "../core/storage.js";

const exportButton = document.querySelector("#export-data");
const importInput = document.querySelector("#import-file");
const importButton = document.querySelector("#import-data");
const status = document.querySelector("#import-status");

if (exportButton) {
  exportButton.addEventListener("click", () => {
    const data = exportData();
    downloadJson("lunaforge-data.json", data);
  });
}

if (importButton && importInput) {
  importButton.addEventListener("click", async () => {
    const file = importInput.files?.[0];
    if (!file) {
      status.textContent = "Select a file to import.";
      return;
    }
    const text = await file.text();
    try {
      const json = JSON.parse(text);
      const result = importData(json);
      status.textContent = result.valid
        ? "Import complete."
        : `Import failed: ${result.message}`;
    } catch (error) {
      status.textContent = `Import failed: ${error.message}`;
    }
  });
}
