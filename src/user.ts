import {uuidv4} from "./utils";

export class User {
    public id: string;
    public name: string;

    constructor(name: string) {
        this.id = uuidv4();
        this.name = name;
    }
}
