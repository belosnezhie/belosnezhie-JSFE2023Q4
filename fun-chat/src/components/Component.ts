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

  addClass(className: string) {
    this.element.classList.add(className);
  }

  addListener(
    event: string,
    listener: (event: Event) => void,
    options = false,
  ) {
    this.element.addEventListener(event, listener, options);
  }

  append(child: BaseComponent) {
    this.children.push(child);
    this.element.append(child.getElement());
  }

  appendChildren(children: BaseComponent[]) {
    for (const child of children) {
      this.append(child);
    }
  }

  getAttribute(attribute: string): string | null {
    return this.element.getAttribute(attribute);
  }

  getChildren() {
    return this.children;
  }

  getElement() {
    return this.element;
  }

  getParent() {
    return this.getElement().parentElement;
  }

  reRenderComponent() {
    const prevElement = this.getElement();

    this.removeElement();

    const newElement = document.createElement(prevElement.tagName);

    newElement.className = prevElement.className;
    if (prevElement.textContent) {
      newElement.textContent = prevElement.textContent;
    }
    this.element = newElement;
  }

  removeAttribute(attribute: string) {
    this.element.removeAttribute(attribute);
  }

  removeChild(child: BaseComponent) {
    const index: number | undefined = this.children?.indexOf(child);

    if (index !== undefined) {
      this.children?.splice(index, 1);
    }

    child.removeElement();
  }

  removeChildren() {
    for (const child of this.children) {
      child.removeElement();
    }
    this.children.length = 0;
  }

  removeClass(className: string) {
    this.element.classList.remove(className);
  }

  removeElement() {
    this.removeChildren();
    this.element.remove();
  }

  removeListener(event: string, listener: () => void, options = false) {
    this.element.removeEventListener(event, listener, options);
  }

  setAttribute(attribute: string, value: string) {
    this.element.setAttribute(attribute, value);
  }

  setTextContent(content: string) {
    this.element.textContent = content;
  }

  toggleClass(className: string) {
    this.element.classList.toggle(className);
  }
}
