import { exportData, downloadJson, importData } from "../core/storage.js";

const exportButton = document.querySelector("#export-data");
const importInput = document.querySelector("#import-file");
const importButton = document.querySelector("#import-data");
const status = document.querySelector("#import-status");

const showStatus = (message, type = "info") => {
  status.textContent = message;
  status.style.opacity = "0";
  status.style.transform = "translateY(-10px)";
  
  // Remove old status classes
  status.classList.remove("success", "danger", "warning");
  
  // Add animation and new class
  setTimeout(() => {
    status.style.transition = "all 0.3s ease";
    status.style.opacity = "1";
    status.style.transform = "translateY(0)";
    if (type !== "info") {
      status.classList.add(type);
    }
  }, 50);
  
  // Auto-clear success messages
  if (type === "success") {
    setTimeout(() => {
      status.style.opacity = "0";
      status.style.transform = "translateY(-10px)";
      setTimeout(() => {
        status.textContent = "";
        status.classList.remove("success");
      }, 300);
    }, 3000);
  }
};

if (exportButton) {
  exportButton.addEventListener("click", () => {
    // Add click animation
    exportButton.style.transform = "scale(0.95)";
    setTimeout(() => {
      exportButton.style.transform = "";
    }, 150);
    
    const data = exportData();
    downloadJson("lunaforge-data.json", data);
    showStatus("Data exported successfully!", "success");
  });
}

if (importButton && importInput) {
  importButton.addEventListener("click", async () => {
    // Add click animation
    importButton.style.transform = "scale(0.95)";
    setTimeout(() => {
      importButton.style.transform = "";
    }, 150);
    
    const file = importInput.files?.[0];
    if (!file) {
      showStatus("Select a file to import.", "warning");
      return;
    }
    
    showStatus("Importing...");
    
    try {
      const text = await file.text();
      const json = JSON.parse(text);
      const result = importData(json);
      
      if (result.valid) {
        showStatus("Import complete! Refreshing...", "success");
        setTimeout(() => window.location.reload(), 1500);
      } else {
        showStatus(`Import failed: ${result.message}`, "danger");
      }
    } catch (error) {
      showStatus(`Import failed: ${error.message}`, "danger");
    }
  });
  
  // Show filename when selected
  importInput.addEventListener("change", () => {
    const file = importInput.files?.[0];
    if (file) {
      showStatus(`Selected: ${file.name}`);
    }
  });
}
