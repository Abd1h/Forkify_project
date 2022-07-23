import icons from 'url:../../img/icons.svg'


export class View {
_data;
_errorMessage = 'something went wrong with getting your recipe';


    render(data){
      //checking if data is null OR its an array and its empty --> 'no data'
      if (!data || (Array.isArray(data) && data.length === 0) ) return  this.renderError() //this function will work cuz its in the same line **********

      // 1) setting data
        this._data = data
      // 2) getting html markup
      const markup = this._rednerMarkup(data)  
      // 3) clear html container then insert markup to the dom
      this._clear() 
      this._parentEl.insertAdjacentHTML('afterbegin',markup)
    }
    
    //small allgorithm to updata a part of the dom and not rerender the whole thing
    update(data){
     // 1) setting data with the new updated version
      this._data = data
      // 2) creating the new markup
      const newMarkup = this._rednerMarkup(data)  
      // 3) the two steps below is to get a [nodelist] out of the markup 'dom content'
      const newDom = document.createRange().createContextualFragment(newMarkup) // ********* ********* *********
      const newElement = Array.from( newDom.querySelectorAll('*'))// ********* ********* *********
     // 4) getting [nodelist] out of the current displayed markup 'dom content'
      const curElement = Array.from( this._parentEl.querySelectorAll('*'))
     //NNNOTESSS: 
     // curEL = the current HTML content in the dom , newEl = same HTML content with new updates or changes like "people serving number"
     // converting nodelist to array so we could loop over them and comper the curEl with newEl using *********el.isEqualNode(seond el)********
     // 
     
      newElement.forEach((newEl, i) => {
        const curEl = curElement[i]
 // goal: change sigle parts of the current element only if its different from the New element
// we went to check for differences in the TextContent of the dom el, and note for difference between its parants 
 // newEl.firstChild  will return the actual text that we want to comper

 //1) changing Text content
 if (!curEl.isEqualNode(newEl) && newEl.firstChild?.nodeValue.trim() !== '') //using trim cuz spaces fuck thing up
 curEl.textContent = newEl.textContent  
//1) changing attributes so data-value reset to the new value

if (!curEl.isEqualNode(newEl)){ 
const arttributesOfNewEl = Array.from(newEl.attributes)

arttributesOfNewEl.forEach(arrt =>{
  curEl.setAttribute(arrt.name , arrt.value)
})
}
      });
    }



renderSpiner = function (){
    const markup =`
      <div class="spinner">
              <svg>
                <use href="${icons}#icon-loader"></use>
              </svg>
            </div>
      `
      this._clear()
     this._parentEl.insertAdjacentHTML('afterbegin',markup)
    }
    
renderError (errorMessage = this._errorMessage){
    
      const markup = `<div class="error">
      <div>
        <svg>
          <use href="${icons}#icon-alert-triangle"></use>
        </svg>
      </div>
      <p>${errorMessage}</p>
    </div>`
    
    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin',markup)
    }
    
    
    _clear(){
     this._parentEl.innerHTML ='';
    }



}