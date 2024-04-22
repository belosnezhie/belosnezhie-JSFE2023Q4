import './AboutPage.css';
import { BaseComponent } from '../components/Component';

export class NotFoundPage extends BaseComponent {
  constructor() {
    super(
      {
        tag: 'main',
        className: 'not_found_page',
      },
      new BaseComponent({
        tag: 'h1',
        className: 'not_found_title',
        text: `FunChat is a real-time messaging application that allows users to chat with each other, delete their messages, and update existing messages.
        
        It provides a seamless and intuitive interface for communication, enabling users to connect with friends, family, or colleagues.
        
        Created by Mariia Treier`,
      }),
    );
  }
}
