export const state = {
    recipe :{}
}

//loading and store recipe data from API
export const loadRecipe =async function (id){
try{
       //fetching recipe
       const respons = await fetch(
        `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`
      );
   
      const data = await respons.json();
     if (!respons.ok)
        throw new Error(`something went wrong with getting your recipe`);
  
  
      const recipeObject = data.data.recipe
  
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
    alert(err)
}
}