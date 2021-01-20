var plates;
var myMap;
var link2 = "GeoJSON/PB2002_plates.json";

d3.json(link2,function(response){
    plates = L.geoJSON(response,{  
        style: function(feature){
            return {
                color:"#815839",
                fillColor: "#f0efeb",
                fillOpacity:0
            }
        },      
        featureStatus: function(feature,layer){
            console.log(feature.coordinates);
            layer.bindPopup("Plate Name: "+feature.properties.PlateName);
        }
        
    })

    
    var link = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

    

    d3.json(link,function(data){
    console.log(data);
   
    function createCircleMarker(feature,latlng){
        let options = {
            radius:feature.properties.mag*4,
            fillColor: chooseColor(feature.properties.mag),
            color: "white",
            weight: 0.5,
            opacity: 1,
            fillOpacity: 0.75
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
  
    var graymap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
      attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
      maxZoom: 18,
      id: "mapbox.light",
      accessToken: "pk.eyJ1Ijoiam9lYXRlbWt1aCIsImEiOiJja2pwemF5OTk1eGFpMnlwOXJsbnh2aGw0In0.jBzzLlnxkEDjkcm4a9_NzQ"

    });

    var normalMap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
      attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
      maxZoom: 18,
      id: "mapbox.outdoors",
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
      center: [
        37.0902405,-95.7128906
      ],
      zoom: 4,
      layers: [satellite, plates, earthQuakes]
    });
  
    
    // Add the layer control to the map
    L.control.layers(baseMaps, overlayMaps, {
      collapsed: false
    }).addTo(myMap);

    var info = L.control({
        position: "bottomright"
    });

    info.onAdd = function(){
        var div = L.DomUtil.create("div","legend");
        return div;
    }

    info.addTo(myMap);

    document.querySelector(".legend").innerHTML=displayLegend();

  }

// circle color
  function chooseColor(mag){
        switch(true){
            case (mag<1):
                return "#b892ff";
            case (mag<2):
                return "#F4F269";
            case (mag<3):
                return "#90e0ef";
            case (mag<4):
                return "#FF7B87";
            case (mag<5):
                return "#e01e37";
            default:
                return "#680070";;
    };
}

function displayLegend(){
    var legendInfo = [{
                limit: "Mag: 0-1",
                color: "#b892ff"
            },{
                limit: "Mag: 1-2",
                color: "#F4F269"
            },{
                limit:"Mag: 2-3",
                color:"#90e0ef"
            },{
                limit:"Mag: 3-4",
                color:"#FF7B87"
            },{
                limit:"Mag: 4-5",
                color:"#e01e37"
            },{
                limit:"Mag: 5+",
                color:"#680070"
            
    }];

    var header = "<h3>Magnitude</h3><hr>";

    var strng = "";
   
    for (i = 0; i < legendInfo.length; i++){
        strng += "<p style = \"background-color: "+legendInfo[i].color+"\">"+legendInfo[i].limit+"</p> ";
    }
    
    return header+strng;
};