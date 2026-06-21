(function () {
  if (window.__sudokuShiftPencil) return;
  window.__sudokuShiftPencil = true;

  function getPencilButton() {
    return document.querySelector('[data-action=pencil]') ||
      document.querySelector('.game-controls-pencil');
  }

  function isPencilModeEnabled() {
    const wrapper = document.getElementById('sudoku-wrapper');
    return wrapper && wrapper.classList.contains('pencil-mode');
  }

  function setPencilMode(enabled) {
    const button = getPencilButton();
    if (!button || isPencilModeEnabled() === enabled) return;
    button.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
  }

  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Shift' || event.repeat) return;
    setPencilMode(true);
  });

  document.addEventListener('keyup', (event) => {
    if (event.key !== 'Shift') return;
    if (event.shiftKey) return; // other Shift key still held
    setPencilMode(false);
  });
})();
