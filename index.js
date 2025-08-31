// index.js
const { createClient } = require('bedrock-protocol');

const SERVER_HOST = 'Projectwalker-p2Ee.aternos.me'; // Your Aternos host
const SERVER_PORT = 41372;                            // Your Aternos port
const BOT_NAME = 'Okarunbot';                         // Any name you like

function startBot() {
  const client = createClient({
    host: SERVER_HOST,
    port: SERVER_PORT,
    username: BOT_NAME,
    offline: true,           // Cracked mode
    reconnect: false         // We'll handle reconnect manually
  });

  client.on('spawn', () => {
    console.log('✅ Bot spawned successfully!');
    client.write('text', { message: 'Hello from Render!' });
  });

  client.on('text', (packet) => {
    console.log(`💬 Message: ${packet.message}`);
  });

  client.on('disconnect', (packet) => {
    console.log('❌ Disconnected:', packet.reason || 'Unknown reason');
    console.log('🔄 Reconnecting in 5 seconds...');
    setTimeout(startBot, 5000);
  });

  client.on('error', (err) => {
    console.log('⚠️ Error:', err.message);
  });
}

// Start the bot
startBot();
