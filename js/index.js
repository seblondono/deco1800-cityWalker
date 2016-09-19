var map;
var interestLocations = {h_brisbane:[{name:"Customs house",location:{lat:-27.465441, lng:153.031123}},
{name:"State Library of Queensland",location:{lat:-27.4711627, lng:153.0181129}},
{name:"All Saints Wickham Terrace",location:{lat:-27.4644891, lng:153.0280164}},
{name:"Newstead House",location:{lat:-27.442735, lng:153.046019}},
{name:"St Stephen's Cathedral",location:{lat:-27.4686764, lng:153.0289744}}],
l_brisbane:[{name:"Story Bridge",location:{lat:-27.4639732, lng:153.0357618}},
{name:"City Hall",location:{lat:-27.4689672, lng:153.0235021}},
{name:"Parliament House",location:{lat:-27.4747659, lng:153.0272611}},
{name:"Wheel of Brisbane",location:{lat:-27.4752892, lng:153.0209104}},
{name:"The Old Windmill",location:{lat:-27.465808, lng:153.0231051}}],
m_brisbane: [{name:"Old Museum",location:{lat:-27.4517953, lng:153.0294874}},
{name:"Mercy Heritage Centre",location:{lat:-27.46129, lng:153.032933}},
{name:"Queensland Museum & Sciencentre",location:{lat:-27.4725981, lng:153.0183005}},
{name:"Queensland Maritime Museum",location:{lat:-27.4808822, lng:153.0266005}},
{name:"Queensland Gallery of Modern Art",location:{lat:-27.470649, lng:153.0170464}}],
m_sydney:[{name:"Powerhouse Museum", location:{lat:-33.878518, lng:151.1995418}},
{name:"Australian National Maritime Museum", location:{lat:-33.8693567, lng:151.1986328}},
{name:"Australian Museum", location:{lat:-33.8743446, lng:151.2131667}},
{name:"Museum of Sydney", location:{lat:-33.863668, lng:151.21149}},
{name:"Hyde Park Barracks Museum", location:{lat:-33.8696042, lng:151.2128274}}],
l_sydney:[{name:"Sydney Opera House", location:{lat:-33.8567844, lng:151.2152967}},
{name:"Sydney Harbour Bridge", location:{lat:-33.8523063, lng:151.2107871}},
{name:"Sydney Observatory", location:{lat:-33.859587, lng:151.2045228}},
{name:"St Mary's Cathedral", location:{lat:-33.8711906, lng:151.2133259}},
{name:"Sydney Tower Eye", location:{lat:-33.8704512, lng:151.2087607}}],
h_sydney:[{name:"Sydney Park in St. Peters", location:{lat:-33.9098337, lng:151.1851663}},
{name:"Government House", location:{lat:-33.8596449, lng:151.2148494}},
{name:"St. Francis Xavier's Church", location:{lat:-33.8416647, lng:151.2073388}},
{name:"Fortune of War Pub", location:{lat:-33.8603379, lng:151.2084268}}],
h_melbourne:[{name:"Federation Square", location: {lat:-37.8179789, lng:144.9690576}},
{name:"Flemington", location: {lat:-37.7909705, lng:144.9118915}},
{name:"Old Treasury Building", location: {lat:-37.8131847, lng:144.9744379}},
{name:"The Great Melbourne Telescope", location: {lat:-37.8295422, lng:144.9753679}},
{name:"The Shrine of Remembrance", location: {lat:-37.8305164, lng:144.9734319}}],
l_melbourne:[{name:"Star Observation Wheel", location: {lat:-37.8118903, lng:144.937461}},
{name:"Royal Botanic Gardens", location: {lat:-37.8303689, lng:144.9796056}},
{name:"Queen Victoria Market", location: {lat:-37.8075798, lng:144.956785}},
{name:"Flinders Street Station", location: {lat:-37.8182711, lng:144.9670618}},
{name:"Royal Exhibition Building", location: {lat:-37.8046891, lng:144.9716502}}],
m_melbourne:[{name:"Melbourne Museum", location: {lat:-37.803273, lng:144.9717408}},
{name:"National Gallery of Victoria", location: {lat:-37.8225942, lng:144.9689278}},
{name:"Immigration Museum", location: {lat:-37.819277, lng:144.9604653}},
{name:"Old Treasury Building", location: {lat:-37.8131847, lng:144.9744379}},
{name:"Jewish Museum of Australia", location: {lat:-37.8604756, lng:144.9854532}}]};

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
  }]);
  // Create a map object, and include the MapTypeId to add
  // to the map type control.
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -25.729875, lng: 133.978979},
    scrollwheel: false,
    zoom: 5,
    disableDefaultUI: true,
    draggable: false,
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
  var sydney = {lat: -33.8688197, lng: 151.2092955};
  var melbourne = {lat: -37.8136276, lng: 144.9630576};


  $(".brisbane").click(function(){
    $("#cityName").text("BRISBANE");
    map.setCenter(brisbane);
    smoothZoom(map, 14, map.getZoom());
  });

  $(".melbourne").click(function(){
    $("#cityName").text("MELBOURNE");
    map.setCenter(melbourne);
    smoothZoom(map, 14, map.getZoom());
  });

  $(".sydney").click(function(){
    $("#cityName").text("SYDNEY");
    map.setCenter(sydney);
    smoothZoom(map, 14, map.getZoom());
  });

  $(".museums").click(function(){
    smoothZoom(map, 16, map.getZoom());
    $("#over-content-interest").fadeOut(1000);
    //constructs the name of the key to make reference in the cities interest object
    //it uses the initial of the interest + the name of the city
    var m = "m_" + $("#cityName").text().toLowerCase();
    set_places(interestLocations[m]);
  });

  $(".historical").click(function(){
    smoothZoom(map, 16, map.getZoom());
    $("#over-content-interest").fadeOut(1000);
    //constructs the name of the key to make reference in the cities interest object
    //it uses the initial of the interest + the name of the city
    var h = "h_" + $("#cityName").text().toLowerCase();
    set_places(interestLocations[h]);
  });

  $(".landmarks").click(function(){
    smoothZoom(map, 16, map.getZoom());
    $("#over-content-interest").fadeOut(1000);
    //constructs the name of the key to make reference in the cities interest object
    //it uses the initial of the interest + the name of the city
    var l = "l_" + $("#cityName").text().toLowerCase();
    set_places(interestLocations[l]);
  });

  // the smooth zoom function
  function smoothZoom (map, max, cnt) {//map to zoom into, final zoom value, initial zoom value
      $("#over-content").fadeOut(1500);
      if (cnt >= max) {
          if (cnt == 14){
            setTimeout(function(){$("#over-content-interest").fadeIn(3000);}, 1100);
          }
          return;
      }
      else {
          z = google.maps.event.addListener(map, 'zoom_changed', function(event){
              google.maps.event.removeListener(z);
              smoothZoom(map, max, cnt + 1);
          });
          setTimeout(function(){map.setZoom(cnt)}, 500);
      }
  }
  //**************************************************************************//
  function setMarker(place){
    var marker = new google.maps.Marker({
      position: place.location,
      map: map
    });

    var contentString = '<div><h4>' + place.name + '</h4></div>'

    var infoWindow = new google.maps.InfoWindow({
      content: contentString
    });

    marker.addListener('click', function(){
      infoWindow.open(map, marker);
    });
  }//closes setMarker

  function set_places(places){
    console.log(places);
    map.draggable = true;
    map.scrollwheel = true;
    for(var i = 0; i < places.length; i++){
      var place = places[i];
      setMarker(place);
    }
  }

}// closes initMap

// Creating the autocomplete functionality. Cities search type
var autocomplete;
function initAutocomplete() {
  autocomplete = new google.maps.places.Autocomplete(
      (document.getElementById('autocomplete')),
      {types: ['(cities)']});
}

// Enable running of both map and autocomplete simultaneously //
function initialise() {
    initMap();
    initAutocomplete();
}
//
//   var geocoder;
//
//   if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(successFunction);
// }
// //Get the latitude and the longitude;
// function successFunction(position) {
//     var lat = position.coords.latitude;
//     var lng = position.coords.longitude;
//     codeLatLng(lat, lng)
//     console.log(lat, lng);
// }
//
//   function initialize() {
//     geocoder = new google.maps.Geocoder();
//   }
//
//   function codeLatLng(lat, lng) {
//     var latlng = new google.maps.LatLng(lat, lng);
//     geocoder.geocode({'latLng': latlng}, function(results) {
//
//         if (results[1]) {
//          //formatted address
//          alert(results[2].formatted_address)
//         } else {
//           alert("Enter your location");
//         }
//     });
//   }
