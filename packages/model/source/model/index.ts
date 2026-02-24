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
import { stylesTemplate } from '../utilities/styles';
import { createLogger, type Logger } from '../utilities/debug';
import {
  resolveAttributeConfigs,
  defineObservedAttributes,
  type ReactiveAttributeMap,
  type ResolvedAttributeConfig,
} from '../attributes/config';
import { ChangeDetector } from '../attributes/change-detection';
import { AttributeTypeError, AttributeValidationError } from '../attributes/errors';
import type {
  SlotConfig,
  SlotValidationError,
  SlotValidationResult,
  ComponentEventDetail,
  ComponentReadyDetail,
  ComponentErrorDetail,
  ElementRef
} from '../_types';
import {
  validateAllSlots,
  validateSlotElements,
} from '../slots/slot-validation';

interface AttributeConfig {
  name: string;
  handler: (element: ElementRef, oldValue: string, newValue: string) => void;
}

interface ComponentLifecycle {
  beforeConnect?: (ref: ElementRef, shadow: ShadowRoot) => void;
  afterConnect?: (ref: ElementRef, shadow: ShadowRoot) => void;
  onReady?: (ref: ElementRef, shadow: ShadowRoot) => void;
}

interface ComponentConfig extends ComponentLifecycle {
  tagName: string;
  attributes?: AttributeConfig[];
  reactiveAttributes?: ReactiveAttributeMap;
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

/**
 * Base class for all web components created by the Model system.
 * Extends HTMLElement with shadow DOM support, attribute observation,
 * slot validation, and lifecycle management.
 *
 * @internal This class is not meant to be extended directly.
 * Use `createCustomElement` to create components.
 */
class BaseComponent extends HTMLElement {
  static componentConfig: ComponentConfig;

  protected shadow: ShadowRoot;
  protected elementRef: ElementRef | null = null;
  protected config: ComponentConfig;
  protected _logger: Logger;

  protected _resolvedReactiveAttrs: ResolvedAttributeConfig[] = [];
  protected _changeDetector: ChangeDetector = new ChangeDetector();
  protected _reactiveValues: Map<string, unknown> = new Map();
  private _isReflecting = false;

  constructor() {
    super();

    const constructor = this.constructor as typeof BaseComponent;
    this.config = constructor.componentConfig;

    if (!this.config) {
      throw new Error(
        'Component config not found. Did you forget to use the @Component decorator?',
      );
    }

    this._logger = createLogger(this.config.tagName);
    this.shadow = this.attachShadow({ mode: 'open' });
    this.validateConfig();
    this.setupReactiveAttributes();
  }

  static get observedAttributes(): string[] {
    const handlerNames =
      this.componentConfig?.attributes?.map((attr) => attr.name) || [];
    const reactiveNames = this.componentConfig?.reactiveAttributes
      ? defineObservedAttributes(this.componentConfig.reactiveAttributes)
      : [];
    return [...new Set([...handlerNames, ...reactiveNames])];
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
      this.setupSlotObservers();
      this.afterInit();
    } catch (error) {
      this.handleError('Failed to initialize component', error);
    }
  }

  protected setupShadowDom(component: ElementRef): void {
    this.shadow.appendChild(
      stylesTemplate({ styles: component.styles || '' }).content.cloneNode(true),
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

    // Dispatch umdComponent:ready event after all lifecycle callbacks complete
    this.dispatchComponentEvent<ComponentReadyDetail>('umdComponent:ready', {
      shadowRoot: this.shadow,
      ref: this.elementRef,
    });
  }

  protected handleAttributeChange(
    name: string,
    oldValue: string,
    newValue: string,
  ): void {
    // Existing handler system
    if (this.elementRef) {
      const handler = this.config.attributes?.find(
        (attr) => attr.name === name,
      )?.handler;

      if (handler) {
        handler(this.elementRef, oldValue, newValue);
      }
    }

    // Reactive attribute system — update property from attribute
    if (!this._isReflecting) {
      const resolved = this._resolvedReactiveAttrs.find(
        (r) => r.attributeName === name,
      );
      if (resolved) {
        let converted: unknown;
        try {
          converted = resolved.converter.fromAttribute(newValue, name);
        } catch (err) {
          throw new AttributeTypeError(
            name,
            resolved.type ?? 'unknown',
            newValue,
            this.config.tagName,
          );
        }
        const value =
          converted !== undefined ? converted : resolved.defaultValue;

        if (value !== undefined && resolved.validate) {
          const error = resolved.validate(value);
          if (error) {
            throw new AttributeValidationError(name, error, this.config.tagName);
          }
        }

        // Capture old value before write
        const oldValue = this._reactiveValues.get(resolved.propertyName);
        const equalityOverride = resolved.hasChanged
          ? (prev: unknown, next: unknown) => !resolved.hasChanged!(next, prev)
          : undefined;
        const changed = this._changeDetector.set(resolved.propertyName, value, equalityOverride);

        // Write directly to avoid reflection loop
        this._reactiveValues.set(resolved.propertyName, value);

        if (changed && resolved.onChange) {
          resolved.onChange(this, value, oldValue);
        }
      }
    }
  }

  protected setupReactiveAttributes(): void {
    if (!this.config.reactiveAttributes) return;

    this._resolvedReactiveAttrs = resolveAttributeConfigs(
      this.config.reactiveAttributes,
    );

    for (const resolved of this._resolvedReactiveAttrs) {
      const { propertyName, defaultValue } = resolved;

      // Seed the initial value from the attribute (if present) or default
      if (resolved.attributeName !== false) {
        const raw = this.getAttribute(resolved.attributeName);
        if (raw !== null) {
          const converted = resolved.converter.fromAttribute(
            raw,
            resolved.attributeName,
          );
          this._reactiveValues.set(
            propertyName,
            converted !== undefined ? converted : defaultValue,
          );
        } else if (defaultValue !== undefined) {
          this._reactiveValues.set(propertyName, defaultValue);
        }
      } else if (defaultValue !== undefined) {
        this._reactiveValues.set(propertyName, defaultValue);
      }

      // Install property accessor on the instance
      Object.defineProperty(this, propertyName, {
        get: () => this._reactiveValues.get(propertyName),
        set: (value: unknown) => {
          if (value !== undefined && resolved.validate) {
            const error = resolved.validate(value);
            if (error) {
              const attrName =
                resolved.attributeName !== false
                  ? resolved.attributeName
                  : propertyName;
              throw new AttributeValidationError(attrName, error, this.config.tagName);
            }
          }

          const oldValue = this._reactiveValues.get(propertyName);
          const equalityOverride = resolved.hasChanged
            ? (prev: unknown, next: unknown) => !resolved.hasChanged!(next, prev)
            : undefined;
          const changed = this._changeDetector.set(propertyName, value, equalityOverride);
          if (!changed) return;

          this._reactiveValues.set(propertyName, value);

          // Reflect to attribute if configured
          if (resolved.reflect && resolved.attributeName !== false) {
            this._isReflecting = true;
            try {
              const attrValue = resolved.converter.toAttribute(value);
              if (attrValue === null) {
                this.removeAttribute(resolved.attributeName);
              } else {
                this.setAttribute(resolved.attributeName, attrValue);
              }
            } finally {
              this._isReflecting = false;
            }
          }

          if (resolved.onChange) {
            resolved.onChange(this, value, oldValue);
          }
        },
        configurable: true,
        enumerable: true,
      });
    }
  }

  private _slotCleanups: (() => void)[] = [];

  protected cleanup(): void {
    for (const fn of this._slotCleanups) fn();
    this._slotCleanups = [];
    this.elementRef = null;
  }

  /**
   * Helper method to dispatch component events with consistent structure
   */
  protected dispatchComponentEvent<T extends ComponentEventDetail>(
    eventName: string,
    detail: Omit<T, 'tagName' | 'element' | 'timestamp'>,
  ): void {
    const fullDetail = {
      ...detail,
      tagName: this.config.tagName,
      element: this,
      timestamp: Date.now(),
    } as unknown as T;

    this.dispatchEvent(
      new CustomEvent<T>(eventName, {
        detail: fullDetail,
        bubbles: true,
        composed: true,
      }),
    );
  }

  protected handleError(message: string, error: unknown): void {
    this._logger.error(message, error);

    // Determine error type based on component state and message
    const errorType = this.elementRef
      ? 'runtime'
      : message.toLowerCase().includes('validation')
      ? 'validation'
      : 'initialization';

    this.dispatchComponentEvent<ComponentErrorDetail>('umdComponent:error', {
      type: errorType,
      message,
      details: error,
    });
  }

  private validateSlots(): void {
    if (!this.config.slots) return;

    const result = validateAllSlots(this, this.config.slots);
    this.reportSlotErrors(result);
  }

  private reportSlotErrors(result: SlotValidationResult): void {
    if (result.isValid) return;

    this.handleError('Slot validation failed', result.errors);

    if (result.errors.length === 1) {
      this._logger.warn(result.errors[0].message);
    } else {
      this._logger.group(`${result.errors.length} slot validation warnings`);
      for (const error of result.errors) {
        this._logger.warn(error.message);
      }
      this._logger.groupEnd();
    }
  }

  private setupSlotObservers(): void {
    if (!this.config.slots) return;

    const slots = this.shadow.querySelectorAll('slot');
    if (slots.length === 0) return;

    const configKeys = Object.keys(this.config.slots);
    const kebabToConfig = new Map<string, { key: string; config: SlotConfig }>();
    for (const key of configKeys) {
      const kebab = key
        .replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`)
        .replace(/^-/, '');
      kebabToConfig.set(kebab, { key, config: this.config.slots[key] });
    }

    slots.forEach((slotEl) => {
      const slotName = slotEl.getAttribute('name') || '';
      const entry = kebabToConfig.get(slotName);
      if (!entry) return;

      const handler = () => {
        const assigned = slotEl.assignedElements({ flatten: true });
        const result = validateSlotElements(entry.key, assigned, entry.config);
        this.reportSlotErrors(result);
      };

      slotEl.addEventListener('slotchange', handler);
      this._slotCleanups.push(() =>
        slotEl.removeEventListener('slotchange', handler),
      );
    });
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
  BaseComponent,
  type ComponentConfig,
  type AttributeConfig,
};
