import {populateList} from "./populatelist";

declare var platformDepths: {name: string}[];

var fromInput = <HTMLInputElement> document.getElementById("from")
fromInput.onkeydown = fromInput.onkeyup = e => {
    var pickedStations = platformDepths.filter(p => p.name.toLowerCase().indexOf((fromInput.value).toLowerCase()) > -1)
    populateList("fromItems", pickedStations.slice(0, 10).map(x => x.name));
};

var toInput = <HTMLInputElement> document.getElementById("to")
toInput.onkeydown = toInput.onkeyup = e => {
    var pickedStations = platformDepths.filter(p => p.name.toLowerCase().indexOf((toInput.value).toLowerCase()) > -1)
    populateList("toItems", pickedStations.slice(0, 10).map(x => x.name));
};