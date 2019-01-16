export class JourneyStore{
    params: URLSearchParams = new URLSearchParams(window.location.search)

    constructor(){
        this.updateDisplay();
    }
    
    updateDisplay(){
        document.getElementById("fromDisplay").innerText = this.getFrom();
        document.getElementById("toDisplay").innerText = this.getTo();
    }
    
    update(){
        var self = this;
        window.history.replaceState({}, '', `${location.pathname}?${self.params}`);
        self.updateDisplay();
    }
    
    getFrom(){
        return this.params.get("from");
    }
    
    setFrom(from){
        this.params.set("from",from);
        this.update();
    }
    
    getTo(){
        return this.params.get("to");
    }
    
    setTo(to){
        this.params.set("to",to);
        this.update();
    }
}
