import { loadPlugins } from "./plugin-loader.js";

export const loadGames = async ({ registry, container }) =>
  loadPlugins({ registry, container, type: "game" });

export const loadTools = async ({ registry, container }) =>
  loadPlugins({ registry, container, type: "tool" });
