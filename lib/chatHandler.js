const http = require('http');
const fs = require('fs');
const path = require('path');
const webSocket = require('ws');

const chatHandler = server => {
    const wss = new webSocket.Server({ server });

    // --- Handling Client
    wss.on('connection', ws => {
        ws.on('message', message => {
            console.log(`Received: ${message}`);
            wss.clients.forEach(client => {
                if (client.readyState === webSocket.OPEN) {
                    client.send(message);
                }
            })
        })
        console.log('Yehudit Client Connected');
        ws.send('Wellcom to the chat');
    })


}
module.exports = { chatHandler };
