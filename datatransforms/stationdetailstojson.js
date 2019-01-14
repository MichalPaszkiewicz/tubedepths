var fs = require("fs");

var csvFileName = "stationdetails.csv";
var outputFileName = "stationdetails.json";

class StationDetails{
    constructor(name, localAuthority, opened, zones, usageMillionsPerYear){
        this.name = name;
        this.localAuthority = localAuthority;
        this.opened = opened;
        this.zones = zones;
        this.usageMillionsPerYear = usageMillionsPerYear;
    }
}

function rowToObject(row){
    var splitRow = row.split(",").map(r => r.trim());
    if(!splitRow[3]){
        console.log(row);
    }
    return new StationDetails(
        splitRow[0],
        splitRow[1],
        splitRow[2],
        splitRow[3].split("~").map(z => +z.trim()),
        +splitRow[4]
    );
}

var fileString = fs.readFileSync(csvFileName, "utf-8");
var rowStrings = fileString.split("\r\n");
var rows = rowStrings.map(rs => rowToObject(rs));

fs.writeFileSync(outputFileName, JSON.stringify(rows), "utf-8");