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
    console.log(questionList);
    questionList.append("<h3>Questions</h3>");
    for (let index = 0; index < data.items.length; index++) {
        console.log("For loop");
        console.log(data.items.length);
        var questionTitle = data.items[index].title;
        var questionId = data.items[index].question_id;
        var question = $(`<button id="${questionId}">`)
        $(question).text(questionTitle);
        $("#question-list").append(question);

        //TODO: append titles to question-list section as buttons
        //TODO: create event listener for said buttons to display question details
    };
};

$("#search-form").submit(function(event) {
    event.preventDefault();
    data = $("#searchbox").val();
    getResults(data);
});

displaySearches();