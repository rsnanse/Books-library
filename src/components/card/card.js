import { DivComponent } from '../../common/div-component';
import './card.css';

export class Card extends DivComponent {
  constructor(appState, cardState) {
    // appState нужен для добавления или удаления карточек, а parentState здесь целиком не нужен, а нужна лишь одна конкретная картчока которая будет отображатся.
    super();
    this.appState = appState;
    this.cardState = cardState;
  }

  // два метода добаления или удаления из избранного
  #addInFavorites() {
    this.appState.favorites.push(this.cardState);
  }

  #deleteFromFavorites() {
    this.appState.favorites = this.appState.favorites.filter(
      (b) => b.key !== this.cardState.key,
    );
  }

  render() {
    // в рендере у нас нет какого-либо состояния потому что карточка либо отображается либо нет.
    this.el.classList.add('card');
    const existInFavorites = this.appState.favorites.find(
      (b) => b.key == this.cardState.key,
    ); // Эта функция находит первую карточку в массиве избранных, у которой совпадает key с текущей карточкой. Если такой карточки нет — вернёт undefined, иначе вернёт объект найденной карточки. Это используется, чтобы понять: карточка уже в избранном или нет.
    this.el.innerHTML = `
    <div class="card__image">
      <img
        src="https://covers.openlibrary.org/b/olid/${this.cardState.cover_edition_key}-M.jpg"
        alt="Обложка"
      />
    </div>
     <div class="card__info">
        <div class="card__name">
        Название: ${this.cardState.title}
        </div>
        <div class="card__author">
        Автор: ${this.cardState.author_name ? this.cardState.author_name[0] : 'Не задано'}
        </div>
        <div class="card__tag">
        Год первого издания: ${this.cardState.first_publish_year ? this.cardState.first_publish_year : 'Не задано'}
        </div>
        <div class="card__footer">
            <button class = "button__add ${existInFavorites ? 'button__active' : ''}">
            ${
              existInFavorites
                ? '<img src = "/static/favorites.svg" />'
                : '<img src = "/static/favorites-white.svg" />'
            }
            </button>
        </div>
    </div>
    `;
    if (existInFavorites) {
      this.el
        .querySelector('button')
        .addEventListener('click', this.#deleteFromFavorites.bind(this));
    } else {
      this.el
        .querySelector('button')
        .addEventListener('click', this.#addInFavorites.bind(this));
    }
    return this.el;
  }
}
