// Functions to render the Event object to UI/** Load the current event from application state and populate form fields */
import { copingMechanismsSelect } from "../listeners.js";
import appState from "../models/AppState.js";

export function renderUIfromAppState() {
    situationBox.value = appState.currentEvent.situation;
    punitiveAdultBox.value = appState.currentEvent.punitiveAdult;
    vulnerableChildBox.value = appState.currentEvent.vulnerableChild;
    healthyAdultOnSituationBox.value = appState.currentEvent.healthyAdultOnSituation;
    healthyAdultOnPunitiveAdultBox.value = appState.currentEvent.healthyAdultOnPunitiveAdult;
    healthyAdultOnVulnerableChildBox.value = appState.currentEvent.healthyAdultOnVulnerableChild;
    healthyAdultOnCopingMechanismBox.value = appState.currentEvent.healthyAdultOnCopingMechanism;

    copingMechanismsSelect.innerHTML = '';
    appState.currentEvent.copingMechanisms.forEach(m => {
        const newOption = document.createElement("option");
        newOption.text = m.title;
        newOption.value = m.title;
        copingMechanismsSelect.appendChild(newOption);
    });
    copingMechanismsSelect.selectedIndex = 0;
    copingMechanismsSelect.dispatchEvent(new Event('change'));

}