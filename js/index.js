var map;
var markers = [];
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

// //create searh query
// var url = "http://api.trove.nla.gov.au/result?key=" + apiKey + "&l-availability=y%2Ff&encoding=json&zone=picture" + "&sortby=relevance&n=2&q=" + "Landmark" + " " + "Brisbane" + "&callback=?";
//
// //get the JSON information we need to display the images
// $.getJSON(url, function(data) {
//   $('#output').empty();
//   console.log(data);
//   //printImages();
//
// });
//
// //create searh query
// var url = "http://api.trove.nla.gov.au/result?key=" + apiKey + "&l-availability=y%2Ff&encoding=json&zone=picture" + "&sortby=relevance&n=2&q=" + "Museum" + " " + "Brisbane" + "&callback=?";
//
// //get the JSON information we need to display the images
// $.getJSON(url, function(data) {
//   $('#output').empty();
//   console.log(data);
//   //printImages();
// });
// //create searh query
// var url = "http://api.trove.nla.gov.au/result?key=" + apiKey + "&l-availability=y%2Ff&encoding=json&zone=picture" + "&sortby=relevance&n=2&q=" + "historical location" + " " + "Brisbane" + "&callback=?";
//
// //get the JSON information we need to display the images
// $.getJSON(url, function(data) {
//   $('#output').empty();
//   console.log(data);
//   //printImages();
//
// });

var loadedImages = [];
var urlPatterns = ["flickr.com", "nla.gov.au", "artsearch.nga.gov.au", "recordsearch.naa.gov.au", "images.slsa.sa.gov.au"];
var found = 0;
// (function($){

function waitForFlickr() {
	if(found == loadedImages.length) {
		return true;
	} else {
		setTimeout(waitForFlickr, 250);
	}
}

// $("form#searchTrove").submit(function(event) {
//         event.preventDefault();
function searchImages(interest, cityName){

        loadedImages = [];
	      found = 0;
        //get input values
        // var searchTerm = $("#searchTerm").val().trim();
        // searchTerm = searchTerm.replace(/ /g, "%20");
        // var sortBy = $("#sortBy").val();
        var apiKey = "ekq3l7c47bcs61ts";

        //create searh query
        var url = "http://api.trove.nla.gov.au/result?key=" + apiKey + "&l-availability=y%2Ff&encoding=json&zone=picture" + "&sortby=relevance&n=100&q=" + interest + " " + cityName + "&callback=?";

        //get the JSON information we need to display the images
        $.getJSON(url, function(data) {
            // $('#output').empty();
            // console.log(data);
            $.each(data.response.zone[0].records.work, processImages);
            //printImages();

	          // waitForFlickr(); // Waits for the flickr images to load
        });

        // console.log(loadedImages);
    }
    /*
     *   Depending where the image comes from, there is a special way to get that image from the website.
     *   This function works out where the image is from, and gets the image URL
     */
    function processImages(index, troveItem) {
        var imgUrl = troveItem.identifier[0].value;
        if (imgUrl.indexOf(urlPatterns[0]) >= 0) { // flickr
            // console.log('flickr');
		        found++;
            addFlickrItem(imgUrl, troveItem);

        } else if (imgUrl.indexOf(urlPatterns[1]) >= 0) { // nla.gov
		        // found++;
            // loadedImages.push(
            // imgUrl + "/representativeImage?wid=900" // change ?wid=900 to scale the image
            // );

        } else if (imgUrl.indexOf(urlPatterns[2]) >= 0) { //artsearch
            // console.log('artSearch');
            // found++;
            // loadedImages.push(
            //   "http://artsearch.nga.gov.au/IMAGES/LRG/" + getQueryVariable("IRN", imgUrl) + ".jpg"
            // );

        } else if (imgUrl.indexOf(urlPatterns[3]) >= 0) { //recordsearch
          // console.log('recorssearch');
		        // found++;
            // loadedImages.push(
            //     "http://recordsearch.naa.gov.au/NAAMedia/ShowImage.asp?T=P&S=1&B=" + getQueryVariable("Number", imgUrl)
            // );

        } else if (imgUrl.indexOf(urlPatterns[4]) >= 0) { //slsa
          // console.log("slsa");
    //         found++;
    //         loadedImages.push(
    //             imgUrl.slice(0, imgUrl.length - 3) + "jpg"
		// );

        } else { // Could not reliably load image for item
            // UNCOMMENT FOR DEBUG:
	          //  console.log("Not available: " + imgUrl);
        }
    }

    function addFlickrItem(imgUrl, troveItem) {
        var flickr_key = "d34bba3ae62284a964b13d7a4053901a";
        var flickr_secret = "5df8caa59cfaab6b";
        var flickr_url = "https://api.flickr.com/services/rest/?method=flickr.photos.getSizes&api_key=" + flickr_key + "&photo_id=";
        var url_comps = imgUrl.split("/");
        var photo_id = url_comps[url_comps.length - 1];

        $.getJSON(flickr_url + photo_id + "&format=json&nojsoncallback=1", function(data) {
            if (data.stat == "ok") {
                var flickr_image_url = data.sizes.size[data.sizes.size.length - 1].source;
                // console.log(flickr_image_url);
                loadedImages.push(
                    flickr_image_url
                );
            }
        });

    }

// function printImages() {
// 	// Print out all images
//   for (var i in loadedImages) {
//       var image = new Image();
//       image.src = loadedImages[i];
//       image.style.display = "inline-block";
//       image.style.width = "48%";
//       image.style.margin = "1%";
//       image.style.verticalAlign = "top";
//
//       $("#output").append(image);
//   }
// }

    // from http://css-tricks.com/snippets/javascript/get-url-variables/
    // function getQueryVariable(variable, url) {
    //     var query = url.split("?");
    //     var vars = query[1].split("&");
    //     for (var i = 0; i < vars.length; i++) {
    //         var pair = vars[i].split("=");
    //         if (pair[0] == variable) {
    //             return pair[1];
    //         }
    //     }
    //     return (false);
    // }

    // }(jQuery));

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
      setTimeout(function(){$('#interestPrompt').modal('show');}, 8000);
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
      setTimeout(function(){$('#interestPrompt').modal('show');}, 8000);
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
      setTimeout(function(){$('#interestPrompt').modal('show');}, 8000);
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
    set_places(interestLocations[m]);
    setTimeout(function(){$('#locationPrompt').modal('show');}, 4000);
  });

  $(".historical").click(function(){
    clearMarkers(null);
    smoothZoom(map, 16, map.getZoom());
    $("#over-content-interest").fadeOut(1000);
    //constructs the name of the key to make reference in the cities interest object
    //it uses the initial of the interest + the name of the city
    var cityName = $("#cityName").text().toLowerCase();
    var h = "h_" + cityName;
    set_places(interestLocations[h]);
    setTimeout(function(){$('#locationPrompt').modal('show');}, 4000);
  });

  $(".landmarks").click(function(){
    clearMarkers(null);
    smoothZoom(map, 16, map.getZoom());
    $("#over-content-interest").fadeOut(1000);
    //constructs the name of the key to make reference in the cities interest object
    //it uses the initial of the interest + the name of the city
    var cityName = $("#cityName").text().toLowerCase();
    var l = "l_" + cityName;
    set_places(interestLocations[l]);
    setTimeout(function(){$('#locationPrompt').modal('show');}, 4000);
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
  //**************************************************************************//
  function setMarker(place){
    var marker = new google.maps.Marker({
      position: place.location,
      map: map
    });

    markers.push(marker);

    var cityName = $("#cityName").text().toLowerCase();

    searchImages(place.name, cityName);
    // console.log(loadedImages);


    // var image;

    // if(loadedImages.length > 0){
      // for(var image in loadedImages){
        // if(image == Undefined){
        // } else{
          // var image = new Image();
          // image.src = loadedImages[0];
          // image.style.display = "inline-block";
          // image.style.width = "48%";
          // image.style.margin = "1%";
          // image.style.verticalAlign = "top";
        // }
    //  }
    // }

    var contentString;
    setTimeout(function(){ contentString = '<div style="width:300px;"><h3 class="text-center">' + place.name +
    '</h3><img  src="' + loadedImages[3] +
    '" style="width: 150px; heigth: 200px; display: inline-block;">' +
    '<p style="display: inline-block; margin: 0px 10px; position: absolute; width: 140px; font-size: .7em; text-align: left;">Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sollicitudin tincidunt pulvinar. In purus elit, varius quis faucibus vel.</p></div>';
    console.log(contentString);
    console.log(loadedImages[0]);

    var infoWindow = new google.maps.InfoWindow({
      content: contentString
    });

    marker.addListener('click', function(){
      infoWindow.open(map, marker);
    });
  }, 3000);
  }//closes setMarker

  function set_places(places){ // gets an object places
    map.draggable = true;
    map.scrollwheel = true;
    for(var i = 0; i < places.length; i++){
      var place = places[i];
      setMarker(place);
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
