import { getJSON } from "./helpers"
import { API_URL } from "./config";

export const state = {
    recipe :{}
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
        id : recipeObject.id,
        publisher: recipeObject.publisher,
        servings : recipeObject.servings
   }
  
}catch(err){
   throw err
}
}
// ------------------search functionality ---------------------
export const loadSearchResult = async function (query = 'pizza' ){
try{
const SearchResult = await getJSON (`https://forkify-api.herokuapp.com/api/v2/recipes?search=pizza`)
}catch(err){
   throw err
}

}
