<!DOCTYPE html>
<html>
<head>
  <title>Leaflet-ing UBC</title>
  <meta charset = "utf-8"/>
  <meta name = "viewport" content = "width = device-width, initial-scale = 1.0, maximum-scale = 1.0, user-scalable = no"/>
  <link
    rel = "stylesheet"
    href = "https://unpkg.com/leaflet@1.4.0/dist/leaflet.css"
  />
  <script src = "https://unpkg.com/leaflet@1.4.0/dist/leaflet.js"></script>
  <script src = "https://code.jquery.com/jquery-3.3.1.min.js"></script>
  <style>
    body {
      padding: 0;
      margin: 0;
    }
    html, body, #map {
      height: 100%;
      width: 100%;
    }
    h3 {
      font-size: 18px;
      padding: 0;
      margin: 0;
    }
    button {
      width: 100px;
      margin: 0;
      color: #FFF;
    }
    #allParking {
      color: #000;
    }
    #others {
      background-color: #808080;
    }
    #UGPermit {
      background-color: #2439bf;
    }
    #GPermit {
      background-color: #a31735;
    }
    #rezPermit {
      background-color: #4ab9e8;
    }
    #FSPermit {
      background-color: #e64c1e;
    }
  </style>
</head>
<body>
  <div id = "map" style = "width: 800px; height: 600px;"></div>
  <div id = "controls" style = "margin: 15px">
    <button type = "button" id = "allParking">All Parking</button>
    <button type = "button" id = "UGPermit">Undergrad Permit</button>
    <button type = "button" id = "GPermit">Grad Permit</button>
    <button type = "button" id = "rezPermit">Residence Permit</button>
    <button type = "button" id = "FSPermit">Faculty & Staff Permit</button>
    <button type = "button" id = "others">Other</button>
  </div>
  <script>
    var map = L.map("map",
    {
      center: [49.25856, -123.24858],
      zoom: 14
    });

    var topoTiles = L.tileLayer(
      "https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}",
      {
        maxZoom: 20,
        attribution: 'Map data: Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012'
      }
    ).addTo(map);

    // restyle markers as parking icons
    var parkingMarker = L.icon({
      iconUrl: "parking-sign.png",
      iconSize: [30, 30]
    });
    var parkingMarkerOther = L.icon({
      iconUrl: "parking-sign-other.png",
      iconSize: [30, 30]
    });
    var parkingMarkerUG = L.icon({
      iconUrl: "parking-sign-ug.png",
      iconSize: [45, 45]
    });
    var parkingMarkerG = L.icon({
      iconUrl:"parking-sign-g.png",
      iconSize: [45, 45]
    });
    var parkingMarkerRez = L.icon({
      iconUrl: "parking-sign-rez.png",
      iconSize: [45, 45]
    });
    var parkingMarkerFS = L.icon({
      iconUrl: "parking-sign-fs.png",
      iconSize: [45, 45]
    });

    function parkingPopup(feature, layer) {
      if (feature.properties && feature.properties.FAC_DESCRIPTION && feature.properties.FAC_HOURSDAY) {
        layer.bindPopup("<h3><b>" + feature.properties.FAC_DESCRIPTION + "</b></h3>" + "<br>" +
          "<b>Daytime: </b>" + feature.properties.FAC_HOURSDAY + "<br>" +
          feature.properties.FAC_RATE + "<br>" +
          "<br>" +
          "<b>Evenings: </b>" + feature.properties.FAC_HOURPM + "<br>" +
          feature.properties.FAC_RATEPM + "<br>" +
          "<br>" +
          "<b>Weekends/Holidays: </b><br>" +
          feature.properties.FAC_RATEHOL)} else {
                layer.bindPopup("<h3><b>" + feature.properties.FAC_DESCRIPTION + "</b></h3>" + "<br>" +
                "No information");
          } ;
    };

    //load geojson from a file on the web
    $.getJSON("https://raw.githubusercontent.com/UBCGeodata/ubcv-parking/master/geojson/ubcv_parking_www.geojson",
      function(data) {
        var allParking = L.geoJson(data, {
          pointToLayer: function(feature, latlng) {
            return L.marker(latlng, {
              icon: parkingMarker
            })
          },
          onEachFeature: parkingPopup
        }).addTo(map);
          var UGPermit = L.geoJson(data, {
            filter: function(feature, layer) {
              return feature.properties.FAC_UNDERPERMIT == "1";
            },
            pointToLayer: function(feature, latlng) {
              return L.marker(latlng, {
                icon: parkingMarkerUG
              })
            },
            onEachFeature: parkingPopup
          });
          var GPermit = L.geoJson(data, {
            filter: function(feature, layer) {
              return feature.properties.FAC_GRAD == "1";
            }, pointToLayer: function(feature, latlng) {
              return L.marker(latlng, {
                icon: parkingMarkerG
              })
            },
            onEachFeature: parkingPopup
          });
          var rezPermit = L.geoJson(data, {
            filter: function(feature, layer) {
              return feature.properties.FAC_REZPERMIT == "1";
            }, pointToLayer: function(feature, latlng) {
              return L.marker(latlng, {
                icon: parkingMarkerRez
              })
            },
            onEachFeature: parkingPopup
          });
          var FSPermit = L.geoJson(data, {
            filter: function(feature, layer) {
              return feature.properties.FAC_FSPERMIT == "1";
            }, pointToLayer: function(feature, latlng) {
              return L.marker(latlng, {
                icon: parkingMarkerFS
              })
            },
            onEachFeature: parkingPopup
          });
          var others = L.geoJson(data, {
            filter: function(feature, layer) {
              return feature.properties.FAC_UNDERPERMIT == "0" && feature.properties.FAC_GRAD == "0" && feature.properties.FAC_REZPERMIT == "0" && feature.properties.FAC_FSPERMIT == "0";
            },
            pointToLayer: function(feature, latlng) {
              return L.marker(latlng, {
                icon: parkingMarkerOther
              })
            },
            onEachFeature: parkingPopup
          });
          allParking.addTo(map)
          $("#others").click(function() {
            map.addLayer(others)
            map.removeLayer(UGPermit)
            map.removeLayer(GPermit)
            map.removeLayer(rezPermit)
            map.removeLayer(FSPermit)
            map.removeLayer(allParking)
          });
          $("#UGPermit").click(function() {
            map.addLayer(UGPermit)
            map.removeLayer(allParking)
            map.removeLayer(GPermit)
            map.removeLayer(rezPermit)
            map.removeLayer(FSPermit)
            map.removeLayer(others)
          });
          $("#GPermit").click(function() {
            map.addLayer(GPermit)
            map.removeLayer(UGPermit)
            map.removeLayer(allParking)
            map.removeLayer(rezPermit)
            map.removeLayer(FSPermit)
            map.removeLayer(others)
          });
          $("#rezPermit").click(function() {
            map.addLayer(rezPermit)
            map.removeLayer(allParking)
            map.removeLayer(GPermit)
            map.removeLayer(UGPermit)
            map.removeLayer(FSPermit)
            map.removeLayer(others)
          });
          $("#FSPermit").click(function() {
            map.addLayer(FSPermit)
            map.removeLayer(allParking)
            map.removeLayer(GPermit)
            map.removeLayer(UGPermit)
            map.removeLayer(rezPermit)
            map.removeLayer(others)
          });
          $("#allParking").click(function() {
            map.addLayer(allParking)
            map.removeLayer(UGPermit)
            map.removeLayer(GPermit)
            map.removeLayer(rezPermit)
            map.removeLayer(FSPermit)
            map.removeLayer(others)
          });
      });
  </script>
</body>
</html>
