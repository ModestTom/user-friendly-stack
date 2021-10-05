var searchForm = document.querySelector('#search-form')
var searchInput = document.querySelector('#search-input');

$(searchForm).on("submit", getResults);