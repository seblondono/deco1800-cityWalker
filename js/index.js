var map;

function initMap() {
  // Create a new StyledMapType object, passing it an array of styles,
  // and the name to be displayed on the map type control.
  var styledMapType = new google.maps.StyledMapType(
    [
  {
    "featureType": "administrative.country",
    "stylers": [
      { "visibility": "off" }
    ]
  },{
    "featureType": "administrative.province",
    "stylers": [
      { "visibility": "off" }
    ]
  },{
    "featureType": "road.highway",
    "stylers": [
      { "visibility": "off" }
    ]
  },{
  }]);
  // Create a map object, and include the MapTypeId to add
  // to the map type control.
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -25.729875, lng: 133.978979},
    scrollwheel: false,
    zoom: 5,
    disableDefaultUI: true,
    mapTypeControlOptions: {
            mapTypeIds: ['styled_map']
          }
  });

  //Associate the styled map with the MapTypeId and set it to display.
  map.mapTypes.set('styled_map', styledMapType);
  map.setMapTypeId('styled_map');

  //**************************************************************************//
  //                Code to zoom into a specific location                     //
  //**************************************************************************//

  var brisbane = {lat: -27.4697759, lng: 153.0251235};
  // example marker:

  $("#brisbane").click(function(){
    map.setCenter(brisbane);
    smoothZoom(map, 14, map.getZoom());
  });

  // the smooth zoom function
  function smoothZoom (map, max, cnt) {
      $("#over-content").fadeOut(1500);
      if (cnt >= max) {
          setTimeout(function(){$("#over-content-interest").fadeIn(3000);}, 1500);
          return;
      }
      else {
          z = google.maps.event.addListener(map, 'zoom_changed', function(event){
              google.maps.event.removeListener(z);
              smoothZoom(map, max, cnt + 1);
          });
          setTimeout(function(){map.setZoom(cnt)}, 700); // 80ms is what I found to work well on my system -- it might not work well on all systems
      }
  }
  //**************************************************************************//

}

// Creating the autocomplete functionality. Cities search type
var autocomplete;
function initAutocomplete() {
  autocomplete = new google.maps.places.Autocomplete(
      (document.getElementById('autocomplete')),
      {types: ['geocode']});
}

function initialise() {
    initMap();
    initAutocomplete();
}
