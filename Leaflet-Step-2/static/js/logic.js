var plates;
var myMap;
var link2 = "GeoJSON/PB2002_plates.json";

d3.json(link2,function(response){
    plates = L.geoJSON(response,{  
        style: function(feature){
            return {
                color:"red",fillColor: "white", fillOpacity:0
            }
        },      
        featureStatus: function(feature,layer){
            console.log(feature.coordinates);
            layer.bindPopup("Plate Name: "+feature.properties.PlateName);
        }
        
    })

    
    var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

    

    d3.json(link,function(data){
    console.log(data);
   
    function createCircleMarker(feature,latlng){
        let options = {
            radius:feature.properties.mag*4,
            fillColor: chooseColor(feature.properties.mag),
            color: "white",
            weight: 1,
            opacity: 1,
            fillOpacity: 0.6
        }
        return L.circleMarker( latlng, options );

    }

    var earthQuakes = L.geoJSON(data,{
        featureStatus: function(feature,layer){
            layer.bindPopup("Place:"+feature.properties.place + "<br> Magnitude: "+feature.properties.mag+"<br> Time: "+new Date(feature.properties.time));
        },
        pointToLayer: createCircleMarker

    });

    createEQMap(plates,earthQuakes);

    });

    
});



function createEQMap(plates,earthQuakes) {

    
    var satellite = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
      attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
      maxZoom: 18,
      id: "mapbox.satellite",
      accessToken: "pk.eyJ1Ijoiam9lYXRlbWt1aCIsImEiOiJja2pwemF5OTk1eGFpMnlwOXJsbnh2aGw0In0.jBzzLlnxkEDjkcm4a9_NzQ"

    });
  
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
// create baseMaps object to hold base layers
    var baseMaps = {
        "Satellite": satellite,
        "Gray Scale Map": graymap,
        "Color Map": normalMap
      };
// Create overlayMaps to hold overlay layers
    var overlayMaps = {
        "Fault Lines": plates,
        Earthquakes: earthQuakes
    };
//map
    var myMap = L.map("map", { 
        center: [39.83, -98.58],
        zoom: 5,
        layers: [satellite, plates, earthQuakes]
      });


}