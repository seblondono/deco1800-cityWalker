// Map object to be passed to the google maps API
var map;
// Array of markers created in the interests pages, it gets reseted when user changes interests
var markers = [];
// Array of markers selected by the user to walk and explore
var markersRout = [];
// Preloaded locations to be displayed in each interest page. There are 5 locations per interest per city
//Setting conditions for one off events //
var interestsModalSeen = false;
var locationModalSeen = false;
var moreInfoModalSeen = false;
var locationTableModalSeen = false;
var directionsPressed = false;
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

// URL patterns to be used when loading images form Trove, in order to identify the origin of the images
var urlPatterns = ["flickr.com", "nla.gov.au", "artsearch.nga.gov.au", "recordsearch.naa.gov.au", "images.slsa.sa.gov.au"];

// List of cities where we have the service. To be used in the getImagesOnLoad()
var cities = ["brisbane", "melbourne", "sydney"];

// List of interests at each city. To be used in the getImagesOnLoad()
var interests = ["landmarks", "museums", "historical"];

// Object {city:{interest:[location]}. To be used in the getImagesOnLoad()
var locationsData = {brisbane:{historical:["Customs house", "State Library Queensland", "All Saint Wickham Terrace", "Newstead House", "St Stephens Cathedral"],
                            landmarks:["Story Bridge", "City Hall", "Parliament House", "Wheel of Brisbane", "The Old Windmill"],
                            museums: ["Old Museum", "Mercy Heritage", "Queensland Museum", "Queensland Maritime Museum", "Queensland Gallery Modern Art"]},
                  melbourne:{historical:["Federation Square", "Flemington", "Old Treasury Building", "The Great Melbourne Telescope", "The Shrine Remembrance"],
                            landmarks:["Star Observation Wheel", "Royal Botanic Gardens", "Queen Victoria Market", "Flinders Street Station", "Royal Exhibition Building"],
                            museums:["Melbourne Museum", "National Gallery Victoria", "Immigration Museum", "Old Treasury Building", "Jewish Museum"]},
                  sydney:{historical:["Sydney Park St Peters", "Government House", "St Francis Xaviers Church", "Fortune War Pub"],
                          landmarks:["Sydney Opera House", "Sydney Harbour Bridge", "Sydney Observatory", "St Marys Cathedral", "Sydney Tower Eye"],
                          // List of cities where we have the service. To be used in the getImagesOnLoad()
                          museums:["Powerhouse Museum", "Australian National Maritime Museum", "Australian Museum", "Museum Sydney", "Hyde Park Barracks Museum"]}};


// Object {city:{interest:{location:[]}}. To be used in the searchImages(). When searching for location images, the URLs are stored in city.interest.location
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
  // Gets images for every location in each city and interest. Its called when page finished loading
  //getImagesOnLoad() -> None

  for(var city in cities){
    for(var interest in interests){
      for(var location in locationsData[cities[city]][interests[interest]]){
          searchImages(cities[city], interests[interest], locationsData[cities[city]][interests[interest]][location]);
      }
    }
  }
}//close getImagesOnLoad

// Calls getImagesOnLoad
$(document).ready(function(){
  getImagesOnLoad();
  getArticleOnLoad();
});

function searchImages(cityName, interest, location){
  // Search for images with the Trove API
  // searchImages(cityName, interest, location) -> None
  var apiKey = "hkjqsa5k0v4bb85b";

  //create searh query
  var url = "http://api.trove.nla.gov.au/result?key=" + apiKey + "&l-availability=y%2Ff&encoding=json&zone=picture" + "&sortby=relevance&n=100&q=" + location + " " + cityName + "&callback=?";

  //get the JSON information we need to display the images
  $.getJSON(url, function(data) {
      // Removes the spaces in the name of the location, to correspond with the format of the Object loadedImages
      location = location.replace(/\s+/g, '');
      // passes item, index and arr to processImages, and passes [interest, location, cityName] as "this" value to processImages
      data.response.zone[0].records.work.forEach(processImages,[interest, location, cityName]);
  });
}//close searchImages

/*
 *   Depending where the image comes from, there is a special way to get that image from the website.
 *   This function works out where the image is from, and gets the image URL
 *   From http://deco1800.uqcloud.net/examples/troveImage.php
 */
function processImages(troveItem, index) {
  //Process images from Trove API and loads URLs into loadedImages
  // processImages(troveItem, index, arr, this) -> None

    //get the image URL from the troveItem
    var imgUrl = troveItem.identifier[0].value;

    //Depnding on the origin the URLs get a different treatment
    if (imgUrl.indexOf(urlPatterns[0]) >= 0) { // flickr
        //Gets the images from Flickr API
        addFlickrItem(imgUrl, troveItem, this);

    } else if (imgUrl.indexOf(urlPatterns[2]) >= 0) { //artsearch
        // loads image URL into loadedImages
        loadedImages[this[2]][this[0]][this[1]].push(
          "http://artsearch.nga.gov.au/IMAGES/LRG/" + getQueryVariable("IRN", imgUrl) + ".jpg"
        );

    } else if (imgUrl.indexOf(urlPatterns[3]) >= 0) { //recordsearch
        // loads image URL into loadedImages
        loadedImages[this[2]][this[0]][this[1]].push(
            "http://recordsearch.naa.gov.au/NAAMedia/ShowImage.asp?T=P&S=1&B=" + getQueryVariable("Number", imgUrl)
        );

    } else if (imgUrl.indexOf(urlPatterns[4]) >= 0) { //slsa
        // lloads image URL into loadedImages
        loadedImages[this[2]][this[0]][this[1]].push(
            imgUrl.slice(0, imgUrl.length - 3) + "jpg"
            );

    } else { // Could not reliably load image for item
        // UNCOMMENT FOR DEBUG:
    }
}// closes processImages()

function addFlickrItem(imgUrl, troveItem, searchCriteria) {
  // Gets images found in Trove from Flickr API
  // addFlickrItem(imgUrl, troveItem, searchCriteria) -> None
    var flickr_key = "d34bba3ae62284a964b13d7a4053901a";
    var flickr_secret = "5df8caa59cfaab6b";
    var flickr_url = "https://api.flickr.com/services/rest/?method=flickr.photos.getSizes&api_key=" + flickr_key + "&photo_id=";
    var url_comps = imgUrl.split("/");
    var photo_id = url_comps[url_comps.length - 1];

    //Asynchronous call to Flickr API
    $.getJSON(flickr_url + photo_id + "&format=json&nojsoncallback=1", function(data) {
        if (data.stat == "ok") {
            var flickr_image_url = data.sizes.size[data.sizes.size.length - 1].source;
            //loads image URl into loadedImages
            loadedImages[searchCriteria[2]][searchCriteria[0]][searchCriteria[1]].push(
                flickr_image_url
            );
        }
    });
}//close addFlickrItem()

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
/*            Finishes the block to process Images from Trove API             */
//****************************************************************************//

// Object {city:{interest:{location:[]}}. To be used in the searchImages(). When searching for location images, the URLs are stored in city.interest.location
var loadedArticle = {brisbane:{historical:{Customshouse:[],StateLibraryQueensland:[],AllSaintWickhamTerrace:[],NewsteadHouse:[],StStephensCathedral:[]},
  landmarks:{StoryBridge:[],CityHall:[],ParliamentHouse:[],WheelofBrisbane:[],TheOldWindmill:[]},
  museums:{OldMuseum:[],MercyHeritage:[],QueenslandMuseum:[],QueenslandMaritimeMuseum:[],QueenslandGalleryModernArt:[]}},
  melbourne:{historical:{FederationSquare:[],Flemington:[],OldTreasuryBuilding:[],TheGreatMelbourneTelescope:[],TheShrineRemembrance:[]},
  landmarks:{StarObservationWheel:[],RoyalBotanicGardens:[],QueenVictoriaMarket:[],FlindersStreetStation:[],RoyalExhibitionBuilding:[]},
  museums:{MelbourneMuseum:[],NationalGalleryVictoria:[],ImmigrationMuseum:[],OldTreasuryBuilding:[],JewishMuseum:[]}},
  sydney:{historical:{SydneyParkStPeters:[],GovernmentHouse:[],StFrancisXaviersChurch:[],FortuneWarPub:[]},
  landmarks:{SydneyOperaHouse:[],SydneyHarbourBridge:[],SydneyObservatory:[],StMarysCathedral:[],SydneyTowerEye:[]},
  museums:{PowerhouseMuseum:[],AustralianNationalMaritimeMuseum:[],AustralianMuseum:[],MuseumSydney:[],HydeParkBarracksMuseum:[]}}};

function getArticleOnLoad(){
  // Gets articles for every location in each city and interest. Its called when page finished loading
  //getArticleOnLoad() -> None

  for(var city in cities){
    for(var interest in interests){
      for(var location in locationsData[cities[city]][interests[interest]]){
          searchArticle(cities[city], interests[interest], locationsData[cities[city]][interests[interest]][location]);
      }
    }
  }
}//close getImagesOnLoad

function searchArticle(cityName, interest, location){
  // Set the search zone - alternatively you can set this using a form input
  var apiKey = "ekq3l7c47bcs61ts";
  var searchZone = "newspaper";
  var sortBy = "relevance"; //$("#sortBy").val();

  /*
  *	Construct the URL for the Trove Search API
  * 	http://api.trove.nla.gov.au/result? is the base URL required for accessing the TROVE API
  * 	Additional arguments are sent as key/value pairs separated by the & sign
  * 	key is the API key needed to access the API
  * 	encoding tells the API how to return the results - json or xml (default)
  * 	zone tells the API where to perform the search - book, picture, article, music, map, collection, newspaper, list or all can be used
  * 	sortby tells the API how to sort the results - datedesc, dateasc, relevance
  * 	q is the set of keywords to search on, alternatively you can use Indexes to refine the search terms (see the API documentation for how to use indexes & which zones support each one
  *	callback allows you to specify a function to process the response - even if you choose not to set one, you need to include the callback parameter
  * 	See the API documentation for other parameters you can use in the search string
  */
  var url = "http://api.trove.nla.gov.au/result?key=" + apiKey + "&encoding=json&zone=" + searchZone +
  "&sortby=" + sortBy + "&q=" + location + " " + cityName + "&s=0&n=20&include=articletext,pdf&encoding=json&callback=?";

  /*
  * 	Perform the search using jQuery's getJSON method
  *	Requires the search URL
  */
  location = location.replace(/\s+/g, '');

  $.getJSON(url, function(data) {
  	// clear the HTML div that will display the results
    $.each(data.response.zone[0].records.article, function(index, value) {
      	loadedArticle[cityName][interest][location].push(value);
    });
  });


}// closes searchArticle()

function removeLng(arr) {
    var what, a = arguments, L = a.length, ax;
    while (L > 1 && arr.length) {
        what = a[--L];
        while ((ax= arr.indexOf(what)) !== -1) {
            arr.splice(ax, 1);
        }
    }
    return arr;
}

function initMap() {
  // Create a new StyledMapType object, passing it an array of styles,
  // and the name to be displayed on the map type control.

  //Custom style for the map
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

  // Coordinates for each of the cities in the app
  var brisbane = {lat: -27.4697759, lng: 153.0251235};
  var sydney = {lat: -33.8688197, lng: 151.2092955};
  var melbourne = {lat: -37.8136276, lng: 144.9630576};

  // This code is executed when user click on the city at the home page
  $(".brisbane").click(function(){
    // Removes all the markers from the global markers variable
    clearMarkers(null);
    directionsDisplay.setDirections({routes: []});
    directionsPressed = false;
    $("#locationsToSee").empty();
    coordinatesItem = {};
    locationMarkersItem = {};
    routMarkers = [];

    // If the user is in the location page (zoom 15) and not in Brisbane
    if(map.getZoom() >= 15 && ($("#cityName").text() != "BRISBANE" || $("#cityName").text() == "BRISBANE")){
      //Zoom into location

      $("#placesToSee").fadeOut(100);
      map.setZoom(13);
      // set Brisbane as center
      map.setCenter(brisbane);
      //Change the name of the city to Brisbane
      $("#cityName").text("BRISBANE");
      // Set images to correspond eith the interest and  city
      $("#landmark").attr("src","images/b_landmark.png");
      $("#landmark").attr({alt: "Brisbane City Hall"});
      $("#museum").attr("src","images/b_museum.png");
      $("#museum").attr({alt: "Brisbane Museum"});
      $("#historical").attr("src","images/b_historical.png");
      $("#historical").attr({alt: "Brisbane Old Museum"});
      // Fade in interest menu
      setTimeout(function(){$("#over-content-interest").fadeIn(3000);}, 1100);
    } else { // when user is at interest page
      // change the name of the city to Brisbane
      $("#cityName").text("BRISBANE");
      // Set images to correspond eith the interest and  city
      $("#landmark").attr("src","images/b_landmark.png");
      $("#landmark").attr({alt: "Brisbane City Hall"});
      $("#museum").attr("src","images/b_museum.png");
      $("#museum").attr({alt: "Brisbane Museum"});
      $("#historical").attr("src","images/b_historical.png");
      $("#historical").attr({alt: "Brisbane Old Museum"});
      // set the center of the map to Brisbane
      map.setCenter(brisbane);
      smoothZoom(map, 14, map.getZoom());
      setTimeout(function(){setNavCss();}, 5000);
    // set modal to show on first time
        if (interestsModalSeen == false) {
        setTimeout(function(){$('#interestPrompt').modal('show');}, 8000);
            interestsModalSeen = true;
        }
    }
  });

  $(".melbourne").click(function(){
    clearMarkers(null);
    directionsDisplay.setDirections({routes: []});
    directionsPressed = false;
    $("#locationsToSee").empty();
    coordinatesItem = {};
    locationMarkersItem = {};
    routMarkers = [];

    if(map.getZoom() >= 15 && ($("#cityName").text() != "MELBOURNE" || $("#cityName").text() == "MELBOURNE")){
      $("#placesToSee").fadeOut(100);
      map.setZoom(13);
      map.setCenter(melbourne);
      $("#cityName").text("MELBOURNE");
      $("#landmark").attr("src","images/m_landmark.jpg");
      $("#landmark").attr({alt: "Melbourne Central Train Station"});
      $("#museum").attr("src","images/m_museum.jpg");
      $("#museum").attr({alt: "Melbourne Museum"});
      $("#historical").attr("src","images/m_historical.jpg");
      $("#historical").attr({alt: "Melbourne Church"});
      setTimeout(function(){$("#over-content-interest").fadeIn(3000);}, 1100);
    } else {
      $("#cityName").text("MELBOURNE");
      $("#landmark").attr("src","images/m_landmark.jpg");
      $("#landmark").attr({alt: "Melbourne Central Train Station"});
      $("#museum").attr("src","images/m_museum.jpg");
      $("#museum").attr({alt: "Melbourne Museum"});
      $("#historical").attr("src","images/m_historical.jpg");
      $("#historical").attr({alt: "Melbourne Church"});
      map.setCenter(melbourne);
      smoothZoom(map, 14, map.getZoom());
      setTimeout(function(){setNavCss();}, 5000);
    // set modal to show on first time
        if (interestsModalSeen == false) {
        setTimeout(function(){$('#interestPrompt').modal('show');}, 8000);
            interestsModalSeen = true;
        }
    }
    coordinates = {};
    locationMarkers = {};
    routMarkers = [];
  });

  $(".sydney").click(function(){
    clearMarkers(null);
    directionsDisplay.setDirections({routes: []});
    directionsPressed = false;
    $("#locationsToSee").empty();
    coordinatesItem = {};
    locationMarkersItem = {};
    routMarkers = [];

    if(map.getZoom() >= 15 && ($("#cityName").text() != "SYDNEY" || $("#cityName").text() == "SYDNEY")){
      $("#placesToSee").fadeOut(100);
      map.setZoom(13);
      map.setCenter(sydney);
      $("#cityName").text("SYDNEY");
      $("#landmark").attr("src","images/s_landmark.jpg");
      $("#landmark").attr({alt: "Sydney Opera House"});
      $("#museum").attr("src","images/s_museum.jpg");
      $("#museum").attr({alt: "Sydney Museum"});
      $("#historical").attr("src","images/s_historical.jpg");
      $("#historical").attr({alt: "Sydney City Hall"});
      setTimeout(function(){$("#over-content-interest").fadeIn(3000);}, 1100);
    } else {
      $("#cityName").text("SYDNEY");
      $("#landmark").attr("src","images/s_landmark.jpg");
      $("#landmark").attr({alt: "Sydney Opera House"});
      $("#museum").attr("src","images/s_museum.jpg");
      $("#museum").attr({alt: "Sydney Museum"});
      $("#historical").attr("src","images/s_historical.jpg");
      $("#historical").attr({alt: "Sydney City Hall"});
      map.setCenter(sydney);
      smoothZoom(map, 14, map.getZoom());
      setTimeout(function(){setNavCss();}, 5000);
    // set modal to show on first time
        if (interestsModalSeen == false) {
        setTimeout(function(){$('#interestPrompt').modal('show');}, 8000);
            interestsModalSeen = true;
        }
    }
    coordinates = {};
    locationMarkers = {};
    routMarkers = [];
  });

  $(".museums").click(function(){
    smoothZoom(map, 16, map.getZoom());
    $("#over-content-interest").fadeOut(1000);

    //constructs the name of the key to make reference in the cities interest object
    //it uses the initial of the interest + the name of the city
    var cityName = $("#cityName").text().toLowerCase();
    var m = "m_" + cityName;
    set_places(cityName, "museums", interestLocations[m]);
    // set modal to show on first time
        if (locationModalSeen == false) {
        setTimeout(function(){$('#locationPrompt').modal('show');}, 1000);
            locationModalSeen = true;
        }
  });

  $(".historical").click(function(){
    smoothZoom(map, 16, map.getZoom());
    $("#over-content-interest").fadeOut(1000);

    //constructs the name of the key to make reference in the cities interest object
    //it uses the initial of the interest + the name of the city
    var cityName = $("#cityName").text().toLowerCase();
    var h = "h_" + cityName;
    set_places(cityName, "historical", interestLocations[h]);
    // set modal to show on first time
        if (locationModalSeen == false) {
        setTimeout(function(){$('#locationPrompt').modal('show');}, 1000);
            locationModalSeen = true;
        }
  });

  $(".landmarks").click(function(){
    smoothZoom(map, 16, map.getZoom());
    $("#over-content-interest").fadeOut(1000);

    //constructs the name of the key to make reference in the cities interest object
    //it uses the initial of the interest + the name of the city
    var cityName = $("#cityName").text().toLowerCase();
    var l = "l_" + cityName;
    set_places(cityName, "landmarks", interestLocations[l]);
    // set modal to show on first time
        if (locationModalSeen == false) {
        setTimeout(function(){$('#locationPrompt').modal('show');}, 1000);
            locationModalSeen = true;
        }
  });

  $(".citylogo").click(function(){
    window.location = "index.html";
  });

  function setNavCss(){
    // amkes available the interest option in the main nav bar
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
  function smoothZoom (map, max, cnt) {
    //map to zoom into, final zoom value, initial zoom value
    // Recursive funtion to zoom into a city
      $("#over-content").fadeOut(1500);
      if (cnt >= max) {
          if (cnt == 14){
            // shows the interest page options
            setTimeout(function(){$("#over-content-interest").fadeIn(3000);}, 1100);
          }
          return; // exits recursive function
      }
      else {
          z = google.maps.event.addListener(map, 'zoom_changed', function(event){
              google.maps.event.removeListener(z);
              smoothZoom(map, max, cnt + 1);
          });
          setTimeout(function(){map.setZoom(cnt)}, 500);
      }
  }//close smoothZoom()

  //sets up the direction service to display route between locations
  var directionsService = new google.maps.DirectionsService;
  var directionsDisplay = new google.maps.DirectionsRenderer;
  directionsDisplay.setMap(map);
  // document.getElementById("directions").addEventListener("click", function(){
  //     getDirections(directionsService, directionsDisplay);
  // });
  $("#directions").click(function(){
    // directionsDisplay.setMap(map);
    getDirections(directionsService, directionsDisplay);
    directionsPressed = true;
  });

  var coordinatesItem = {};
  var locationMarkersItem = {};
  var routMarkers = [];

  //forms the table of locations to see, along with modification buttons//
  function buildPoints(marker) {
    "use strict";

    var markerLng = marker.getPosition().lng();

    if(markerLng != undefined){
      if(jQuery.inArray(markerLng, routMarkers) != -1){
        return;
      } else {
        routMarkers.push(markerLng);

        if (marker.icon == 'images/landmarks.png') {
            marker.setIcon('images/landmarksSELECTED.png');
        }
        else if (marker.icon == 'images/historical.png') {
            marker.setIcon('images/historicalSELECTED.png');
        }
        else if (marker.icon == 'images/museums.png') {
            marker.setIcon('images/museumsSELECTED.png');
        }

        var index = markersRout.length;
        var locationIndex = "location" + index;

        Object.defineProperty(coordinatesItem, locationIndex, {writable : true, enumerable : true, configurable : true});
        Object.defineProperty(locationMarkersItem, locationIndex, {writable : true, enumerable : true, configurable : true});
        coordinatesItem[locationIndex] = {lat:marker.getPosition().lat(), lng:marker.getPosition().lng()};
        locationMarkersItem[locationIndex] = marker;
        if (($("#placesToSee ol li").eq(0).attr("id")) != undefined) {
            var idCheck = $("#placesToSee ol li").eq(0).attr("id");
            if (idCheck == 'gone') {
                $('#gone').remove();
            }

        }



        var html = "";
        html = "<li class='locationList' id='location" + index + "'><i style='margin:5px 20px 5px 5px;' class='fa fa-arrows-v' aria-hidden='true'></i>" + marker.title + "<button id='locationButton" + index + "' style='position:absolute; right:5px; top:4px;' class='btn btn-xs btn-danger'>X</button></li>";
        $("#placesToSee ol").append(html);
      }
    }
  }

  function showError(text){
    alert(text);
  }

var infoBubbles = [];


  //runs the google directions api to form a route
  //More detail to be addded to allow greater user flexibility (walking/driving/bus etc)
  function getDirections(directionsService, directionsDisplay) {
      "use strict";

      directionsDisplay.setMap(map);
      // StartHere.close();

      var locationsRoutFinalOrder = [];
      var numberOfItems = $("#placesToSee li").size();
      for(var i =0; i < numberOfItems; i++){
        var locationIndex = $("#placesToSee li").eq(i).attr("id");
        // var coordinatesItem = coordinates[i]
        locationsRoutFinalOrder.push(coordinatesItem[locationIndex]);
      }

      if (locationsRoutFinalOrder.length < 2) {
          directionsPressed = false;
          showError("You need to add at least two locations");
          return;
      }
      var directions = new google.maps.DirectionsService();
      // build array of waypoints (excluding start and end)
      var waypts = [];
      var end = locationsRoutFinalOrder.length - 1;
      var dest = locationsRoutFinalOrder[end];

      if (document.getElementById("roundTrip").checked) {
        end = locationsRoutFinalOrder.length;
        dest = locationsRoutFinalOrder[0];
      }

      for (var i = 1; i < end; i++) {
        // if (locationsRoutFinalOrder[i].lat != undefined && locationsRoutFinalOrder[i].lng != undefined){
          waypts.push({ location: {lat:locationsRoutFinalOrder[i].lat, lng:locationsRoutFinalOrder[i].lng} });
        // }
      }

      var journeyStyle = $("#journeyStyle").val();
      var travelMode = google.maps.TravelMode.WALKING;
      if (journeyStyle === "driving") {
          travelMode = google.maps.TravelMode.DRIVING;
      }
      else if (journeyStyle === "cycling") {
          travelMode = google.maps.TravelMode.BICYCLING;
      }

      var fastestRoute = document.getElementById("fastestRoute").checked;

      var startPosition = new google.maps.LatLng(locationsRoutFinalOrder[0].lat, locationsRoutFinalOrder[0].lng)
        $.each(infoBubbles, function( index ) {
             infoBubbles[index].close();
             });
            infoBubbles = [];
      
      
      directionsService.route({
          origin: startPosition,
          destination: dest,
          waypoints: waypts,
          travelMode: travelMode,
          optimizeWaypoints: fastestRoute
      }, function(response, status) {
            if (status === 'OK') {
              directionsDisplay.setDirections(response);
              directionsDisplay.setOptions( { suppressMarkers: true } );
              var distance = 0;
              var time = 0;
              var route = response.routes[0];

               var StartHere = new InfoBubble({
                 content: ("<p id='startHeading' style='padding:6px; z-index:-9;'>Start Here</p>"),
                 position: startPosition,
                 shadowStyle: 1,
                 padding: 0,
                 borderRadius: 5,
                 backgroundColor: '#ff6c4d',
                 border: 'none',
                 arrowSize: 10,
                 zIndex: 0,
                 disableAutoPan: true,
                 arrowPosition: 30,
                 backgroundClassName: 'transparent',
                 arrowStyle: 1,
                 fontSize: '6em',
                 fontFamily: "'Titillium Web', sans-serif"
               });
        
                   StartHere.open(map, this);
                   infoBubbles.push(StartHere);

               for (var i = 0; i < route.legs.length; i++) {
                   var section = route.legs[i];
                   distance += section.distance.value;

                   time += section.duration.value;

                   var z = i+1;
                   var step;
                   step = Math.floor((response.routes[0].legs[i].steps.length)/2);
                   var miniInfo = new InfoBubble({
                     position: response.routes[0].legs[i].steps[step].end_location,
                     content: ("<div id='sectionInfoHeading'>Leg " + z + ": " + markersRout[i].title + " TO<br>" + markersRout[i+1].title +   "</div><div id='sectionInfoContent'>" + "<br> Distance:" + response.routes[0].legs[i].distance.text + "<br> Time:" + response.routes[0].legs[i].duration.text + " </div>"),
                     shadowStyle: 1,
                     padding: 0,
                     borderColor: '#59d',
                     borderRadius: 5,
                     arrowSize: 10,
                     borderWidth: 3,
                     disableAutoPan: true,
                     arrowPosition: 30,
                     backgroundClassName: 'transparent',
                     arrowStyle: 4
                   });
                   miniInfo.open(map);
                   infoBubbles.push(miniInfo);
                 }
              $("#distance").html("Total distance: " + getDistance(distance) + ", ");
              $("#duration").html("total duration: " + Math.round(time / 60) + " minutes");
            }
          });
   }

  function getDistance(distance) {
      "use strict";
          return Math.round(distance / 100) / 10 + " km";
  }


/*
 *   This block of code Generates the Markers for the locations stored at interestLocations object
 *   It also set the HTML code that goes in the infowindow for each marker
 *   Finally it contains the clearMarkers function to reset the markers when the user changes interest or city
 */

 var infoWindows = [];

 function setMarker(city, interest, place){
    // Sets a marker into the map
    var markerDesign;
    if (interest === "landmarks") {
        markerDesign = 'images/landmarks.png';
    }
    else if (interest === "museums") {
        markerDesign = 'images/museums.png';
    }
    else if (interest === "historical") {
        markerDesign = 'images/historical.png';
    }
    // creates marker object
    var marker = new google.maps.Marker({
      position: place.location,
      title: place.name,
      map: map,
      icon: markerDesign
    });

    // gets the name of the location and removes the spaces to make it be according to the object loadedImages
    var placeNameTrim = place.name.replace(/\s+/g, '');

    // creates an object with all the markers of an interest
    markers.push(marker);

    // Formats the content of the infowindow for each marker
    if(loadedImages[city][interest][placeNameTrim] != undefined){
      var contentString = '<div style="width:280px;"><h3 id="info-window-title" class="text-center">' + place.name +
      '</h3><div style="display: inline-block; position: relative;"><img id="info-window-image" src="' + loadedImages[city][interest][placeNameTrim][0] +
      '" style="position:relative; left:50%;width: 150px; height: 200px; display:inline-block; padding-bottom:10px;"/><i id="refreshImage" class="fa fa-refresh" aria-hidden="true" style="position: absolute; top:5px; right:-70px;cursor: pointer; display: block; background-color: white; border-radius: 50%; padding: 4px 4px 2px 4.7px;color: #59d;"></i></div>' +
      loadedArticle[city][interest][placeNameTrim][0].articleText.substring(0, 200) + '...</div>' +
      '<button style="margin:10px 5px 5px 0px;" id="addLocation" class="btn btn-primary">Add Location</button>' +
      '<button style="margin:10px 5px 5px 0px;" id="moreInformation" class="btn btn-primary" data-toggle="modal" data-target="#myModal">More Info</button>';
      var contentStringModal = '<div style="display: inline-block; position: relative;"><img id="modal-info-window-image" src="' +
      loadedImages[city][interest][placeNameTrim][0] +
      '" style="width: 150px; height: 200px; display: inline-block;"/><i id="modal-refreshImage" class="fa fa-refresh" aria-hidden="true" style="position: absolute; top:5px; right:5px;cursor: pointer; display: block; background-color: white; border-radius: 50%; padding: 4px 4px 2px 4.7px;color: #59d;"></i></div>';
      } else {
      var contentString = '<div style="width:300px;"><h3 id="info-window-title" class="text-center">' + place.name +
      '</h3>' + '<p style="margin: 10px; font-size: .8em; text-align: left;">Sorry! We were unable to find images of this location at Trove.</p></div><button style="margin:10px 5px 5px 0px;" id="addLocation" class="btn btn-primary">Add Location</button><button style="margin:10px 5px 5px 0px;" id="moreInformation" class="btn btn-primary" data-toggle="modal" data-target="#myModal">More Info</button>';
      var contentStringModal = "<p style='width:150px;'>Sorry! We were unable to find images of this location at Trove.</p>"
    }

    // Creates the infowindow for the marker
    var infoWindow = new google.maps.InfoWindow({
      content: contentString
    });

    // Adds a listener to the marker of the location
    google.maps.event.addListener(marker,'click', function(){
      // passes the map and marker to the infowindow obeject

      $.each(infoWindows, function( index ) {
          infoWindows[index].close();
      });
      infoWindows = [];
      articlesNumber = 0;
      currentArticleIndex = 0;

      infoWindow.open(map, this);
      infoWindows.push(infoWindow);

      // adds a listener to addLocation button in the infowindow
      google.maps.event.addDomListener(document.getElementById('addLocation'), 'click', function(){
        directionsDisplay.setMap(map);
        infoWindow.close();
        markersRout.push(marker);

        // shows the navigation bar for places to visit
        $("#placesToSee").fadeIn(1200);

        // set modal to show on first time
        if (locationTableModalSeen == false) {
        setTimeout(function(){$('#locationTablePrompt').modal('show');}, 1000);
            locationTableModalSeen = true;
        }
        // makes the navbar draggable
        $("#placesToSee").draggable();
        buildPoints(marker);

        if (directionsPressed == true) {
          getDirections(directionsService, directionsDisplay);
        };
      });

      google.maps.event.addDomListener(document.getElementById('moreInformation'), 'click', function(){

        // set modal to show on first time
        if (moreInfoModalSeen == false) {
        setTimeout(function(){$('#moreInfoPrompt').modal('show');}, 1000);
            moreInfoModalSeen = true;
        }

          $("#infoTitle").empty();
          $("#infoPage").empty();
          $("#infoTitle").html(place.name);
          $("#modal-images").html(contentStringModal);
          var articles = loadedArticle[city][interest][placeNameTrim];
          if(articles != undefined){
            $("#infoPage").append(loadedArticle[city][interest][placeNameTrim][0].articleText);
            articlesNumber = loadedArticle[city][interest][placeNameTrim].length;
            currentCity = city;
            currentInterest = interest;
            currentLocation = placeNameTrim;
            if (articlesNumber > 0){
              $("#nextArticle").show();
            }
          } else {
            $("#infoPage").append("<p>Sorry! We were unable to find articles related to this location in Trove.</p>");
          }
      });
       //closes all info windows if clicked anywhere on the map
      google.maps.event.addListener(map, "click", function(event) {
        infoWindow.close();
      });
      // adds listener to the refreshImage button in the infowindow
      if(loadedImages[city][interest][placeNameTrim] != undefined){
        google.maps.event.addDomListener(document.getElementById('refreshImage'), 'click', function(){
          var imageArray = loadedImages[city][interest][placeNameTrim];
          var maxIndex = imageArray.length;
          var imageIndex = getRandom(maxIndex);
          document.getElementById("info-window-image").src = loadedImages[city][interest][placeNameTrim][imageIndex];
        });
      }

    }); // closes addListener(marker)
  }//closes setMarker

  var articlesNumber = 0;
  var currentArticleIndex = 0;
  var currentCity = "";
  var currentInterest = "";
  var currentLocation = "";

  $(document).on("click", "#modal-refreshImage", function(){
    var imageArray = loadedImages[currentCity][currentInterest][currentLocation];
    var maxIndex = imageArray.length;
    var imageIndex = getRandom(maxIndex);
    document.getElementById("modal-info-window-image").src = loadedImages[currentCity][currentInterest][currentLocation][imageIndex];
  });

  $("#nextArticle").click(function(){
    if(currentArticleIndex <= articlesNumber) {
      currentArticleIndex += 1;
      if (currentArticleIndex == articlesNumber){
        $("#nextArticle").hide();
      }else {
        $("#infoPage").html(loadedArticle[currentCity][currentInterest][currentLocation][currentArticleIndex].articleText);
        $("#previousArticle").css("display", "inline-block");
      }
    }
  });

  $("#previousArticle").click(function(){
    if (currentArticleIndex > 0){
      currentArticleIndex -= 1;
      $("#infoPage").html(loadedArticle[currentCity][currentInterest][currentLocation][currentArticleIndex].articleText);
      $("#nextArticle").css("display", "inline-block");
      if(currentArticleIndex <= 0) {
        $("#previousArticle").hide();
      }
    }
  });

  function getRandom(maxIndex){
    // returns a random number between 0 and the number of items in the city.interest.location object
    var imageIndex = Math.floor(Math.random() * maxIndex);
    return imageIndex;
  }

  function set_places(city, interest, places){ // gets an object places
    // loops through the locations of an interest in the interestLocations

    // changes the draggable and scrollwheel of the map object
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



  //****************************************************************************//
  /*                      Finishes the block to set markers                     */
  //****************************************************************************//

  // opens a new window to share our website in facebook.com
  $(".social-f").click(function(){
    window.open("https://www.facebook.com/sharer/sharer.php?u=www.google.com");
  });

  // opens a new window to share our website in plus.google.com
  $(".social-g").click(function(){
    window.open("https://plus.google.com/share?url=www.google.com");
  });

  // opens a new window to share our website in twitter.com
  $(".social-t").click(function(){
    window.open("https://twitter.com/home?status=I%20found%20this%20amazing%20site,%20take%20a%20look%20at%20it!%20www.google.com");
  });

  // makes the items in the locations navbar sortable
  $( "#locationsToSee" ).sortable();
  $( "#locationsToSee" ).disableSelection();

  $("#locationsToSee").on("click", "[id^=locationButton]", function(){
      var value = this.id
      value = value.replace(/locationButton/, '');
      var locationIndex = "location" + value;
        if (locationMarkersItem[locationIndex].icon == 'images/landmarksSELECTED.png') {
            locationMarkersItem[locationIndex].setIcon('images/landmarks.png');
        }
      else
        if (locationMarkersItem[locationIndex].icon == 'images/historicalSELECTED.png') {
            locationMarkersItem[locationIndex].setIcon('images/historical.png');
        }
      else
        if (locationMarkersItem[locationIndex].icon == 'images/museumsSELECTED.png') {
            locationMarkersItem[locationIndex].setIcon('images/museums.png');
        }

    var markerLng = coordinatesItem[locationIndex].lng;
    delete coordinatesItem[locationIndex];
    delete locationMarkersItem[locationIndex];
    removeLng(routMarkers, markerLng);

    document.getElementById(locationIndex).remove();

    if (directionsPressed == true) {
    getDirections(directionsService, directionsDisplay);
    }
    if (($("#placesToSee ol li").length) == 0) {
    var allGone = "";
    allGone = "<li id='gone'>Please add some more locations.</li>";
    $("#placesToSee ol").append(allGone);
      }
  });

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
    // initAutocomplete();
    // geocoder = new google.maps.Geocoder();
}
// var geocoder;
// //Geocoding
// if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(successFunction);
// }
// //Get the latitude and the longitude;
// function successFunction(position) {
//     var latGEO = position.coords.latitude;
//     var lngGEO = position.coords.longitude;
//     codeLatLng(latGEO, lngGEO)
// }
//
// function codeLatLng(latGEO, lngGEO) {
//
//     var latlng = new google.maps.LatLng(latGEO, lngGEO);
//     geocoder.geocode({'latLng': latlng}, function(results, status) {
//       if (status == google.maps.GeocoderStatus.OK) {
//         if (results[1]) {
//         //find country name
//              for (var i=0; i<results[0].address_components.length; i++) {
//             for (var b=0;b<results[0].address_components[i].types.length;b++) {
//
//             //there are different types that might hold a city admin_area_lvl_1 usually does in come cases looking for sublocality type will be more appropriate
//                 if (results[0].address_components[i].types[b] == "administrative_area_level_2") {
//                     //this is the object you are looking for
//                     city= results[0].address_components[i];
//                     break;
//                 }
//                 if (results[0].address_components[i].types[b] == "political") {
//                     //this is the object you are looking for
//                     state= results[0].address_components[i];
//                     break;
//                 }
//                 if (results[0].address_components[i].types[b] == "country") {
//                     //this is the object you are looking for
//                     country= results[0].address_components[i];
//                     break;
//                 }
//             }
//         }
//         //city data
//         document.getElementById("autocomplete").value = city.short_name + ", " + state.long_name +", " + country.long_name;
//         //$("#autocomplete").attr("placeholder", city.short_name + ", " + state.long_name +", " + country.long_name);
//         }
//       }
//     });
//   } // closes codeLatLng
