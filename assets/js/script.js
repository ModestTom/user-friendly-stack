//TODO: Incorporate JokesAPI
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
            if (localStorage.getItem("questions")) {
                localStorage.clear();
                localStorage.setItem("questions", JSON.stringify(data));
            } else {
                localStorage.setItem("questions", JSON.stringify(data));
            }
            document.location.href = "search.html";
        })
};

$("#home_form").submit(function(event) {
    event.preventDefault();
    data = $("#home_input").val();
    console.log(data);
    getResults(data);
});

//Create event listener for contact section