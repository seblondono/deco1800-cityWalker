<!doctype html>
 <html>
 	<head>
 		<title>DECO1800/7180 Resources & Examples</title>
 		<link rel="stylesheet" id="twentythirteen-fonts-css" href="//fonts.googleapis.com/css?family=Source+Sans+Pro%3A300%2C400%2C700%2C300italic%2C400italic%2C700italic%7CBitter%3A400%2C700&amp;subset=latin%2Clatin-ext" type="text/css" media="all">
 		<script type="text/javascript" src="http://deco1800.uqcloud.net/wp-includes/js/jquery/jquery.js?ver=1.11.1"></script>
 		<script type="text/javascript" src="http://deco1800.uqcloud.net/wp-includes/js/jquery/jquery-migrate.min.js?ver=1.2.1"></script>
 		<script type="text/javascript" src="https://code.jquery.com/ui/1.11.2/jquery-ui.min.js"></script>
 		<meta charset="utf-8">
 		 <meta name="viewport" content="width=device-width, initial-scale=1.0">
 		<link rel="stylesheet" href="http://deco1800.uqcloud.net/wp-content/themes/twentythirteen/style.css">
 	</head>
 	<body>
 	<div class="site-main" id="main">
 			<nav id="navbar" class="navbar" role="navigation">
 				<ul class=" nav-menu">
 					<li><a href="http://deco1800.uqcloud.net">Back to main site</a></li>
 				</ul>
 			</nav> 
 			<div class="entry-content wide">			<h2>TROVE API Example</h2>
 				    <p>This example takes a keyword via a form input & searches the newspaper articles on Trove. Once a list of matching articles is found, new searches are performed to retrieve article specific information. You can use Chrome or Firefox developer tools to view the source code - it has been commented to describe what is happening. You can find an example searching by date at <a href="http://deco1800.uqcloud.net/useDate.php">deco1800.uqcloud.net/useDate.php</a>
 				    </p>
 				    <p>To recreate this on your zone, you will first need to acquire an <a href="http://trove.nla.gov.au/general/api">API key from Trove</a> for use in searches. Due to quota limits on API calls, you will need to use your own key (rather than the one this example uses).</p>
 				    <p>Read the <a href="http://trove.nla.gov.au/general/api-technical" target="_blank">Trove API documentation</a> for more information on constructing searches.</p>
 				    <p>Try changing the search parameters in the code - search on a different record type, or use indexes to filter results.</p>
 				    <p>This site has a useful introduction to working with the Trove API - <a href="http://stumblingfuture.wordpress.com/2014/03/11/an-introduction-to-the-trove-api/">stumblingfuture.wordpress.com</a></p>
 					<h4>Search Trove</h4>
 					<form action="#" id="searchTrove" role="form">
 						<p>
 				        <label class="control-label col-lg-3" for="searchTerm">Search Term</label>&nbsp;<input id="searchTerm" type="text" />&nbsp;
 						<label class="control-label col-lg-3" for="sortBy">Sort By</label>&nbsp;
 				          <select id="sortBy">
 				              <option>dateasc</option>
 				              <option>datedesc</option>
 				              <option>relevance</option>
 				            </select>
 				         </p>
 						<p>See <a href="http://trove.nla.gov.au/general/api-technical#indexes" target="_blank">Trove API documentation</a> for supported facets</p>
 				         <button type="submit" class="btn btn-default" id="searchbtn">Search</button>
 				    </form>
 					<hr />
 					<h4>Search Results</h4>
 					<div id="search_progress" class="progress">
 					  <div class="progress-bar progress-bar-striped active bar"  role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 1%">
 					  </div>
 					</div>
 				    <div id="output"></div>
 				    <a href="http://trove.nla.gov.au/" target="_blank"><img alt="Powered by Trove" src="http://trove.nla.gov.au/general-test/files/2012/01/API-dark.png"/></a>
 				</div>
 			</div>
 		<footer class="site-footer"><div class=" site-info">DECO1800/7180 Design Computing Studio One</div></footer>

 		<script type="text/javascript">
 	// Replace the apiKey variable with your own from Trove - required for conducting searches using the Trove API
 	var apiKey = "jsk1qqntnrj7qbvf";;
 	(function($){
 	$(document).ready(function(){
 		$('div#search_progress').hide();
 		// action that occurs when the form is submitted - either through hitting the enter key or by clicking on Search
 		$("form#searchTrove").submit(function() {

 	    	$('#search_progress').show(); //show the progress bar as a search has been initiated
 	    	/**
 	    	* Start Ref:
 	    	* Below snippet sourced from http://stackoverflow.com/a/10007309
 	    	* Adding a progress bar to let users know that a search is under way
 	    	* Below animates the progress bar by increasing its width every 800 milliseconds
 	    	*/
 	    	var progress = setInterval(function() {
 			    var $bar = $('.bar');

 			    if ($bar.width()>=400) {
 			        clearInterval(progress);
 			        $('.progress').removeClass('active');
 			    } else {
 			        $bar.width($bar.width()+40);
 			    }}, 800);
 			/** End Ref */

 		    // Get the values from our search form
 		    var searchTerm = $("#searchTerm").val();
 		    // Set the search zone - alternatively you can set this using a form input
 		    var searchZone = "newspaper";
 		    var sortBy = $("#sortBy").val();

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
 		    var url = "http://api.trove.nla.gov.au/result?key="
 		        + apiKey + "&encoding=json&zone=" + searchZone
 		        + "&sortby=" + sortBy
 		        + "&q=" + searchTerm + "&callback=?";

 		    /*
 		    * 	Perform the search using jQuery's getJSON method
 		    *	Requires the search URL
 		    */
 		    console.log(url);

 		    $.getJSON(url, function(data) {
 		    	// clear the HTML div that will display the results
 		        $('#output').empty();
 		        $('#search_progress').hide(); //hide the search bar because the search has been completed

 		        if (data.response.zone[0].records.article){
 		        	// For each result returned, call getArticleText to retrieve the transcribed text
 		            $.each(data.response.zone[0].records.article, getArticleText);
 		            // Output the search results in JSON format to the console, use developer tools to see how the data is structured.
 		            console.log(data);
 		        }else{
 			        $('#output').append("<p>No search results found for"+searchTerm+"</p>");
 		        }
 				});
 			});

 			/**
 			* There is an issue with TROVE applications where the first search will result in nothing being returned
 			* To get around this, we perform an API call once after the page has loaded.
 			* Remaining calls return successfully (providing there are results to be returned
 			**/
 			var urlFirst = "http://api.trove.nla.gov.au/result?key="
 		        + apiKey + "&encoding=json&zone=newspaper&q=brisbane&callback=?";
 			$.getJSON(urlFirst, function(data){
 				if(data.response.zone[0].records.article){
 					$('#output').append("<p>Ready...</p>");
 				}
 			});

 		});


 function getArticleText(index, item){
 	/*
 	* Construct the search URL
 	* Using the item ID, set the inclusions for the result - using the include parameter
 	*/
 	var articleURL = "http://api.trove.nla.gov.au/newspaper/"
 	+ item.id
 	+ "?key="+apiKey
 	+ "&include=articletext,pdf&encoding=json&callback=?";
 	// Pull what values you can from the original result - article title & URL
 	var title = item.heading;
 	var url = item.troveUrl;

 	// Perform the search
 	$.getJSON(encodeURI(articleURL), function(data){
 		// Create a div element
 		var info = document.createElement("div");
 		// Give it the Bootstrap class panel
 		$(info).addClass("panel");
 		// Add the article title as a link contained in a div
 		$(info).append("<div class='panel-heading'><a href='"
 			+url+"' alt='Link to Trove Record'>"+title
 			+"</a></div>");
 		// Add the article text returned in the result to a new div and construct the link to the printable PDF document from the article ID.
 		$(info).append("<div class='panel-body'>"
 			+data.article.articleText
 			+"<a href='http://trove.nla.gov.au/ndp/del/printArticlePdf/"
 			+data.article.id
 			+"' alt='Link to PDF article'>PDF of Article</a></div>");
 			//Add the result to the search results element
 		$("#output").append($(info));
 	});
 }

 }(jQuery));

 </script>

 	</body>
 </html>
