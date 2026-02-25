import type { ComponentConfiguration, ComponentRegistration } from '../_types';
import { createCustomElement } from '../model';
import { registerComponent } from '../model/registration';
import { devWarning } from '../attributes/errors';

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

/**
 * @deprecated Use `Model.registerComponent()` from `@universityofmaryland/web-model-library` instead.
 */
const registerWebComponent = ({ name, element }: WebComponentConfig): void => {
  devWarning(
    `registerWebComponent() is deprecated. Use Model.registerComponent("${name}", element, { eager: false }) instead.`,
  );

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

/**
 * Helper to create a standard component registration function.
 * This simplifies the component export pattern and ensures consistency.
 *
 * @deprecated Use `Model.registerComponent()` from `@universityofmaryland/web-model-library` instead.
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
    devWarning(
      `Register.webComponent() is deprecated. Use Model.registerComponent() instead.`,
    );

    // Normalize attributes to always be an array
    const normalizedConfig = {
      ...config,
      attributes: config.attributes
        ? Array.isArray(config.attributes)
          ? config.attributes
          : [config.attributes]
        : undefined,
    };

    const element = createCustomElement(normalizedConfig);

    try {
      registerComponent(config.tagName, element, { eager: false });
    } catch {
      // Fall back to legacy behavior on validation errors
      // to preserve backwards compatibility during migration
      registerWebComponent({ name: config.tagName, element });
      return;
    }

    // Maintain legacy global registry for backwards compat
    window.WebComponents[config.tagName] = element;
  };
}

export { registerWebComponent, type WebComponentConfig };
