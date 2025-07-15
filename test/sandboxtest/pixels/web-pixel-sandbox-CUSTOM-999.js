debugger;

console.log("🎯 Pixel code running in sandbox");

const obj = Object.preventExtensions({ id: 1 });

try {
  obj.hashCode = "abc123"; // this will throw
} catch (e) {
  console.error("🔥 Error from pixel:", e.message);
}

// Simulate sending data back to main page
window.top.postMessage({
  type: "PIXEL_EVENT",
  payload: {
    event: "page_view",
    timestamp: Date.now(),
    url: location.href,
  }
}, "*");
