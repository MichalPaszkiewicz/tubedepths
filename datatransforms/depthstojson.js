var fs = require("fs");

var csvFileName = "platformdepths.csv";
var outputFileName = "platformdepths.json";

class Station{
    constructor(name, groundLevel, stationLines){
        this.name = name;
        this.groundLevel = groundLevel;
        this.stationLines = stationLines.filter(sl => sl.northOrEastbound || sl.southOrWestbound);
    }
}

class StationLine{
    constructor(name, northOrEastbound, southOrWestbound){
        this.name = name;
        this.northOrEastbound = (northOrEastbound == undefined || northOrEastbound.trim() == "") ? null : +northOrEastbound - 100;
        this.southOrWestbound = (southOrWestbound == undefined || southOrWestbound.trim() == "") ? null : +southOrWestbound - 100;
    }
}

function rowToObject(row){
    var splitRow = row.split(",");
    return new Station(
        splitRow[0],
        +splitRow[1],
        [
            new StationLine("Bakerloo", splitRow[2], splitRow[3]),
            new StationLine("Central", splitRow[4], splitRow[5]),
            new StationLine("District", splitRow[6], splitRow[7]),
            new StationLine("Hammersmith & City", splitRow[8], splitRow[9]),
            new StationLine("Jubilee", splitRow[10], splitRow[11]),
            new StationLine("Metropolitan", splitRow[12], splitRow[13]),
            new StationLine("Northern", splitRow[14], splitRow[15]),
            new StationLine("Piccadilly", splitRow[16], splitRow[17]),
            new StationLine("Victoria", splitRow[18], splitRow[19]),
            new StationLine("Waterloo & City", splitRow[20], splitRow[21])
        ]);
}

var fileString = fs.readFileSync(csvFileName, "utf-8");
var rowStrings = fileString.split("\r\n");
var rows = rowStrings.map(rs => rowToObject(rs));

fs.writeFileSync(outputFileName, JSON.stringify(rows), "utf-8");