var urlGetIP;
var latitude = null;
var longitude = null;
var map = null;
var marker = null;
var descriptionToMarker;

function getMapData() {   
    if(map == null) {
        map = L.map('map').setView([latitude, longitude], 12);
        marker = new L.marker([latitude, longitude]);
    }
    else {
        map.setView(new L.LatLng(latitude, longitude), 12);
        marker = new L.marker([latitude, longitude]);
    }

    mapLink = '<a href="http://openstreetmap.org">OpenStreetMap</a>';
    L.tileLayer(
        'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; ' + mapLink + ' Contributors',
        maxZoom: 18,
        minZoom: 5
    }).addTo(map);


    marker.bindPopup(descriptionToMarker).openPopup();
    marker.addTo(map);

    var drawnItems = new L.FeatureGroup();
    map.addLayer(drawnItems);

    var drawControl = new L.Control.Draw({
        edit: {
            featureGroup: drawnItems
        }
    });
    map.addControl(drawControl);

    map.on('draw:created', function (e) {
        var type = e.layerType,
            layer = e.layer;
        drawnItems.addLayer(layer);
    });
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
    
        descriptionToMarker = `<b>IP: ${json.ip}</b> <b>HOSTNAME: ${json.hostname}</b> \
        <b>CITY: ${json.city}</b> <b>REGION: ${json.region}</b> \
        <b>COUNTRY: ${json.country}</b> <b>ORG: ${json.org}</b>`;

        getMapData();
    });
}

function defaultView() {
    document.getElementById('serv_info_pos').innerHTML = '<p>Create by eaglx:</p><a href="https://github.com/eaglx">github repository</a>';
    document.getElementById('map').innerHTML = '<img src="https://wiki.openstreetmap.org/w/images/2/26/Wiki-katpatuka.png" style="width:800px;height:600px;">';
}

function getMap() {
    var stringIP = document.getElementById("inputField").value;
    urlGetIP = 'http://ipinfo.io/' + stringIP + '/json'; 

    getJSONfromURL();
}