var rootUrl = 'https://api.stackexchange.com/2.3';

function getResults(formData) {

    var searchResults = `${rootUrl}/search?order=desc&sort=relevance&intitle=${formData}&site=stackoverflow`;

    fetch(searchResults)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            if (localStorage.getItem("questions")) {
                localStorage.clear();
                localStorage.setItem("questions", JSON.stringify(data));
            } else {
                localStorage.setItem("questions", JSON.stringify(data));
            }
            displaySearches();
        })
};

function displaySearches() {
    var data = JSON.parse(localStorage.getItem("questions"));
    console.log(data);
    var questionList = $("#question-list");
    var questionButton = $(".question-button");
    for (let index = 0; index < data.items.length; index++) {
        var questionTitle = data.items[index].title;
        questionButton[index].setAttribute("id", index);
        $(questionButton[index]).text(questionTitle);
        $(questionList).append(questionButton[index]);
    };
};

function fetchQuestions(title, id) {
    $("#question-text").text(title);
    var data = JSON.parse(localStorage.getItem("questions"));
    console.log(data.items[id]);
    var answerId = data.items[id].accepted_answer_id;
    var answerLink = `https://stackoverflow.com/a/${answerId}`;
    var questionLink = data.items[id].link;
    console.log(questionLink);
    console.log(answerLink);
    $("#question-description").append(`<a target="_blank" href="${questionLink}" >${questionLink}</a>`);
    $("#answer-description").append(`<a target="_blank" href="${answerLink}" >${answerLink}</a>`);
};

$(".question-button").click(function() {
    $("#question-list").attr("style", "display: none");
    $("#question-details").attr("style", "display: block");
    var qTitle = $(this).text();
    var qId = $(this).attr("id");
    fetchQuestions(qTitle, qId);
});

$("#search-form").submit(function(event) {
    event.preventDefault();
    $("#question-details").attr("style", "display: none");
    $("#question-list").attr("style", "display: flex");
    data = $("#search-input").val();
    getResults(data);
});

displaySearches();