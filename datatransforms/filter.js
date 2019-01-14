var fs = require("fs");

var inputFileName = "platformdepths.json";
var outputFileName = "filtereddepths.json";

var fileString = fs.readFileSync(inputFileName, "utf-8");

var fileJSON = JSON.parse(fileString);

var filteredItems = fileJSON.filter(i => i.stationLines.some(sl => sl.name == "Jubilee"));

var outputString = JSON.stringify(filteredItems);

fs.writeFileSync(outputFileName, outputString, "utf-8");