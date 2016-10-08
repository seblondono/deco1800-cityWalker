var map;
var markers = [];
var interestLocations = {h_brisbane:[{name:"Customs house",location:{lat:-27.465441, lng:153.031123}},
  {name:"State Library of Queensland",location:{lat:-27.4711627, lng:153.0181129}},
  {name:"All Saints Wickham Terrace",location:{lat:-27.4644891, lng:153.0280164}},
  {name:"Newstead House",location:{lat:-27.442735, lng:153.046019}},
  {name:"St Stephens Cathedral",location:{lat:-27.4686764, lng:153.0289744}}],
  l_brisbane:[{name:"Story Bridge",location:{lat:-27.4639732, lng:153.0357618}},
  {name:"City Hall",location:{lat:-27.4689672, lng:153.0235021}},
  {name:"Parliament House",location:{lat:-27.4747659, lng:153.0272611}},
  {name:"Wheel of Brisbane",location:{lat:-27.4752892, lng:153.0209104}},
  {name:"The Old Windmill",location:{lat:-27.465808, lng:153.0231051}}],
  m_brisbane: [{name:"Old Museum",location:{lat:-27.4517953, lng:153.0294874}},
  {name:"Mercy Heritage Centre",location:{lat:-27.46129, lng:153.032933}},
  {name:"Queensland Museum",location:{lat:-27.4725981, lng:153.0183005}},
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
  {name:"St Marys Cathedral", location:{lat:-33.8711906, lng:151.2133259}},
  {name:"Sydney Tower Eye", location:{lat:-33.8704512, lng:151.2087607}}],
  h_sydney:[{name:"Sydney Park in St Peters", location:{lat:-33.9098337, lng:151.1851663}},
  {name:"Government House", location:{lat:-33.8596449, lng:151.2148494}},
  {name:"St Francis Xaviers Church", location:{lat:-33.8416647, lng:151.2073388}},
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
  {name:"Jewish Museum", location: {lat:-37.8604756, lng:144.9854532}}]};

// var loadedImages = {brisbane: {landmarks:[], museums:[], historical:[]}, melbourne:{landmarks:[], museums:[], historical:[]},sydney:{landmarks:[],museums:[], historical:[]}};
var urlPatterns = ["flickr.com", "nla.gov.au", "artsearch.nga.gov.au", "recordsearch.naa.gov.au", "images.slsa.sa.gov.au"];

var cities = ["brisbane", "melbourne", "sydney"];
var interests = ["landmarks", "museums", "historical"];
var imagesData = {brisbane:{historical:["Customs house", "State Library Queensland", "All Saint Wickham Terrace", "Newstead House", "St Stephens Cathedral"],
                            landmarks:["Story Bridge", "City Hall", "Parliament House", "Wheel of Brisbane", "The Old Windmill"],
                            museums: ["Old Museum", "Mercy Heritage", "Queensland Museum", "Queensland Maritime Museum", "Queensland Gallery Modern Art"]},
                  melbourne:{historical:["Federation Square", "Flemington", "Old Treasury Building", "The Great Melbourne Telescope", "The Shrine Remembrance"],
                            landmarks:["Star Observation Wheel", "Royal Botanic Gardens", "Queen Victoria Market", "Flinders Street Station", "Royal Exhibition Building"],
                            museums:["Melbourne Museum", "National Gallery Victoria", "Immigration Museum", "Old Treasury Building", "Jewish Museum"]},
                  sydney:{historical:["Sydney Park St Peters", "Government House", "St Francis Xaviers Church", "Fortune War Pub"],
                          landmarks:["Sydney Opera House", "Sydney Harbour Bridge", "Sydney Observatory", "St Marys Cathedral", "Sydney Tower Eye"],
                          museums:["Powerhouse Museum", "Australian National Maritime Museum", "Australian Museum", "Museum Sydney", "Hyde Park Barracks Museum"]}};

var loadedImages = {brisbane:{historical:{Customshouse:[],StateLibraryQueensland:[],AllSaintWickhamTerrace:[],NewsteadHouse:[],StStephensCathedral:[]},
  landmarks:{StoryBridge:[],CityHall:[],ParliamentHouse:[],WheelofBrisbane:[],TheOldWindmill:[]},
  museums:{OldMuseum:[],MercyHeritage:[],QueenslandMuseum:[],QueenslandMaritimeMuseum:[],QueenslandGalleryModernArt:[]}},
  melbourne:{historical:{FederationSquare:[],Flemington:[],OldTreasuryBuilding:[],TheGreatMelbourneTelescope:[],TheShrineRemembrance:[]},
  landmarks:{StarObservationWheel:[],RoyalBotanicGardens:[],QueenVictoriaMarket:[],FlindersStreetStation:[],RoyalExhibitionBuilding:[]},
  museums:{MelbourneMuseum:[],NationalGalleryVictoria:[],ImmigrationMuseum:[],OldTreasuryBuilding:[],JewishMuseum:[]}},
  sydney:{historical:{SydneyParkStPeters:[],GovernmentHouse:[],StFrancisXaviersChurch:[],FortuneWarPub:[]},
  landmarks:{SydneyOperaHouse:[],SydneyHarbourBridge:[],SydneyObservatory:[],StMarysCathedral:[],SydneyTowerEye:[]},
  museums:{PowerhouseMuseum:[],AustralianNationalMaritimeMuseum:[],AustralianMuseum:[],MuseumSydney:[],HydeParkBarracksMuseum:[]}}};

function getImagesOnLoad(){
  for(var city in cities){
    for(var interest in interests){
      for(var location in imagesData[cities[city]][interests[interest]]){
        if(imagesData[cities[city]][interests[interest]][location] == ""){

        } else{
          searchImages(cities[city], interests[interest], imagesData[cities[city]][interests[interest]][location]);
        }
      }
    }
  }
}

$(document).ready(function(){
  getImagesOnLoad();
});

setTimeout(function(){console.log(loadedImages);},5000);

function searchImages(cityName, interest, location){

    var apiKey = "ekq3l7c47bcs61ts";

    //create searh query
    var url = "http://api.trove.nla.gov.au/result?key=" + apiKey + "&l-availability=y%2Ff&encoding=json&zone=picture" + "&sortby=relevance&n=100&q=" + location + " " + cityName + "&callback=?";

    //get the JSON information we need to display the images
    $.getJSON(url, function(data) {
        // passes item, index and arr to processImages, and passes [interest, location, cityName] as "this" value to processImages
        location = location.replace(/\s+/g, '');
        data.response.zone[0].records.work.forEach(processImages,[interest, location, cityName]);
    });
}
/*
 *   Depending where the image comes from, there is a special way to get that image from the website.
 *   This function works out where the image is from, and gets the image URL
 */
function processImages(troveItem, index) {
    var imgUrl = troveItem.identifier[0].value;
    if (imgUrl.indexOf(urlPatterns[0]) >= 0) { // flickr
        addFlickrItem(imgUrl, troveItem, this);

    } else if (imgUrl.indexOf(urlPatterns[2]) >= 0) { //artsearch

        loadedImages[this[2]][this[0]][this[1]].push(
          "http://artsearch.nga.gov.au/IMAGES/LRG/" + getQueryVariable("IRN", imgUrl) + ".jpg"
        );

    } else if (imgUrl.indexOf(urlPatterns[3]) >= 0) { //recordsearch
        loadedImages[this[2]][this[0]][this[1]].push(
            "http://recordsearch.naa.gov.au/NAAMedia/ShowImage.asp?T=P&S=1&B=" + getQueryVariable("Number", imgUrl)
        );

    } else if (imgUrl.indexOf(urlPatterns[4]) >= 0) { //slsa
        loadedImages[this[2]][this[0]][this[1]].push(
            imgUrl.slice(0, imgUrl.length - 3) + "jpg"
            );

    } else { // Could not reliably load image for item
        // UNCOMMENT FOR DEBUG:
        //  console.log("Not available: " + imgUrl);
    }
}// closes processImages()

function addFlickrItem(imgUrl, troveItem, searchCriteria) {
    var flickr_key = "d34bba3ae62284a964b13d7a4053901a";
    var flickr_secret = "5df8caa59cfaab6b";
    var flickr_url = "https://api.flickr.com/services/rest/?method=flickr.photos.getSizes&api_key=" + flickr_key + "&photo_id=";
    var url_comps = imgUrl.split("/");
    var photo_id = url_comps[url_comps.length - 1];

    $.getJSON(flickr_url + photo_id + "&format=json&nojsoncallback=1", function(data) {
        if (data.stat == "ok") {
            var flickr_image_url = data.sizes.size[data.sizes.size.length - 1].source;
            loadedImages[searchCriteria[2]][searchCriteria[0]][searchCriteria[1]].push(
                flickr_image_url
            );
        }
    });
}

// from http://css-tricks.com/snippets/javascript/get-url-variables/
function getQueryVariable(variable, url) {
    var query = url.split("?");
    var vars = query[1].split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) {
            return pair[1];
        }
    }
    return (false);
}

//****************************************************************************//

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

  var brisbane = {lat: -27.4697759, lng: 153.0251235};
  var sydney = {lat: -33.8688197, lng: 151.2092955};
  var melbourne = {lat: -37.8136276, lng: 144.9630576};


  $(".brisbane").click(function(){
    clearMarkers(null);
    if(map.getZoom() == 15 && $("#cityName").text() != "BRISBANE"){
      map.setZoom(13);
      map.setCenter(brisbane);
      $("#cityName").text("BRISBANE");
      setTimeout(function(){$("#over-content-interest").fadeIn(3000);}, 1100);
    } else {
      $("#cityName").text("BRISBANE");
      map.setCenter(brisbane);
      smoothZoom(map, 14, map.getZoom());
      setTimeout(function(){setNavCss();}, 5000);
      // setTimeout(function(){$('#interestPrompt').modal('show');}, 8000);
    }
  });

  $(".melbourne").click(function(){
    clearMarkers(null);
    if(map.getZoom() == 15 && $("#cityName").text() != "MELBOURNE"){
      map.setZoom(13);
      map.setCenter(melbourne);
      $("#cityName").text("MELBOURNE");
      setTimeout(function(){$("#over-content-interest").fadeIn(3000);}, 1100);
    } else {
      $("#cityName").text("MELBOURNE");
      map.setCenter(melbourne);
      smoothZoom(map, 14, map.getZoom());
      setTimeout(function(){setNavCss();}, 5000);
      // setTimeout(function(){$('#interestPrompt').modal('show');}, 8000);
    }
  });

  $(".sydney").click(function(){
    clearMarkers(null);
    if(map.getZoom() == 15 && $("#cityName").text() != "SYDNEY"){
      map.setZoom(13);
      map.setCenter(sydney);
      $("#cityName").text("SYDNEY");
      setTimeout(function(){$("#over-content-interest").fadeIn(3000);}, 1100);
    } else {
      $("#cityName").text("SYDNEY");
      map.setCenter(sydney);
      smoothZoom(map, 14, map.getZoom());
      setTimeout(function(){setNavCss();}, 5000);
      // setTimeout(function(){$('#interestPrompt').modal('show');}, 8000);
    }
  });

  $(".museums").click(function(){
    clearMarkers(null);
    smoothZoom(map, 16, map.getZoom());
    $("#over-content-interest").fadeOut(1000);
    //constructs the name of the key to make reference in the cities interest object
    //it uses the initial of the interest + the name of the city
    var cityName = $("#cityName").text().toLowerCase();
    var m = "m_" + cityName;
    set_places(cityName, "museums", interestLocations[m]);
    // setTimeout(function(){$('#locationPrompt').modal('show');}, 4000);
  });

  $(".historical").click(function(){
    clearMarkers(null);
    smoothZoom(map, 16, map.getZoom());
    $("#over-content-interest").fadeOut(1000);
    //constructs the name of the key to make reference in the cities interest object
    //it uses the initial of the interest + the name of the city
    var cityName = $("#cityName").text().toLowerCase();
    var h = "h_" + cityName;
    set_places(cityName, "historical", interestLocations[h]);
    // setTimeout(function(){$('#locationPrompt').modal('show');}, 4000);
  });

  $(".landmarks").click(function(){
    clearMarkers(null);
    smoothZoom(map, 16, map.getZoom());
    $("#over-content-interest").fadeOut(1000);
    //constructs the name of the key to make reference in the cities interest object
    //it uses the initial of the interest + the name of the city
    var cityName = $("#cityName").text().toLowerCase();
    var l = "l_" + cityName;
    set_places(cityName, "landmarks", interestLocations[l]);
    // setTimeout(function(){$('#locationPrompt').modal('show');}, 4000);
  });

  $(".citylogo").click(function(){
    window.location = "index.html";
  });

  function setNavCss(){
    $("#nav-interest").css("display", "block");
    $(".main-menu").css("bottom", "25%");
    $(".main-menu").css("height", "25.5em");
    $(".main-menu").hover(function(){
      $(this).css("height", "32.5em");//hover in
    }, function(){
      $(this).css("height", "25.5em");//hover out
    });
  } //set the nav bar to show interest only when focus is on interes page

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
    
    
    
var directionsService = new google.maps.DirectionsService;
var directionsDisplay = new google.maps.DirectionsRenderer;
directionsDisplay.setMap(map);    
document.getElementById("directions").addEventListener("click", function(){
    getDirections(directionsService, directionsDisplay);
});
    
var points = [];
 function getLocationInfo(latlng, locationName) {
    "use strict";
    if (latlng != null) {
        var point = { LatLng: latlng, LocationName: locationName };
        console.log(point);
        points.push(point);
        buildPoints();
        console.log(points);
    }
}
   
function buildPoints() {
    "use strict";
    var html = "";
    for (var i = 0; i < points.length; i++) {
        var marker = new google.maps.Marker({
            position: points[i].LatLng,
            icon: "https://www.doogal.co.uk/images/red.png",
            title: points[i].LocationName
        });
        markers.push(marker);
        marker.setMap(map);
        html += "<tr><td>" + points[i].LocationName + "</td><td>" + points[i].LatLng.lat() +
            "</td><td>" + points[i].LatLng.lng() +
            "</td><td><button class=\"delete btn btn-default\" onclick=\"removeRow(" + i + ");\">X</button></td><td>";
        if (i < points.length - 1) {
            html += "<button class=\"moveDown btn btn-default\" onclick=\"moveRowDown(" + i + ");\">Dn</button>";
        }
        html += "</td><td>";
        if (i > 0) {
            html += "<button class=\"moveUp btn btn-default\" onclick=\"moveRowUp(" + i + ");\">Up</button>";
        }
        html += "</td></tr>";
    }
    $("#locationlist tbody").html(html);
}
    
    
    
 function getDirections(directionsService, directionsDisplay) {
    "use strict";
    if (points.length < 2) {
        showError("You need to add at least two locations");
        return;
    }
    //var directionsDiv = document.getElementById("directions");
    $("#directions").html("Loading...");
    var directions = new google.maps.DirectionsService();
    // build array of waypoints (excluding start and end)
    var waypts = [];
    var end = points.length - 1;
    var dest = points[end].LatLng;
    for (var i = 1; i < end; i++) {
        waypts.push({ location: points[i].LatLng });
    }
     console.log(waypts);

    directionsService.route({
        origin: points[0].LatLng,
        destination: dest,
        waypoints: waypts,
        travelMode: 'WALKING',
        optimizeWaypoints: true
    }, function(response, status) {
          if (status === 'OK') {         
          directionsDisplay.setDirections(response);
          clearMarkers();
          var route = response.routes[0];
          } 
        });
}    
    
    
    
  //**************************************************************************//
  function setMarker(city, interest, place){
    var marker = new google.maps.Marker({
      position: place.location,
      map: map
    });

    var placeNameTrim = place.name.replace(/\s+/g, '');
    markers.push(marker);

    // console.log(loadedImages[city][interest][placeNameTrim][0]);
    var contentString = '<div style="width:300px;"><h3 id="info-window-title" class="text-center">' + place.name +
    '</h3><div style="display: inline-block; position: relative;"><img id="info-window-image" src="' + loadedImages[city][interest][placeNameTrim][0] +
    '" style="width: 150px; height: 200px; display: inline-block;"/><i id="refreshImage" class="fa fa-refresh" aria-hidden="true" style="cursor:pointer; position: absolute; top: 2%; right: 3%; height:20px; width:20px; border-radius: 50%; padding: 1px 0px 0px 1.7px; line-height:20px; text-align:center; background-color: white; color: #59d;"></i></div>' +
    '<p style="display: inline-block; margin: 0px 10px; position: absolute; width: 140px; font-size: .7em; text-align: left;">Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sollicitudin tincidunt pulvinar. In purus elit, varius quis faucibus vel.</p></div>';

    var infoWindow = new google.maps.InfoWindow({
      content: contentString
    });

    marker.addListener('click', function(){
      infoWindow.open(map, marker);
      getLocationInfo(marker.position, place.name); 
      google.maps.event.addDomListener(document.getElementById('refreshImage'), 'click', function(){
        var imageArray = loadedImages[city][interest][placeNameTrim];
        var maxIndex = imageArray.length;
        var imageIndex = getRandom(maxIndex);
        document.getElementById("info-window-image").src = loadedImages[city][interest][placeNameTrim][imageIndex];
      });
    });
  }//closes setMarker

  function getRandom(maxIndex){
    var imageIndex = Math.floor(Math.random() * maxIndex);
    return imageIndex;
  }

  function set_places(city, interest, places){ // gets an object places
    map.draggable = true;
    map.scrollwheel = true;
    for(var i = 0; i < places.length; i++){
      var place = places[i];
      setMarker(city, interest, place);
    }
  }

  function clearMarkers(map){
    //gets a map object seted to null, so the markerst
    // won't be shown in the map
    if(markers.length > 0){
      for (var i = 0; i < markers.length; i++) {
          markers[i].setMap(map);
        }
      markers = [];
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
// Geolocation service
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
