# Sudoku.com Shift Pencil

Hold **Shift** to enter pencil/notes mode on [sudoku.com](https://sudoku.com/). Release Shift to go back to normal digit entry.

Works by toggling sudoku.com's built-in Notes button while Shift is held (`#sudoku-wrapper.pencil-mode` / `[data-action=pencil]`).

## One-command install (Windows)

From PowerShell:

```powershell
irm https://raw.githubusercontent.com/YOUR_USER/sudoku/main/install.ps1 | iex
```

Installs to `%LOCALAPPDATA%\sudoku-shift-pencil\chrome-extension`.

Run the same command again anytime to update.

## One-command install (Linux / macOS)

```bash
curl -fsSL https://raw.githubusercontent.com/YOUR_USER/sudoku/main/install.sh | bash
```

Installs to `~/.local/share/sudoku-shift-pencil/chrome-extension` (or `$XDG_DATA_HOME/sudoku-shift-pencil` if set).

Run the same command again anytime to update.

> Replace `YOUR_USER/sudoku` with your GitHub repo path after you push this project. The install scripts also work locally without GitHub (see below).

## Chrome setup (first time only)

1. Open `chrome://extensions`
2. Turn on **Developer mode**
3. Click **Load unpacked**
4. Select the extension folder printed by the install script:
   - **Windows:** `%LOCALAPPDATA%\sudoku-shift-pencil\chrome-extension`
   - **Linux:** `~/.local/share/sudoku-shift-pencil/chrome-extension`

After updates, click the **reload** icon on the extension card in `chrome://extensions` (or remove and load unpacked again if Chrome does not pick up changes).

## Local install (no GitHub)

If you already have this repo on your machine:

**Windows**

```powershell
powershell -ExecutionPolicy Bypass -File install.ps1
```

**Linux / macOS**

```bash
bash install.sh
```

These copy `chrome-extension/` into the install location above.

## How it works

| Action | Mode |
|--------|------|
| Normal | Enter digits |
| Hold Shift | Pencil / notes |
| Release Shift | Back to digits |

## Project layout

```
chrome-extension/
  manifest.json   # Chrome extension manifest (MV3)
  content.js      # Shift key listener + pencil toggle
install.ps1       # Windows installer / updater
install.sh        # Linux/macOS installer / updater
```

## Publishing to GitHub

1. Create a repo and push this project
2. Replace `YOUR_USER/sudoku` in this README and in `install.ps1` / `install.sh` (`RepoUrl` / `REPO_URL`)
3. Use the one-command install lines above

## Credits

Inspired by community bookmarklets for sudoku.com pencil mode ([gist](https://gist.github.com/itsmarsu/e03f23b3451eaf467f472464c6ffe3e8), [Luke Murray](https://lukesmurray.com/blog/sudoku-bookmarklet)).
