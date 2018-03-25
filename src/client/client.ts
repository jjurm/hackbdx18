import {Game} from "./game";
import {reconnectWebsocket} from "./websocket";
import {AssignScreenToUserMsg} from "../messages";

export let game = new Game();
(<any>window).game = game;

export function startup() {
    reconnectWebsocket();
}

export function onSignIn(googleUser: any) {
    let profile = googleUser.getBasicProfile();
    let id = profile.getId();
    game.sendMessage(AssignScreenToUserMsg.type, new AssignScreenToUserMsg(id));
}
(<any>window).onSignIn = onSignIn;

startup();
