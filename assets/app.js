//VARIABLES
//==============================================

var apiKey = "17d2cfedf41d4f29a356ed5d008336c9";

//search parameters
var queryTerm	 = "";
var numResults	 = 0;
var startYear	 = 0;
var endYear	 = 0;

//URL base
var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" + apiKey;

//article counter 
var articleCounter = 0;

//FUNCTIONS
//==============================================

function runQuery(numArticles, queryURL) {
	//AJAX function
	$.ajax({
		url: queryURL, 
		method: "GET"
	}).then(function(NYTData) {
			for(var i = 0; i < numArticles; i++) {
				articleCounter++;
				//dump to HTML
				var wellSection = $("<div>");
				wellSection.addClass("well");
				wellSection.attr('id', 'article-well-' + articleCounter);
				$("#well-section").append(wellSection);

				//store shorthand to search results
				var searchResults = NYTData.response.docs[i];
				
				//if it exists 
				if(searchResults.headline !=="null") {
					$("#article-well-" + articleCounter).append("<h3>" + searchResults.headline.main + "</h3>");
				}

				if(searchResults.byline && searchResults.byline.original) {
					$("#article-well-" + articleCounter).append("<h5>" + searchResults.byline.original + "</h5>");	
				}

				if(searchResults.section_name) {
					$("#article-well-" + articleCounter).append("<h5>" + searchResults.section_name + "</h5>");
				}

				//append to new div wellSection
				$("#article-well-" + articleCounter).append("<h5>" + searchResults.pub_date + "</h5>");
				$("#article-well-" + articleCounter).append("<a href='" + searchResults.web_url + "' target='_blank'>" + searchResults.web_url + "</a>");
			}
	})
};

//MAIN PROCESS
//==============================================
$("#search-btn").click( function(event) {
	event.preventDefault();

	articleCounter = 0;

	$('#well-section').empty();

	//get searched value
	queryTerm = $("#search").val().trim();

	//add in the search term
	var newURL = queryURL + "&q=" + queryTerm;
	

	//get the number of records
	numResults = $("#num-records").val();

	//get the start year and end year
	startYear = $("#start-year").val().trim() ;
	endYear = $("#end-year").val().trim();

	//only get years if they're numbers
	if(parseInt(startYear)) {
		startYear = startYear + "0101";
		// add the date info to the url
		newURL = newURL + "&begin_date=" + startYear;
	}

	if(parseInt(endYear)) {
		endYear = endYear + "0101";
		// add the date info to the url
		newURL = newURL + "&end_date=" + endYear;
	}
		runQuery(numResults, newURL);
});

//clear button
$('#clear-btn').click(function() {
	articleCounter = 0;
	$('#well-section').empty();
});
