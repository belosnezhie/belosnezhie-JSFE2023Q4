import './MainPage.css';

import { BasicComponent } from '../BasicComponent';
import { header } from '../header/Header';

import { GameField } from './GameField';

class MainPage extends BasicComponent {
  constructor() {
    super(
      {
        tag: 'div',
        className: 'main_page',
      },
      header,
      new GameField(),
    );
  }
}

export const mainPage = new MainPage();
