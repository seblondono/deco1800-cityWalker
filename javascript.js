var map;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -25.729875, lng: 133.978979},
    zoom: 5
  });
  console.log('Here');
}
