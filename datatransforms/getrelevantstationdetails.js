var fs = require("fs");

var mj = "../data/myjourney.json";
var sd = "./stationdetails.json";
var outputFileName = "../data/mystationdetails.json";

var mjString = fs.readFileSync(mj, "utf-8");
var mjJson = JSON.parse(mjString);

var sdString = fs.readFileSync(sd, "utf-8");
var sdJson = JSON.parse(sdString);

var filteredItems = sdJson.filter(i => mjJson.some(s => s.name.trim() == i.name.trim()));

var outputString = JSON.stringify(filteredItems);

fs.writeFileSync(outputFileName, outputString, "utf-8");