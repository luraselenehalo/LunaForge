# LunaForge

LunaForge is a 100% client-side, offline-friendly platform that combines developer tools with bite-sized mini games. It is designed to be modular, accessible, and ready for open-source collaboration.

## Core Principles
- **Client-side only** (no backend, no database)
- **Fast, lightweight, and privacy-first**
- **Offline-ready** with localStorage-based persistence
- **Extensible via plugins** without modifying core files
- **Accessible and keyboard-friendly**

## Quick Start
1. Clone the repository.
2. Open `index.html` in a browser or serve locally:
   ```bash
   python3 -m http.server 8080
   ```
3. Navigate to `http://localhost:8080`.

## Project Structure
```
/lunaforge-root
  /tools
    index.html
    /plugins
      plugin-registry.js
      <tool>/manifest.json
      <tool>/<tool>.js
  /games
    index.html
    play.html
    /modules
      game-registry.js
      <game>/manifest.json
      <game>/<game>.js
    /leaderboard
      leaderboard.js
  /core
    router.js
    plugin-loader.js
    plugin-validator.js
    game-loader.js
    storage.js
  /css
    style.css
  /js
    main.js
    data-management.js
  index.html
  about.html
  README.md
  CONTRIBUTING.md
  LICENSE
```

## Plugin Manifest Schema
All tools and games must include a `manifest.json` file with:
```json
{
  "id": "unique-kebab-case-id",
  "name": "Plugin Name",
  "version": "1.0.0",
  "type": "tool",
  "description": "Short summary",
  "entry": "./plugins/my-tool/my-tool.js",
  "author": "Your Name",
  "permissions": []
}
```

### Tool Plugin API
Tool plugins export a default object with:
```js
export default {
  init: () => ({}),
  render: (container, state) => {},
  destroy: (container, state) => {}
}
```
- **init** returns per-instance state.
- **render** mounts UI and binds events.
- **destroy** cleans up any resources.

### Game Plugin API
Game modules export a default function:
```js
export default function createGame({ container, onScore, onMessage, onGameOver }) {
  return { start, reset, stop, destroy };
}
```
- **start** begins a session.
- **reset** restarts the game.
- **stop/destroy** handle cleanup.

## Import / Export
LunaForge stores settings, tool preferences, and leaderboards in localStorage. Use the About page to export or import a versioned JSON bundle.

## Multi-Repository Support
The architecture can be split into two repositories:
- **LunaForge-Tools**: `/tools`, `/core`, `/css`, `/js`
- **LunaForge-Games**: `/games`, `/core`, `/css`, `/js`

Both repositories are static and can be deployed to GitHub Pages.

## Accessibility
- Full keyboard navigation
- Visible focus indicators
- ARIA labels where needed
- High-contrast dark theme

## License
MIT License. See [LICENSE](LICENSE).
