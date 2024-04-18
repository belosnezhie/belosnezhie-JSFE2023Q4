import { UserData } from '../types.ts/Types';

class LoginStatus {
  key: string;

  constructor() {
    const key = 'JSFE2023Q4LoginStatus';

    this.key = key;
  }

  public checkLoginStatus(): boolean {
    if (!sessionStorage.getItem(this.key)) {
      return false;
    }

    return true;
  }

  public clearLoginStatus(): void {
    sessionStorage.removeItem(this.key);
  }

  public getName() {
    const nameInJSON: string | null = sessionStorage.getItem(this.key);

    if (nameInJSON) {
      throw new Error('Name is not defind');
    }

    return name;
  }

  public setLoginStatus(name: string, password: string): void {
    const userData: UserData = {
      name: name,
      password: password,
    };

    sessionStorage.setItem(this.key, JSON.stringify(userData));
  }
}

export const loginStatus = new LoginStatus();
