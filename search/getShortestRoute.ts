type StationVertex = {id: number, name: string};
type StationEdge = {id1: number, id2: number, line: string};

declare var stationVertices: StationVertex[];

declare var stationEdges: StationEdge[];

function findStationVertexFromName(stationName: string){
    for(var i = 0; i < stationVertices.length; i++){
        if(stationVertices[i].name == stationName){
            return stationVertices[i];
        }
    }
}

function findStationVertexFromId(stationId: number){
    for(var i = 0; i < stationVertices.length; i++){
        if(stationVertices[i].id == stationId){
            return stationVertices[i];
        }
    }
}

function findStationEdges(station: StationVertex){
    return stationEdges.filter(se => se.id1 == station.id || se.id2 == station.id);
}

function findOppositeVertexOfEdge(edge: StationEdge, entryId: number){
    if(entryId == edge.id1){
        return edge.id2;
    }
    if(entryId == edge.id2){
        return edge.id1;
    }
    return null;
}

class Path{
    stations: StationVertex[];

    constructor(stations: StationVertex[]){
        this.stations = stations;
    }

    addStation(station: StationVertex){
        this.stations.push(station);
    }

    getLatestStation(){
        return this.stations[this.stations.length - 1];
    }

    getNextEdges(){
        return findStationEdges(this.getLatestStation());
    }

    toStringArray(){
        return this.stations.map(s => s.name);
    }
}

function getShortestRouteBetweenVertices(v1: StationVertex, v2: StationVertex): Path{
    var usedVertices: StationVertex[] = [v1];

    var paths: Path[] = [new Path([v1])];
    
    var destinationFound = false;

    while(!destinationFound){

        var newPaths: Path[] = [];

        for(var i = 0; i < paths.length; i++){
            var currentPath = paths[i];
            var currentPathLastStation = currentPath.getLatestStation(); 

            var childPaths = findStationEdges(currentPathLastStation)
                .map(e => new Path([...currentPath.stations, findStationVertexFromId(findOppositeVertexOfEdge(e, currentPathLastStation.id))]));

            for(var j = 0; j < childPaths.length; j++){
                var latestStation = childPaths[j].getLatestStation();

                if(usedVertices.indexOf(latestStation) == -1){
                    if(latestStation == v2){
                        destinationFound = true;
                        return childPaths[j];
                    }
                    else{
                        newPaths.push(childPaths[j]);
                        usedVertices.push(latestStation);
                    }
                }
            }

            
        }        

        if(usedVertices.length > 310){
            // gone through too many vertices
            return new Path([]);
        }

        paths = newPaths;
    }
}

export function getShortestRoute(station1: string, station2: string): string[]{
    var v1 = findStationVertexFromName(station1);
    var v2 = findStationVertexFromName(station2);
    return getShortestRouteBetweenVertices(v1, v2).toStringArray();
}