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
      const frozenPayload = Object.freeze(payload); // ❄️ mimic Shopify sandbox protection

      this.subscriptions[eventName].forEach(cb => cb(frozenPayload));
    }
  }
};

// Expose a mock "analytics" object like Shopify
const analytics = {
  subscribe: pixelApi.subscribe.bind(pixelApi)
};

// Pixel script (simulates user code)
function initPixel() {
  analytics.subscribe('checkout_completed', (event) => {
    try {
      // ❌ Try to mutate a frozen object like in Shopify
      event.hashCode = "abc123";

      postMessage(`[Pixel] Event received: ${JSON.stringify(event)}`);
    } catch (err) {
      postMessage(`[Pixel ERROR] ${err.message}`);
    }
  });

  postMessage('[Pixel] Initialized and subscribed to checkout_completed');
}

// Listen for init and events from main page
self.onmessage = (e) => {
  const { type, eventName, payload } = e.data;

  if (type === 'init') {
    initPixel();
  }

  if (type === 'event' && eventName) {
    pixelApi.triggerEvent(eventName, payload);
  }
};
