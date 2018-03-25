import {User} from "../user";
import {GenericMsg, MessageWrapper} from "../messages";
import {game} from "./client";

export class Game {

    public ws?: WebSocket;
    public unsuccessfulSocketAttempts = 0;

    public sendMessage(type: string, msg: GenericMsg) {
        let wrapper = new MessageWrapper(type, msg);
        game.ws!.send(JSON.stringify(wrapper));
    }

}
