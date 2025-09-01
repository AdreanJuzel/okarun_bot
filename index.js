// index.js
const { createClient } = require('bedrock-protocol');
const express = require('express');

// === ATERNOS BOT SETTINGS ===
const SERVER_HOST = 'Projectwalker-p2Ee.aternos.me'; // Replace with your Aternos host
const SERVER_PORT = 41372;                            // Replace with your Aternos port
const BOT_NAME = 'Okarunbot';                         // Any name you like

// === HTTP SERVER SETTINGS ===
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Bot is alive!');
});

app.listen(PORT, () => {
    console.log(`🌐 HTTP server running on port ${PORT}`);
});

// === BOT FUNCTION ===
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

// Start the bot
startBot();
