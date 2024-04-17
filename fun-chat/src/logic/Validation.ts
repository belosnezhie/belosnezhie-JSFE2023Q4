import { loginStatus } from './SessionStorage';

const nameRegexp = new RegExp('^[A-Z][\\-a-zA-z]+$');
const passwordRegexp = new RegExp(
  '^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z].*[a-z]).{6}$',
);

export function validateForm(
  nameValue: string,
  passwordValue: string,
): string | undefined {
  if (nameValue.length < 4) {
    return 'Name should contain at least 4 symbols.';
  }
  if (!nameRegexp.test(nameValue)) {
    return 'Name should starts with the uppercase letter and can contain only English alphabet letters and the hyphen.';
  }
  if (passwordValue.length < 6) {
    return 'Password should contain at least 6 symbols.';
  }
  if (!passwordRegexp.test(passwordValue)) {
    return 'Password should contain only English alphabet letters, at least one uppercase letter, one lowercase letter, one number and one special character.';
  }

  loginStatus.setLoginStatus(nameValue, passwordValue);

  return undefined;
}
