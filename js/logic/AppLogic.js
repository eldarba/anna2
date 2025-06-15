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
    }


}

export class CopingMechanism{
    constructor(title, voice, punitiveAdult){
        this.title = title;
        this.voice = voice;
        this.punitiveAdult = punitiveAdult
    }
}



