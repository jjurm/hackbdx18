import {User, UserInfo} from "../user";
import WebSocket from "ws";
import {GenericMsg, MessageWrapper} from "../messages";

export class Server {
    public clients: Array<Client> = [];
    public usersList: Array<User> = [];
    public usersMap: { [key: string]: User; } = {};
}

export class Client {
    public ws: WebSocket;
    public user?: User;

    constructor(ws: WebSocket) {
        this.ws = ws;
    }

    public sendMessage(type: string, msg: GenericMsg) {
        let wrapper = new MessageWrapper(type, msg);
        this.ws!.send(JSON.stringify(wrapper));
    }
}
