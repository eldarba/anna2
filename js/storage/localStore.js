// All localStorage read/write helpers

import appState from "../models/AppState.js";
import * as appConstants from "../models/AppConstants.js";
import { Event } from "../logic/AppLogic.js";

/** Save the current event to the local storage. */
export function saveCurrentEventToLocalStorage() {
    let str = JSON.stringify(appState.currentEvent);
    localStorage.setItem(appConstants.CURRENT_EVENT_KEY, str);
}

/** Save the array of archived events to the local storage. */
export function saveArchivedEventsToLocalStorage() {
    let str = JSON.stringify(appState.archivedEvents);
    localStorage.setItem(appConstants.ARCHIVED_EVENTS_KEY, str);
}

/**remove the currentEvent item from local storage. */
export function removeCurrentEventFromLocalStorage() {
    localStorage.removeItem(appConstants.CURRENT_EVENT_KEY)
}


/**
 * Updates the application state's Current Event from local storage.
 * @returns true if updated from local storage or false if local storage has no data.
 */
export function loadEventFromLocalStorage() {
    appState.createNewEvent();
    let currentEventJSON = localStorage.getItem(appConstants.CURRENT_EVENT_KEY);
    if (currentEventJSON) {
        /** @type {Event} */
        appState.currentEvent = JSON.parse(currentEventJSON);
        return true;
    } else {
        return false;
    }
}

/**
 * Updates the application state's Archived Events from local storage.
 * @returns true if updated from local storage or false if local storage has no data.
 */
export function loadArchivedEventsFromLocalStorage() {
    appState.archivedEvents = [];
    let archivedEventsJSON = localStorage.getItem(appConstants.ARCHIVED_EVENTS_KEY);
    if (archivedEventsJSON) {
        /** @type {Array} */
        appState.archivedEvents = JSON.parse(archivedEventsJSON);
        return true;
    } else {
        return false;
    }
}
