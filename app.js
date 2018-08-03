var search, range, start, end, queryURL;



$("#clearResultsBtn").on("click", function () {
    $("#results").empty();
});

$(document).on("click", "#searchBtn", function (event) {
    event.preventDefault();

    start = $("#searchStartYear").val()
    end = $("#searchEndYear").val()

    if (start === "") {
        start = "00000101";
    } else {
        start = $("#searchStartYear").val() + "0101";
        console.log("went to start else")
    }

    if (end === "") {
        // end = "30000101";
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1; //January is 0!
        var yyyy = today.getFullYear();
        end = toString(yyyy + mm + dd);
        
        console.log("today is " + end);

    } else {
        end = $("#searchEndYear").val() + "1231";
        console.log("went to end else");
        
    }

    search = $("#userSearchTerm").val();
    range = $("#numberOfRecords").val();
    // start = $("#searchStartYear").val() + "0101";
    // end = $("#searchEndYear").val() + "1231";
    queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=fc95978666c547148b6c203afe174c81&q=" + search + "&page=" + range + "&begin_date=" + start + "&end_date=" + end;

    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function (response) {

            for (var i = 0; i < response.response.docs.length; i++) {
                var info = response.response.docs[i];

                var date = response.response.docs[0].pub_date;
                date = date.substr(0, 10)

                var newDiv = $("<div>").addClass("new-articel");
                var headline = $("<div>").addClass("new-headline").text(info.headline.main);
                var snippet = $("<div>").addClass("new-snippet").text(info.snippet);
                var date = $("<div>").addClass("new-date").text(date);
                var source = $("<div>").addClass("new-source").text(info.source);
                var link = $("<a href=" + info.web_url + '></a>').addClass("new-link").text(info.web_url);

                newDiv.append("<hr>", headline, snippet, date, source, link);
                $("#results").append(newDiv);

            };
        });
});