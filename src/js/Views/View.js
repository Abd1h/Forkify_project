import icons from 'url:../../img/icons.svg'


export class View {
    _data;
_errorMessage = 'something went wrong with getting your recipe';

    render(data){
      //checking if data is null OR its an array and its empty --> 'no data'
      if (!data || (Array.isArray(data) && data.length === 0) ) return  this.renderError() //this function will work cuz its in the same line **********

      // 1) setting data
        this._data = data
      // 2) clear html container then render reicpe in it
        this._clear()
        this._rednerRecipe(this._data);
    }
    
    renderSpiner = function (){
    
      const markup =`
      <div class="spinner">
              <svg>
                <use href="${icons}#icon-loader"></use>
              </svg>
            </div>
      `
      this._clear();
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