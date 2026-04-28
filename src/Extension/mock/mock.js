(function () {
  const sessionId = `mock-${Date.now()}`;
  const log = document.getElementById('log');
  const preview = document.getElementById('preview');

  function write(message) {
    log.textContent = `${new Date().toISOString()} ${message}\n${log.textContent}`;
  }

  window.addEventListener('message', (event) => {
    if (event.source !== window)
      return;
    if (event.origin !== window.location.origin)
      return;
    const message = event.data;
    if (!message || message.source !== 'drapo-bridge')
      return;
    write(JSON.stringify(message, null, 2));
    if (message.type === 'drapo-bridge:screenshot-result' && message.ok)
      preview.src = message.imageDataUrl;
  });

  document.getElementById('handshake').addEventListener('click', () => {
    window.postMessage({
      source: 'drapo',
      type: 'drapo-bridge:handshake',
      bridgeSessionId: sessionId
    }, window.location.origin);
  });

  function capture(mode, rect) {
    window.postMessage({
      source: 'drapo',
      type: 'drapo-bridge:screenshot',
      requestId: crypto.randomUUID(),
      bridgeSessionId: sessionId,
      mode,
      rect
    }, window.location.origin);
  }

  document.getElementById('viewport').addEventListener('click', () => capture('viewport'));
  document.getElementById('fullPage').addEventListener('click', () => capture('fullPage'));
  document.getElementById('element').addEventListener('click', () => {
    const fragment = document.getElementById('fragment');
    const rect = fragment.getBoundingClientRect();
    capture('element', {
      x: rect.left + window.scrollX,
      y: rect.top + window.scrollY,
      width: rect.width,
      height: rect.height
    });
  });
})();
