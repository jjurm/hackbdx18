import * as http from "http";
import app from "./app";
import WebSocket from "ws";
import {GenericMsg} from "../messages";
import {isWhiteSpace} from "tslint";
import {User} from "../user";
import {Server} from "./classes";

let server = new Server();

export function runWebServer() {
    const server = http.createServer(app);
    const wss = new WebSocket.Server({server});

    wss.on('connection', function connection(conn: any, req) {
        //const location = url.parse(req.url!, true);
        console.log("Accepted WS connetion");


        conn.on('message', function incoming(message: string) {
            let msg = JSON.parse(message) as GenericMsg;
            console.log(msg);


        });
        conn.on('err', () => console.log("WS err"));
        conn.on('close', () => console.log("WS close"));

        /*let msg = new UpdateMessage(8);
        conn.send(JSON.stringify(msg));*/
    });
    wss.on('error', () => console.log('errored'));

    server.listen(9101, "0.0.0.0", function listening() {
        console.log('Listening on %d', server.address().port);
    });

}



runWebServer();
