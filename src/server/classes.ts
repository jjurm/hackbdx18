import {User} from "../user";
import WebSocket from "ws";

export class Server {
    public clients: Array<Client> = [];
    public usersMap: { [key: string]: User; } = {}

}

export class Client {
    public ws: WebSocket;
    public user?: User;

    constructor(ws: WebSocket) {
        this.ws = ws;
    }
}
