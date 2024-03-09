class LoginStatus {
  key: string;

  constructor() {
    const key = 'JSFE2023Q4LoginStatus';

    this.key = key;
  }

  public checkLoginStatus(): boolean {
    if (!localStorage.getItem(this.key)) {
      return false;
    }

    return true;
  }

  public clearLoginStatus(): void {
    localStorage.removeItem(this.key);
  }

  public setLoginStatus(value: string): void {
    localStorage.setItem(this.key, value);
  }
}

export const loginStatus = new LoginStatus();
