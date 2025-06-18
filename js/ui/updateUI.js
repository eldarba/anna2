// UI updates not related to full rendering (e.g. enabling buttons)

import * as ui from "../listeners.js";
import * as store from "../storage/localStore.js"
import appState from "../models/AppState.js";
import { renderUIfromAppState } from "./renderEvent.js";

/** clears the current event form fields */
export function clearSituationForm() {
    let arr = [ui.situationBox, ui.punitiveAdultBox, ui.vulnerableChildBox, ui.healthyAdultOnSituationBox,
    ui.healthyAdultOnPunitiveAdultBox, ui.healthyAdultOnVulnerableChildBox, ui.healthyAdultOnCopingMechanismBox,
    ui.copingMechanismBox
    ]
    arr.forEach(e => e.value = '');
    // ui.copingMechanismsSelect.innerHTML = '<option value="">-- None --</option>';
    ui.copingMechanismsSelect.innerHTML = '';
    ui.copingMechanismBox.disabled = true;
}

export function clearArchivedEventsTable() {
    ui.tbodyArchivedEvents.innerHTML = "";
}

export function renderArchivedEventsTable() {
    clearArchivedEventsTable();
    let tbodyHTML = '';
    appState.archivedEvents.forEach(ev => {
        const tr = document.createElement("tr");
        tr.setAttribute("id", ev.time);

        const tdSituation = document.createElement("td");
        tdSituation.innerHTML = ev.title;

        const tdDate = document.createElement("td");
        tdDate.innerHTML = ev.time;

        const tdBtShow = document.createElement("td");
        const btShow = document.createElement("button");
        btShow.innerHTML = "Show";
        tdBtShow.append(btShow);

        const tdBtDel = document.createElement("td");
        const btDel = document.createElement("button");
        btDel.innerHTML = "x";
        tdBtDel.append(btDel);

        tr.append(tdSituation);
        tr.append(tdDate);
        tr.append(tdBtShow);
        tr.append(tdBtDel);

        btShow.addEventListener("click", () => showSituationDetails(ev));
        btDel.addEventListener("click", () => deleteArchivedEvent(ev));

        ui.tbodyArchivedEvents.append(tr);
    });
}

export function showSituationDetails(ev) {
    store.removeCurrentEventFromLocalStorage();
    appState.currentEvent = ev;
    store.saveCurrentEventToLocalStorage();
    renderUIfromAppState();
}

export function deleteArchivedEvent(ev) {
    if (!confirm("Delete Event?")) {
        return;
    }
    // remove the event from state
    appState.archivedEvents = (appState.archivedEvents.filter(s => s.time !== ev.time));
    // set the local storage
    store.saveArchivedEventsToLocalStorage();
    // render the updated table
    renderArchivedEventsTable();
}