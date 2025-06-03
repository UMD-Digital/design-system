/**
 * Custom Element Model System
 * 
 * Provides a base class and utilities for creating web components with:
 * - Shadow DOM encapsulation
 * - Attribute observation and handling
 * - Slot validation
 * - Lifecycle management
 * - Error handling
 * 
 * ## Key Features:
 * 
 * 1. **Attribute Handling**: Automatic observation and callback execution
 * 2. **Slot Validation**: Required slots, deprecated warnings, element type checking
 * 3. **Lifecycle Hooks**: beforeConnect, afterConnect, onReady
 * 4. **Error Management**: Centralized error handling with custom events
 * 
 * ## Usage:
 * ```typescript
 * const element = createCustomElement({
 *   tagName: 'my-component',
 *   slots: {
 *     headline: { required: true, allowedElements: ['h2', 'h3'] },
 *     content: { allowedElements: ['div', 'p'] }
 *   },
 *   attributes: [{
 *     name: 'theme',
 *     handler: (ref, oldValue, newValue) => {
 *       // Handle theme change
 *     }
 *   }],
 *   createComponent: (host) => {
 *     // Create and return component
 *   }
 * });
 * ```
 */
import StylesTemplate from '../utilities/styles';

interface AttributeConfig {
  name: string;
  handler: (element: ElementRef, oldValue: string, newValue: string) => void;
}

interface ElementRef {
  element: HTMLElement;
  styles: string;
  events?: Record<string, Function>;
}

interface SlotConfig {
  required?: boolean;
  deprecated?: string;
  allowedElements?: string[];
}

interface SlotValidationError {
  slot: string;
  error: 'missing' | 'deprecated' | 'invalid-elements';
  message: string;
  invalidElements?: Element[];
}

interface ComponentLifecycle {
  beforeConnect?: (ref: ElementRef, shadow: ShadowRoot) => void;
  afterConnect?: (ref: ElementRef, shadow: ShadowRoot) => void;
  onReady?: (ref: ElementRef, shadow: ShadowRoot) => void;
}

interface ComponentConfig extends ComponentLifecycle {
  tagName: string;
  attributes?: AttributeConfig[];
  slots?: Record<string, SlotConfig>;
  createComponent: (host: HTMLElement) => ElementRef;
}

// Store the config on the constructor itself
const ComponentConfig = (config: ComponentConfig) => {
  return function <T extends typeof BaseComponent>(constructor: T) {
    constructor.componentConfig = config;
    return constructor;
  };
};

class BaseComponent extends HTMLElement {
  static componentConfig: ComponentConfig;

  protected shadow: ShadowRoot;
  protected elementRef: ElementRef | null = null;
  protected config: ComponentConfig;

  constructor() {
    super();

    const constructor = this.constructor as typeof BaseComponent;
    this.config = constructor.componentConfig;

    if (!this.config) {
      throw new Error(
        'Component config not found. Did you forget to use the @Component decorator?',
      );
    }

    this.shadow = this.attachShadow({ mode: 'open' });
    this.validateConfig();
  }

  static get observedAttributes(): string[] {
    return this.componentConfig?.attributes?.map((attr) => attr.name) || [];
  }

  connectedCallback(): void {
    try {
      this.initializeComponent();
    } catch (error) {
      this.handleError('Failed to initialize component', error);
    }
  }

  disconnectedCallback(): void {
    this.cleanup();
  }

  attributeChangedCallback(
    name: string,
    oldValue: string,
    newValue: string,
  ): void {
    if (oldValue === newValue) return;

    try {
      this.handleAttributeChange(name, oldValue, newValue);
    } catch (error) {
      this.handleError(`Failed to handle attribute change: ${name}`, error);
    }
  }

  protected initializeComponent(): void {
    try {
      this.validateSlots();

      const componentRef = this.config.createComponent(this);

      if (!componentRef || !componentRef.element) {
        throw new Error(
          'Component creation failed: Invalid component reference',
        );
      }

      this.elementRef = componentRef;
      this.setupShadowDom(componentRef);
      this.afterInit();
    } catch (error) {
      this.handleError('Failed to initialize component', error);
    }
  }

  protected setupShadowDom(component: ElementRef): void {
    this.shadow.appendChild(
      StylesTemplate({ styles: component.styles }).content.cloneNode(true),
    );
    this.shadow.appendChild(component.element);
  }

  protected validateConfig(): void {
    const requiredFields: (keyof ComponentConfig)[] = [
      'tagName',
      'createComponent',
    ];

    requiredFields.forEach((field) => {
      if (!this.config[field]) {
        throw new Error(`Missing required config field: ${field}`);
      }
    });

    if (this.config.attributes) {
      this.config.attributes.forEach((attr) => {
        if (!attr.name || !attr.handler) {
          throw new Error(
            'Invalid attribute config: requires name and handler',
          );
        }
      });
    }
  }

  protected async afterInit(): Promise<void> {
    if (!this.elementRef) {
      this.handleError('Cannot initialize - missing element reference', null);
      return;
    }

    await this.executeLifecycleCallbacks();
  }

  protected handleAttributeChange(
    name: string,
    oldValue: string,
    newValue: string,
  ): void {
    if (!this.elementRef) return;

    const handler = this.config.attributes?.find(
      (attr) => attr.name === name,
    )?.handler;

    if (handler) {
      handler(this.elementRef, oldValue, newValue);
    }
  }

  protected cleanup(): void {
    this.elementRef = null;
  }

  protected handleError(message: string, error: unknown): void {
    console.error(`[${this.config.tagName}]`, message, error);
    this.dispatchEvent(
      new CustomEvent('component-error', {
        detail: { message, error },
        bubbles: true,
        composed: true,
      }),
    );
  }

  private validateSlots(): void {
    if (!this.config.slots) return;

    const errors: SlotValidationError[] = [];

    Object.entries(this.config.slots).forEach(([name, config]) => {
      const type = name
        .replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`)
        .replace(/^-/, '');

      if (config.required) {
        const slotElement = this.querySelector(`[slot="${type}"]`);
        if (!slotElement) {
          errors.push({
            slot: name,
            error: 'missing',
            message: `Required slot "${type}" is missing`,
          });
        }
      }

      if (config.deprecated) {
        const slotElement = this.querySelector(`[slot="${type}"]`);
        if (slotElement) {
          errors.push({
            slot: name,
            error: 'deprecated',
            message: `Slot "${type}" is deprecated. ${config.deprecated}`,
          });
        }
      }

      if (config.allowedElements) {
        const slotElements = Array.from(
          this.querySelectorAll(`[slot="${type}"]`),
        );
        const invalidElements = slotElements.filter(
          (element) =>
            !config.allowedElements!.includes(element.tagName.toLowerCase()),
        );

        if (invalidElements.length > 0) {
          errors.push({
            slot: name,
            error: 'invalid-elements',
            message: `Slot "${type}" contains invalid elements. Allowed: ${config.allowedElements.join(
              ', ',
            )}`,
            invalidElements,
          });
        }
      }
    });

    if (errors.length > 0) {
      this.handleError('Slot validation failed', errors);

      errors.forEach((error) => {
        console.warn(`[${this.config.tagName}]`, error.message, error);
      });
    }
  }

  private async executeLifecycleCallbacks(): Promise<void> {
    const lifecycleMethods = [
      'beforeConnect',
      'afterConnect',
      'onReady',
    ] as const;

    for (const method of lifecycleMethods) {
      await this.executeCallback(method);
    }
  }

  private async executeCallback(name: keyof ComponentLifecycle): Promise<void> {
    const callback = this.config[name];

    if (!callback) {
      return;
    }

    try {
      await Promise.resolve(callback(this.elementRef!, this.shadow));
    } catch (error) {
      this.handleError(`Failed to execute ${name} callback`, error);
    }
  }

  public getRef(): ElementRef | null {
    return this.elementRef;
  }
}

/**
 * Factory function to create a custom element class.
 * 
 * @param config - Component configuration including tagName, slots, attributes, and lifecycle hooks
 * @returns Custom element class that extends BaseComponent
 * 
 * @example
 * ```typescript
 * export default () => {
 *   Register.registerWebComponent({
 *     name: tagName,
 *     element: createCustomElement({
 *       tagName,
 *       slots,
 *       attributes,
 *       createComponent
 *     })
 *   });
 * };
 * ```
 */
const createCustomElement = (config: ComponentConfig): typeof BaseComponent => {
  @ComponentConfig(config)
  class Component extends BaseComponent {
    constructor() {
      super();
    }
  }

  return Component;
};

export {
  createCustomElement,
  type ElementRef,
  type ComponentConfig,
  type AttributeConfig,
};
