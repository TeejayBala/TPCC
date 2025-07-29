// Simulate the pixel API inside Shopify's sandboxed environment
const pixelApi = {
  subscriptions: {},

  subscribe: function (eventName, callback) {
    if (!this.subscriptions[eventName]) {
      this.subscriptions[eventName] = [];
    }
    this.subscriptions[eventName].push(callback);
  },

  triggerEvent: function (eventName, payload) {
    if (this.subscriptions[eventName]) {
      this.subscriptions[eventName].forEach(cb => cb(payload));
    }
  }
};

// Expose the "analytics" object like Shopify
const analytics = {
  subscribe: pixelApi.subscribe.bind(pixelApi)
};

// Pixel initialization code (simulates what runs inside a real pixel)
function initPixel() {
  analytics.subscribe('checkout_completed', (event) => {
    postMessage(`[Pixel] Checkout completed: Order #${event.orderId} - ₹${event.total}`);
  });

  postMessage('[Pixel] Initialized and subscribed to events.');
}

// Receive events from the main thread
self.onmessage = (e) => {
  const { type, eventName, payload } = e.data;

  if (type === 'init') {
    initPixel();
  }

  if (type === 'event' && eventName) {
    pixelApi.triggerEvent(eventName, payload);
  }
};
