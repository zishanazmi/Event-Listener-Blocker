const events = [
  'abort', 'blur', 'change', 'click', 'dblclick', 'error', 'focus', 'focusin', 'focusout', 
  'input', 'keydown', 'keypress', 'keyup', 'load', 'mousedown', 'mouseenter', 'mouseleave', 
  'mousemove', 'mouseout', 'mouseover', 'mouseup', 'resize', 'scroll', 'select', 'submit', 
  'unload', 'wheel'
];
const blockedEvents = {};

function blockEvent(event) {
  if (!blockedEvents[event]) {
    blockedEvents[event] = new Set();
  }

  document.querySelectorAll('*').forEach(element => {
    const listener = (e) => {
      e.stopImmediatePropagation();
      e.preventDefault();
    };
    blockedEvents[event].add({ element, listener });
    element.addEventListener(event, listener, true);
  });
}

function unblockEvent(event) {
  if (blockedEvents[event]) {
    blockedEvents[event].forEach(({ element, listener }) => {
      element.removeEventListener(event, listener, true);
    });
    blockedEvents[event] = new Set();
  }
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'toggleEvent') {
    if (request.enable) {
      blockEvent(request.event);
    } else {
      unblockEvent(request.event);
    }
    sendResponse({ status: 'Event listeners toggled' });
  }
});
