var latitude;
var longitude;
var map = null;

function getMapData() {
    console.log(latitude);
    console.log(longitude);
    
    // initialize the map
    if(map == null) {
        map = L.map('map').setView([latitude, longitude], 13);
    }
    else {
        map.remove();
        map = L.map('map').setView([latitude, longitude], 13);
    }

    // load a tile layer
    L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
        attribution: 'Tiles by <a href="http://mapc.org">MAPC</a>, Data by <a href="http://mass.gov/mgis">MassGIS</a>',
        maxZoom: 17,
        minZoom: 9
    }).addTo(map);
}

function getMap() {
    var stringIP = document.getElementById("inputField").value;
    console.log(stringIP);
    var urlGetIP = 'http://ipinfo.io/' + stringIP + '/json';
    console.log(urlGetIP);   

    fetch(urlGetIP, { 
        method: 'GET'
    })
    .then(function(response) { return response.json(); })
    .then(function(json) {
        var str = json.loc;
        
        latitude = (parseFloat(str.split(',')[0])).toFixed(4);
        longitude = (parseFloat(str.split(',')[1])).toFixed(4);
        getMapData();
    });
}