import {User} from "./user";
import {type} from "os";
import {game} from "./client/client";

export class MessageWrapper {
    public type: string;
    public message: GenericMsg;

    constructor(type: string, message: GenericMsg) {
        this.type = type;
        this.message = message;
    }

    public getTypedMessage(): GenericMsg {
        switch (this.type) {
            case "create_user":
                return this.message as CreateUserMsg;
            default:
                return this.message
        }
    }
}

export abstract class GenericMsg {
    public time: number;

    constructor(time: number) {
        this.time = time;
    }
}

export class CreateUserMsg extends GenericMsg {
    public user: User;

    constructor(time: number, user: User) {
        super(time);
        this.user = user;
    }
}

