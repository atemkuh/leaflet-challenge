//URL for data
var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

d3.json(url, function(data) {
    features(data.features);
});
// create features 
function features(earthQuakeData) {

    function featureStatus(feature, layer) {
        layer.bindPopup("<h3 align='center'>" + feature.properties.place +
            "</h3><hr><p><u>Occurrence:</u> " + new Date(feature.properties.time) + "</p>" +
            "</h3><p><u>Magnitude:</u> " + feature.properties.mag + "</p>");
    }

    var earthquakes = L.geoJSON(earthQuakeData, {
      featureStatus: featureStatus,
        pointToLayer: function (feature, latlng) {
            var geoJsonMarker = {
            radius: 4*feature.properties.mag,
            fillColor: getColor(feature.properties.mag),
            color: "white",
            weight: 1,
            opacity: 1,
            fillOpacity: 0.75
            };
            return L.circleMarker(latlng, geoJsonMarker);
        }
    });
    
    createEQMap(earthquakes);
}
function getColor(d) {

    return d < 1 ? '#88d498': 
    d < 2 ? '#88d498':
    d < 3 ? '#FF7B87':
    d < 4 ? '#e01e37':
            '#680070';
  }

function createEQMap(earthQuakeInfo) {

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


    var baseMaps = {
        "Color Map": normalMap,
        "Gray Scale Map": graymap 
     };
     
     var overlayMaps = {
        "Earthquakes": earthQuakeInfo
     };
 
     var map = L.map("map", {
         center: [39.83, -98.58],
         zoom: 5,
         layers: [normalMap, earthQuakeInfo]
     });
 
     L.control.layers(baseMaps, overlayMaps, {collapsed: false})
              .addTo(map);
 
     var legend = L.control({position: 'bottomright'});
   //legend
     legend.onAdd = function (map) {    
         var div = L.DomUtil.create('div', 'info legend'),
         grades = [0, 1, 2, 3, 4],
         labels = [];
   
         div.innerHTML+='Magnitude<br><hr>'
     
         for (var i = 0; i < grades.length; i++) {
             div.innerHTML +=
                 '<i style="background:' + getColor(grades[i] + 1) + '">&nbsp&nbsp&nbsp&nbsp</i> ' +
                 grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
     }
     return div;
    };
    
    legend.addTo(map);

};