var homeInput = $('#search_input');
var searchInput = document.querySelector('#search-box');
var question = document.querySelector('#question-list')

var rootUrl = 'https://api.stackexchange.com/2.3';
var data = "";

function getResults(formData) {
    console.log(`${formData} the form data`);

    searchResults = `${rootUrl}/search?order=desc&sort=relevance&intitle=${formData}&site=stackoverflow`;
    
    console.log(searchResults);

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
    document.location.href = "search.html";
    console.log(data.items);
    for (let index = 0; index < data.items.length; index++) {
        var questionTitle = data.items[index].title;
        console.log(questionTitle);
        //append what need is needed
    };
};

$("#home_form").submit(function(event) {
    event.preventDefault();
    data = $("#search_input").val();
    console.log(data);
    getResults(data);
});

$("#search-form").submit(function(event) {
    event.preventDefault();
    data = $("#searchbox").val();
    getResults(data);
});