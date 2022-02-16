<!DOCTYPE html>
<html lang="en">

<head>
  <title>Basic Mappa Tutorial</title>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.5.16/p5.min.js" type="text/javascript"></script>
  <script src="https://unpkg.com/mappa-mundi/dist/mappa.js" type="text/javascript"></script>
</head>

<body>
  <script>
    let myMap;
  let canvas;
  const mappa = new Mappa('Leaflet');

  // Lets change the map tiles to something with more contrast
  const options = {
    lat: 49.2606,
    lng: -123.2460,
    zoom: 3,
    style: 'https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png'
  }

  function setup(){
    canvas = createCanvas(640,640);
    myMap = mappa.tileMap(options);
    myMap.overlay(canvas)

    // Load the data
    meteorites = loadTable('Meteorite_Landings.csv', 'csv', 'header');

    // Only redraw the meteorites when the map change and not every frame.
    myMap.onChange(drawMeteorites);

    fill(179, 7, 7, 50);
    noStroke();
  }

  function draw(){
  }

  // Draw the meteorites
  function drawMeteorites() {
    // Clear the canvas
    clear();

    for (let i = 0; i < meteorites.getRowCount(); i++) {
      // Get the lat/lng of each meteorite
      const latitude = Number(meteorites.getString(i, 'reclat'));
      const longitude = Number(meteorites.getString(i, 'reclong'));

      // Only draw them if the position is inside the current map bounds. We use a
      // Leaflet method to check if the lat and lng are contain inside the current
      // map. This way we draw just what we are going to see and not everything. See
      // getBounds() in http://leafletjs.com/reference-1.1.0.html
      if (myMap.map.getBounds().contains({lat: latitude, lng: longitude})) {
        // Transform lat/lng to pixel position
        const pos = myMap.latLngToPixel(latitude, longitude);
        // Get the size of the meteorite and map it. 60000000 is the mass of the largest
        // meteorite (https://en.wikipedia.org/wiki/Hoba_meteorite)
        let size = meteorites.getString(i, 'mass (g)');
        size = map(size, 558, 60000000, 1, 25) + myMap.zoom();

        //make fill correspond to size of meteorite
        if ((size>=0)&&(size<=5)) {
          fill(191,139,61,50);
          noStroke();
        } else if ((size>5)&&(size<=10)) {
          fill(204,124,49);
          noStroke();
        } else if ((size>10)&&(size<=15)) {
          fill(222,91,35);
          noStroke();
        } else if ((size>15)&&(size<=20)) {
          fill(232,63,21);
          noStroke();
        } else if (size>20) {
          fill(237,40,5);
          noStroke();
        }

        ellipse(pos.x, pos.y, size, size);
      }
    }
  }
  </script>
</body>

</html>
