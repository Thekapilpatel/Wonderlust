


mapboxgl.accessToken = mapToken;

const map = new mapboxgl.Map({
    container: 'map', // container ID
    center: [77.4126, 23.2599], // starting position [lng, lat]
    zoom: 9 // starting zoom
});

console.log(coordinates);

const marker = new mapboxgl.Maker()
.setLngLat(coordinates)
.addTo(map);