System.register("populatelist", [], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function populateList(ulId, items) {
        var unorderedList = document.getElementById(ulId);
        unorderedList.innerHTML = "";
        items.forEach(function (i) {
            var listItem = document.createElement("li");
            listItem.innerText = i;
            unorderedList.appendChild(listItem);
        });
    }
    exports_1("populateList", populateList);
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("search", ["populatelist"], function (exports_2, context_2) {
    "use strict";
    var __moduleName = context_2 && context_2.id;
    var populatelist_1, fromInput, toInput;
    return {
        setters: [
            function (populatelist_1_1) {
                populatelist_1 = populatelist_1_1;
            }
        ],
        execute: function () {
            fromInput = document.getElementById("from");
            fromInput.onkeydown = fromInput.onkeyup = function (e) {
                var pickedStations = platformDepths.filter(function (p) { return p.name.toLowerCase().indexOf((fromInput.value).toLowerCase()) > -1; });
                populatelist_1.populateList("fromItems", pickedStations.slice(0, 10).map(function (x) { return x.name; }));
            };
            toInput = document.getElementById("to");
            toInput.onkeydown = toInput.onkeyup = function (e) {
                var pickedStations = platformDepths.filter(function (p) { return p.name.toLowerCase().indexOf((toInput.value).toLowerCase()) > -1; });
                populatelist_1.populateList("toItems", pickedStations.slice(0, 10).map(function (x) { return x.name; }));
            };
        }
    };
});
