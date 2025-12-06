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

import type { ComponentConfiguration, ComponentRegistration } from '../_types';
import { createCustomElement } from '../model';

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
 *   attributes: Attributes.handler.common.resize((element) => element.events?.recalculate()),
 * });
 * ```
 */
export function webComponent(
  config: ComponentConfiguration,
): ComponentRegistration {
  return () => {
    // Normalize attributes to always be an array
    const normalizedConfig = {
      ...config,
      attributes: config.attributes
        ? Array.isArray(config.attributes)
          ? config.attributes
          : [config.attributes]
        : undefined,
    };
    
    registerWebComponent({
      name: config.tagName,
      element: createCustomElement(normalizedConfig),
    });
  };
}

export { registerWebComponent, type WebComponentConfig };
