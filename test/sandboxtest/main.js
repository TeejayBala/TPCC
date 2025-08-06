// Load the sandboxed pixel (simulating Shopify pixel app extension)
// const pixelWorker = new Worker('sandboxed-worker.js');

const pixelWorker = new Worker('bot.min.js');

// Send custom pixel "init" message
pixelWorker.postMessage({
  type: 'init',
  pixelId: 'custom_pixel_001',
});

// Simulate checkout completed event from main site
document.getElementById('sendEvent').addEventListener('click', () => {
  pixelWorker.postMessage({
    type: 'event',
    eventName: 'checkout_completed',
    payload: {
      orderId: 9876,
      total: 1999,
    }
  });
});

// Listen for logs or pixel responses from sandbox
pixelWorker.onmessage = (e) => {
  console.log('[Main] From Pixel:', e.data);
};