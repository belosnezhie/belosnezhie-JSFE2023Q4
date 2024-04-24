import { UserData } from '../types.ts/Types';

class LoginStatus {
  private key: string = 'JSFE2023Q4LoginStatus';
  private errorKey: string = 'JSFE2023Q4Error';

  public checkLoginStatus(): boolean {
    if (!sessionStorage.getItem(this.key)) {
      return false;
    }

    return true;
  }

  public clearLoginStatus(): void {
    sessionStorage.removeItem(this.key);
  }

  public getUser(): UserData | undefined {
    const nameInString: string | null = sessionStorage.getItem(this.key);

    if (nameInString) {
      const name: UserData = <UserData>JSON.parse(nameInString);

      return name;
    } else {
      return undefined;
    }
  }

  public setLoginStatus(name: string, password: string): void {
    const userData: UserData = {
      name: name,
      password: password,
    };

    sessionStorage.setItem(this.key, JSON.stringify(userData));
  }

  public setLogInError(errorText: string) {
    sessionStorage.setItem(this.errorKey, errorText);
  }

  public getLogInError() {
    const errorInString: string | null = sessionStorage.getItem(this.errorKey);

    if (errorInString) {
      return errorInString;
    } else {
      return undefined;
    }
  }

  public checkLogInErrorStatus(): boolean {
    if (!sessionStorage.getItem(this.errorKey)) {
      return false;
    }

    return true;
  }

  public clearErrorStatus(): void {
    sessionStorage.removeItem(this.errorKey);
  }
}

export const loginStatus = new LoginStatus();
