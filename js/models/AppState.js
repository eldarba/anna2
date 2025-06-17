// Singleton for managing app state

import { Event, CopingMechanism } from "../logic/AppLogic.js";

class AppState {
    constructor() {
        this.currentEvent = null; // Will hold an Event instance
        /**@type {Event[]} */
        this.archivedEvents = null; // Will hold Events array
        
    }

    createNewEvent() {
        this.currentEvent = new Event();
    }

    archiveCurrentEvent(){
        this.archivedEvents.push(this.currentEvent);
        this.currentEvent = null;
    }
}

// Singleton pattern
const appState = new AppState();
export default appState;
