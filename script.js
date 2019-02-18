var map = L.map('map');
map.setView([41.147519, -8.610814], 13);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

let myJSON = '{"DonneesBrut" : {"1" : {"positions" : [{"x":41.154473,"y":-8.644918,"date":"01/01/01"},{"x":41.166420,"y":-8.643001,"date":"02/01/01"},{"x":41.172972,"y":-8.625212,"date":"03/01/01"}]},"2" : {"positions" : [{"x":41.172103,"y":-8.605885,"date":"04/01/01"},{"x":41.162420,"y":-8.607168,"date":"05/01/01"},{"x":41.153670,"y":-8.604588,"date":"06/01/01"}]},"3" : {"positions" : [{"x":41.149048,"y":-8.585653,"date":"07/01/01"},{"x":41.156342,"y":-8.594473,"date":"08/01/01"},{"x":41.153428,"y":-8.610291,"date":"09/01/01"},{"x":41.155698,"y":-8.621481,"date":"10/01/01"}]}}}';


let myNewJSON = JSON.parse(myJSON);
var latlngs = new Array();

var i=1;

while(1){
	if (typeof myNewJSON.DonneesBrut[i] === 'undefined'){
		break;
	}
	latlngs[i-1] = new Array();
	for(var j=0 ; j<myNewJSON.DonneesBrut[i].positions.length ; j++){
		latlngs[i-1][j] = [myNewJSON.DonneesBrut[i].positions[j].x, myNewJSON.DonneesBrut[i].positions[j].y];
	}

	i++;
}

var polyline = L.polyline(latlngs, {color: 'blue', weight:4}).addTo(map);

polyline.on('mouseover', function(e) {
    var layer = e.target;

    layer.setStyle({
        color: 'blue',
        opacity: 1,
        weight: 6
    });
});

polyline.on('mouseout', function(e) {
    var layer = e.target;

    layer.setStyle({
        color: 'blue',
        opacity: 1,
        weight: 4
    });
});

