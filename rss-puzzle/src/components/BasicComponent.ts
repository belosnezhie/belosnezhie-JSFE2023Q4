export type ElementParam = Partial<Element>;

export class BasicComponent {
  public children?: BasicComponent[] | undefined = [];
  public classNames: string[] = [];
  public component: Element = document.createElement('div');
  public tag: string;
  public text?: string;
  private attributes: Map<string, string> = new Map();

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

  public addChild(child: BasicComponent) {
    if (this.children) {
      this.children.push(child);
    }
  }

  public addClass(className: string): void {
    this.classNames.push(className);
  }

  public addText(text: string): void {
    this.text = text;
  }

  public append(child: BasicComponent) {
    if (this.children) {
      if (!this.children.includes(child)) {
        this.addChild(child);
      }
      this.component.append(child.component);
    }
  }

  public clearChildrenArr() {
    this.children = [];
  }

  public removeAttribute(type: string): void {
    this.component.removeAttribute(type);
  }

  public removeChild(child: BasicComponent) {
    const index: number | undefined = this.children?.indexOf(child);

    if (index !== undefined) {
      this.children?.splice(index, 1);
    }
  }

  public removeChildren() {
    if (this.children) {
      this.children.forEach((child: BasicComponent) => {
        child.component.remove();
      });
    }
  }

  public removeClass(className: string): void {
    this.component.classList.remove(className);
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

  public replaceChild(child: BasicComponent, replacement: BasicComponent) {
    const index: number | undefined = this.children?.indexOf(child);

    if (index !== undefined) {
      this.children?.splice(index, 1, replacement);
    }

    if (this.children) {
      this.removeChildren();
      this.appendChildren(this.children);
    }
  }

  protected appendChildren(children: BasicComponent[]) {
    children.forEach((child) => {
      child.render();
      this.append(child);
    });
  }
}
