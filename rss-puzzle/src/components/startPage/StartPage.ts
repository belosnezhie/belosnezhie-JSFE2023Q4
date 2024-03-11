import './StartPage.css';

import { state } from '../..';
import { loginStatus } from '../../services/LocalStorage';
import { BasicComponent } from '../BasicComponent';
import { Button } from '../Buttons/Button';
import { Headline } from '../Headline';
import { mainPage } from '../mainPage/MainPage';

export class StartPage extends BasicComponent {
  constructor() {
    super(
      {
        tag: 'div',
        className: 'start_page',
      },
      new BasicComponent(
        {
          tag: 'div',
          className: 'start_container',
        },
        new Headline('h1', 'start_headline', 'ENGLISH PUZZLE'),
        new Headline('h2', 'start_greeting'),
        new BasicComponent({
          tag: 'div',
          className: 'start_description',
          text: `Here you can emprove your English language skills!
          \nDrag and drop words to collect sentensies, 
          choose nessessary hints in the menu, 
          check your results.`,
        }),
        new Button('Start', 'start_button', () => {
          state.setCurrentPage(mainPage);
        }),
      ),
    );
  }

  public render() {
    if (this.children) {
      const firstChild = this.children[0];

      if (firstChild.children) {
        firstChild.children[1].addText(`Hello, ${loginStatus.getName()}!`);
        super.render();
      }
    }
  }
}

export const startPage = new StartPage();
