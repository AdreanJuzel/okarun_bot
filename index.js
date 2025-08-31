// index.js
const { createClient } = require('bedrock-protocol');

// Create a client
const client = createClient({
  host: 'Projectwalker-p2Ee.aternos.me',   // Replace with server IP
  port: 19132,              // Default Bedrock port
  username: 'MyBot',        // Bot name (Gamertag-like)
  offline: true             // Set to true if server allows offline players (no Xbox login)
});

// On login
client.on('spawn', () => {
  console.log('✅ Bot has joined the server!');
});

// On chat message
client.on('text', (packet) => {
  console.log(`[CHAT] ${packet.source_name}: ${packet.message}`);
});

// Send chat after joining
setTimeout(() => {
  client.queue('text', {
    type: 'chat',
    needs_translation: false,
    source_name: 'MyBot',
    message: 'Hello, I am a bot!'
  });
}, 5000);
