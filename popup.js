document.addEventListener('DOMContentLoaded', () => {
  const events = [
    'abort', 'blur', 'change', 'click', 'dblclick', 'error', 'focus', 'focusin', 'focusout', 
    'input', 'keydown', 'keypress', 'keyup', 'load', 'mousedown', 'mouseenter', 'mouseleave', 
    'mousemove', 'mouseout', 'mouseover', 'mouseup', 'resize', 'scroll', 'select', 'submit', 
    'unload', 'wheel'
  ];

  const checkboxGroup = document.querySelector('.checkbox-group');
  
  events.forEach(event => {
    const label = document.createElement('label');
    label.innerHTML = `<input type="checkbox" id="${event}"> ${event}`;
    checkboxGroup.appendChild(label);
  });

  document.getElementById('apply').addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      events.forEach(event => {
        const checkbox = document.getElementById(event);
        const enable = checkbox.checked;
        chrome.tabs.sendMessage(tabs[0].id, { action: 'toggleEvent', event: event, enable: enable }, (response) => {
          if (chrome.runtime.lastError) {
            console.error(chrome.runtime.lastError.message);
          } else {
            console.log(response.status);
          }
        });
      });
    });
  });
});
