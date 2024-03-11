export type ElementParam = Partial<Element>;

export class BasicComponent {
  public children?: BasicComponent[] | undefined = [];
  public component: Element = document.createElement('div');
  private attributes: Map<string, string> = new Map();
  private classNames: string[] = [];
  private tag: string;
  private text?: string;

  constructor(
    { tag = 'div', className = '', text = '' },
    ...children: BasicComponent[]
  ) {
    this.children = children;
    this.classNames.push(className);
    this.tag = tag;
    this.text = text;
  }

  public addAttribute(type: string, content: string): void {
    this.attributes.set(type, content);
  }

  public addClass(className: string): void {
    this.classNames.push(className);
  }

  public addText(text: string): void {
    this.text = text;
  }

  public append(child: BasicComponent) {
    if (this.children) {
      this.children.push(child);
      this.component.append(child.component);
    }
  }

  public removeChildren() {
    if (this.children) {
      this.children.forEach((child: BasicComponent) => {
        child.component.remove();
      });
    }
  }

  public removeComponent() {
    this.component.remove();
  }

  public render(): void {
    this.component = document.createElement(this.tag);

    this.classNames.forEach((className) => {
      this.component.classList.add(className);
    });
    this.attributes.forEach((value, key) => {
      this.component.setAttribute(key, value);
    });
    if (this.text) {
      this.component.textContent = this.text;
    }
    if (this.children) {
      this.appendChildren(this.children);
    }
  }

  protected appendChildren(children: BasicComponent[]) {
    children.forEach((child) => {
      child.render();
      this.append(child);
    });
  }

  protected removeAttribute(type: string): void {
    this.component.removeAttribute(type);
  }

  protected removeClass(className: string): void {
    this.component.classList.remove(className);
  }
}
