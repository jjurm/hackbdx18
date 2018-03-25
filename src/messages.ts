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
}

export abstract class GenericMsg {
    public time: number;

    constructor() {
        this.time = new Date().getTime();
    }
}

// client to server
export class AssignScreenToUserMsg extends GenericMsg {
    public static type = "assignScreenToUser";
    public id: string;

    constructor(id: string) {
        super();
        this.id = id;
    }
}

// server to client
/*export class CreateUserMsg extends GenericMsg {
    public static type = "create_user";
    public user: User;

    constructor(user: User) {
        super();
        this.user = user;
    }
}*/

// server to client
export class MoveMsg extends GenericMsg {
    public static type = "move";
    public place: string;

    constructor(place: string) {
        super();
        this.place = place;
    }
}

// server to client
export class TestScreenMsg extends GenericMsg {
    public static type = "test_screen";
}

// server to client
export class ChooseAvatarMsg extends GenericMsg {
    public static type = "choose_avatar";
    public ordinal: number;

    constructor(ordinal: number) {
        super();
        this.ordinal = ordinal;
    }
}
