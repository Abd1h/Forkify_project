//routen stuff
import "core-js/stable";
import "regenerator-runtime/runtime";
//------------------------------------------

import * as model from "./model.js"
import recipeView from './Views/recipeView.js';
import searchView from './Views/searchView.js'

// https://forkify-api.herokuapp.com/v2

////////////////////////////////////////////////////////


//// - control rendering recipes functionality
const controlRecipes = async function () {
  try {
    //getting id from url
    const id = window.location.hash.slice(1)
    if(!id) return //so it dont keep loading when we dont have any hash

//loading recipe with that id
recipeView.renderSpiner() // showing a spiner before fetching the data
await model.loadRecipe(id) // ALLLLLL async funciton will return a promise SOOOO await for it ********* ******* **********

//render the recipe to the DOM
recipeView.render(model.state.recipe)

}catch (err) {
 
    recipeView.renderError()
  }
}
;

//// - control the search functionality
const controlSearch = async function (){

// 1) geting the query 
const query =searchView.getQuery();
if(!query) return;
// 2) loading search result
await model.loadSearchResult(query); 
  
  }
  
console.log('is this working???')
console.log('yessssssssssssss')
//////////////event listeners belong to the DOM "views model"
/////////////implmeanting that using "publisher subscriber pattren"

// //even listen to the change of the url & when the page laod with an recipe
// ['hashchange','load'].forEach(ev=>window.addEventListener(ev,fetchRecipe) ) //NEWWWWWWWWWWWWWWW //NEWWWWWWWWWWWWWWW


const init = function(){
  recipeView.addHandlerRender(controlRecipes)
  searchView.addHandlerSearch(controlSearch)
  }
  init()


