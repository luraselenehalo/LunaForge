const STORAGE_KEY = "lunaforge:data";
const DATA_VERSION = "1.0.0";

const defaultData = () => ({
  version: DATA_VERSION,
  settings: {
    theme: "lunar",
    reducedMotion: false,
  },
  toolPreferences: {},
  gameProgress: {},
  leaderboards: {},
});

export const getData = () => {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return defaultData();

  try {
    const parsed = JSON.parse(raw);
    if (!parsed || parsed.version !== DATA_VERSION) return defaultData();
    return { ...defaultData(), ...parsed };
  } catch (error) {
    return defaultData();
  }
};

export const saveData = (data) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

export const updateData = (updater) => {
  const current = getData();
  const next = updater({ ...current });
  saveData(next);
  return next;
};

export const exportData = () => {
  const payload = getData();
  return JSON.stringify(payload, null, 2);
};

export const validateImport = (data) => {
  if (!data || typeof data !== "object") {
    return { valid: false, message: "Import file is not valid JSON." };
  }
  if (data.version !== DATA_VERSION) {
    return { valid: false, message: "Import version mismatch." };
  }
  if (!data.settings || !data.leaderboards) {
    return { valid: false, message: "Import data is missing required sections." };
  }
  return { valid: true };
};

export const importData = (data) => {
  const validation = validateImport(data);
  if (!validation.valid) {
    return validation;
  }
  saveData(data);
  return { valid: true };
};

export const downloadJson = (filename, content) => {
  const blob = new Blob([content], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
};
