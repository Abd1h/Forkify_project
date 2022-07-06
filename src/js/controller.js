//routen stuff
import "core-js/stable";
import "regenerator-runtime/runtime";
//------------------------------------------
//index.html in dist folder has no acces to your src img folder so we need to import that to show our icons
// import icons from '../img/icons.svg' //parcel 1 way but in parcel 2 we need one more step for img and voice kinda folders
import icons from 'url:../img/icons.svg'
import * as model from "./model.js"
console.log(model)
const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2

////////////////////////////////////////////////////////
//render spiner funcion
const renderSpiner = function (parentEl){
  parentEl.innerHTML = '';
  const markup =`
  <div class="spinner">
          <svg>
            <use href="${icons}#icon-loader"></use>
          </svg>
        </div>
  `
  
  parentEl.insertAdjacentHTML('afterbegin',markup)
}

//render recipe function 
const renderRecipe = function(recipeObj){

const markup = ` 
<figure class="recipe__fig">
<img src="${recipeObj.img}" alt="${recipeObj.title}" class="recipe__img" />
<h1 class="recipe__title">
  <span>${recipeObj.title}</span>
</h1>
</figure>

<div class="recipe__details">
<div class="recipe__info">
  <svg class="recipe__info-icon">
    <use href="${icons}#icon-clock"></use>
  </svg>
  <span class="recipe__info-data recipe__info-data--minutes">${recipeObj.cookingTime}</span>
  <span class="recipe__info-text">minutes</span>
</div>
<div class="recipe__info">
  <svg class="recipe__info-icon">
    <use href="${icons}#icon-users"></use>
  </svg>
  <span class="recipe__info-data recipe__info-data--people">${recipeObj.servings}</span>
  <span class="recipe__info-text">servings</span>

  <div class="recipe__info-buttons">
    <button class="btn--tiny btn--increase-servings">
      <svg>
        <use href="${icons}#icon-minus-circle"></use>
      </svg>
    </button>
    <button class="btn--tiny btn--increase-servings">
      <svg>
        <use href="${icons}#icon-plus-circle"></use>
      </svg>
    </button>
  </div>
</div>

<div class="recipe__user-generated">
  <svg>
    <use href="${icons}#icon-user"></use>
  </svg>
</div>
<button class="btn--round">
  <svg class="">
    <use href="${icons}#icon-bookmark-fill"></use>
  </svg>
</button>
</div>

<div class="recipe__ingredients">
<h2 class="heading--2">Recipe ingredients</h2>
<ul class="recipe__ingredient-list">

<!-- NEW ---------------------- -->
${recipeObj.ingredients.map(ing=>{

 return` <li class="recipe__ingredient">
    <svg class="recipe__icon">
      <use href="${icons}#icon-check"></use>
    </svg>
    <div class="recipe__quantity">${ing.quantity}</div>
    <div class="recipe__description">
      <span class="recipe__unit">${ing.unit}</span>
    ${ing.description}
    </div>
  </li>`

}).join('')}
<!-- NEW ----------------------  -->

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
    <use href="${icons}#icon-arrow-right"></use>
  </svg>
</a>
</div> `

recipeContainer.insertAdjacentHTML('afterbegin',markup)
}


//search functionalty
const fetchRecipe = async function () {
  try {
    //getting id from url
    const id = window.location.hash.slice(1)
    if(!id) return //so it dont keep loading when we dont have any hash

    //loading recipe with that id
model.loadRecipe(id)

//render the recipe to the UI
   
    }catch (err) {
    alert(err);
  }
}
;

//even listen to the change of the url & when the page laod with an recipe
['hashchange','load'].forEach(ev=>window.addEventListener(ev,fetchRecipe) ) //NEWWWWWWWWWWWWWWW //NEWWWWWWWWWWWWWWW
