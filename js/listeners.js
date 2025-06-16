import appState from "./models/AppState.js";
import { CopingMechanism } from "./logic/AppLogic.js";

/** @type {HTMLElement } */
export const situation = document.getElementById('situation');
const healthyAdultOnSituation = document.getElementById('healthyAdultOnSituation');

const punitiveAdult = document.getElementById('punitiveAdult');
const healthyAdultOnPunitiveAdult = document.getElementById('healthyAdultOnPunitiveAdult');

const vulnerableChild = document.getElementById('vulnerableChild');
const healthyAdultOnVulnerableChild = document.getElementById('healthyAdultOnVulnerableChild');

const copingMechanismsSelect = document.getElementById('copingMechanismsSelect');
const copingMechanismOptionInsert = document.getElementById('copingMechanismOptionInsert');
const copingMechanismOptionDelete = document.getElementById("copingMechanismOptionDelete");
const copingMechanism = document.getElementById('copingMechanism');
const healthyAdultOnCopingMechanism = document.getElementById('healthyAdultOnCopingMechanism');

situation.addEventListener("input", function () {
    appState.currentEvent.situation = this.value;
    saveState();
});

healthyAdultOnSituation.addEventListener("input", function () {
    appState.currentEvent.healthyAdultOnSituation = this.value;
    saveState();
});

punitiveAdult.addEventListener("input", function () {
    if (copingMechanismsSelect.selectedIndex === 0) {
        appState.currentEvent.punitiveAdult = this.value;
    } else {
        appState.currentEvent.copingMechanisms[copingMechanismsSelect.selectedIndex - 1].punitiveAdult = this.value;
    }
    saveState();
});

// punitiveAdult.addEventListener('mousedown', function () {
//     // check inside mousedown whether the textarea was already active:
//     if (document.activeElement === this) {
//         copingMechanismsSelect.selectedIndex = (copingMechanismsSelect.selectedIndex + 1) % copingMechanismsSelect.length;
//         copingMechanismsSelect.dispatchEvent(new Event('change'));
//     }
// });

healthyAdultOnPunitiveAdult.addEventListener("input", function () {
    appState.currentEvent.healthyAdultOnPunitiveAdult = this.value;
    saveState();
});

vulnerableChild.addEventListener("input", function () {
    appState.currentEvent.vulnerableChild = this.value;
    saveState();
});

healthyAdultOnVulnerableChild.addEventListener("input", function () {
    appState.currentEvent.healthyAdultOnVulnerableChild = this.value;
    saveState();
});

healthyAdultOnVulnerableChild.addEventListener("input", function () {
    appState.currentEvent.healthyAdultOnVulnerableChild = this.value;
    saveState();

});

healthyAdultOnCopingMechanism.addEventListener("input", function () {
    appState.currentEvent.healthyAdultOnCopingMechanism = this.value;
    saveState();
});

copingMechanismOptionInsert.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        event.preventDefault(); // prevent accidental form submit behavior if any
        const inputValue = copingMechanismOptionInsert.value.trim();
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
            copingMechanismOptionInsert.value = ""; // clear input
            copingMechanismsSelect.selectedIndex = copingMechanismsSelect.selectedIndex + 1;
            // update state
            const copingMechanism = new CopingMechanism(inputValue);
            appState.currentEvent.copingMechanisms.push(copingMechanism);
            copingMechanismsSelect.dispatchEvent(new Event('change'));
            saveState();
        }
    }
});

copingMechanismOptionDelete.addEventListener("click", () => {
    const selectedIndex = copingMechanismsSelect.selectedIndex;

    if (selectedIndex > 0) {
        if (confirm("Delete this coping mechanism?")) {
            copingMechanismsSelect.remove(selectedIndex);
            appState.currentEvent.copingMechanisms.splice(selectedIndex - 1, 1);
            copingMechanismsSelect.dispatchEvent(new Event('change'));
            saveState();
        }
    } else {
        alert("No mechanism selected to delete.");
    }
});

copingMechanismsSelect.addEventListener('change', function () {
    if (this.selectedIndex > 0) {
        // set what is displayed in the mechanism voice
        let txt = appState.currentEvent.copingMechanisms[this.selectedIndex - 1].voice;
        txt = txt ? txt : "";
        copingMechanism.value = txt;
        // set what is displayed in the punitive adult card
        txt = appState.currentEvent.copingMechanisms[this.selectedIndex - 1].punitiveAdult;
        txt = txt ? txt : "";
        punitiveAdult.value = txt;
        copingMechanism.disabled = false;
    } else {
        // set what is displayed in the mechanism voice
        copingMechanism.value = "";
        // set what is displayed in the punitive adult card
        let txt = appState.currentEvent.punitiveAdult;
        punitiveAdult.value = txt ? txt : "";
        copingMechanism.disabled = true;
    }
});

copingMechanism.addEventListener("input", function () {
    appState.currentEvent.copingMechanisms[copingMechanismsSelect.selectedIndex - 1].voice = this.value;
    saveState();
});

function saveState() {
    let str = JSON.stringify(appState.currentEvent);
    // console.log(str);
    localStorage.setItem('currentEvent', str);
}

function clearState() {
    localStorage.removeItem('currentEvent')
    let arr = [situation, punitiveAdult, vulnerableChild, healthyAdultOnSituation,
        healthyAdultOnPunitiveAdult, healthyAdultOnVulnerableChild, healthyAdultOnCopingMechanism
    ]
    arr.forEach(e => e.value = '');
    copingMechanismsSelect.innerHTML = '<option value="">-- None --</option>';

}

const btSaveState = document.getElementById('btSaveState');
btSaveState.addEventListener('click', function () {
    saveState();
});

const btClearState = document.getElementById('btClearState');
btClearState.addEventListener('click', function () {
    clearState();
});


window.addEventListener("load", () => {
    let currentEventJSON = localStorage.getItem('currentEvent');

    if (currentEventJSON) {
        /** @type {Event} */
        let ev = JSON.parse(currentEventJSON);
        appState.currentEvent.situation = ev.situation;
        appState.currentEvent.punitiveAdult = ev.punitiveAdult;
        appState.currentEvent.vulnerableChild = ev.vulnerableChild;
        appState.currentEvent.copingMechanisms = ev.copingMechanisms;
        appState.currentEvent.healthyAdultOnSituation = ev.healthyAdultOnSituation;
        appState.currentEvent.healthyAdultOnPunitiveAdult = ev.healthyAdultOnPunitiveAdult;
        appState.currentEvent.healthyAdultOnVulnerableChild = ev.healthyAdultOnVulnerableChild;
        appState.currentEvent.healthyAdultOnCopingMechanism = ev.healthyAdultOnCopingMechanism;
        loadState();
    }
});

function loadState() {
    situation.value = appState.currentEvent.situation;
    punitiveAdult.value = appState.currentEvent.punitiveAdult;
    vulnerableChild.value = appState.currentEvent.vulnerableChild;
    healthyAdultOnSituation.value = appState.currentEvent.healthyAdultOnSituation;
    healthyAdultOnPunitiveAdult.value = appState.currentEvent.healthyAdultOnPunitiveAdult;
    healthyAdultOnVulnerableChild.value = appState.currentEvent.healthyAdultOnVulnerableChild;
    healthyAdultOnCopingMechanism.value = appState.currentEvent.healthyAdultOnCopingMechanism;

    appState.currentEvent.copingMechanisms.forEach(m => {
        const newOption = document.createElement("option");
        newOption.text = m.title;
        newOption.value = m.title;
        copingMechanismsSelect.appendChild(newOption);
    });

}