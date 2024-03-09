export type ElementParam = Partial<Element>;

export class BasicComponent {
  public component: Element;
  protected children?: BasicComponent[] | undefined = [];

  constructor(
    { tag = 'div', className = '', text = '' },
    ...children: BasicComponent[]
  ) {
    const component: Element = document.createElement(tag);

    component.className = className;
    component.textContent = text;
    this.component = component;

    if (children) {
      this.appendChildren(children);
    }
  }

  public addAttribute(type: string, content: string): void {
    this.component.setAttribute(type, content);
  }

  public addClass(className: string): void {
    this.component.classList.add(className);
  }

  public append(child: BasicComponent) {
    if (this.children) {
      this.children.push(child);
      this.component.append(child.component);
    }
  }

  protected addText(text: string): void {
    this.component.textContent = text;
  }

  protected appendChildren(children: BasicComponent[]) {
    children.forEach((child) => {
      this.append(child);
    });
  }

  protected removeAttribute(type: string): void {
    this.component.removeAttribute(type);
  }

  protected removeChildren() {
    if (this.children) {
      this.children.forEach((child: BasicComponent) => {
        child.component.remove();
      });
    }
  }

  protected removeClass(className: string): void {
    this.component.classList.remove(className);
  }

  protected removeComponent() {
    this.component.remove();
  }
}
