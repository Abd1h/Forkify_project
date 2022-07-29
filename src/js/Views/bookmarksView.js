import { View } from './View.js'; //main class
import childPreview from './childPreview.js'; //child class

class BookmarkView extends View {
  _errorMessage = `No bookmarks yet. Find a nice recipe and bookmark it :)`;
  _parentEl = document.querySelector('.bookmarks__list');

  // - same name as the function in "recipeView" for the parent class "view" render both using the same 'render' function
  _rednerMarkup(bookmarks) {
    const markup = bookmarks
      .map(bookmark => childPreview.genMarkupResult(bookmark))
      .join('');
    //map will return array of html markups and using join here to join them and make a string
    return markup;
  }
}
export default new BookmarkView();
