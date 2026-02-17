// import {FollowThePath} from "./follow-the-path/FollowThePath.ts";
import {Train} from "./train/Train.ts";

export class Experience {
    constructor() {
        this.init()
    }

    init() {
        // new FollowThePath()         // Движение объекта по curve
        new Train()

    }
}
