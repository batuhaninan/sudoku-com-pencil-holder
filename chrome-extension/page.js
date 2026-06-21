(function () {
  if (window.__sudokuShiftPencilPage) return;
  window.__sudokuShiftPencilPage = true;

  const SOURCE = 'sudoku-shift-pencil';

  function findStore(require) {
    for (const id of Object.keys(require.m || {})) {
      try {
        const mod = require(id);
        for (const key of ['A', 'default']) {
          const candidate = mod?.[key];
          if (
            candidate?.state?.notesMode !== undefined &&
            typeof candidate.dispatch === 'function'
          ) {
            return candidate;
          }
        }
      } catch (_) {}
    }
    return null;
  }

  let store;

  function getStore() {
    if (store) return store;
    (self.webpackChunk = self.webpackChunk || []).push([
      [SOURCE],
      {},
      (require) => {
        store = findStore(require);
      },
    ]);
    return store;
  }

  function syncWrapperClass(enabled) {
    const wrapper = document.getElementById('sudoku-wrapper');
    if (wrapper) wrapper.classList.toggle('pencil-mode', enabled);
  }

  function clickPencilButton() {
    const button = document.querySelector('[data-action=pencil]');
    if (button) {
      button.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
    }
  }

  function setNotesMode(enabled) {
    const gameStore = getStore();

    if (gameStore) {
      if (gameStore.state.notesMode !== enabled) {
        gameStore.dispatch('updateBoard', { type: 'note', value: enabled });
      }
      syncWrapperClass(enabled);
      return;
    }

    const wrapper = document.getElementById('sudoku-wrapper');
    if (!wrapper) return;
    if (wrapper.classList.contains('pencil-mode') !== enabled) {
      clickPencilButton();
    }
  }

  window.addEventListener('message', (event) => {
    if (event.source !== window || event.data?.source !== SOURCE) return;
    if (event.data.type === 'setNotesMode') {
      setNotesMode(event.data.enabled);
    }
  });
})();
