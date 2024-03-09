import './StartPage.css';

import { BasicComponent } from '../BasicComponent';
import { Header } from '../Headers';

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
        new Header('h2', 'start_headline', 'ENGLISH PUZZLE'),
        new BasicComponent({
          tag: 'div',
          className: 'start_description',
          text: `Here you can emprove your English language skills!
          \nDrag and drop words to collect sentensies, 
          choose nessessary hints in the menu, 
          check your results.`,
        }),
      ),
    );
  }
}
