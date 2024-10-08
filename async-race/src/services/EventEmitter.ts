export class CarEvent {
  listeners: Map<string, ((carId?: number) => void)[]>;
  listenersWithTime: Map<string, ((carId: number, time: number) => void)[]>;

  constructor() {
    this.listeners = new Map();
    this.listenersWithTime = new Map();
  }

  public emit(eventName: string, carId?: number): void {
    const current = this.listeners.get(eventName);

    if (current !== undefined) {
      current.forEach((listener) => {
        if (carId) {
          listener.call(null, carId);
        } else {
          listener.call(null);
        }
      });
    }
  }

  public emitWithTime(eventName: string, carId: number, time: number): void {
    const current = this.listenersWithTime.get(eventName);

    if (current !== undefined) {
      current.forEach((listenersWithTime) => {
        listenersWithTime.call(null, carId, time);
      });
    }
  }

  public subscribe(eventName: string, func: (carId?: number) => void): void {
    const current = this.listeners.get(eventName);

    if (current === undefined) {
      const arr: ((carId?: number) => void)[] = [];

      arr.push(func);
      this.listeners.set(eventName, arr);
    } else {
      current.push(func);
      this.listeners.set(eventName, current);
    }
  }

  public subscribeAsync(
    eventName: string,
    func: (carId?: number) => Promise<void>,
  ): void {
    const current = this.listeners.get(eventName);

    if (current === undefined) {
      const arr: ((carId?: number) => void)[] = [];

      arr.push(func);
      this.listeners.set(eventName, arr);
    } else {
      current.push(func);
      this.listeners.set(eventName, current);
    }
  }

  public subscribeAsyncWithTime(
    eventName: string,
    func: (carId: number, time: number) => Promise<void>,
  ): void {
    const current = this.listenersWithTime.get(eventName);

    if (current === undefined) {
      const arr: ((carId: number, time: number) => void)[] = [];

      arr.push(func);
      this.listenersWithTime.set(eventName, arr);
    } else {
      current.push(func);
      this.listenersWithTime.set(eventName, current);
    }
  }

  public unsubscribe(eventName: string, func: (carId?: number) => void) {
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
