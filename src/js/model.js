import { getJSON, sendJSON } from './helpers';
import { API_URL, RESULTS_PER_PAGE, API_KEY } from './config';

export const state = {
  recipe: {},
  search: {
    query: [], // in case we need the info
    results: [],
    resultsPerPage: RESULTS_PER_PAGE,
    currentPage: 1,
  },
  bookmarks: [],
};
// convert API object to js rules source_url --> sourceUrl
const createRecipeObject = function (recipeObject) {
  return {
    cookingTime: recipeObject.cooking_time,
    img: recipeObject.image_url,
    ingredients: recipeObject.ingredients,
    sourceUrl: recipeObject.source_url,
    title: recipeObject.title,
    id: recipeObject.id,
    publisher: recipeObject.publisher,
    servings: recipeObject.servings,
    ...(recipeObject.key && { key: recipeObject.key }), // adding new key besed on a condition
  };
};

//loading and store recipe data from API
export const loadRecipe = async function (id) {
  try {
    const { recipe: recipeObject } = await getJSON(`${API_URL}/${id}`); //using helpers function
    state.recipe = createRecipeObject(recipeObject);

    //if the recipe in the bookmarks[] we went to load it bookmarked "with bookmark logo"
    const checkBookmarkedRecipe = state.bookmarks.some(
      bookmark => bookmark.id === id
    );
    if (checkBookmarkedRecipe) state.recipe.bookmark = true;
  } catch (err) {
    throw err;
  }
};
// ------------------search functionality ---------------------
export const loadSearchResult = async function (query) {
  try {
    state.search.query = query;
    // 1) fetching using helper funciton
    const searchResult = await getJSON(
      `${API_URL}?search=${query}&key=${API_KEY}` //adding ?key=${API_KEY} so it loads all results including our added recipes
    );
    // 2) creating new object for our state from the fetched array
    state.search.results = searchResult.recipes.map(recipe => {
      return {
        img: recipe.image_url,
        title: recipe.title,
        id: recipe.id,
        publisher: recipe.publisher,
        ...(recipe.key && { key: recipe.key }),
      };
    });
  } catch (err) {
    throw err;
  }
};

// - displaying only 10 results per page "this function gonna be a parameter for "resultView.render"
export const getResultForPage = function (page = state.search.currentPage) {
  state.search.currentPage = page; //knowing what page we at

  const start = (page - 1) * state.search.resultsPerPage;
  const end = page * state.search.resultsPerPage;
  return state.search.results.slice(start, end);
};

// - change serverings for recipe
export const updateServings = function (newServings) {
  const { ingredients } = state.recipe;

  // formula for increasing the quantity --> NewServings * quantity / old servings
  ingredients.forEach(ing => {
    ing.quantity = (newServings * ing.quantity) / state.recipe.servings;
  });
  // updating the servings in the state object
  state.recipe.servings = newServings;
};

// - adding bookmark
export const addBookmark = function (recipe) {
  //1) Pushing new booked recipe
  state.bookmarks.push(recipe);
  //2) bookmark the current recipe
  if (recipe.id === state.recipe.id) state.recipe.bookmark = true;

  //3) store bookmarks new state
  storage();
};

export const removeBookmark = function (id) {
  //1) getting the recipe index from the bookmarks array to remove it
  const index = state.bookmarks.findIndex(recipe => (recipe.id = id));
  // 1) remove and set the recipe.bookmark back to false
  state.bookmarks.splice(index, 1);
  if (id === state.recipe.id) state.recipe.bookmark = false;

  //3) store bookmarks new state
  storage();
};

//storing data "bookmarks"
const storage = function () {
  window.localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
};

// getting data out of localStorage
const getStorageBookmarks = function () {
  const data = window.localStorage.getItem('bookmarks');
  if (!data) return;
  state.bookmarks = JSON.parse(data);
};
getStorageBookmarks();

//in case we need it
const clearStorage = function () {
  localStorage.clear('bookmarks');
};
// clearStorage();

// uploading new recipe functionality
export const uploadNewRecipe = async function (newRecipe) {
  // 1) convert to array - loop over it - return new one with wanted info
  let ingredients = Object.entries(newRecipe).filter(
    entry => entry[0].startsWith('ingredient') && entry[1] !== ''
  );
  //now it looks like this --> ['ingredient-1', '0.5,kg,Rice']
  // 2) working on index[1] to return object with those values
  ingredients = ingredients
    .map(ing => ing[1].replaceAll(' ', '').split(','))
    .map(ing => {
      return {
        quantity: ing[0] ? +ing[0] : null,
        unit: ing[1] ? ing[1] : '',
        description: ing[2],
      };
    });

  // finial object that will be send to the API
  const sendRecipe = {
    cooking_time: +newRecipe.cookingTime,
    image_url: newRecipe.image,
    ingredients,
    publisher: newRecipe.publisher,
    servings: +newRecipe.servings,
    source_url: newRecipe.sourceUrl,
    title: newRecipe.title,
  };

  // 3) sending data to the API and get the recipe back
  const { recipe } = await sendJSON(`${API_URL}?key=${API_KEY}`, sendRecipe);
  state.recipe = createRecipeObject(recipe);
  // 4) bookmarked our new uploaded recipe
  addBookmark(state.recipe);
};
