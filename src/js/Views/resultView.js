import { View } from "./View.js";

class ResultView extends View {
  _errorMessage = `Couldn't find any result !! please try again`
_parentEl = document.querySelector('.search-results')

// - same name as the function in "recipeView" for the parent class "view" render both using the same 'render' function
_rednerRecipe(results){
 const markup= results.map(result =>this._genMarkupResult(result)).join('')
//map will return array of html markups and using join here to join them and make a string
    this._clear()
    this._parentEl.insertAdjacentHTML('afterbegin',markup) 
}

// - generate markup in a separate function for aesthetics lol
_genMarkupResult(result){

return `<li class="preview">
<a class="preview__link " href="#${result.id}">
  <figure class="preview__fig">
    <img src="${result.img}" alt="Test" />
  </figure>
  <div class="preview__data">
    <h4 class="preview__title">${result.title}</h4>
    <p class="preview__publisher">${result.publisher}</p>
  
  </div>
</a>
</li>
`
}



}
export default new ResultView()