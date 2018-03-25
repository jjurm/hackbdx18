import {uuidv4} from "./utils";

export class User {
    public id: string;
    public name: string;
    public sessionid?: string;

    constructor(id: string, name: string, sessionid?: string) {
        this.id = id;
        this.name = name;
        this.sessionid = sessionid;
    }
}
