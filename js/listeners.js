// All DOM event listeners (input, click, etc.)

import appState from "./models/AppState.js";
import { CopingMechanism } from "./logic/AppLogic.js";
import * as localStore from "./storage/localStore.js";
import * as updateUI from "./ui/updateUI.js";
import * as renderEvent from "./ui/renderEvent.js"
// import { Event as AppEvent } from "./logic/AppLogic.js";

// DOM ELEMENTS =============================
// row 1
export const healthyAdultOnSituationBox = document.getElementById('healthyAdultOnSituationBox');
/** @type {HTMLElement } */
export const situationBox = document.getElementById('situationBox');

// row 2
export const healthyAdultOnPunitiveAdultBox = document.getElementById('healthyAdultOnPunitiveAdultBox');
export const punitiveAdultBox = document.getElementById('punitiveAdultBox');

// row 3
export const healthyAdultOnVulnerableChildBox = document.getElementById('healthyAdultOnVulnerableChildBox');
export const vulnerableChildBox = document.getElementById('vulnerableChildBox');

// row 4
export const healthyAdultOnCopingMechanismBox = document.getElementById('healthyAdultOnCopingMechanismBox');
export const copingMechanismBox = document.getElementById('copingMechanismBox');

// row 5
export const copingMechanismsSelect = document.getElementById('copingMechanismsSelect');
export const newCopingMechanismBox = document.getElementById('newCopingMechanismBox');
const copingMechanismDeleteBT = document.getElementById("copingMechanismDeleteBT");

const clearEventBT = document.getElementById('clearEventBT');
const archiveEventBT = document.getElementById('archiveEventBT');

export const tbodyArchivedEvents = document.getElementById('tbodyArchivedEvents');



// REGISTRATIONS ===================================
// row 1 ===========================
healthyAdultOnSituationBox.addEventListener("input", function () {
    appState.currentEvent.healthyAdultOnSituation = this.value;
    localStore.saveCurrentEventToLocalStorage();
});

situationBox.addEventListener("input", function () {
    appState.currentEvent.situation = this.value;
    localStore.saveCurrentEventToLocalStorage();
});

// row 2 ===========================
healthyAdultOnPunitiveAdultBox.addEventListener("input", function () {
    appState.currentEvent.healthyAdultOnPunitiveAdult = this.value;
    localStore.saveCurrentEventToLocalStorage();
});

punitiveAdultBox.addEventListener("input", function () {
    if (copingMechanismsSelect.selectedIndex === 0) {
        appState.currentEvent.punitiveAdult = this.value;
    } else {
        appState.currentEvent.copingMechanisms[copingMechanismsSelect.selectedIndex - 1].punitiveAdult = this.value;
    }
    localStore.saveCurrentEventToLocalStorage();
});

// punitiveAdult.addEventListener('mousedown', function () {
//     // check inside mousedown whether the textarea was already active:
//     if (document.activeElement === this) {
//         copingMechanismsSelect.selectedIndex = (copingMechanismsSelect.selectedIndex + 1) % copingMechanismsSelect.length;
//         copingMechanismsSelect.dispatchEvent(new Event('change'));
//     }
// });


// row 3 ===========================
healthyAdultOnVulnerableChildBox.addEventListener("input", function () {
    appState.currentEvent.healthyAdultOnVulnerableChild = this.value;
    localStore.saveCurrentEventToLocalStorage();
});

vulnerableChildBox.addEventListener("input", function () {
    appState.currentEvent.vulnerableChild = this.value;
    localStore.saveCurrentEventToLocalStorage();
});

// row 4 ===========================
healthyAdultOnCopingMechanismBox.addEventListener("input", function () {
    appState.currentEvent.healthyAdultOnCopingMechanism = this.value;
    localStore.saveCurrentEventToLocalStorage();
});

copingMechanismBox.addEventListener("input", function () {
    appState.currentEvent.copingMechanisms[copingMechanismsSelect.selectedIndex - 1].voice = this.value;
    localStore.saveCurrentEventToLocalStorage();
});

// row 5 ===========================
copingMechanismsSelect.addEventListener('change', function () {
    if (this.selectedIndex > 0) {
        // set what is displayed in the mechanism voice
        let txt = appState.currentEvent.copingMechanisms[this.selectedIndex - 1].voice;
        txt = txt ? txt : "";
        copingMechanismBox.value = txt;
        // set what is displayed in the punitive adult card
        // txt = appState.currentEvent.copingMechanisms[this.selectedIndex - 1].punitiveAdult;
        // txt = txt ? txt : "";
        // punitiveAdult.value = txt;
        copingMechanismBox.disabled = false;
    } else {
        // set what is displayed in the mechanism voice
        copingMechanismBox.value = "";
        // set what is displayed in the punitive adult card
        // let txt = appState.currentEvent.punitiveAdult;
        // punitiveAdult.value = txt ? txt : "";
        copingMechanismBox.disabled = true;
    }
});

newCopingMechanismBox.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        event.preventDefault(); // prevent accidental form submit behavior if any
        const inputValue = newCopingMechanismBox.value.trim();
        if (inputValue) {
            const values = Array.from(copingMechanismsSelect.options).map(option => option.value);
            const exists = values.some(val => val === inputValue);
            if (exists) {
                alert("This Coping mechanism already exists!");
                return;
            }
            const newOption = document.createElement("option");
            newOption.text = inputValue;
            newOption.value = inputValue;
            copingMechanismsSelect.appendChild(newOption);
            newCopingMechanismBox.value = ""; // clear input
            copingMechanismsSelect.selectedIndex = copingMechanismsSelect.selectedIndex + 1;
            // update state
            const copingMechanism = new CopingMechanism(inputValue);
            appState.currentEvent.copingMechanisms.push(copingMechanism);
            copingMechanismsSelect.dispatchEvent(new Event('change'));
            localStore.saveCurrentEventToLocalStorage();
        }
    }
});

copingMechanismDeleteBT.addEventListener("click", () => {
    const selectedIndex = copingMechanismsSelect.selectedIndex;

    if (selectedIndex > 0) {
        if (confirm("Delete this coping mechanism?")) {
            copingMechanismsSelect.remove(selectedIndex);
            appState.currentEvent.copingMechanisms.splice(selectedIndex - 1, 1);
            copingMechanismsSelect.dispatchEvent(new Event('change'));
            localStore.saveCurrentEventToLocalStorage();
        }
    } else {
        alert("No mechanism selected to delete.");
    }
});

// buttons area ===========================
clearEventBT.addEventListener('click', function () {
    clearCurrentEvent();
});

archiveEventBT.addEventListener('click', function () {
    appState.currentEvent.title = prompt("Enter Event Title");
    // add the current event to the events array in app
    appState.archivedEvents.push(appState.currentEvent);
    // clear the current event
    clearCurrentEvent();
    // update the local storage
    localStore.saveArchivedEventsToLocalStorage();
    // clear the table
    updateUI.clearArchivedEventsTable();
    // build the table elements and set the eventsTableBody
    updateUI.renderArchivedEventsTable();
});




function showSituationDetails(sit) { }
function deleteSituation(sit) { }

// ON PAGE LOAD
window.addEventListener("load", () => {
    if (localStore.loadEventFromLocalStorage()) {
        renderEvent.renderUIfromAppState();
    }

    if (localStore.loadArchivedEventsFromLocalStorage()) {
        // to do - render the table in UI
        updateUI.renderArchivedEventsTable();
    }

});

// helper functions

/**clears the current event from local storage and from the UI */
function clearCurrentEvent() {
    localStore.removeCurrentEventFromLocalStorage();
    appState.createNewEvent();
    updateUI.clearSituationForm();
}





