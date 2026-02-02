import { AbstractView } from '../../common/view.js';
import onChange from 'on-change';
import { Header } from '../../components/header/header.js';
import { CardList } from '../../components/card-list/card-list.js';

export class FavoritesView extends AbstractView {
  // state здесь не нужен, потому что все состояние favorites находится в файле app.js
  //   appState = {
  //    favorites: [],
  //  };

  constructor(appState) {
    super();
    this.appState = appState;
    this.appState = onChange(this.appState, this.appStateHook.bind(this)); // здесь мы подписываемся на appState
    this.setTitle('Мои книги');
  }

  destroy() {
    onChange.unsubscribe(this.appState);
  }

  // appStateHook оставляем, потому что в случае изменения favorites нужно вызывать рендер
  appStateHook(path) {
    if (path === 'favorites') {
      this.render();
    }
  }

  render() {
    const main = document.createElement('div');
    main.innerHTML = `
        <h1>Избранные книги</h1>
    `;
    main.append(
      new CardList(this.appState, { list: this.appState.favorites }).render(),
    ); // CardList будет генериться из appState и вместо this.state как было в main.js нужно поставить объект
    this.app.innerHTML = '';
    this.app.append(main);
    this.renderHeader();
  }

  renderHeader() {
    // header рендериться также
    const header = new Header(this.appState).render();
    this.app.prepend(header);
  }
  // тееперь в app.js нужно добавить второй путь path в массив   routes = [{ path: '', view: MainView }];
}
