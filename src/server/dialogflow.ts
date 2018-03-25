import {server} from "./server";
import {User} from "../user";
import {createOrGetUser} from "./server";
import {defaultUserId, userMappings} from "../hackathon";
import {Client} from "./classes";
import {MoveMsg, TestScreenMsg} from "../messages";

export function processDfRequest(request: any): DFResponse {

    let anonUserId = (request.originalRequest && request.originalRequest.data.user.userId);
    let user: User;
    if (anonUserId) {
        console.log("Voice command by user " + anonUserId);
        let usrid = userMappings[anonUserId];
        user = createOrGetUser(usrid);
    } else {
        console.log("Voice command by default user");
        user = createOrGetUser(defaultUserId);
    }

    let action = request.result.action;

    switch (action) {
        case "welcome":
            return new DFResponse("Welcome to the game!");

        case "test_screen":
            forOwnedScreens(user, client => {
                client.sendMessage(TestScreenMsg.type, new TestScreenMsg());
            });
            return new DFResponse("Tested.");

        case "room":
            let count = 0;
            for (let otherUser of server.usersList) {
                if (user.place == otherUser.place) {
                    count++;
                }
            }
            return new DFResponse("There are " + count + " people in the room.");

        case "change_name":
            return new DFResponse("Ok, your name is changed");

        case "move":
            let place = request.result.parameters.place;
            console.log("Moving user from " + user.place + " to "+place);
            if (place) {
                user.place = place;
                forOwnedScreens(user, client => client.sendMessage(MoveMsg.type, new MoveMsg(place)));
                return new DFResponse("You are now located in " + user.place);
            } else {
                return new DFResponse("Unknown place.");
            }

        default:
            return new DFResponse("Sorry, the backend doesn't understand your action");
    }
}

function forOwnedScreens(user: User, lambda: (client: Client) => void) {
    for (let client of server.clients) {
        if (client.user == user) {
            lambda(client);
        }
    }
}

export class DFResponse {
    public speech: string;
    public displayText: string;
    public data: any;

    constructor(speech: string, displayText: string = speech, data: any = null) {
        this.speech = speech;
        this.displayText = displayText;
        this.data = data;
    }
}