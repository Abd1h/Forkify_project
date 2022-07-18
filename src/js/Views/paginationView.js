import { View } from "./View.js";
import icons from 'url:../../img/icons.svg'


class paginationView extends View {
_parentEl = document.querySelector('.pagination')


// _rednerMarkup(data = ''){
    
// return this._genMarkupPaginaiton()

// }

_rednerMarkup(){
   
const {currentPage} = this._data
const numberOfPages = Math.ceil(this._data.results.length / this._data.resultsPerPage) //div number of results / results per page "10"

console.log(numberOfPages)
// state 1 -> page 1 and there is no other pages
if (currentPage === 1 && numberOfPages === 1){
    return  ``
}
// state 2 -> page 1 and there is other pages
if (currentPage === 1 && numberOfPages > 1){
    return  `
  <button data-goto="${currentPage + 1}" class="btn--inline pagination__btn--next">
    <span>Page ${currentPage + 1}</span>
    <svg class="search__icon">
      <use href=" ${icons}#icon-arrow-right"></use>
    </svg>
  </button>`
}
// state 3 -> last page
if (currentPage === numberOfPages && numberOfPages > 1){
    return  `<button data-goto="${currentPage + 1}" class="btn--inline pagination__btn--prev">
    <svg class="search__icon">
      <use href="${icons}#icon-arrow-left"></use>
    </svg>
    <span>Page ${currentPage - 1}</span>
  </button>
`
}
// state 4 -> between other pages
if (currentPage > 1 && currentPage < numberOfPages){
    return  `<button data-goto="${currentPage + 1}" class="btn--inline pagination__btn--prev">
    <svg class="search__icon">
      <use href="${icons}#icon-arrow-left"></use>
    </svg>
    <span>Page ${currentPage - 1}</span>
  </button>
  <button data-goto="${currentPage -1}" class="btn--inline pagination__btn--next">
    <span>Page ${currentPage + 1}</span>
    <svg class="search__icon">
      <use href=" ${icons}#icon-arrow-right"></use>
    </svg>
  </button>`
}

}

_addHandlerClick(handler){
this._parentEl.addEventListener('click',function(e){
 const target = e.target.closest(".btn--inline")  
  if(!target) return
  const goToPage = +target.dataset.goto
  console.log(goToPage)
  handler(goToPage)
})

}
}
export default new paginationView()