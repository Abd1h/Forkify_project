//routen stuff
import "core-js/stable";
import "regenerator-runtime/runtime";
//------------------------------------------
console.log('for ggggreerrrrrreel')
import * as model from "./model.js"
import recipeView from './Views/recipeView.js';
import searchView from './Views/searchView.js'
import resultView from './Views/resultView.js'
import paginationView from "./Views/paginationView.js";


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
try{
// 1) geting the query 
const query =searchView.getQuery();
if(!query) return;
// 2) loading search result
resultView.renderSpiner()
await model.loadSearchResult(query); 
// 3) render search result
model.getResultForPage()

resultView.render(model.getResultForPage())

paginationView.render(model.state.search) // rendering paginate



}catch(err){
  console.log(err)
}
 }

// - control pagination functionalty 
const controlPaginate = function(goToPage){

resultView.render(model.getResultForPage(goToPage)) // new page results
paginationView.render(model.state.search) //  rendering NEW paginate
}
console.log('hellow')
  //SIDE NOTES//
//////////////event listeners belong to the DOM "views model"
/////////////implmeanting that using "publisher subscriber pattren"

// listen to the change of the url & when the page laod with a recipe
// ['hashchange','load'].forEach(ev=>window.addEventListener(ev,fetchRecipe) ) //NEWWWWWWWWWWWWWWW //NEWWWWWWWWWWWWWWW

// init fucntion that will fire event Listeners from the Views
const init = function(){
  recipeView.addHandlerRender(controlRecipes)
  searchView.addHandlerSearch(controlSearch)
  paginationView._addHandlerClick(controlPaginate)
  }
  init()


