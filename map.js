var dropdownLocations = [
  {
    name: 'Hartford',
    coords: [41.7637, -72.6851],
    zoom: 8
  },
  {
    name: 'New York City',
    coords: [40.7128, -74.0059],
    zoom: 10
  },
  {
    name: 'San Francisco',
    coords: [37.7749, -122.4194],
    zoom: 12
  },
  {
    name: 'Chicago',
    coords: [41.8781, -87.6298],
    zoom: 10
  },
  {
    name: 'Miami',
    coords: [25.7617, -80.1918],
    zoom: 5
  },
];

var map = L.map('map', {
  center: [41.79, -72.6],
  zoom: 10,
  scrollWheelZoom: false,
  attributionControl: false
});

new L.tileLayer('http://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png')
  .addTo(map);

map.zoomControl.setPosition('topright');

function disableMapInteractions() {
  map._handlers.forEach(function(handler) {
    handler.disable();
  });
}

function enableMapInteractions() {
  map._handlers.forEach(function(handler) {
    handler.enable();
  });
}

var dropdown = L.control({
  position: 'topleft'
});

function fly() {
  disableMapInteractions();
  var index = document.getElementById('dropdown').selectedIndex;
  var place = dropdownLocations[index];
  map.flyTo(place.coords, place.zoom);
  map.on('zoomend', function() {
    enableMapInteractions();
  });
}

dropdown.onAdd = function(map) {
    var div = L.DomUtil.create('div', 'dropdown-container');
    var options = '';
    for (i in dropdownLocations) {
      options += '<option value=' + i + '>' + dropdownLocations[i].name + '</option>'
    }
    div.innerHTML = '<select id="dropdown" onchange="fly()">' + options + '</select>';
    div.innerHTML += '<i class="fa fa-caret-down"></i>';
    return div;
};
dropdown.addTo(map);


// This is just to add some markers to the map
for (i in dropdownLocations) {
  L.marker(dropdownLocations[i].coords)
    .bindPopup(dropdownLocations[i].name)
    .addTo(map);
}

var credit = L.control.attribution({
    prefix: 'View <a href="https://github.com/JackDougherty/leaflet-template-location-menu">code on GitHub</a>',
  })
  .addAttribution('<a href="https://github.com/JackDougherty/datavizforall">DataVizForAll</a>')
  .addAttribution('<a href="http://leafletjs.com">Leaflet</a>')
  .addTo(map);
