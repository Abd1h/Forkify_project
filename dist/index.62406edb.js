//index.html in dist folder has no acces to your
const recipeContainer = document.querySelector(".recipe");
const timeout = function(s) {
    return new Promise(function(_, reject) {
        setTimeout(function() {
            reject(new Error(`Request took too long! Timeout after ${s} second`));
        }, s * 1000);
    });
};
// https://forkify-api.herokuapp.com/v2
///////////////////////////////////////
//render recipe function 
const renderRecipe = function(recipeObj) {
    const markup = ` 
<figure class="recipe__fig">
<img src="src/img/test-1.jpg" alt="Tomato" class="recipe__img" />
<h1 class="recipe__title">
  <span>${recipeObj.title}</span>
</h1>
</figure>

<div class="recipe__details">
<div class="recipe__info">
  <svg class="recipe__info-icon">
    <use href="src/img/icons.svg#icon-clock"></use>
  </svg>
  <span class="recipe__info-data recipe__info-data--minutes">${recipeObj.cookingTime}</span>
  <span class="recipe__info-text">minutes</span>
</div>
<div class="recipe__info">
  <svg class="recipe__info-icon">
    <use href="src/img/icons.svg#icon-users"></use>
  </svg>
  <span class="recipe__info-data recipe__info-data--people">${recipeObj.servings}</span>
  <span class="recipe__info-text">servings</span>

  <div class="recipe__info-buttons">
    <button class="btn--tiny btn--increase-servings">
      <svg>
        <use href="src/img/icons.svg#icon-minus-circle"></use>
      </svg>
    </button>
    <button class="btn--tiny btn--increase-servings">
      <svg>
        <use href="src/img/icons.svg#icon-plus-circle"></use>
      </svg>
    </button>
  </div>
</div>

<div class="recipe__user-generated">
  <svg>
    <use href="src/img/icons.svg#icon-user"></use>
  </svg>
</div>
<button class="btn--round">
  <svg class="">
    <use href="src/img/icons.svg#icon-bookmark-fill"></use>
  </svg>
</button>
</div>

<div class="recipe__ingredients">
<h2 class="heading--2">Recipe ingredients</h2>
<ul class="recipe__ingredient-list">

${recipeObj.ingredients.map((ing)=>{
        return ` <li class="recipe__ingredient">
    <svg class="recipe__icon">
      <use href="src/img/icons.svg#icon-check"></use>
    </svg>
    <div class="recipe__quantity">${ing.quantity}</div>
    <div class="recipe__description">
      <span class="recipe__unit">${ing.unit}</span>
    ${ing.description}
    </div>
  </li>`;
    }).join("")}
 
</ul>
</div>

<div class="recipe__directions">
<h2 class="heading--2">How to cook it</h2>
<p class="recipe__directions-text">
  This recipe was carefully designed and tested by
  <span class="recipe__publisher">${recipeObj.publisher}</span>. Please check out
  directions at their website.
</p>
<a
  class="btn--small recipe__btn"
  href="http://thepioneerwoman.com/cooking/pasta-with-tomato-cream-sauce/"
  target="_blank"
>
  <span>Directions</span>
  <svg class="search__icon">
    <use href="src/img/icons.svg#icon-arrow-right"></use>
  </svg>
</a>
</div> `;
    recipeContainer.insertAdjacentHTML("afterbegin", markup);
};
//search functionalty
const fetchRecipe = async function() {
    try {
        const respons = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886`);
        if (!respons.ok) throw new Error(`something went wrong with getting your recipe`);
        const data = await respons.json();
        console.log(data.data);
        let recipeObject = data.data.recipe;
        //making new object with js rules source_url --> sourceUrl
        recipeObject = {
            cookingTime: recipeObject.cooking_time,
            img: recipeObject.image_url,
            ingredients: recipeObject.ingredients,
            sourceUrl: recipeObject.source_url,
            title: recipeObject.title,
            id: recipeObject.id,
            publisher: recipeObject.publisher,
            servings: recipeObject.servings
        };
        recipeContainer.innerHTML = "";
        renderRecipe(recipeObject);
        console.log(recipeObject);
    } catch (err) {
        alert(err);
    }
};
fetchRecipe();

//# sourceMappingURL=index.62406edb.js.map
