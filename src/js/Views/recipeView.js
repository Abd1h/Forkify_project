//index.html in dist folder has no acces to your src img folder so we need to import that to show our icons
// import icons from '../img/icons.svg' //parcel 1 way but in parcel 2 we need one more step for img and voice kinda folders
import icons from 'url:../../img/icons.svg'
import {Fraction} from 'fractional'
import { View } from './View.js'


class RecipeView extends View {
_parentEl = document.querySelector('.recipe')
_errorMessage = 'haveing trouble loading your recipe! , please try again'
addHandlerRender(subFunction){
  ['hashchange','load'].forEach(ev=>window.addEventListener(ev,subFunction) )
}


_rednerRecipe = function(recipeObj){

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
    ${recipeObj.ingredients.map(ing=>this._genMarkUpIngeridents(ing)).join('')}
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
    this._clear()
    this._parentEl.insertAdjacentHTML('afterbegin',markup) 
}

_genMarkUpIngeridents(ing){
  //using fraction to convert number from 0.5 --> 1/2
    return` <li class="recipe__ingredient">
       <svg class="recipe__icon">
         <use href="${icons}#icon-check"></use>
       </svg>
       <div class="recipe__quantity">${ing.quantity? new Fraction(ing.quantity).toString():''}</div> 
       <div class="recipe__description">
         <span class="recipe__unit">${ing.unit}</span>
       ${ing.description}
       </div>
     </li>`
   
   
}
}
export default new RecipeView() //creating the object here then export--> if you export the class then create the object there, it will create a copy every time you use its methods or whatever 