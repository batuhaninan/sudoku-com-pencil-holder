#!/usr/bin/env bash
# Install or update Sudoku.com Shift Pencil Chrome extension on Linux/macOS.
# Usage: bash install.sh

set -euo pipefail

REPO_URL="https://github.com/YOUR_USER/sudoku.git"
INSTALL_ROOT="${XDG_DATA_HOME:-$HOME/.local/share}/sudoku-shift-pencil"
EXTENSION_PATH="$INSTALL_ROOT/chrome-extension"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

install_from_local() {
  local source="$SCRIPT_DIR/chrome-extension"
  if [[ ! -d "$source" ]]; then
    echo "chrome-extension folder not found next to install.sh" >&2
    exit 1
  fi

  echo "Installing from local copy..."
  mkdir -p "$INSTALL_ROOT"
  rm -rf "$EXTENSION_PATH"
  cp -R "$source" "$EXTENSION_PATH"
}

install_from_git() {
  if ! command -v git >/dev/null 2>&1; then
    echo "git is required. Install git and retry." >&2
    exit 1
  fi

  if [[ -d "$INSTALL_ROOT/.git" ]]; then
    echo "Updating from $REPO_URL ..."
    git -C "$INSTALL_ROOT" pull --ff-only
  else
    echo "Downloading from $REPO_URL ..."
    rm -rf "$INSTALL_ROOT"
    git clone "$REPO_URL" "$INSTALL_ROOT"
  fi

  if [[ ! -d "$EXTENSION_PATH" ]]; then
    echo "chrome-extension not found after clone. Check REPO_URL in install.sh." >&2
    exit 1
  fi
}

if [[ -d "$SCRIPT_DIR/chrome-extension" ]]; then
  install_from_local
else
  install_from_git
fi

echo ""
echo "Extension ready at:"
echo "  $EXTENSION_PATH"
echo ""
echo "Chrome setup (first time only):"
echo "  1. Open chrome://extensions"
echo "  2. Enable Developer mode"
echo "  3. Load unpacked -> select the folder above"
echo ""
echo "To update later, run this install command again."
