export interface ComponentProperties {
  tag: string;
  className: string;
  text?: string;
}

export class BaseComponent {
  private children: BaseComponent[] = [];
  private element: HTMLElement;

  constructor(properties: ComponentProperties, ...children: BaseComponent[]) {
    const element = document.createElement(properties.tag);

    element.className = properties.className;
    if (properties.text) {
      element.textContent = properties.text;
    }
    this.element = element;

    if (children) {
      this.appendChildren(children);
    }
  }

  append(child: BaseComponent) {
    this.children.push(child);
    this.element.append(child.getElement());
  }

  appendChildren(children: BaseComponent[]) {
    children.forEach((child) => {
      this.append(child);
    });
  }

  getElement() {
    return this.element;
  }

  getChildren() {
    return this.children;
  }

  setTextContent(content: string) {
    this.element.textContent = content;
  }

  setAttribute(attribute: string, value: string) {
    this.element.setAttribute(attribute, value);
  }

  removeAttribute(attribute: string) {
    this.element.removeAttribute(attribute);
  }

  addClass(className: string) {
    this.element.classList.add(className);
  }

  toggleClass(className: string) {
    this.element.classList.toggle(className);
  }

  addListener(event: string, listener: () => void, options = false) {
    this.element.addEventListener(event, listener, options);
  }

  removeListener(event: string, listener: () => void, options = false) {
    this.element.removeEventListener(event, listener, options);
  }

  removeChildren() {
    this.children.forEach((child) => {
      child.removeElement();
    });
    this.children.length = 0;
  }

  removeElement() {
    this.removeChildren();
    this.element.remove();
  }
}
