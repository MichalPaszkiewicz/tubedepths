System.register("journeystore", [], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var JourneyStore;
    return {
        setters: [],
        execute: function () {
            JourneyStore = /** @class */ (function () {
                function JourneyStore() {
                    this.params = new URLSearchParams(window.location.search);
                    this.updateDisplay();
                }
                JourneyStore.prototype.updateDisplay = function () {
                    var from = document.getElementById("from");
                    from.value = document.getElementById("fromDisplay").innerText = this.getFrom();
                    var to = document.getElementById("to");
                    to.value = document.getElementById("toDisplay").innerText = this.getTo();
                    var copy = document.getElementById("copy");
                    copy.value = location.pathname + "?" + this.params;
                    copy.onclick = function () {
                        copy.select();
                        document.execCommand("copy");
                    };
                };
                JourneyStore.prototype.update = function () {
                    var self = this;
                    window.history.replaceState({}, '', location.pathname + "?" + self.params);
                    self.updateDisplay();
                };
                JourneyStore.prototype.getFrom = function () {
                    return this.params.get("from");
                };
                JourneyStore.prototype.setFrom = function (from) {
                    this.params.set("from", from);
                    this.update();
                };
                JourneyStore.prototype.getTo = function () {
                    return this.params.get("to");
                };
                JourneyStore.prototype.setTo = function (to) {
                    this.params.set("to", to);
                    this.update();
                };
                return JourneyStore;
            }());
            exports_1("JourneyStore", JourneyStore);
        }
    };
});
System.register("populatelist", [], function (exports_2, context_2) {
    "use strict";
    var __moduleName = context_2 && context_2.id;
    function populateList(ulId, items, callback) {
        var unorderedList = document.getElementById(ulId);
        unorderedList.innerHTML = "";
        items.forEach(function (i) {
            var listItem = document.createElement("li");
            listItem.innerText = i;
            listItem.onclick = function () {
                callback(i);
            };
            unorderedList.appendChild(listItem);
        });
    }
    exports_2("populateList", populateList);
    function closeList(ulId) {
        var unorderedList = document.getElementById(ulId);
        unorderedList.innerHTML = "";
    }
    exports_2("closeList", closeList);
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("search", ["populatelist", "journeystore"], function (exports_3, context_3) {
    "use strict";
    var __moduleName = context_3 && context_3.id;
    var populatelist_1, journeystore_1, journeyStore, fromInput, toInput;
    return {
        setters: [
            function (populatelist_1_1) {
                populatelist_1 = populatelist_1_1;
            },
            function (journeystore_1_1) {
                journeystore_1 = journeystore_1_1;
            }
        ],
        execute: function () {
            journeyStore = new journeystore_1.JourneyStore();
            fromInput = document.getElementById("from");
            fromInput.onkeydown = fromInput.onkeyup = function (e) {
                var pickedStations = platformDepths.filter(function (p) { return p.name.toLowerCase().indexOf((fromInput.value).toLowerCase()) > -1; });
                populatelist_1.populateList("fromItems", pickedStations
                    .map(function (x) { return x.name; }), function (x) {
                    journeyStore.setFrom(x);
                    populatelist_1.closeList("fromItems");
                });
            };
            toInput = document.getElementById("to");
            toInput.onkeydown = toInput.onkeyup = function (e) {
                var pickedStations = platformDepths.filter(function (p) { return p.name.toLowerCase().indexOf((toInput.value).toLowerCase()) > -1; });
                populatelist_1.populateList("toItems", pickedStations
                    .map(function (x) { return x.name; }), function (x) {
                    journeyStore.setTo(x);
                    populatelist_1.closeList("toItems");
                });
            };
        }
    };
});
