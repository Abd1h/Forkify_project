//routen stuff
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { SEC_CLOSE_FORM } from './config.js';
//------------------------------------------
import * as model from './model.js';
import recipeView from './Views/recipeView.js';
import searchView from './Views/searchView.js';
import resultView from './Views/resultView.js';
import paginationView from './Views/paginationView.js';
import bookmarksView from './Views/bookmarksView.js';
import addRecipeView from './Views/addRecipeView.js';
// https://forkify-api.herokuapp.com/v2

////////////////////////////////////////////////////////

//// - control rendering recipes functionality
const controlRecipes = async function () {
  try {
    //getting id from url
    const id = window.location.hash.slice(1);
    if (!id) return; //so it dont keep loading when we dont have any hash

    // +) update result view with marking the selected recipe
    resultView.update(model.getResultForPage(1));
    // +) update bookmarks list with selected recipe
    bookmarksView.update(model.state.bookmarks);

    //1) loading recipe with that id
    recipeView.renderSpiner(); // showing a spiner before fetching the data
    await model.loadRecipe(id); // ALLLLLL async funciton will return a promise SOOOO await for it ********* ******* **********

    //2) render the recipe to the DOM
    recipeView.render(model.state.recipe);
  } catch (err) {
    console.error(err);
    recipeView.renderError();
  }
};
//// - control the search functionality
const controlSearch = async function () {
  try {
    // 1) geting the query
    const query = searchView.getQuery();
    if (!query) return;
    // 2) loading search result
    resultView.renderSpiner();
    await model.loadSearchResult(query);
    // 3) render search result
    model.getResultForPage();

    resultView.render(model.getResultForPage(1)); // passing 1 so it always starts with page 1 even if the prev recpie was on page 5..
    paginationView.render(model.state.search); // rendering paginate
  } catch (err) {
    console.log(err);
  }
};

// - control pagination functionalty
const controlPaginate = function (goToPage) {
  resultView.render(model.getResultForPage(goToPage)); // new page results
  paginationView.render(model.state.search); //  rendering NEW paginate
};

// - contorl serveings
const controlServings = function (numOfServings) {
  model.updateServings(numOfServings);
  recipeView.update(model.state.recipe);
};

// - contorl bookmarks
const controlBookmakrs = function () {
  // adding with the whole recipe data and removing using id only ******** ********** ********
  //1) adding or removing bookmarks
  if (!model.state.recipe.bookmark) model.addBookmark(model.state.recipe);
  else model.removeBookmark(model.state.recipe.id);

  // 2) update the changes to the UI "bookmark logo fill"
  recipeView.update(model.state.recipe);
  // 3) render booked recipe to the bookmark list
  bookmarksView.render(model.state.bookmarks);
};

//- control uploading new recipe
const controlUploadNewRecipe = async function (newRecipe) {
  try {
    addRecipeView.renderSpiner();
    // 1) sending data to be filtered in the model push to the state
    await model.uploadNewRecipe(newRecipe);
    //+ rerender bookmarks list after adding the newRecipe to bookmarks
    bookmarksView.render(model.state.bookmarks);

    //2) rendering recipe
    recipeView.render(model.state.recipe);

    //3) render success message then close form after 1sec
    addRecipeView.renderMessage();
    setTimeout(function () {
      addRecipeView.toggleForm();
    }, SEC_CLOSE_FORM * 1000);
  } catch (err) {
    console.log(err);
    addRecipeView.renderError();
  }
};

//SIDE NOTES//
//////////////event listeners belong to the DOM "views model"
/////////////implmeanting that using "publisher subscriber pattren"

// listen to the change of the url & when the page laod with a recipe
// ['hashchange','load'].forEach(ev=>window.addEventListener(ev,fetchRecipe) ) //NEWWWWWWWWWWWWWWW //NEWWWWWWWWWWWWWWW

// init fucntion that will fire event Listeners from the Views
const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerServings(controlServings);
  recipeView.addHandlerBookmark(controlBookmakrs);
  searchView.addHandlerSearch(controlSearch);
  paginationView.addHandlerClick(controlPaginate);
  //--------------------------------------------------------
  // this is to render bookmakr list to the dom, so when we update in line 27
  // if we dont, update function will try to insert new dom element and cuase error
  bookmarksView.render(model.state.bookmarks);
  //--------------------------------------------------------
  addRecipeView.addHandlerLoadRecipe(controlUploadNewRecipe);
};
init();
