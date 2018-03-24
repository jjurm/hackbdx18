import {game} from "./client";

export function reconnectWebsocket() {
    let retryTimeout: number;
    if (game.unsuccessfulSocketAttempts == 0) {
        retryTimeout = 0;
    } else if (game.unsuccessfulSocketAttempts < 8) {
        retryTimeout = Math.pow(2, game.unsuccessfulSocketAttempts - 1) * 250;
    } else {
        console.error("Giving up socket connection!");
        return;
    }
    if (retryTimeout > 0) {
        console.log("Retrying socket connection in " + (retryTimeout / 1000) + "s");
    }
    setTimeout(() => {
        let wsOld = game.ws;
        doWebsocketConnection();
        if (wsOld != null) {
            wsOld.close();
        }
    }, retryTimeout);
}

function doWebsocketConnection() {
    let ws = new WebSocket("ws://sq.jjurm.com:8080");

    ws.onopen = event => {
        console.log("Socket connected");
        game.unsuccessfulSocketAttempts = 0;
    };
    ws.onclose = event => {
        console.error("Socket error");
        game.unsuccessfulSocketAttempts++;
        reconnectWebsocket();
    };
    ws.onclose = event => {
        console.warn("Socket closed");
        game.unsuccessfulSocketAttempts++;
        reconnectWebsocket();
    };
    ws.onmessage = message => {
        console.log("Got: " + message);
    };

    game.ws = ws;
}
