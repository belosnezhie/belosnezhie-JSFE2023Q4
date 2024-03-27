export class CarEvent {
  listeners: Map<string, (() => void)[]>;
  constructor() {
    this.listeners = new Map();
  }

  public emit(eventName: string): void {
    const current = this.listeners.get(eventName);

    if (current !== undefined) {
      current.forEach((listener) => {
        listener.call(null);
      });
    }
  }

  public subscribe(eventName: string, func: () => void): void {
    const current = this.listeners.get(eventName);

    if (current === undefined) {
      const arr: (() => void)[] = [];

      arr.push(func);
      this.listeners.set(eventName, arr);
    } else {
      current.push(func);
      this.listeners.set(eventName, current);
    }
  }

  public unsubscribe(eventName: string, func: () => void) {
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

export const currentCarEvent = new CarEvent();
