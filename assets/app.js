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
	});
}

//MAIN PROCESS
//==============================================
$("#search-btn").click( function(event) {
	event.preventDefault();

	//get searched value
	queryTerm = $("#search").val().trim();
	console.log(queryTerm);

	//add in the search term
	var newURL = queryURL + "&q=" + queryTerm;
	runQuery(10, newURL);

	//get the number of records
	numResults = $("#num-records").val();

	//get the start year and end year
	startYear = $("#start-year").val().trim() ;
	endYear = $("end-year").val().trim();

	if(parseInt(startYear) {
		startYear = startYear + "0101";
		// add the date info to the url
		newURL = newURL + "&begin_date=" + startYear;
	})

	if(parseInt(endYear) {
		endYear = endYear + "0101";
		// add the date info to the url
		newURL = newURL + "&begin_date=" + endYear;
	})
});
//get inputs and convert to variables
//use the vars to run AJAX call
//break down objects into usable fields
//dynamically generate html content
