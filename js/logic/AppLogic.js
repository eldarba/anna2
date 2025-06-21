// Core classes: Event, CopingMechanism

export class Event{

    constructor(){
        
        this.situation = "";
        this.punitiveAdult = "";
        this.vulnerableChild = "";
        /**@type {CopingMechanism[]} */
        this.copingMechanisms = [];

        this.healthyAdultOnSituation = '';
        this.healthyAdultOnPunitiveAdult = '';
        this.healthyAdultOnVulnerableChild = '';

        this.title = '';
        this.time = new Date().toLocaleString();
    }


}

export class CopingMechanism{
    constructor(title, voice='', punitiveAdult='', healthyAdult=''){
        this.title = title;
        this.voice = voice;
        this.punitiveAdult = punitiveAdult
        this.healthyAdult = healthyAdult;
    }
}



