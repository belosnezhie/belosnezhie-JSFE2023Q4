export class CarEvent {
  listeners: Map<string, ((carIndex?: number) => void)[]>;

  constructor() {
    this.listeners = new Map();
  }

  public emit(eventName: string, carIndex?: number): void {
    const current = this.listeners.get(eventName);

    if (current !== undefined) {
      current.forEach((listener) => {
        if (carIndex) {
          listener.call(null, carIndex);
        } else {
          listener.call(null);
        }
      });
    }
  }

  public subscribe(eventName: string, func: (carIndex?: number) => void): void {
    const current = this.listeners.get(eventName);

    if (current === undefined) {
      const arr: ((carIndex?: number) => void)[] = [];

      arr.push(func);
      this.listeners.set(eventName, arr);
    } else {
      current.push(func);
      this.listeners.set(eventName, current);
    }
  }

  public subscribeAsync(
    eventName: string,
    func: (carIndex?: number) => Promise<void>,
  ): void {
    const current = this.listeners.get(eventName);

    if (current === undefined) {
      const arr: ((carIndex?: number) => void)[] = [];

      arr.push(func);
      this.listeners.set(eventName, arr);
    } else {
      current.push(func);
      this.listeners.set(eventName, current);
    }
  }

  public unsubscribe(eventName: string, func: (carIndex?: number) => void) {
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
