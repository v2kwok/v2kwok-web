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
      width: 100%
    }
    h3 {
      font-size: 18px;
      padding: 0;
      margin: 0;
    }
  </style>
</head>
<body>
  <div id = "map"></div>
  <div class = "popupInfo">
    <h2>UBC Parking Information</h2>
  </div>
  <script>
    var map = L.map("map",
    {
      center: [49.26156, -123.24858],
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
      iconUrl: "parking_icon.png",
      iconSize: [30, 30]
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
        // once ubc parking layer is loaded, add it to the map
        L.geoJSON(data, {
          pointToLayer: function (feature, latlng) {
            return L.marker(
              latlng,
              {icon: parkingMarker}
            );
          },
            onEachFeature: parkingPopup
        }).addTo(map);
      });
  </script>
</body>
</html>
