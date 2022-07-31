import { View } from './View.js'; //main class
import childPreview from './childPreview.js'; //child class
import icons from 'url:../../img/icons.svg';
class addRecipeView extends View {
  _parentEl = document.querySelector('.upload');

  _btnAddRecipe = document.querySelector('.nav__btn--add-recipe');
  _btnUpload = document.querySelector('.upload__btn');
  _recipeWindow = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _btnCloseForm = document.querySelector('.btn--close-modal');

  _errorMessage = `couldn't upload your recipe :( pls try again`;
  _message = 'you recipe was loaded successfully ;)';
  constructor() {
    super();
    this._addHandlerAddRecipe();
  }

  // - handler to open and close form
  _addHandlerAddRecipe() {
    // to open form :
    this._btnAddRecipe.addEventListener('click', this.toggleForm.bind(this));
    // to close form
    [this._btnCloseForm, this._overlay].forEach(ev =>
      ev.addEventListener('click', this.toggleForm.bind(this))
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
  toggleForm() {
    this._recipeWindow.classList.toggle('hidden');
    this._overlay.classList.toggle('hidden');
  }

  // after submit the NewRecipe renderSpinder - renderMessage will clear the container so we need to reGenerate our from mark up
  reGenerateMarkup() {
    const markup = ` <div class="upload__column">
          <h3 class="upload__heading">Recipe data</h3>
          <label>Title</label>
          <input value="TEST122" required name="title" type="text" />
          <label>URL</label>
          <input value="TEST122" required name="sourceUrl" type="text" />
          <label>Image URL</label>
          <input value="TEST122" required name="image" type="text" />
          <label>Publisher</label>
          <input value="TEST122" required name="publisher" type="text" />
          <label>Prep time</label>
          <input value="23" required name="cookingTime" type="number" />
          <label>Servings</label>
          <input value="23" required name="servings" type="number" />
        </div>

        <div class="upload__column">
          <h3 class="upload__heading">Ingredients</h3>
          <label>Ingredient 1</label>
          <input
            value="0.5,kg,Rice"
            type="text"
            required
            name="ingredient-1"
            placeholder="Format: 'Quantity,Unit,Description'"
          />
          <label>Ingredient 2</label>
          <input
            value="1,,Avocado"
            type="text"
            name="ingredient-2"
            placeholder="Format: 'Quantity,Unit,Description'"
          />
          <label>Ingredient 3</label>
          <input
            value=",,salt"
            type="text"
            name="ingredient-3"
            placeholder="Format: 'Quantity,Unit,Description'"
          />
          <label>Ingredient 4</label>
          <input
            type="text"
            name="ingredient-4"
            placeholder="Format: 'Quantity,Unit,Description'"
          />
          <label>Ingredient 5</label>
          <input
            type="text"
            name="ingredient-5"
            placeholder="Format: 'Quantity,Unit,Description'"
          />
          <label>Ingredient 6</label>
          <input
            type="text"
            name="ingredient-6"
            placeholder="Format: 'Quantity,Unit,Description'"
          />
        </div>

        <button class="btn upload__btn">
          <svg>
            <use href="${icons}#icon-upload-cloud"></use>
          </svg>
          <span>Upload</span>
        </button>`;
    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }
}
export default new addRecipeView();
