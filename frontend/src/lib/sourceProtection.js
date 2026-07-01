const INTERACTIVE_SELECTOR = 'input, textarea, select, button, a, [contenteditable="true"], [data-allow-copy="true"]';

const BLOCKED_SHORTCUTS = new Set([
  'u', // view source
  's', // save page
  'p', // print (optional - might annoy users wanting to print quotes)
]);

function isInteractiveTarget(target) {
  return target instanceof Element && target.closest(INTERACTIVE_SELECTOR);
}

function isBlockedShortcut(event) {
  if (event.key === 'F12') {
    return true;
  }

  if (!(event.ctrlKey || event.metaKey)) {
    return false;
  }

  const key = event.key.toLowerCase();

  if (event.shiftKey && ['i', 'j', 'c'].includes(key)) {
    return true;
  }

  return BLOCKED_SHORTCUTS.has(key);
}

export function shouldEnableSourceProtection(pathname = '') {
  return import.meta.env.PROD && !pathname.startsWith('/admin');
}

export function enableSourceProtection() {
  if (typeof window === 'undefined') {
    return () => {};
  }

  document.documentElement.classList.add('source-protected');

  const handleContextMenu = (event) => {
    if (!isInteractiveTarget(event.target)) {
      event.preventDefault();
    }
  };

  const handleKeyDown = (event) => {
    if (isInteractiveTarget(event.target)) return;
    if (isBlockedShortcut(event)) {
      event.preventDefault();
      event.stopPropagation();
    }
  };

  const handleDragStart = (event) => {
    if (event.target instanceof HTMLImageElement) {
      event.preventDefault();
    }
  };

  const handleCopy = (event) => {
    if (event.target instanceof HTMLImageElement) {
      event.preventDefault();
    }
  };

  document.addEventListener('contextmenu', handleContextMenu);
  document.addEventListener('keydown', handleKeyDown, true);
  document.addEventListener('dragstart', handleDragStart);
  document.addEventListener('copy', handleCopy);

  return () => {
    document.documentElement.classList.remove('source-protected');
    document.removeEventListener('contextmenu', handleContextMenu);
    document.removeEventListener('keydown', handleKeyDown, true);
    document.removeEventListener('dragstart', handleDragStart);
    document.removeEventListener('copy', handleCopy);
  };
}
