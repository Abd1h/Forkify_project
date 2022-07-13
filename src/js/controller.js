//routen stuff
import "core-js/stable";
import "regenerator-runtime/runtime";
//------------------------------------------

import * as model from "./model.js"
import RecipeView from './Views/recipeView.js';


// https://forkify-api.herokuapp.com/v2

////////////////////////////////////////////////////////


//search functionalty
const controlRecipes = async function () {
  try {
    //getting id from url
    const id = window.location.hash.slice(1)
    if(!id) return //so it dont keep loading when we dont have any hash

//loading recipe with that id
RecipeView.renderSpiner() // showing a spiner before fetching the data
await model.loadRecipe(id) // ALLLLLL async funciton will return a promise SOOOO await for it ********* ******* **********

//render the recipe to the DOM
RecipeView.render(model.state.recipe)

}catch (err) {
 
    RecipeView.renderError()
  }
}
;


//////////////event listeners belong to the DOM "views model"
/////////////implmeanting that using "publisher subscriber pattren"

// //even listen to the change of the url & when the page laod with an recipe
// ['hashchange','load'].forEach(ev=>window.addEventListener(ev,fetchRecipe) ) //NEWWWWWWWWWWWWWWW //NEWWWWWWWWWWWWWWW


const init = function(){
  RecipeView.addHandlerRender(controlRecipes)
  }
  init()
  