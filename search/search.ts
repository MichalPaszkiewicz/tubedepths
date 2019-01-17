import {populateList, closeList} from "./populatelist";
import {JourneyStore} from "./journeystore"

var journeyStore = new JourneyStore();

declare var platformDepths: {name: string}[];

var fromInput = <HTMLInputElement> document.getElementById("from")
fromInput.onkeydown = fromInput.onkeyup = e => {
    var pickedStations = platformDepths.filter(p => p.name.toLowerCase().indexOf((fromInput.value).toLowerCase()) > -1)
    populateList("fromItems", pickedStations
            //.slice(0, 10)
            .map(x => x.name), (x) => {
        journeyStore.setFrom(x);
        closeList("fromItems");
    });
};

var toInput = <HTMLInputElement> document.getElementById("to")
toInput.onkeydown = toInput.onkeyup = e => {
    var pickedStations = platformDepths.filter(p => p.name.toLowerCase().indexOf((toInput.value).toLowerCase()) > -1)
    populateList("toItems", pickedStations
            //.slice(0, 10)
            .map(x => x.name), (x) => {
        journeyStore.setTo(x);
        closeList("toItems");
    });
};