export class JourneyStore{
    params: URLSearchParams = new URLSearchParams(window.location.search)

    constructor(){
        this.updateDisplay();
    }
    
    updateDisplay(){
        var from = <HTMLInputElement>document.getElementById("from");
        from.value = document.getElementById("fromDisplay").innerText = this.getFrom();
        
        var to = <HTMLInputElement>document.getElementById("to");
        to.value = document.getElementById("toDisplay").innerText = this.getTo();

        var copy = <HTMLInputElement>document.getElementById("copy");
        copy.value = `${location.pathname}?${this.params}`;
        copy.onclick = () => {
            copy.select();
            document.execCommand("copy");
        }
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
