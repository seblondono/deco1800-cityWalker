var map_interest;

function initMap() {
  // Create a city
  var brisbane = {lat: -27.4697759, lng: 153.0251235};
  // Create a new StyledMapType object, passing it an array of styles,
  // and the name to be displayed on the map type control.
  var styledMapType = new google.maps.StyledMapType(
    [
      {
        "featureType": "administrative",
        "stylers": [
          { "visibility": "off" }
        ]
      },{
        "featureType": "road.highway",
        "stylers": [
          { "visibility": "off" }
        ]
      },{
        "featureType": "poi.school",
        "stylers": [
          { "visibility": "off" }
        ]
      },{
        "stylers": [
          { "saturation": -60 }
        ]
      },{
        "featureType": 'road.arterial',
        "elementType": 'geometry',
        "stylers": [
          { "hue": '#00ffee' },
          { "saturation": 50 }
        ]
      },{
        "featureType": 'poi.business',
        "elementType": 'labels',
        "stylers": [
          { "visibility": 'off' }
        ]
      }],
    {name: 'CityWalker Interest'}
    );
  // Create a map object, and include the MapTypeId to add
  // to the map type control.
  map_interest = new google.maps.Map(document.getElementById('map_interest'), {
    center: brisbane,
    scrollwheel: false,
    zoom: 13,
    disableDefaultUI: true,
    mapTypeControlOptions: {
            mapTypeIds: ['styled_map']
          }
  });

  //Associate the styled map with the MapTypeId and set it to display.
  map_interest.mapTypes.set('styled_map', styledMapType);
  map_interest.setMapTypeId('styled_map');
}
