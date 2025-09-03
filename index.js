// index.js
const { createClient } = require('bedrock-protocol');
const express = require('express');

// === ATERNOS BOT SETTINGS ===
const SERVER_HOST = '162.55.95.54'; // Replace with your Aternos host
const SERVER_PORT = 43150;                            // Replace with your Aternos port
const BOT_NAME = 'Okarunbot';                         // Bot username

// === HTTP SERVER SETTINGS (Keeps bot alive on hosting like Replit/Glitch) ===
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => res.send('🤖 Bot is running...'));
app.listen(PORT, () => log(`🌐 HTTP server running on port ${PORT}`));

// === LOG HELPER ===
function log(msg) {
    console.log(`[${new Date().toLocaleTimeString()}] ${msg}`);
}

// === START BOT ===
function startBot() {
    const client = createClient({
        host: SERVER_HOST,
        port: SERVER_PORT,
        username: BOT_NAME,
        offline: true,   // Aternos usually allows offline, if not set to false
        reconnect: false // We'll handle reconnection manually
    });

    // When bot spawns
    client.on('spawn', () => {
        log('✅ Bot spawned successfully!');

        // Example: send a chat message to server
        // client.queue('text', { type: 'chat', needs_translation: false, source_name: BOT_NAME, message: 'Hello world!' });

        // Placeholder for movement (expand later)
        // moveForward(client);
    });

    // When server sends chat/messages
    client.on('text', (packet) => {
        if (packet.message) {
            log(`💬 Chat: ${packet.message}`);
        }
    });

    // Handle disconnect
    client.on('disconnect', (packet) => {
        log(`❌ Disconnected: ${packet.reason || 'Unknown reason'}`);
        log('🔄 Reconnecting in 5 seconds...');
        setTimeout(startBot, 5000);
    });

    // Handle errors
    client.on('error', (err) => {
        log(`⚠️ Error: ${err.message}`);
    });
}

// === MOVEMENT (Example placeholder) ===
function moveForward(client) {
    setInterval(() => {
        client.queue('move_player', {
            position: { x: Math.random() * 10, y: 70, z: Math.random() * 10 },
            pitch: 0,
            yaw: 0,
            headYaw: 0,
            mode: 0, // normal
            onGround: true,
            riddenEntityRuntimeId: 0,
            teleportCause: 0,
            teleportItem: 0
        });
        log('🚶 Bot moved a little.');
    }, 5000);
}

// Start bot
startBot();
