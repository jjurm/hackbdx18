import * as http from "http";
import app from "./app";
import WebSocket from "ws";

export function runWebServer() {
    const server = http.createServer(app);
    const wss = new WebSocket.Server({server});

    wss.on('connection', function connection(conn: any, req) {
        //const location = url.parse(req.url!, true);
        console.log("Accepted WS connetion");

        conn.on('message', function incoming(message: string) {
            //let msg = JSON.parse(message) as AbcMessage;
            console.log(message);
        });
        conn.on('err', () => console.log("WS err"));

        /*let msg = new UpdateMessage(8);
        conn.send(JSON.stringify(msg));*/
    });
    wss.on('error', () => console.log('errored'));

    server.listen(8080, "0.0.0.0", function listening() {
        console.log('Listening on %d', server.address().port);
    });

}

runWebServer();

/*export function runWebsocketServer() {

    const WebSocket = require('ws');

    const wss = new WebSocket.Server({
        port: 8080,
        perMessageDeflate: {
            zlibDeflateOptions: { // See zlib defaults.
                chunkSize: 1024,
                memLevel: 7,
                level: 3,
            },
            zlibInflateOptions: {
                chunkSize: 10 * 1024
            },
            // Other options settable:
            clientNoContextTakeover: true, // Defaults to negotiated value.
            serverNoContextTakeover: true, // Defaults to negotiated value.
            clientMaxWindowBits: 10,       // Defaults to negotiated value.
            serverMaxWindowBits: 10,       // Defaults to negotiated value.
            // Below options specified as default values.
            concurrencyLimit: 10,          // Limits zlib concurrency for perf.
            threshold: 1024,               // Size (in bytes) below which messages
                                           // should not be compressed.
        }
    });


}*/