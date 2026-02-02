import { DivComponent } from '../../common/div-component';
import { Card } from '../card/card';
import './card-list.css';

export class CardList extends DivComponent {
  constructor(appState, parentState) {
    // appState нужен для того чтобы в дальнейшем обновлять избранное, а parentState нужен для того чтобы понимать загрузились мы или нет
    super();
    this.appState = appState;
    this.parentState = parentState;
  }

  render() {
    // здесь мы проверяем загружается ли наш кард лист или нет. Для этого нужно обратиться к parentState
    if (this.parentState.loading) {
      //если мы загружаемся, то мы должны отобразить индикатор загрузки. Этому элементу который у нас есть мы ставим innerHTML
      this.el.innerHTML = `<div class ="card_list__loader">Loading</div>`;
      return this.el; // если мы не вернем этот элемент то у нас продолжится дальнейшая отработка, которая нам пока не нужна.
    }

    const cardGrid = document.createElement('div');
    cardGrid.classList.add('card_grid');
    this.el.append(cardGrid);
    // теперь мы должны добавить все карточки при этом мы должны добавить их пройдясь по списку циклом
    for (const card of this.parentState.list) {
      cardGrid.append(new Card(this.appState, card).render());
    }
    return this.el;
  }
}
