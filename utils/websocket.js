import { WebSocketServer } from 'ws';

const setupWebSocket = (server) => {
    const wss = new WebSocketServer({ server });

    wss.on('connection', (ws) => {
        console.log('New WebSocket connection established.');

        ws.on('message', (message) => {
            console.log(`Received: ${message}`);
            ws.send(`Echo: ${message}`);
        });

        ws.on('close', () => {
            console.log('WebSocket connection closed.');
        });
    });

    return wss;
};

export default setupWebSocket;