import './MainPage.css';

import { BasicComponent } from '../BasicComponent';

import { GameField } from './GameField';

class MainPage extends BasicComponent {
  constructor() {
    super(
      {
        tag: 'div',
        className: 'main_page',
      },
      new GameField(),
    );
  }
}

export const mainPage = new MainPage();
