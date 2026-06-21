(function () {
  if (window.__sudokuShiftPencil) return;
  window.__sudokuShiftPencil = true;

  const SOURCE = 'sudoku-shift-pencil';

  const script = document.createElement('script');
  script.src = chrome.runtime.getURL('page.js');
  script.onload = () => script.remove();
  (document.head || document.documentElement).appendChild(script);

  function setNotesMode(enabled) {
    window.postMessage({ source: SOURCE, type: 'setNotesMode', enabled }, '*');
  }

  function hasModifier(event) {
    return event.ctrlKey || event.metaKey || event.altKey;
  }

  function triggerUndo() {
    const button = document.querySelector('[data-action=undo]');
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
    setNotesMode(true);
  });

  document.addEventListener('keyup', (event) => {
    if (event.key !== 'Shift' || event.shiftKey) return;
    setNotesMode(false);
  });
})();
