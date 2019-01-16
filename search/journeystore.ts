export class JourneyStore{
    params: URLSearchParams = new URLSearchParams(window.location.search)

    update(){
        var self = this;
        window.history.replaceState({}, '', `${location.pathname}?${self.params}`);
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
