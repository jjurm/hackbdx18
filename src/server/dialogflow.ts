import {server} from "./server";
import {User} from "../user";

export function processDfRequest(request: any): DFResponse {

    let userid = (request.originalRequest && request.originalRequest.data.user.userId);
    if (!server.usersMap[userid]) {
        server.usersMap[userid] = new User(userid, "Akira");
        console.log("Registered user " + userid)
    }

    let action = request.result.action;

    switch (action) {
        case "room":
            return new DFResponse("There are 4 people in the room.");

        case "change_name":
            return new DFResponse("Ok, your name is changed");

        default:
            return new DFResponse("Sorry, the backend doesn't understand your action");
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