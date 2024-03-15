import { BasicComponent } from '../BasicComponent';

export class MoveCardEvent {
  listeners: Map<string, ((component: BasicComponent) => void)[]>;
  constructor() {
    this.listeners = new Map();
  }

  public emit(eventName: string, component: BasicComponent): void {
    const current = this.listeners.get(eventName);

    if (current !== undefined) {
      current.forEach((listener) => {
        listener.call(null, component);
      });
    }
  }

  public subscribe(
    eventName: string,
    func: (component: BasicComponent) => void,
  ): void {
    const current = this.listeners.get(eventName);

    if (current === undefined) {
      const arr: ((component: BasicComponent) => void)[] = [];

      arr.push(func);
      this.listeners.set(eventName, arr);
    } else {
      current.push(func);
      this.listeners.set(eventName, current);
    }
  }

  public unsubscribe(
    eventName: string,
    func: (component: BasicComponent) => void,
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

export const currentMoveCardEvent = new MoveCardEvent();
