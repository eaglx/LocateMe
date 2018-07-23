var urlGetIP;
var latitude = null;
var longitude = null;
var map = null;
var marker = null;

function getMapData() {   
    // initialize the map
    if(map == null) {
        map = L.map('map').setView([latitude, longitude], 12);
        marker = L.marker([latitude, longitude]);
    }
    else {
        map.remove();
        map.removeLayer(marker)
        map = L.map('map').setView([latitude, longitude], 12);
        marker = L.marker([latitude, longitude]);
    }

    // load a tile layer
    L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
        attribution: 'Tiles by <a href="http://mapc.org">MAPC</a>, Data by <a href="http://mass.gov/mgis">MassGIS</a>',
        maxZoom: 20,
        minZoom: 10
    }).addTo(map);

    marker.addTo(map);
}

function getJSONfromURL() {
    fetch(urlGetIP, { 
        method: 'GET'
    })
    .then(function(response) { return response.json(); })
    .then(function(json) {
        var str = json.loc;
        
        latitude = (parseFloat(str.split(',')[0])).toFixed(4);
        longitude = (parseFloat(str.split(',')[1])).toFixed(4);
    
        document.getElementById('serv_info_pos').innerHTML = `<ul>\
        <li>IP: ${json.ip}</li>\
        <li>HOSTNAME: ${json.hostname}</li>\
        <li>CITY: ${json.city}</li>\
        <li>REGION: ${json.region}</li>\
        <li>COUNTRY: ${json.country}</li>\
        <li>ORG: ${json.org}</li>\
        </ul>`;
    
        getMapData();
    });
}

function defaultView() {
    urlGetIP = 'http://ipinfo.io/91.198.174.192/json';
    
    getJSONfromURL();
}

function getMap() {
    var stringIP = document.getElementById("inputField").value;
    urlGetIP = 'http://ipinfo.io/' + stringIP + '/json'; 

    getJSONfromURL();
}