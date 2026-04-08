const EventEmitter = require('events');

// 1. Create EventEmitter instance
const myEmitter = new EventEmitter();

console.log('🚀 EventEmitter Demo Starting...');

// 2. Register multiple listeners with data
myEmitter.on('userLogin', (user, timestamp) => {
  console.log(`👤 LOGIN: ${user} at ${timestamp}`);
});

myEmitter.on('orderPlaced', (orderId, amount, user) => {
  console.log(`🛒 ORDER: #${orderId} for $${amount} by ${user}`);
  // Trigger chained event
  myEmitter.emit('paymentStart', orderId, amount);
});

myEmitter.on('paymentStart', (orderId, amount) => {
  console.log(`💳 PAYMENT: Processing #${orderId} ($${amount})`);
});

myEmitter.on('paymentStart', (orderId) => {
  console.log(`📧 EMAIL: Receipt sent for #${orderId}`);
  console.log('✅ All events complete!');
});

// 3. Emit events (async event loop)
console.log('1️⃣ Registering listeners...');
setTimeout(() => {
  console.log('2️⃣ Triggering events...');
  myEmitter.emit('userLogin', 'alice@example.com', new Date().toLocaleTimeString());
  myEmitter.emit('orderPlaced', 12345, 99.99, 'alice@example.com');
}, 1000);