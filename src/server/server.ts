import * as http from "http";
import app from "./app";
import WebSocket from "ws";
import {AssignScreenToUserMsg, GenericMsg, MessageWrapper} from "../messages";
import {isWhiteSpace} from "tslint";
import {User} from "../user";
import {Client, Server} from "./classes";

export let server = new Server();

export function runWebServer() {
    const httpServer = http.createServer(app);
    //const wss = new WebSocket.Server({httpServer});
    const wss = new WebSocket.Server({server: httpServer});

    wss.on('connection', function connection(conn: any, req: any) {
        //const location = url.parse(req.url!, true);
        console.log("Accepted WS connetion");
        let client = new Client(conn);
        server.clients.push(client);

        conn.on('message', function incoming(message: any) {
            let wrapper = JSON.parse(message) as MessageWrapper;
            console.log(wrapper);

            switch (wrapper.type) {
                case AssignScreenToUserMsg.type:
                    let msg = wrapper.message as AssignScreenToUserMsg;
                    let user = createOrGetUser(msg.id);
                    client.user = user;
                    console.log("Assigned a screen to user " + user.id);
            }

        });
        conn.on('err', () => console.log("WS err"));
        conn.on('close', () => {
            console.log("WS close");
            let index = server.clients.indexOf(client, 0);
            if (index > -1) {
                server.clients.splice(index, 1);
            }
        });

        /*let msg = new UpdateMessage(8);
        conn.send(JSON.stringify(msg));*/
    });
    wss.on('error', () => console.log('errored'));

    httpServer.listen(9101, "0.0.0.0", function listening() {
        console.log('Listening on %d', httpServer.address().port);
    });

}

export function createOrGetUser(userid: string): User {
    if (!server.usersMap[userid]) {
        let user = new User(userid, "Akira");
        server.usersMap[userid] = user;
        server.usersList.push(user);
        console.log("Registered user " + userid);
        return user;
    } else return server.usersMap[userid];
}

runWebServer();
