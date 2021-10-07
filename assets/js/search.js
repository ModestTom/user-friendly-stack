var rootUrl = 'https://api.stackexchange.com/2.3';

function getResults(formData) {

    searchResults = `${rootUrl}/search?order=desc&sort=relevance&intitle=${formData}&site=stackoverflow`;

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
    var data = localStorage.getItem("questions");
    data = JSON.parse(data);
    console.log(data);
    var questionList = $("#question-list");
    questionList.append("<h3>Questions</h3>");
    for (let index = 0; index < data.items.length; index++) {
        //console.log(data.items[index]);
        var questionTitle = data.items[index].title;
        var questionId = data.items[index].question_id;
        var question = $(`<button class="question-button" id="${questionId}">`)
        $(question).text(questionTitle);
        $("#question-list").append(question);
    };
    console.log($("#question-list"));
};

function displayQuestions(title, id) {
    console.log(title);
    console.log(id);
};

//TODO: event listener for buttons to display info when clicked (FIX IT)
$(".question-button").click(function() {
    console.log("Testing please work");
    var qTitle = $(this).text();
    console.log(qTitle);
    var qId = $(this).attr("id");
    console.log(qId);
    displayQuestions(qTitle, qId);
});

$("#search-form").submit(function(event) {
    event.preventDefault();
    data = $("#search-input").val();
    getResults(data);
});

displaySearches();