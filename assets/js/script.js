var homeInput = $('#search_input');
var question = document.querySelector('#question-list')

var searchInput = document.querySelector('#search-box');
var searchForm = document.querySelector('#search-form');

var rootUrl = 'https://api.stackexchange.com/2.3';

var homeData = "";

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

$("#home-form").submit(function(event) {
    event.preventDefault();
    homeData = $("#search_input").val();
    console.log(homeData);
    getResults(homeData);
    
});

$(searchForm).submit(function(event) {
// copy layout of home form
});