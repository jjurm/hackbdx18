import {server} from "./server";
import {User} from "../user";
import {createOrGetUser} from "./server";
import {defaultUserId, userMappings} from "../hackathon";
import {Client} from "./classes";
import {ChooseAvatarMsg, MoveMsg, TestScreenMsg} from "../messages";

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
            let names = [];
            for (let otherUser of server.usersList) {
                if (user.place == otherUser.place) {
                    count++;
                    names.push(otherUser.name);
                }
            }
            let resp;
            if (count == 0) resp = "There is no one in the room.";
            else if (count == 1) resp = "Only you are in the room.";
            else resp = "There are " + count + " people in the room: " + names.join(", ");

            return new DFResponse(resp);

        case "where_is":
            let name2 = request.result.parameters.name;
            for (let otherUser of server.usersList) {
                if (otherUser.name.toLocaleLowerCase() == name2.toLocaleLowerCase()) {
                    return new DFResponse(name2 + " is in " + otherUser.place);
                }
            }
            return new DFResponse("Sorry, " + name2 + " doesn't seem to be playing the game.");


        case "choose_avatar":

            let ordinal = request.result.parameters.ordinal;

            forOwnedScreens(user, client => {
                client.sendMessage(ChooseAvatarMsg.type, new ChooseAvatarMsg(ordinal));
            });

            return new DFResponse("You chose avatar "+ordinal);

        case "change_name":

            let name = request.result.parameters.name;
            user.name = name;

            return new DFResponse("Ok, your name is changed to " + name);

        case "move":
            let place = request.result.parameters.place;
            console.log("Moving user from " + user.place + " to "+place);
            if (place) {
                place = place.toLocaleLowerCase();
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