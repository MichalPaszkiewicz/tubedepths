
export function draw(stationDepths){

// function getStationDetails(name){
//     return stationDetails.filter(sd => sd.name.trim() == name.trim())[0];
// }

var canvas = <HTMLCanvasElement>document.getElementById("my-canvas");

var seperatorLength = 70;
var height = 800;
var width = (stationDepths.length + 1) * seperatorLength;
var platformSize = 13;
var fontSize = 11;
var font =  fontSize + "px Arial";
var topMargin = 100;
//var maxUsage = Math.max(...stationDetails.map(sd => sd.usageMillionsPerYear));
var usageScale = 100;
var zoneDiagramHeight = topMargin - 15;

var maxNum = 0;
var minNum = 0;

stationDepths.forEach(sd => {
    maxNum = Math.max(sd.groundLevel, maxNum);
    sd.stationLines.forEach(sl => {
        maxNum = Math.max(sl.northOrEastbound, sl.southOrWestbound, maxNum);
    });
    minNum = Math.min(sd.groundLevel, minNum);
    sd.stationLines.forEach(sl => {
        minNum = Math.min(sl.northOrEastbound, sl.southOrWestbound, minNum);
    });
});

var normalisationConstant = (height/2 - topMargin) / Math.max(maxNum, Math.abs(minNum));

canvas.height = height;
canvas.width = width;

var context = canvas.getContext("2d");
context.font=font;
context.textAlign="center";

function writeStationNames(ctx, sd){
    var iterator = 1;
    ctx.strokeStyle = "rgb(220,220,220)";    
    ctx.setLineDash([]);    
    sd.forEach(x => {
        var words = (x.name)// + "(" + getStationDetails(x.name).opened.split(" ")[2] + ")")
            .split(" ");
        ctx.beginPath();
        var j = 1;
        words.forEach(w => {
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


function drawSeaLevel(ctx){
    ctx.beginPath();
    ctx.fillStyle = "rgba(180, 200, 255, 0.4)"
    ctx.fillRect(0, height/2, width, height);
    ctx.closePath();
    ctx.beginPath();
    ctx.strokeStyle = "darkblue";
    ctx.setLineDash([8,3,2,3]);
    ctx.moveTo(0, height/2);
    ctx.lineTo(width, height / 2);
    ctx.stroke();
    ctx.closePath();
    ctx.strokeStyle = "black";
    ctx.setLineDash([]);
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

function drawGroundLevel(ctx, sd){
    //drawZones(ctx, sd);

    var iterator = 1;
    ctx.beginPath();
    ctx.strokeStyle = "brown";
    ctx.setLineDash([5,3]);
    ctx.moveTo(0, height/2 - normalisationConstant * sd[0].groundLevel);
    sd.forEach(x => {
        ctx.lineTo(iterator * seperatorLength, height/2 - normalisationConstant * x.groundLevel);
        iterator++;
    });
    ctx.lineTo(width, height / 2 - normalisationConstant * sd[sd.length - 1].groundLevel);
    
    ctx.stroke();
    ctx.closePath();
    ctx.strokeStyle = "black";
    ctx.setLineDash([]);
}

function getColour(line){
    var lineColours = [{line:"Bakerloo",colour:"brown"},
    {line:"Central",colour:"red"},
    {line:"District",colour:"green"},
    {line:"Circle", colour:"#f5ef02"},
    {line:"Hammersmith & City",colour:"pink"},
    {line:"Jubilee",colour:"grey"},
    {line:"Metropolitan",colour:"maroon"},
    {line:"Northern",colour:"black"},
    {line:"Piccadilly",colour:"blue"},
    {line:"Victoria",colour:"deepskyblue"},
    {line:"Waterloo & City",colour:"turquoise"}];

    return lineColours.filter(lc => lc.line == line)[0].colour;
}

function matchLines(station1, station2){
    var matchedLines = [];
    for(var i = 0; i < station1.stationLines.length; i++){
        for(var j = 0; j < station2.stationLines.length; j++){
            if(station1.stationLines[i].name == station2.stationLines[j].name){
                if(!matchedLines.some(ml => ml == station1.stationLines[i].name)){
                    matchedLines.push(station1.stationLines[i].name);
                }
            }
        }
    }
    return matchedLines;
}

function getPlatformsWithLines(station, lines){
    var platforms = [];
    for(var i = 0; i < station.stationLines.length; i++){
        if(lines.some(l => station.stationLines[i].name == l)){
            platforms.push(station.stationLines[i]);
        }
    }
    return platforms;
}

function drawJourney(ctx, sd){
    ctx.setLineDash([]);
    ctx.lineWidth = 5;

    for(var i = 1; i < sd.length; i++){
        var ml = matchLines(sd[i - 1], sd[i])
        
        var platforms1 = getPlatformsWithLines(sd[i - 1], ml);
        var platforms2 = getPlatformsWithLines(sd[i], ml);

        for(var j = 0; j < platforms1.length; j++){
            for(var k = 0; k < platforms2.length; k++){
                ctx.beginPath();
                ctx.moveTo(i * seperatorLength, height/2 - normalisationConstant * (platforms1[j].northOrEastbound));
                ctx.strokeStyle = getColour(platforms1[j].name);
                ctx.lineTo((i + 1) * seperatorLength, height/2 - normalisationConstant * (platforms2[j].northOrEastbound));
                ctx.stroke();
                ctx.closePath();      
                ctx.beginPath();
                ctx.moveTo(i * seperatorLength, height/2 - normalisationConstant * (platforms1[j].southOrWestbound));
                ctx.strokeStyle = getColour(platforms1[j].name);
                ctx.lineTo((i + 1) * seperatorLength, height/2 - normalisationConstant * (platforms2[j].southOrWestbound));
                ctx.stroke();
                ctx.closePath();    
            }
        }
    }
    ctx.lineWidth = 1;
}

function drawPlatform(ctx, x, y, colour, hasl, leftText, gl){
    ctx.beginPath();
    ctx.strokeStyle="white";
    ctx.fillStyle = colour;      
    ctx.arc(x, y, platformSize, 0,2*Math.PI);   
    ctx.fill();
    if(leftText){
        ctx.textAlign = "right";
        ctx.fillText(~~hasl, x - platformSize*1.4, y + platformSize / 2);
        ctx.stroke();
    }
    else{
        ctx.textAlign = "left";
        ctx.fillText(~~hasl, x + platformSize*1.4, y + platformSize / 2);
        ctx.stroke();
    }
    ctx.fillStyle="white";
    ctx.textAlign = "center";    
    ctx.fillText(~~(hasl - gl), x, y + platformSize / 2 - 2);
    ctx.closePath();         
}

function drawDepths(ctx, sd){
    var iterator = 1;
    sd.forEach(x => {

        var i = (x.stationLines.length > 1) ? -5 : 0;

        //var thisStationDetail = getStationDetails(x.name);

        ctx.beginPath();

        // ctx.fillStyle="blue";
        // ctx.fillRect(iterator * seperatorLength - 5, height - thisStationDetail.usageMillionsPerYear * usageScale / maxUsage, 10, thisStationDetail.usageMillionsPerYear * usageScale / maxUsage);
        // ctx.fillText(thisStationDetail.usageMillionsPerYear + "m", iterator * seperatorLength, height - thisStationDetail.usageMillionsPerYear * usageScale / maxUsage - 10);
        // ctx.closePath();

        x.stationLines.forEach(sl => {
            drawPlatform(ctx, iterator * seperatorLength + i, height/2 - normalisationConstant * (sl.northOrEastbound), getColour(sl.name), sl.northOrEastbound, i < 0, x.groundLevel);
            if(Math.abs(sl.southOrWestbound - sl.northOrEastbound) > 3){
                drawPlatform(ctx, iterator * seperatorLength + i, height/2 - normalisationConstant * (sl.southOrWestbound), getColour(sl.name), sl.southOrWestbound, i < 0, x.groundLevel);
            }
            i+=7;
        });
        iterator++;
    });
    ctx.fillStyle = "black";
    ctx.setLineDash([]);
}

writeStationNames(context, stationDepths);
drawSeaLevel(context);
drawGroundLevel(context, stationDepths);
drawJourney(context, stationDepths);  
drawDepths(context, stationDepths);  
}