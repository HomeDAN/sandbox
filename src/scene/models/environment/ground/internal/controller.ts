export class Controller {
    type: string;
    constructor() {
        this.type = "Controller";
    }
    
    accelerate() {
        console.log("Accelerating...");
    }
    
    brake() {
        return "Braking...";
    }
}
