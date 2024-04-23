import './AboutPage.css';
import { Button } from '../components/Button';
import { BaseComponent } from '../components/Component';
import { userEvent } from '../services/UsersEventEmmiter';
import { ParamsToEmmit } from '../types.ts/Types';

export class AboutPage extends BaseComponent {
  constructor() {
    const returnButton = new Button('Return', 'return_button', () => {
      const data: ParamsToEmmit = { data: 'userReturned' };

      userEvent.emit('userReturned', data);
    });

    const appText = new BaseComponent({
      tag: 'p',
      className: 'about_text',
      text: `FunChat is a real-time messaging application that allows users to chat with each other, delete their messages, and update existing messages. 
             It provides a seamless and intuitive interface for communication, enabling users to connect with friends, family, or colleagues.`,
    });
    const authorText = new BaseComponent({
      tag: 'p',
      className: 'about_text',
      text: 'Created by Mariia Treier',
    });
    const textWrapper = new BaseComponent(
      {
        tag: 'div',
        className: 'about_description',
      },
      appText,
      authorText,
    );

    const title = new BaseComponent({
      tag: 'h1',
      className: 'about_title',
      text: 'About app',
    });

    super(
      {
        tag: 'main',
        className: 'about_page',
      },
      title,
      textWrapper,
      returnButton,
    );
  }
}
