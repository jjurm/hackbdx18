import {Game} from "./game";
import {reconnectWebsocket} from "./websocket";

export let game = new Game();
(<any>window).game = game;

export function startup() {
    reconnectWebsocket();
}

startup();
