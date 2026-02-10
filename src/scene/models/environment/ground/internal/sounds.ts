export class Sound {
    type: string;
    constructor() {
        this.type = "Sound";
    }
    
    playHorn() {
        console.log("Beep beep!");
    }
    
    playEngineSound() {
        console.log("Vroom vroom!");
    }
}