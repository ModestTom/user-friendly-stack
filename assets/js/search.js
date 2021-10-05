var rootUrl = 'https://api.stackexchange.com/2.3';

var searchInput = document.querySelector('#search-input');
var newSearch = document.querySelector('#searchText')

function getResults(event) {
    event.preventDefault();
    query = searchInput.value.trim();

    searchResults = `${rootUrl}/search?order=desc&sort=relevance&intitle=${query}&site=stackoverflow`;

    fetch(searchResults)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            displaySearches(data);
        })
};

function displaySearches(url) {
    for (let index = 0; index < url.length; index++) {
        var questionTitle = url[index].title;
        var pEl = $('<p>');
        pEl.text(questionTitle);
        $(newSearch).append(pEl);
        
    };
};

$(newSearch).on("submit", getResults);