import { View } from "./View.js";
import icons from 'url:../../img/icons.svg'


class paginationView extends View {
_parentEl = document.querySelector('.pagination')



_rednerMarkup(){
this._currentPage = this._data.currentPage
this._numberOfPages = Math.ceil(this._data.results.length / this._data.resultsPerPage) //div number of results / results per page "10"

// state 1 -> page 1 and there is no other pages
if (this._currentPage === 1 && this._numberOfPages === 1){
    return  ``
}
// state 2 -> page 1 and there is other pages
if (this._currentPage === 1 && this._numberOfPages > 1){
    return this._paginatiostSteps('goNext')
}
// state 3 -> last page
if (this._currentPage === this._numberOfPages && this._numberOfPages > 1){
    return this._paginatiostSteps('goPrev')
}
// state 4 -> between other pages
if (this._currentPage > 1 && this._currentPage < this._numberOfPages){
   return  `${this._paginatiostSteps('goNext')} ${ this._paginatiostSteps('goPrev')}`
}}

_paginatiostSteps(step){
  //using dataset to the page we at after moveing to next or prev
if(step === 'goNext') return ` <button data-goto="${this._currentPage + 1}" class="btn--inline pagination__btn--next">
  <span>Page ${this._currentPage + 1}</span>
  <svg class="search__icon">
    <use href=" ${icons}#icon-arrow-right"></use>
  </svg>
</button>`
 
if(step ==='goPrev') return `<button data-goto="${this._currentPage - 1}" class="btn--inline pagination__btn--prev">
<svg class="search__icon">
  <use href="${icons}#icon-arrow-left"></use>
</svg>
<span>Page ${this._currentPage - 1}</span>
</button>`
}

_addHandlerClick(handler){
this._parentEl.addEventListener('click',function(e){
 const target = e.target.closest(".btn--inline")  
  if(!target) return
  const goToPage = +target.dataset.goto
  
  handler(goToPage)
})

}
}
export default new paginationView()