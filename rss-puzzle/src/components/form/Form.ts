import '../loginPage/LoginPage.css';

import { BasicComponent } from '../BasicComponent';
import { Input } from '../Input';
import { Label } from '../loginPage/Label';

const firstNameInput = new Input('firstNameInput');

firstNameInput.addClass('first_name_input');
firstNameInput.addAttribute('type', 'text');
firstNameInput.addAttribute('required', '');

const lastNameInput = new Input('lastNameInput');

lastNameInput.addClass('last_name_input');
lastNameInput.addAttribute('type', 'text');
lastNameInput.addAttribute('required', '');

const submitInput = new Input('submitInput');

submitInput.addClass('submit_input');
submitInput.addAttribute('type', 'submit');
submitInput.addAttribute('value', 'Submit');

export class Form extends BasicComponent {
  constructor() {
    super(
      {
        tag: 'form',
        className: 'login_form',
      },
      new Label('First name', 'firstNameInput'),
      firstNameInput,
      new Label('Last name', 'lastNameInput'),
      lastNameInput,
      submitInput,
    );
  }
}
