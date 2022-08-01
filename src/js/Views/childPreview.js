import { View } from './View.js'; //main class
import icons from 'url:../../img/icons.svg';

class childPreview extends View {
  //child class of resultView & bookmarkView
  //they use the same method to generate markup

  genMarkupResult(bookmark) {
    const urlID = window.location.hash.slice(1);

    return `<li class="preview">
<a class="preview__link ${
      urlID === bookmark.id ? 'preview__link--active' : ''
    } " href="#${bookmark.id}">
  <figure class="preview__fig">
    <img src="${bookmark.img}" alt="Test" />
  </figure>
  <div class="preview__data">
    <h4 class="preview__title">${bookmark.title}</h4>
    <p class="preview__publisher">${bookmark.publisher}</p>
  
    <div class="recipe__user-generated ${bookmark.key ? '' : 'hidden'}">
            <svg>
              <use href="${icons}#icon-user"></use>
            </svg>
    </div>
  </div>
</a>
</li>
`;
  }
}
export default new childPreview();
