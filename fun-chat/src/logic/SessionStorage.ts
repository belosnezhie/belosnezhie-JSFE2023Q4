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

  public getName(): string {
    const name = sessionStorage.getItem(this.key);

    if (!name) {
      throw new Error('Name is not defind');
    }

    return name;
  }

  public setLoginStatus(name: string, password: string): void {
    const userData = {
      name: name,
      password: password,
    };

    sessionStorage.setItem(this.key, JSON.stringify(userData));
  }
}

export const loginStatus = new LoginStatus();
