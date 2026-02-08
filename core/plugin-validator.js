const REQUIRED_FIELDS = {
  id: "string",
  name: "string",
  version: "string",
  type: "string",
  description: "string",
  entry: "string",
  author: "string",
};

const SEMVER_PATTERN = /^\d+\.\d+\.\d+$/;
const ID_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export const validateManifest = (manifest, expectedType) => {
  const errors = [];

  if (!manifest || typeof manifest !== "object") {
    return { valid: false, errors: ["Manifest is missing or malformed."] };
  }

  Object.entries(REQUIRED_FIELDS).forEach(([field, type]) => {
    if (!(field in manifest)) {
      errors.push(`Missing required field: ${field}.`);
      return;
    }
    if (typeof manifest[field] !== type) {
      errors.push(`Field ${field} must be a ${type}.`);
    }
  });

  if (manifest.id && !ID_PATTERN.test(manifest.id)) {
    errors.push("Field id must be kebab-case (lowercase letters, numbers, hyphens).");
  }

  if (manifest.version && !SEMVER_PATTERN.test(manifest.version)) {
    errors.push("Field version must follow semver (x.y.z).");
  }

  if (manifest.type && !["tool", "game"].includes(manifest.type)) {
    errors.push("Field type must be either 'tool' or 'game'.");
  }

  if (expectedType && manifest.type !== expectedType) {
    errors.push(`Manifest type must be '${expectedType}'.`);
  }

  if (manifest.permissions && !Array.isArray(manifest.permissions)) {
    errors.push("Field permissions must be an array if provided.");
  }

  return { valid: errors.length === 0, errors };
};

export const formatErrors = (errors) =>
  errors.map((error) => `• ${error}`).join("\n");
