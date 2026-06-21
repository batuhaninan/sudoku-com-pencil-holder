(function () {
  if (window.__sudokuShiftPencil) return;
  window.__sudokuShiftPencil = true;

  function getWrapper() {
    return document.getElementById('sudoku-wrapper');
  }

  function getUndoButton() {
    return document.querySelector('[data-action=undo]');
  }

  function hasModifier(event) {
    return event.ctrlKey || event.metaKey || event.altKey;
  }

  function isPencilModeEnabled() {
    const wrapper = getWrapper();
    return wrapper && wrapper.classList.contains('pencil-mode');
  }

  function setPencilMode(enabled) {
    const wrapper = getWrapper();
    if (!wrapper || isPencilModeEnabled() === enabled) return;
    wrapper.classList.toggle('pencil-mode', enabled);
  }

  function triggerUndo() {
    const button = getUndoButton();
    if (!button || button.classList.contains('disabled')) return;
    button.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
  }

  document.addEventListener('keydown', (event) => {
    if (hasModifier(event) && event.key.toLowerCase() === 'z' && !event.shiftKey) {
      triggerUndo();
      event.preventDefault();
      return;
    }

    if (event.key !== 'Shift' || event.repeat || hasModifier(event)) return;
    setPencilMode(true);
  });

  document.addEventListener('keyup', (event) => {
    if (event.key !== 'Shift') return;
    if (event.shiftKey) return; // other Shift key still held
    setPencilMode(false);
  });
})();
