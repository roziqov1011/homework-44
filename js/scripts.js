// DOM elements
var elSearchForm = $_(".js-search-form");
var elTitleInput = $_(".js-search-form__title-input", elSearchForm);
var elRatingInput = $_(".js-search-form__rating-input", elSearchForm);
var elGenreSelect = $_(".js-search-form__genre-select", elSearchForm);
var elSortSelect = $_(".js-search-form__sort-select", elSearchForm);
var elSearchResults = $_(".search-results");

var elResultTemplate = $_("#search-result-template").content;


// Sort categories and render at HTML file
const createGenreSelectOptions = () => {
  let movieCategories = [];

  normalizedMovies.forEach((movie) => {
    movie.categories.forEach((category) => {
      if (!movieCategories.includes(category)) {
        movieCategories.push(category);
      }
    });
  });

  movieCategories.sort();

  var elOptionsFragment = document.createDocumentFragment();
  movieCategories.forEach(function (category) {
    var elCategoryOption = createElement("option", "", category);
    elCategoryOption.value = category.toLowerCase();

    elOptionsFragment.appendChild(elCategoryOption);
  });
  elGenreSelect.appendChild(elOptionsFragment);
};

createGenreSelectOptions();


var renderMovies = (movies, searchRegex) => {
  elSearchResults.innerHTML = "";

  var searchResultFragment = document.createDocumentFragment();

  movies.forEach((movie) => {
    var movieElement = elResultTemplate.cloneNode(true);

    $_(".movie__title", movieElement).textContent = movie.title;
    // $_(".movie__poster", movieElement).src = movie.smallImage;

    if (searchRegex.source === "(?:)") {
      $_(".movie__title", movieElement).textContent = movie.title;
    } else {
      $_(".movie__title", movieElement).innerHTML = movie.title.replace(searchRegex, `<mark class='px-0'>${movie.title.match(searchRegex)}</mark>`);
    };

    $_(".movie__year", movieElement).textContent = movie.year;
    $_(".movie__ranting", movieElement).textContent = movie.imdbRating;
    $_(".movie-trailer-link", movieElement).href = movie.trailer;
 
    searchResultFragment.appendChild(movieElement);
  });

  elSearchResults.appendChild(searchResultFragment);
};


//SORT RANTING
const sortObjectRanting = (array) => {
  return array.sort((a, b) => {
    if (a.imdbRating > b.imdbRating) {
      return 1;
    } else if (a.imdbRating < b.imdbRating) {
      return -1;
    }
    return 0;
  })
}
// SORT AZ
const sortObjectAZ = (array) => {
  return array.sort((a, b) => {
    if (a.title > b.title) {
      return 1;
    } else if (a.title < b.title) {
      return -1;
    }
    return 0;
  })
}
//SORT YEAR
const sortObjectYear = (array) => {
  return array.sort((a, b) => {
    if (a.year > b.year) {
      return 1;
    } else if (a.year < b.year) {
      return -1;
    }
    return 0;
  })
}

const sortSearchResults = (results, sortType) => {
  if (sortType == "az") {
    sortObjectAZ(results);
  } 
  else if (sortType == "za") {
    sortObjectAZ(results).reverse();
  }
  else if(sortType == "year_desc"){
    sortObjectYear(results).reverse();
  }
  else if(sortType == "year_asc"){
    sortObjectYear(results);
  }
  else if(sortType == "rating_desc"){
    sortObjectRanting(results).reverse()
  }
  else if(sortType == "rating_asc"){
    sortObjectRanting(results);
  }
}


// findMovie

const findMovie = (title, minRating, genre) => {

  return normalizedMovies.filter((movie) => {
    var genreRegEx = new RegExp(genre , "gi")
    var doesMatchCategory = genre === "all" || movie.categories.join(" ").match(genreRegEx);

    return (
      movie.title.match(title) && movie.imdbRating >= minRating && doesMatchCategory
    );
  });
}


elSearchForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  var searchTitle = elTitleInput.value.trim();
  var movieTitleRegex = new RegExp(searchTitle, "gi");
  var minimumRanting = Number(elRatingInput.value);
  var genre = elGenreSelect.value;
  
  var sorting = elSortSelect.value;

  var searchResult = findMovie(movieTitleRegex, minimumRanting, genre);

  console.log(movieTitleRegex, minimumRanting, genre);
  var test = sortSearchResults(searchResult, sorting)

  renderMovies(searchResult, movieTitleRegex);
})