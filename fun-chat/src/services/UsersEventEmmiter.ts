export class UserEvent {
  listeners: Map<string, ((userName?: string) => void)[]>;
  listenersWithmessage: Map<
    string,
    ((userName: string, message: string) => void)[]
  >;

  constructor() {
    this.listeners = new Map();
    this.listenersWithmessage = new Map();
  }

  public emit(eventName: string, userName?: string): void {
    const current = this.listeners.get(eventName);

    if (current !== undefined) {
      current.forEach((listener) => {
        if (userName) {
          listener.call(null, userName);
        } else {
          listener.call(null);
        }
      });
    }
  }

  public emitWithMessage(
    eventName: string,
    userName: string,
    message: string,
  ): void {
    const current = this.listenersWithmessage.get(eventName);

    if (current !== undefined) {
      current.forEach((listenersWithmessage) => {
        listenersWithmessage.call(null, userName, message);
      });
    }
  }

  public subscribe(eventName: string, func: (userName?: string) => void): void {
    const current = this.listeners.get(eventName);

    if (current === undefined) {
      const arr: ((userName?: string) => void)[] = [];

      arr.push(func);
      this.listeners.set(eventName, arr);
    } else {
      current.push(func);
      this.listeners.set(eventName, current);
    }
  }

  public subscribeAsync(
    eventName: string,
    func: (userName?: string) => Promise<void>,
  ): void {
    const current = this.listeners.get(eventName);

    if (current === undefined) {
      const arr: ((userName?: string) => void)[] = [];

      arr.push(func);
      this.listeners.set(eventName, arr);
    } else {
      current.push(func);
      this.listeners.set(eventName, current);
    }
  }

  public subscribeAsyncWithMessage(
    eventName: string,
    func: (userName: string, message: string) => Promise<void>,
  ): void {
    const current = this.listenersWithmessage.get(eventName);

    if (current === undefined) {
      const arr: ((userName: string, message: string) => void)[] = [];

      arr.push(func);
      this.listenersWithmessage.set(eventName, arr);
    } else {
      current.push(func);
      this.listenersWithmessage.set(eventName, current);
    }
  }

  public unsubscribe(eventName: string, func: (userName?: string) => void) {
    const current = this.listeners.get(eventName);

    if (current !== undefined) {
      const filtered = current.filter(
        (callback) => callback.name !== func.name,
      );

      this.listeners.set(eventName, filtered);
    }
  }

  public unsubscribeAll(eventName: string) {
    this.listeners.set(eventName, []);
  }
}

export const userEvent = new UserEvent();
