import '../loginPage/LoginPage.css';

import { state } from '../..';
import { loginStatus } from '../../services/LocalStorage';
import { BasicComponent } from '../BasicComponent';
import { Input } from '../Input';
import { Label } from '../loginPage/Label';
import { startPage } from '../startPage/StartPage';

const firstNameInput = new Input('firstNameInput');

firstNameInput.addClass('first_name_input');
firstNameInput.addAttribute('type', 'text');
firstNameInput.addAttribute('required', '');
firstNameInput.setPattern();
firstNameInput.addAttribute('minlength', '3');

const lastNameInput = new Input('lastNameInput');

lastNameInput.addClass('last_name_input');
lastNameInput.addAttribute('type', 'text');
lastNameInput.addAttribute('required', '');
lastNameInput.setPattern();
lastNameInput.addAttribute('minlength', '4');

const submitInput = new Input('submitInput');

submitInput.addClass('submit_input');
submitInput.addAttribute('type', 'submit');
submitInput.addAttribute('value', 'Login');

export class Form extends BasicComponent {
  constructor() {
    super(
      {
        tag: 'form',
        className: 'login_form',
      },
      new Label('First name:', 'firstNameInput'),
      firstNameInput,
      new Label('Last name:', 'lastNameInput'),
      lastNameInput,
      submitInput,
    );
  }

  public render(): void {
    super.render();
    this.component.addEventListener('submit', (event: Event) => {
      event.preventDefault();
      if (event.target) {
        const target: HTMLFormElement = event.target as HTMLFormElement;
        const firstName = target.elements[0] as HTMLInputElement;
        const firstNameValue: string = firstName.value;
        const lastName = target.elements[1] as HTMLInputElement;
        const lastNameValue: string = lastName.value;
        const loginUserName: string = `${firstNameValue} ${lastNameValue}`;

        loginStatus.setLoginStatus(loginUserName);

        state.setCurrentPage(startPage);
      }
    });
  }
}
