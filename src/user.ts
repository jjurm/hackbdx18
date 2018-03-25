import {uuidv4} from "./utils";

export class User {
    public id: string;
    public name: string;
    public sessionid?: string;
    public place = "start";

    constructor(id: string, name: string, sessionid?: string) {
        this.id = id;
        this.name = name;
        this.sessionid = sessionid;
    }
}

export class UserInfo {
    public place: string;

    constructor(place: string) {
        this.place = place;
    }
}
