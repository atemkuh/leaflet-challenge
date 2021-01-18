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


}