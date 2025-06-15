import { Event, CopingMechanism } from "../logic/AppLogic.js";

class AppState {
    constructor() {
        this.currentEvent = null; // Will hold an Event instance
    }

    createNewEvent() {
        this.currentEvent = new Event();
    }
}

// Singleton pattern
const appState = new AppState();
export default appState;
