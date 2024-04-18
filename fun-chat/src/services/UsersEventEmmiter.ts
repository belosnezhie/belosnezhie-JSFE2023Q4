import { ParamsToEmmit } from '../types.ts/Types';

export class UserEvent {
  listeners: Map<string, (<T extends ParamsToEmmit>(params: T) => void)[]>;

  constructor() {
    this.listeners = new Map();
  }

  public emit<T extends ParamsToEmmit>(eventName: string, params: T): void {
    const current = this.listeners.get(eventName);

    if (current !== undefined) {
      current.forEach((listener) => {
        listener.call(null, params);
      });
    }
  }

  public subscribe(
    eventName: string,
    func: <T extends ParamsToEmmit>(params: T) => void,
  ): void {
    const current = this.listeners.get(eventName);

    if (current === undefined) {
      const arr: (<T extends ParamsToEmmit>(params: T) => void)[] = [];

      arr.push(func);
      this.listeners.set(eventName, arr);
    } else {
      current.push(func);
      this.listeners.set(eventName, current);
    }
  }

  public subscribeAsync(
    eventName: string,
    func: <T extends ParamsToEmmit>(params: T) => Promise<void>,
  ): void {
    const current = this.listeners.get(eventName);

    if (current === undefined) {
      const arr: (<T extends ParamsToEmmit>(params: T) => void)[] = [];

      arr.push(func);
      this.listeners.set(eventName, arr);
    } else {
      current.push(func);
      this.listeners.set(eventName, current);
    }
  }

  public unsubscribe(
    eventName: string,
    func: <T extends ParamsToEmmit>(params: T) => void,
  ) {
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
