// Core classes: Event, CopingMechanism

export class Event{

    constructor(){
        
        this.situation = "";
        this.punitiveAdult = "";
        this.vulnerableChild = "";

        this.copingMechanisms = [];

        this.healthyAdultOnSituation = '';
        this.healthyAdultOnPunitiveAdult = '';
        this.healthyAdultOnVulnerableChild = '';
        this.healthyAdultOnCopingMechanism = '';

        this.title = '';
        this.time = new Date().toLocaleString();
    }


}

export class CopingMechanism{
    constructor(title, voice, punitiveAdult){
        this.title = title;
        this.voice = voice;
        this.punitiveAdult = punitiveAdult
    }
}



