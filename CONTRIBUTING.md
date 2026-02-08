# Contributing to LunaForge

Thanks for helping build LunaForge! Please follow these guidelines to keep the project clean and approachable.

## Getting Started
1. Fork the repository.
2. Create a branch: `git checkout -b feature/my-plugin`.
3. Make your changes with clear comments.
4. Test locally (open the HTML pages in a browser).

## Tool Plugins
- Add a new folder under `/tools/plugins/<tool-name>`.
- Include a `manifest.json` and main JS entry file.
- Do **not** edit core loader files.

## Game Modules
- Add a folder under `/games/modules/<game-name>`.
- Include a `manifest.json` and game JS module.
- Game modules should return `{ start, reset, stop, destroy }`.

## Style Guidelines
- Keep the UI minimal and dark-themed.
- Use vanilla JavaScript only.
- Prioritize keyboard accessibility.

## Pull Requests
- Provide a short summary and testing notes.
- Ensure manifest fields are valid.
