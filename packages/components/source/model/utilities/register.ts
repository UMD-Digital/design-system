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

import type { ComponentConfiguration, ComponentRegistration } from '../types';
import { createCustomElement } from '../model/index';

/**
 * Helper to create a standard component registration function.
 * This simplifies the component export pattern and ensures consistency.
 * 
 * @param config - Component configuration
 * @returns Registration function that can be called to register the component
 * 
 * @example
 * ```typescript
 * export default createComponentRegistration({
 *   tagName: 'umd-element-name',
 *   slots,
 *   createComponent,
 *   attributes: CommonAttributeHandlers.resize,
 * });
 * ```
 */
export function createComponentRegistration(
  config: ComponentConfiguration,
): ComponentRegistration {
  return () => {
    registerWebComponent({
      name: config.tagName,
      element: createCustomElement(config),
    });
  };
}

export { registerWebComponent, type WebComponentConfig };
