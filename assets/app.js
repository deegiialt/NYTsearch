//VARIABLES
//==============================================

var apiKey = "17d2cfedf41d4f29a356ed5d008336c9";

//search parameters
var queryTerm	 = "";
var numResults	 = 0;
var startYear	 = 0;
var endYear		 = 0;

//URL base
var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" + apiKey;

//article counter (need for for-loops)
var articleCounter = 0;

//FUNCTIONS
//==============================================

function runQuery(numArticles, queryURL) {

	//AJAX function
	$.ajax({
		url: queryURL, 
		method: "GET"
	}).then(function(NYTData) {
			$("#wellSection").empty();

			for(var i = 0; i < numArticles; i++) {
				var searchResults = NYTData.response.docs[i];
				
				//if it exists 
				if(searchResults.headline !=="null") {
					console.log(searchResults.headline.main);
					$("#article-well-" + i).append("<h3>"searchResults.headline.main "</h3>");
				}

				if(searchResults.byline.original && searchResults.byline) {
					console.log(searchResults.byline.original);
					$("#article-well-" + i).append("<h5>"searchResults.byline.original "</h5>");	
				}

				$("#article-well-" + i).append("<h5>"searchResults.section_name "</h5>");
				$("#article-well-" + i).append("<h5>"searchResults.pub_date "</h5>");
				$("#article-well-" + i).append("<h5>"searchResults.web_url "</h5>");
				
				//debugging

				console.log(searchResults.section_name);
				console.log(searchResults.pub_date);
				console.log(searchResults.web_url);

				//dump to HTML
				var wellSection = $("<div>");
				wellSection.addClass("well");
				wellSection.attr('id', 'articleWell-', + i);
				$("#wellSection").append(wellSection);

				//attach to wells
				$("#articleWell-" + i).append();
			}

		//logging to console
		console.log(queryURL);
		console.log(numArticles);
		console.log(NYTData);
	})
}

//MAIN PROCESS
//==============================================
$("#search-btn").click( function(event) {
	event.preventDefault();

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
		newURL = newURL + "&begin_date=" + endYear;
	}
		runQuery(numResults, newURL);
});

//clear button
$('#clear-btn').click(function() {
	var queryTerm	 = "";
	var numResults	 = 0;
	var startYear	 = 0;
	var endYear		 = 0;
})
