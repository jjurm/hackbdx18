import {game, KEY_WALKIES_USER_ID} from "./client";
import {AssignScreenToUserMsg, MessageWrapper, MoveMsg, TestScreenMsg} from "../messages";

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
    let ws = new WebSocket("wss://walkies.jjurm.com/websocket");

    ws.onopen = event => {
        console.log("Socket connected");
        game.unsuccessfulSocketAttempts = 0;
        let storedId = localStorage.getItem(KEY_WALKIES_USER_ID);
        if (storedId) {
            game.sendMessage(AssignScreenToUserMsg.type, new AssignScreenToUserMsg(storedId));
        }
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
        let wrapper = JSON.parse(message.data) as MessageWrapper;
        console.log(wrapper);

        switch (wrapper.type) {
            case TestScreenMsg.type:
                console.log("Received ping");
                break;
            case MoveMsg.type:
                let msg = wrapper.message as MoveMsg;
                bMove(msg.place);
                break;
        }
    };

    game.ws = ws;
}
