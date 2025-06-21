// Functions to render the Event object to UI/** Load the current event from application state and populate form fields */
import * as ui from "../listeners.js";
import appState from "../models/AppState.js";

export function renderUIfromAppState() {
    ui.healthyAdultOnSituationBox.value = appState.currentEvent.healthyAdultOnSituation;
    ui.situationBox.value = appState.currentEvent.situation;

    ui.healthyAdultOnPunitiveAdultBox.value = appState.currentEvent.healthyAdultOnPunitiveAdult;
    ui.punitiveAdultBox.value = appState.currentEvent.punitiveAdult;

    ui.healthyAdultOnVulnerableChildBox.value = appState.currentEvent.healthyAdultOnVulnerableChild;
    ui.vulnerableChildBox.value = appState.currentEvent.vulnerableChild;

    // handle coping mechanisms
    if (appState.currentEvent.copingMechanisms.length === 0) {
        // if no coping mechanisms
        ui.healthyAdultOnCopingMechanismBox.value = '';
        ui.healthyAdultOnCopingMechanismBox.disabled = true;

        ui.copingMechanismBox.value = '';
        ui.copingMechanismBox.disabled = true;

        ui.punitiveAdultOnMechanismBox.value = '';
        ui.punitiveAdultOnMechanismBox.disabled = true;

        ui.copingMechanismsSelect.innerHTML = '';
        ui.copingMechanismsSelect.disabled = true;

        ui.copingMechanismDeleteBT.disabled = true;
    } else {
        // coping mechanisms exists - take the first
        const firstCopingMechanism = appState.currentEvent.copingMechanisms[0];

        ui.healthyAdultOnCopingMechanismBox.value = firstCopingMechanism.healthyAdult;
        ui.healthyAdultOnCopingMechanismBox.disabled = false;

        ui.copingMechanismBox.value = firstCopingMechanism.voice;
        ui.copingMechanismBox.disabled = false;

        ui.punitiveAdultOnMechanismBox.value = firstCopingMechanism.punitiveAdult;
        ui.punitiveAdultOnMechanismBox.disabled = false;

        ui.copingMechanismsSelect.innerHTML = '';
        appState.currentEvent.copingMechanisms.forEach(m => {
            const newOption = document.createElement("option");
            newOption.text = m.title;
            newOption.value = m.title;
            ui.copingMechanismsSelect.appendChild(newOption);
        });
        copingMechanismsSelect.selectedIndex = 0;
        ui.copingMechanismsSelect.disabled = false;

        ui.copingMechanismDeleteBT.disabled = false;
    }


    // copingMechanismsSelect.dispatchEvent(new Event('change'));

}