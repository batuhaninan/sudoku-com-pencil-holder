# Install or update Sudoku.com Shift Pencil Chrome extension on Windows.
# Usage: powershell -ExecutionPolicy Bypass -File install.ps1

$ErrorActionPreference = "Stop"

$RepoUrl = "https://github.com/batuhaninan/sudoku.git"
$InstallRoot = Join-Path $env:LOCALAPPDATA "sudoku-shift-pencil"
$ExtensionPath = Join-Path $InstallRoot "chrome-extension"
$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path

function Install-FromLocal {
    $source = Join-Path $ScriptDir "chrome-extension"
    if (-not (Test-Path $source)) {
        throw "chrome-extension folder not found next to install.ps1"
    }

    Write-Host "Installing from local copy..."
    New-Item -ItemType Directory -Force -Path $InstallRoot | Out-Null
    if (Test-Path $ExtensionPath) {
        Remove-Item -Recurse -Force $ExtensionPath
    }
    Copy-Item -Recurse -Force $source $ExtensionPath
}

function Install-FromGit {
    if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
        throw "git is required. Install Git for Windows: https://git-scm.com/download/win"
    }

    if (Test-Path (Join-Path $InstallRoot ".git")) {
        Write-Host "Updating from $RepoUrl ..."
        git -C $InstallRoot pull --ff-only
    } else {
        Write-Host "Downloading from $RepoUrl ..."
        if (Test-Path $InstallRoot) {
            Remove-Item -Recurse -Force $InstallRoot
        }
        git clone $RepoUrl $InstallRoot
    }

    if (-not (Test-Path $ExtensionPath)) {
        throw "chrome-extension not found after clone. Check RepoUrl in install.ps1."
    }
}

if (Test-Path (Join-Path $ScriptDir "chrome-extension")) {
    Install-FromLocal
} else {
    Install-FromGit
}

Write-Host ""
Write-Host "Extension ready at:"
Write-Host "  $ExtensionPath"
Write-Host ""
Write-Host "Chrome setup (first time only):"
Write-Host "  1. Open chrome://extensions"
Write-Host "  2. Enable Developer mode"
Write-Host "  3. Load unpacked -> select the folder above"
Write-Host ""
Write-Host "To update later, run this install command again."
