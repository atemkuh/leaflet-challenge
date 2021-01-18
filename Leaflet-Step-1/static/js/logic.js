//URL for data
var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson"

d3.json(url, function(data) {
    features(data.features);
});
// create features 
function features(earthQuakeData){

    function featureStatus(feature, layer){
        layer.bindPopup("<h3 align='center'>" + feature.properties.place +
            "</h3><hr><p><u>Occurrence:</u> " + new Date(feature.properties.time) + "</p>" +
            "</h3><p><u>Magnitude:</u> " + feature.properties.mag + "</p>");
    }

    var earthQuakeInfo =L.geoJSON(earthQuakeData, {

        featureStatus:featureStatus,
        renderLayer: function(feature, latlng){
            var geoJsonMarker ={ radius: 4*feature.properties.mag,
            fillColor:getcolor(feature.properties.mag), colorr: "black", weight:1, opacity:1,fillOpacity:0.8};
            return L.squareMaker(latlng,geoJsonMarker);
        }
    });
    
    createEQMap(earthQuakeInfo);

}

function createEQMap(earthQuakeInfo){
    var normalMap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/outdoors-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"http://mapbox.com\">Mapbox</a>",
        maxZoom: 18,
        id: "mapbox.light",
        accessToken: "pk.eyJ1Ijoiam9lYXRlbWt1aCIsImEiOiJja2pwemF5OTk1eGFpMnlwOXJsbnh2aGw0In0.jBzzLlnxkEDjkcm4a9_NzQ"
    });

    var graymap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"http://mapbox.com\">Mapbox</a>",
        maxZoom: 18,
        id: "mapbox.light",
        accessToken: "pk.eyJ1Ijoiam9lYXRlbWt1aCIsImEiOiJja2pwemF5OTk1eGFpMnlwOXJsbnh2aGw0In0.jBzzLlnxkEDjkcm4a9_NzQ"
    });

}