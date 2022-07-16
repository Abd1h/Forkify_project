import { getJSON } from "./helpers"
import { API_URL ,RESULTS_PER_PAGE } from "./config";

export const state = {
    recipe :{},
    search: {
      query: [] // in case we need the info
      ,results :[]
      ,resultsPerPage : RESULTS_PER_PAGE
      ,currentPage : 1
      
    }
}

//loading and store recipe data from API
export const loadRecipe =async function (id){
try{
     const {recipe :recipeObject }= await getJSON(`${API_URL}/${id}`); //using helpers function

      //making new object with js rules source_url --> sourceUrl
      state.recipe ={
        cookingTime: recipeObject.cooking_time,
        img: recipeObject.image_url,
        ingredients : recipeObject.ingredients,
        sourceUrl : recipeObject.source_url,
        title : recipeObject.title,

        publisher: recipeObject.publisher,
        servings : recipeObject.servings
   }
  
}catch(err){
   throw err}}
// ------------------search functionality ---------------------
export const loadSearchResult = async function (query){
try{
   state.search.query = query;
// 1) fetching using helper funciton
const searchResult = await getJSON (`${API_URL}?search=${query}`)  
// 2) creating new object for our state from the fetched array
state.search.results = searchResult.recipes.map((recipe)=>{
   return {
   img: recipe.image_url,
   title: recipe.title,
   id: recipe.id,
   publisher: recipe.publisher,
 }})


}catch(err){
  throw err
}}

// - displaying only 10 results per page "this function gonna be a parameter for "resultView.render"
export const getResultForPage= function(page = state.search.currentPage){ 
  
state.search.currentPage = page //knowing what page we at 

const start  = (page - 1) * state.search.resultsPerPage
const end = page * state.search.resultsPerPage

return state.search.results.slice(start,end)
}

