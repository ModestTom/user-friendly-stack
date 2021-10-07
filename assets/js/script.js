var homeInput = $('#search_input');
var searchInput = document.querySelector('#search-box');

var rootUrl = 'https://api.stackexchange.com/2.3';
var data = "";

function getResults(formData) {

    searchResults = `${rootUrl}/search?order=desc&sort=relevance&intitle=${formData}&site=stackoverflow`;

    fetch(searchResults)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            displaySearches(data);
        })
};

function displaySearches(data) {
    window.location.href = "/search.html";
    console.log(data.items);
    $("#questions").children("h3").text("Questions");
    console.log($("#questions").children("h3").text);
    /*for (let index = 0; index < data.items.length; index++) {
        var questionTitle = data.items[index].title;
        var questionId = data.items[index].question_id;
        var question = $(`<div id="${questionId}">`)
        $("#question-list").text("Questions");
        $(question).text(questionTitle);
        $("#question-list").append(question);

        //TODO: append titles to question-list section as buttons
        //TODO: create event listener for said buttons to display question details
    };*/
};

$("#home_form").submit(function(event) {
    event.preventDefault();
    data = $("#home_input").val();
    console.log(data);
    getResults(data);
});

$("#search-form").submit(function(event) {
    event.preventDefault();
    data = $("#searchbox").val();
    getResults(data);
});

//Create event listener for contact section