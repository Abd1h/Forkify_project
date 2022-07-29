import { View } from './View.js'; //main class
import childPreview from './childPreview.js'; //child class

class addRecipeView extends View {
  _parentEl = document.querySelector('.upload');

  _btnAddRecipe = document.querySelector('.nav__btn--add-recipe');
  _btnUpload = document.querySelector('.upload__btn');
  _recipeWindow = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _btnCloseForm = document.querySelector('.btn--close-modal');
  constructor() {
    super();
    this._addHandlerAddRecipe();
  }

  // - handler to open and close form
  _addHandlerAddRecipe() {
    // to open form :
    this._btnAddRecipe.addEventListener('click', this._toggleForm.bind(this));
    // to close form
    [this._btnCloseForm, this._overlay].forEach(ev =>
      ev.addEventListener('click', this._toggleForm.bind(this))
    );
  }
  // - handler to load form
  addHandlerLoadRecipe(handler) {
    this._parentEl.addEventListener('submit', function (e) {
      e.preventDefault();
      //this === the parentEl
      const dataArr = [...new FormData(this)]; //***** [key , value] --> ['cookingTime', '23'] *****
      const data = Object.fromEntries(dataArr); // ****** [cookingTime: 23] ******

      handler(data);
    });
  }

  //outside function for toggling form window, to call it with bind method so it doesnt take event this.keyword ****
  _toggleForm() {
    this._recipeWindow.classList.toggle('hidden');
    this._overlay.classList.toggle('hidden');
  }
}
export default new addRecipeView();
