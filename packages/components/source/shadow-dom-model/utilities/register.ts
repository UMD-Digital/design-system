interface WebComponentConfig {
  name: string;
  element: CustomElementConstructor;
}

interface WebComponentRegistry {
  [key: string]: CustomElementConstructor;
}

declare global {
  interface Window {
    WebComponents: WebComponentRegistry;
  }
}

if (!window.WebComponents) {
  window.WebComponents = {};
}

const registerWebComponent = ({ name, element }: WebComponentConfig): void => {
  if (window.customElements.get(name)) {
    return;
  }

  const hasElement = document.getElementsByTagName(name).length > 0;
  if (!hasElement) {
    return;
  }

  window.WebComponents[name] = element;
  window.customElements.define(name, element);
};

export { registerWebComponent, type WebComponentConfig };
