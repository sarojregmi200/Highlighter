export function createElement(type: string, className: string): HTMLElement {
  const element = document.createElement(type);
  element.classList.add(className);
  return element;
}
