const { createClient } = require('bedrock-protocol');

const SERVER_HOST = 'Projectwalker-p2Ee.aternos.me';
const SERVER_PORT = 41372;
const BOT_NAME = 'Okarunbot';

function startBot() {
  const client = createClient({
    host: SERVER_HOST,
    port: SERVER_PORT,
    username: BOT_NAME,
    offline: true,
    reconnect: false
  });

  client.on('spawn', () => {
    console.log('✅ Bot spawned successfully!');
  });

  client.on('text', (packet) => {
    if (packet.message) {
        console.log(`💬 Message: ${packet.message}`);
    }
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

startBot();
