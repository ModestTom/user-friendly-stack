function get_joke_of_the_day() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
	 if (this.readyState == 4 && this.status == 200) {
        var jokeData = JSON.parse(this.responseText);
        var jokeOTD = jokeData.contents.jokes;
        console.log(jokeOTD);
        $("#search").after('<div class="joke" id="joke-of-the-day"></div>');
        $("#joke-of-the-day").append(`<h2>${jokeOTD[0].description}</h2>`);
        $("#joke-of-the-day").append(`<h3>${jokeOTD[0].joke.title}</h3>`);
        $("#joke-of-the-day").append(`<p>${jokeOTD[0].joke.text}</p>`);
	 }
    };
    xhttp.open("GET", "https://api.jokes.one/jod?category=animal", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.setRequestHeader("X-JokesOne-Api-Secret", "YOUR API HERE");
    xhttp.send();
}

get_joke_of_the_day()

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

//TODO: Submit handler for contact section

