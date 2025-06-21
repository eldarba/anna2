// All DOM event listeners (input, click, etc.)

import appState from "./models/AppState.js";
import { CopingMechanism } from "./logic/AppLogic.js";
import * as localStore from "./storage/localStore.js";
import * as updateUI from "./ui/updateUI.js";
import * as renderEvent from "./ui/renderEvent.js";
import * as helpers from "./utils/helpers.js";

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
export const punitiveAdultOnMechanismBox = document.getElementById('punitiveAdultOnMechanismBox');
export const copingMechanismsSelect = document.getElementById('copingMechanismsSelect');
export const newCopingMechanismBox = document.getElementById('newCopingMechanismBox');
export const copingMechanismDeleteBT = document.getElementById("copingMechanismDeleteBT");

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

    // if (copingMechanismsSelect.selectedIndex === 0) {
    if (copingMechanismsSelect.selectedIndex === -1) {
        appState.currentEvent.punitiveAdult = this.value;
    } else {
        // appState.currentEvent.copingMechanisms[copingMechanismsSelect.selectedIndex - 1].punitiveAdult = this.value;
        appState.currentEvent.copingMechanisms[copingMechanismsSelect.selectedIndex].punitiveAdult = this.value;
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
    appState.currentEvent.copingMechanisms[copingMechanismsSelect.selectedIndex].healthyAdult = this.value;
    localStore.saveCurrentEventToLocalStorage();
});

copingMechanismBox.addEventListener("input", function () {
    appState.currentEvent.copingMechanisms[copingMechanismsSelect.selectedIndex].voice = this.value;
    localStore.saveCurrentEventToLocalStorage();
});

// row 5 ===========================
punitiveAdultOnMechanismBox.addEventListener('input', function () {
    // update app state object
    appState.currentEvent.copingMechanisms[copingMechanismsSelect.selectedIndex].punitiveAdult = this.value;
    // update local storage
    localStore.saveCurrentEventToLocalStorage();
});

copingMechanismsSelect.addEventListener('change', function () {
    if (this.selectedIndex >= 0) {
        // set what is displayed in the healthy voice
        let txt = appState.currentEvent.copingMechanisms[this.selectedIndex].healthyAdult;
        txt = txt ? txt : "";
        healthyAdultOnCopingMechanismBox.value = txt;
        healthyAdultOnCopingMechanismBox.disabled = false;
        // set what is displayed in the mechanism voice
        txt = appState.currentEvent.copingMechanisms[this.selectedIndex].voice;
        txt = txt ? txt : "";
        copingMechanismBox.value = txt;
        copingMechanismBox.disabled = false;
        // set what is displayed in the punitive adult card
        txt = appState.currentEvent.copingMechanisms[this.selectedIndex].punitiveAdult;
        txt = txt ? txt : "";
        punitiveAdultOnMechanismBox.value = txt;
        punitiveAdultOnMechanismBox.disabled = false;
    }
});

newCopingMechanismBox.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        event.preventDefault(); // prevent accidental form submit behavior if any
        const mechanismTitle = newCopingMechanismBox.value.trim();
        if (mechanismTitle) {
            const values = Array.from(copingMechanismsSelect.options).map(option => option.value);
            const exists = values.some(val => val === mechanismTitle);
            if (exists) {
                alert('Coping mechanism name "' + mechanismTitle  + "' already exists!");
                return;
            }

            // update state
            const copingMechanism = new CopingMechanism(mechanismTitle);
            appState.currentEvent.copingMechanisms.push(copingMechanism);
            localStore.saveCurrentEventToLocalStorage();
            renderEvent.renderUIfromAppState();


            // const newOption = document.createElement("option");
            // newOption.text = mechanismTitle;
            // newOption.value = mechanismTitle;
            // copingMechanismsSelect.appendChild(newOption);
            newCopingMechanismBox.value = ""; // clear input
            // copingMechanismsSelect.selectedIndex = copingMechanismsSelect.selectedIndex + 1;
            copingMechanismsSelect.selectedIndex = appState.currentEvent.copingMechanisms.length - 1;
            copingMechanismsSelect.dispatchEvent(new Event('change'));
            copingMechanismBox.focus();

        } else {
            alert("Enter Coping Mechanism Title")
        }
    }
});

copingMechanismDeleteBT.addEventListener("click", () => {
    const selectedIndex = copingMechanismsSelect.selectedIndex;

    if (selectedIndex >= 0) {
        if (confirm("OK to Delete coping mechanism " + copingMechanismsSelect.value + "?")) {
            // remove the mechanism from the select UI ???
            // copingMechanismsSelect.remove(selectedIndex);
            // remove the mechanism object from app state
            appState.currentEvent.copingMechanisms.splice(selectedIndex, 1);
            renderEvent.renderUIfromAppState();
            // emit change event to update the UI
            // copingMechanismsSelect.dispatchEvent(new Event('change'));
            // update the local storage
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
    let eventTitle = prompt("Enter Event Title");
    if (!eventTitle) {
        alert("You need to enter a title!");
        return;
    }
    eventTitle = helpers.capitalizeFirst(eventTitle);
    appState.currentEvent.title = eventTitle;
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
    // updateUI.clearSituationForm();
    renderEvent.renderUIfromAppState();
}



const goUp = document.getElementById('goUp');

window.addEventListener('scroll', () => {
    if (window.scrollY > 0) {
        goUp.style.display = 'block';
    } else {
        goUp.style.display = 'none';
    }
});

