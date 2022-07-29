import { View } from './View.js'; // main class
import childPreview from './childPreview.js'; //child class

class ResultView extends View {
  _errorMessage = `Couldn't find any result !! please try again`;
  _parentEl = document.querySelector('.results');

  // - same name as the function in "recipeView" for the parent class "view" render both using the same 'render' function
  _rednerMarkup(results) {
    const markup = results
      .map(result => childPreview.genMarkupResult(result))
      .join('');
    //map will return array of html markups and using join here to join them and make a string

    return markup;
  }
}
export default new ResultView();
