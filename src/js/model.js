import { getJSON } from "./helpers"
import { API_URL } from "./config";

export const state = {
    recipe :{},
    search: {
      query: [] // in case we need the info
      ,results :{}
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
   throw err
}
}
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
  alert(err)
}

}
