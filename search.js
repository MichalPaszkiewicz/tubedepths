System.register("draw", [], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function draw(stationDepths) {
        // function getStationDetails(name){
        //     return stationDetails.filter(sd => sd.name.trim() == name.trim())[0];
        // }
        var canvas = document.getElementById("my-canvas");
        var seperatorLength = 70;
        var height = 800;
        var width = (stationDepths.length + 1) * seperatorLength;
        var platformSize = 13;
        var fontSize = 11;
        var font = fontSize + "px Arial";
        var topMargin = 100;
        //var maxUsage = Math.max(...stationDetails.map(sd => sd.usageMillionsPerYear));
        var usageScale = 100;
        var zoneDiagramHeight = topMargin - 15;
        var maxNum = 0;
        var minNum = 0;
        stationDepths.forEach(function (sd) {
            maxNum = Math.max(sd.groundLevel, maxNum);
            sd.stationLines.forEach(function (sl) {
                maxNum = Math.max(sl.northOrEastbound, sl.southOrWestbound, maxNum);
            });
            minNum = Math.min(sd.groundLevel, minNum);
            sd.stationLines.forEach(function (sl) {
                minNum = Math.min(sl.northOrEastbound, sl.southOrWestbound, minNum);
            });
        });
        var normalisationConstant = (height / 2 - topMargin) / Math.max(maxNum, Math.abs(minNum));
        canvas.height = height;
        canvas.width = width;
        var context = canvas.getContext("2d");
        context.font = font;
        context.textAlign = "center";
        function writeStationNames(ctx, sd) {
            var iterator = 1;
            ctx.strokeStyle = "rgb(220,220,220)";
            ctx.setLineDash([]);
            sd.forEach(function (x) {
                var words = (x.name) // + "(" + getStationDetails(x.name).opened.split(" ")[2] + ")")
                    .split(" ");
                ctx.beginPath();
                var j = 1;
                words.forEach(function (w) {
                    ctx.fillText(w, iterator * seperatorLength, j * (fontSize + 2));
                    j++;
                });
                ctx.moveTo(iterator * seperatorLength, 3 + j * fontSize);
                ctx.lineTo(iterator * seperatorLength, height - 15);
                ctx.stroke();
                iterator++;
                ctx.closePath();
            });
            ctx.setLineDash([]);
        }
        function drawSeaLevel(ctx) {
            ctx.beginPath();
            ctx.fillStyle = "rgba(180, 200, 255, 0.4)";
            ctx.fillRect(0, height / 2, width, height);
            ctx.closePath();
            ctx.beginPath();
            ctx.strokeStyle = "darkblue";
            ctx.setLineDash([8, 3, 2, 3]);
            ctx.moveTo(0, height / 2);
            ctx.lineTo(width, height / 2);
            //ctx.stroke();
            ctx.closePath();
            ctx.strokeStyle = "black";
            ctx.setLineDash([]);
            ctx.beginPath();
            ctx.fillStyle = "blue";
            ctx.fillText("Sea", 20, height / 2 + 13);
            ctx.fillText("Level", 20, height / 2 + 28);
            ctx.closePath();
        }
        // function getMatchingZone(station1, station2){
        //     var sd1 = getStationDetails(station1.name);
        //     var sd2 = getStationDetails(station2.name);
        //     for(var i = 0; i < sd1.zones.length; i++){
        //         for(var k = 0; k < sd2.zones.length; k++){
        //             if(sd1.zones[i] == sd2.zones[k]){
        //                 return sd1.zones[i];
        //             }
        //         }
        //     }
        //     return null;    
        // }
        // function getCorrectestZone(station1, station2){
        //     var sd1 = getStationDetails(station1.name);
        //     var sd2 = getStationDetails(station2.name);
        //     var sorted = sd1.zones.sort((a,b) => Math.abs(a - sd2.zones[0]) - Math.abs(b - sd2.zones[0]));
        //     return sorted[0];
        //     return Math.max(...(sd1.zones.concat(sd2.zones)));
        // }
        // function drawZones(ctx, sd){
        //     var splitSize = 3;
        //     var zoneOffset = 10;
        //     ctx.beginPath();
        //     ctx.moveTo(0, zoneDiagramHeight);
        //     var lastZone = -1;
        //     var previousLeft = 0;
        //     for(var i = 1; i < sd.length; i++){
        //         var zone = getMatchingZone(sd[i-1], sd[i])
        //         var c = 1;
        //         if(zone == null){
        //             c = 0.5;
        //             zone = getCorrectestZone(sd[i-1], sd[i])
        //         }
        //         var farRight = (i == sd.length - 1) ? width : (i + c) * seperatorLength;
        //         for(var j = 0; j < zone; j++){
        //             ctx.moveTo(previousLeft, zoneDiagramHeight - j * splitSize);
        //             ctx.lineTo(farRight, zoneDiagramHeight - j * splitSize);
        //         }
        //         if(zone != lastZone){
        //             ctx.fillStyle="black";
        //             ctx.textAlign="right";
        //             ctx.fillText(lastZone, previousLeft - zoneOffset, zoneDiagramHeight - (lastZone + 1) * splitSize);
        //             ctx.textAlign="left"
        //             ctx.fillText(zone, previousLeft + zoneOffset, zoneDiagramHeight - (zone + 1) * splitSize);            
        //             ctx.textAlign="center";
        //             lastZone = zone;
        //         }
        //         previousLeft = farRight;
        //     }
        //     ctx.stroke();
        //     ctx.closePath();
        // }
        function drawGroundLevel(ctx, sd) {
            //drawZones(ctx, sd);
            var iterator = 1;
            ctx.beginPath();
            //ctx.strokeStyle = "rgba(169, 86, 54, 0.3)";
            ctx.fillStyle = "rgba(169, 86, 54, 0.4)";
            ctx.lineWidth = 10;
            ctx.moveTo(0, height / 2 - normalisationConstant * sd[0].groundLevel);
            if (sd[0].groundLevel < maxNum / 10) {
                ctx.fillText("Ground", 20, height / 2 - normalisationConstant * sd[0].groundLevel - 28);
                ctx.fillText("Level", 20, height / 2 - normalisationConstant * sd[0].groundLevel - 13);
            }
            sd.forEach(function (x) {
                ctx.lineTo(iterator * seperatorLength, height / 2 - normalisationConstant * x.groundLevel);
                ctx.fillText(x.groundLevel, iterator * seperatorLength, height / 2 - normalisationConstant * x.groundLevel - 10);
                iterator++;
            });
            ctx.lineTo(width, height / 2 - normalisationConstant * sd[sd.length - 1].groundLevel);
            ctx.lineTo(width, height / 2);
            ctx.lineTo(0, height / 2);
            ctx.lineTo(0, height / 2 - normalisationConstant * sd[0].groundLevel);
            //ctx.stroke();
            ctx.fill();
            ctx.closePath();
            ctx.strokeStyle = "black";
            iterator = 1;
            ctx.fillStyle = "white";
            if (sd[0].groundLevel > maxNum / 10) {
                ctx.fillText("Ground", 20, height / 2 - normalisationConstant * sd[0].groundLevel + 13);
                ctx.fillText("Level", 20, height / 2 - normalisationConstant * sd[0].groundLevel + 28);
            }
            sd.forEach(function (x) {
                if (x.groundLevel > 10) {
                    ctx.fillText(x.groundLevel, iterator * seperatorLength, height / 2 - normalisationConstant * x.groundLevel + 20);
                }
                iterator++;
            });
        }
        function getColour(line) {
            var lineColours = [{ line: "Bakerloo", colour: "brown" },
                { line: "Central", colour: "red" },
                { line: "District", colour: "green" },
                { line: "Circle", colour: "#f5ef02" },
                { line: "Hammersmith & City", colour: "pink" },
                { line: "Jubilee", colour: "grey" },
                { line: "Metropolitan", colour: "maroon" },
                { line: "Northern", colour: "black" },
                { line: "Piccadilly", colour: "blue" },
                { line: "Victoria", colour: "deepskyblue" },
                { line: "Waterloo & City", colour: "turquoise" }];
            return lineColours.filter(function (lc) { return lc.line == line; })[0].colour;
        }
        function matchLines(station1, station2) {
            var matchedLines = [];
            for (var i = 0; i < station1.stationLines.length; i++) {
                for (var j = 0; j < station2.stationLines.length; j++) {
                    if (station1.stationLines[i].name == station2.stationLines[j].name) {
                        if (!matchedLines.some(function (ml) { return ml == station1.stationLines[i].name; })) {
                            matchedLines.push(station1.stationLines[i].name);
                        }
                    }
                }
            }
            return matchedLines;
        }
        function getPlatformsWithLines(station, lines) {
            var platforms = [];
            for (var i = 0; i < station.stationLines.length; i++) {
                if (lines.some(function (l) { return station.stationLines[i].name == l; })) {
                    platforms.push(station.stationLines[i]);
                }
            }
            return platforms;
        }
        function drawFoot(ctx, x, y, reverse) {
            var constant = 0.5;
            var reverseVal = reverse ? -1 : 1;
            ctx.beginPath();
            ctx.strokeStyle = "black";
            ctx.fillStyle = "black";
            ctx.moveTo(x, y);
            ctx.lineTo(x + reverseVal * 20 * constant, y - 10 * constant);
            ctx.bezierCurveTo(x + reverseVal * 20 * constant, y - 80 * constant, x - reverseVal * 21 * constant, y - 60 * constant, x, y);
            //ctx.stroke()
            ctx.fill();
            ctx.closePath();
            ctx.beginPath();
            ctx.strokeStyle = "black";
            ctx.fillStyle = "black";
            ctx.moveTo(x + reverseVal * 5 * constant, y + 10 * constant);
            ctx.bezierCurveTo(x + reverseVal * 12 * constant, y + 6 * constant, x + reverseVal * 13 * constant, y + 5 * constant, x + reverseVal * 20 * constant, y + 4 * constant);
            ctx.bezierCurveTo(x + reverseVal * 35 * constant, y + 30 * constant, x + reverseVal * 4 * constant, y + 29 * constant, x + reverseVal * 5 * constant, y + 10 * constant);
            //ctx.stroke()
            ctx.fill();
            ctx.closePath();
        }
        function drawJourney(ctx, sd) {
            ctx.setLineDash([]);
            ctx.lineWidth = 5;
            for (var i = 1; i < sd.length; i++) {
                var ml = matchLines(sd[i - 1], sd[i]);
                var platforms1 = getPlatformsWithLines(sd[i - 1], ml);
                var platforms2 = getPlatformsWithLines(sd[i], ml);
                for (var j = 0; j < platforms1.length; j++) {
                    for (var k = 0; k < platforms2.length; k++) {
                        ctx.beginPath();
                        ctx.moveTo(i * seperatorLength, height / 2 - normalisationConstant * (platforms1[j].northOrEastbound));
                        ctx.strokeStyle = getColour(platforms1[j].name);
                        ctx.lineTo((i + 1) * seperatorLength, height / 2 - normalisationConstant * (platforms2[j].northOrEastbound));
                        ctx.stroke();
                        ctx.closePath();
                        ctx.beginPath();
                        ctx.moveTo(i * seperatorLength, height / 2 - normalisationConstant * (platforms1[j].southOrWestbound));
                        ctx.strokeStyle = getColour(platforms1[j].name);
                        ctx.lineTo((i + 1) * seperatorLength, height / 2 - normalisationConstant * (platforms2[j].southOrWestbound));
                        ctx.stroke();
                        ctx.closePath();
                    }
                }
                if (ml.length == 0) {
                    drawFoot(ctx, (i + 1 / 4) * seperatorLength, height / 2 + 85, false);
                    drawFoot(ctx, (i + 2 / 3) * seperatorLength, height / 2 + 45, true);
                    drawFoot(ctx, (i + 1 / 4) * seperatorLength + 2, height / 2, false);
                    drawFoot(ctx, (i + 2 / 3) * seperatorLength + 6, height / 2 - 40, true);
                    drawFoot(ctx, (i + 1 / 4) * seperatorLength + 7, height / 2 - 80, false);
                }
            }
            ctx.lineWidth = 1;
        }
        function drawPlatform(ctx, x, y, colour, hasl, leftText, gl) {
            ctx.beginPath();
            ctx.strokeStyle = "white";
            ctx.fillStyle = colour;
            ctx.arc(x, y, platformSize, 0, 2 * Math.PI);
            ctx.fill();
            if (leftText) {
                // ctx.textAlign = "right";   
                // ctx.stroke();
                // ctx.fillStyle="black";
                // ctx.fillText(~~hasl, x - platformSize*1.4, y + platformSize / 2);
            }
            else {
                // ctx.textAlign = "left";
                // ctx.stroke();
                // ctx.fillStyle="black";
                // ctx.fillText(~~hasl, x + platformSize*1.4, y + platformSize / 2);
            }
            ctx.fillStyle = "white";
            ctx.textAlign = "center";
            ctx.fillText(~~(hasl), x, y + platformSize / 2 - 2);
            ctx.closePath();
        }
        function drawDepths(ctx, sd) {
            var iterator = 1;
            sd.forEach(function (x) {
                var i = (x.stationLines.length > 1) ? -5 : 0;
                //var thisStationDetail = getStationDetails(x.name);
                ctx.beginPath();
                // ctx.fillStyle="blue";
                // ctx.fillRect(iterator * seperatorLength - 5, height - thisStationDetail.usageMillionsPerYear * usageScale / maxUsage, 10, thisStationDetail.usageMillionsPerYear * usageScale / maxUsage);
                // ctx.fillText(thisStationDetail.usageMillionsPerYear + "m", iterator * seperatorLength, height - thisStationDetail.usageMillionsPerYear * usageScale / maxUsage - 10);
                // ctx.closePath();
                x.stationLines.forEach(function (sl) {
                    drawPlatform(ctx, iterator * seperatorLength + i, height / 2 - normalisationConstant * (sl.northOrEastbound), getColour(sl.name), sl.northOrEastbound, i < 0, x.groundLevel);
                    if (Math.abs(sl.southOrWestbound - sl.northOrEastbound) > 3) {
                        drawPlatform(ctx, iterator * seperatorLength + i, height / 2 - normalisationConstant * (sl.southOrWestbound), getColour(sl.name), sl.southOrWestbound, i < 0, x.groundLevel);
                    }
                    i += 7;
                });
                iterator++;
            });
            ctx.fillStyle = "black";
            ctx.setLineDash([]);
        }
        writeStationNames(context, stationDepths);
        drawGroundLevel(context, stationDepths);
        drawSeaLevel(context);
        drawJourney(context, stationDepths);
        drawDepths(context, stationDepths);
    }
    exports_1("draw", draw);
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("getShortestRoute", [], function (exports_2, context_2) {
    "use strict";
    var __moduleName = context_2 && context_2.id;
    function findStationVertexFromName(stationName) {
        for (var i = 0; i < stationVertices.length; i++) {
            if (stationVertices[i].name == stationName) {
                return stationVertices[i];
            }
        }
    }
    function findStationVertexFromId(stationId) {
        for (var i = 0; i < stationVertices.length; i++) {
            if (stationVertices[i].id == stationId) {
                return stationVertices[i];
            }
        }
    }
    function findStationEdges(station) {
        return stationEdges.filter(function (se) { return se.id1 == station.id || se.id2 == station.id; });
    }
    function findOppositeVertexOfEdge(edge, entryId) {
        if (entryId == edge.id1) {
            return edge.id2;
        }
        if (entryId == edge.id2) {
            return edge.id1;
        }
        return null;
    }
    function getShortestRouteBetweenVertices(v1, v2) {
        var usedVertices = [v1];
        var paths = [new Path([v1])];
        var destinationFound = false;
        while (!destinationFound) {
            var newPaths = [];
            for (var i = 0; i < paths.length; i++) {
                var currentPath = paths[i];
                var currentPathLastStation = currentPath.getLatestStation();
                var childPaths = findStationEdges(currentPathLastStation)
                    .map(function (e) { return new Path(currentPath.stations.concat([findStationVertexFromId(findOppositeVertexOfEdge(e, currentPathLastStation.id))])); });
                for (var j = 0; j < childPaths.length; j++) {
                    var latestStation = childPaths[j].getLatestStation();
                    if (usedVertices.indexOf(latestStation) == -1) {
                        if (latestStation == v2) {
                            destinationFound = true;
                            return childPaths[j];
                        }
                        else {
                            newPaths.push(childPaths[j]);
                            usedVertices.push(latestStation);
                        }
                    }
                }
            }
            if (usedVertices.length > 310) {
                // gone through too many vertices
                return new Path([]);
            }
            paths = newPaths;
        }
    }
    function getShortestRoute(station1, station2) {
        if (station1 == station2) {
            return [station1];
        }
        var v1 = findStationVertexFromName(station1);
        var v2 = findStationVertexFromName(station2);
        return getShortestRouteBetweenVertices(v1, v2).toStringArray();
    }
    exports_2("getShortestRoute", getShortestRoute);
    var Path;
    return {
        setters: [],
        execute: function () {
            Path = /** @class */ (function () {
                function Path(stations) {
                    this.stations = stations;
                }
                Path.prototype.addStation = function (station) {
                    this.stations.push(station);
                };
                Path.prototype.getLatestStation = function () {
                    return this.stations[this.stations.length - 1];
                };
                Path.prototype.getNextEdges = function () {
                    return findStationEdges(this.getLatestStation());
                };
                Path.prototype.toStringArray = function () {
                    return this.stations.map(function (s) { return s.name; });
                };
                return Path;
            }());
        }
    };
});
System.register("journeystore", ["getShortestRoute", "draw"], function (exports_3, context_3) {
    "use strict";
    var __moduleName = context_3 && context_3.id;
    var getShortestRoute_1, draw_1, JourneyStore;
    return {
        setters: [
            function (getShortestRoute_1_1) {
                getShortestRoute_1 = getShortestRoute_1_1;
            },
            function (draw_1_1) {
                draw_1 = draw_1_1;
            }
        ],
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
                    if (this.getFrom() == null || this.getTo() == null) {
                        return;
                    }
                    var copy = document.getElementById("copy");
                    copy.value = location.host + location.pathname + "?" + this.params;
                    copy.onclick = function () {
                        copy.select();
                        document.execCommand("copy");
                    };
                    var route = getShortestRoute_1.getShortestRoute(this.getFrom(), this.getTo());
                    draw_1.draw(route.map(function (r) { return platformDepths.filter(function (pd) { return pd.name == r; })[0]; }));
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
            exports_3("JourneyStore", JourneyStore);
        }
    };
});
System.register("populatelist", [], function (exports_4, context_4) {
    "use strict";
    var __moduleName = context_4 && context_4.id;
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
    exports_4("populateList", populateList);
    function closeList(ulId) {
        var unorderedList = document.getElementById(ulId);
        unorderedList.innerHTML = "";
    }
    exports_4("closeList", closeList);
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("search", ["populatelist", "journeystore"], function (exports_5, context_5) {
    "use strict";
    var __moduleName = context_5 && context_5.id;
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
            fromInput.onkeydown = fromInput.onclick = fromInput.onkeyup = function (e) {
                var pickedStations = platformDepths.filter(function (p) { return p.name.toLowerCase().indexOf((fromInput.value).toLowerCase()) > -1; });
                populatelist_1.populateList("fromItems", pickedStations
                    .map(function (x) { return x.name; }), function (x) {
                    journeyStore.setFrom(x);
                    populatelist_1.closeList("fromItems");
                });
            };
            toInput = document.getElementById("to");
            toInput.onkeydown = toInput.onclick = toInput.onkeyup = function (e) {
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
