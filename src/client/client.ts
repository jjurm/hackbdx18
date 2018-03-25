import {Game} from "./game";
import {reconnectWebsocket} from "./websocket";
import {AssignScreenToUserMsg} from "../messages";

export let game = new Game();
(<any>window).game = game;

export function startup() {
    reconnectWebsocket();

}

export let KEY_WALKIES_USER_ID = "walkiesUserId";

export function onSignIn(googleUser: any) {
    let profile = googleUser.getBasicProfile();
    let id = profile.getId();
    localStorage.setItem(KEY_WALKIES_USER_ID, id);
    game.sendMessage(AssignScreenToUserMsg.type, new AssignScreenToUserMsg(id));
}
(<any>window).onSignIn = onSignIn;

startup();
