// 'use strict'; // 🔒 Required to throw on frozen objects

const pixelApi = {
  subscriptions: {},

  subscribe(eventName, callback) {
    if (!this.subscriptions[eventName]) {
      this.subscriptions[eventName] = [];
    }
    this.subscriptions[eventName].push(callback);
  },

  triggerEvent(eventName, payload) {
    if (this.subscriptions[eventName]) {
      const frozenPayload = Object.freeze(payload); // 🧊 like Shopify

      this.subscriptions[eventName].forEach(cb => cb(frozenPayload));
    }
  }
};

const analytics = {
  subscribe: pixelApi.subscribe.bind(pixelApi)
};

function initPixel() {
  analytics.subscribe('checkout_completed', (event) => {
    try {
      // ❌ This will throw in strict mode with frozen object
      event.hashCode = "abc123";
      postMessage(`[Pixel] Event: ${JSON.stringify(event)}`);
    } catch (err) {
      postMessage(`[Pixel ERROR] ${err.message}`);
    }
  });

  postMessage('[Pixel] Subscribed to checkout_completed');
}

self.onmessage = (e) => {
  const { type, eventName, payload } = e.data;

  if (type === 'init') {
    initPixel();
  }

  if (type === 'event') {
    pixelApi.triggerEvent(eventName, payload);
  }
};
