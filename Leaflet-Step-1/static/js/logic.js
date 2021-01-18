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



}