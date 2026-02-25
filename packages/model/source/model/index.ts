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
import { UpdateScheduler } from './update-cycle';
import type {
  SlotConfig,
  SlotValidationError,
  SlotValidationResult,
  ComponentEventDetail,
  ComponentReadyDetail,
  ComponentErrorDetail,
  ElementRef,
  PropertyValues,
  ReactiveController,
  ReactiveControllerHost,
} from '../_types';
import {
  validateAllSlots,
  validateSlotElements,
} from '../slots/slot-validation';
import {
  createSlotchangeHandler,
  type SlotchangeEvent,
} from '../slots/slot-events';
import {
  querySlottedElements,
  querySlottedElement,
  hasSlottedContent,
} from '../slots/slot-query';

interface AttributeConfig {
  name: string;
  handler: (element: ElementRef, oldValue: string, newValue: string) => void;
}

interface ComponentLifecycle {
  firstConnected?: (host: HTMLElement, shadow: ShadowRoot) => void;
  willFirstUpdate?: (host: HTMLElement, shadow: ShadowRoot) => void;
  beforeConnect?: (ref: ElementRef, shadow: ShadowRoot) => void;
  afterConnect?: (ref: ElementRef, shadow: ShadowRoot) => void;
  onReady?: (ref: ElementRef, shadow: ShadowRoot) => void;
  willUpdate?: (host: HTMLElement, changedProperties: PropertyValues) => void;
  update?: (host: HTMLElement, changedProperties: PropertyValues) => void;
  updated?: (host: HTMLElement, changedProperties: PropertyValues) => void;
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
class BaseComponent extends HTMLElement implements ReactiveControllerHost {
  static componentConfig: ComponentConfig;

  protected shadow: ShadowRoot;
  protected elementRef: ElementRef | null = null;
  protected config: ComponentConfig;
  protected _logger: Logger;

  protected _resolvedReactiveAttrs: ResolvedAttributeConfig[] = [];
  protected _changeDetector: ChangeDetector = new ChangeDetector();
  protected _reactiveValues: Map<string, unknown> = new Map();
  private _isReflecting = false;
  private _hasConnected = false;
  private _hasFirstUpdated = false;
  private _updateScheduler: UpdateScheduler;
  private _changedProperties: PropertyValues = new Map();
  private _isUpdating = false;
  private _pendingPreUpgrade: Map<string, unknown> | null = null;

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
    this._updateScheduler = new UpdateScheduler(() => this._performUpdate());
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
      this.applyPreUpgradeProperties();
      if (!this._hasConnected) {
        this._hasConnected = true;
        this.executeFirstConnected();
      }
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

      if (!this._hasFirstUpdated) {
        this._hasFirstUpdated = true;
        this.executeWillFirstUpdate();
      }

      const componentRef = this.config.createComponent(this);

      if (!componentRef || !componentRef.element) {
        throw new Error(
          'Component creation failed: Invalid component reference',
        );
      }

      this.elementRef = componentRef;
      this.setupShadowDom(componentRef);
      this.setupSlotObservers();
      this.notifyControllers('hostConnected');

      if (this._changedProperties.size > 0) {
        this._updateScheduler.schedule();
      }

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

        if (changed) {
          if (resolved.onChange) {
            resolved.onChange(this, value, oldValue);
          }
          this.requestUpdate(resolved.propertyName, oldValue);
        }
      }
    }
  }

  /**
   * Capture a property value set on the instance before upgrade.
   * Deletes the instance property so the class accessor takes precedence,
   * then returns the captured value for re-application.
   */
  private capturePreUpgradeProperty(propertyName: string): { value: unknown; captured: boolean } {
    if (this.hasOwnProperty(propertyName)) {
      const value = (this as any)[propertyName];
      delete (this as any)[propertyName];
      return { value, captured: true };
    }
    return { value: undefined, captured: false };
  }

  /**
   * Apply pre-upgrade property values through reactive setters.
   * Called in connectedCallback after all attributeChangedCallback
   * calls have completed during upgrade.
   */
  private applyPreUpgradeProperties(): void {
    if (!this._pendingPreUpgrade) return;
    const pending = this._pendingPreUpgrade;
    this._pendingPreUpgrade = null;
    for (const [propertyName, value] of pending) {
      (this as any)[propertyName] = value;
    }
  }

  protected setupReactiveAttributes(): void {
    if (!this.config.reactiveAttributes) return;

    this._resolvedReactiveAttrs = resolveAttributeConfigs(
      this.config.reactiveAttributes,
    );

    for (const resolved of this._resolvedReactiveAttrs) {
      const { propertyName, defaultValue } = resolved;

      // Capture pre-upgrade instance property before defining accessor
      const preUpgrade = this.capturePreUpgradeProperty(propertyName);

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

          this.requestUpdate(propertyName, oldValue);
        },
        configurable: true,
        enumerable: true,
      });

      // Defer pre-upgrade value re-application to connectedCallback
      // so it runs after attributeChangedCallback during upgrade
      if (preUpgrade.captured) {
        if (!this._pendingPreUpgrade) {
          this._pendingPreUpgrade = new Map();
        }
        this._pendingPreUpgrade.set(propertyName, preUpgrade.value);
      }
    }
  }

  private _slotCleanups: (() => void)[] = [];
  private _controllers: Set<ReactiveController> = new Set();

  addController(controller: ReactiveController): void {
    this._controllers.add(controller);
    if (this.isConnected && this.elementRef) {
      controller.hostConnected?.();
    }
  }

  removeController(controller: ReactiveController): void {
    this._controllers.delete(controller);
  }

  requestUpdate(name?: string, oldValue?: unknown): void {
    if (name !== undefined && !this._changedProperties.has(name)) {
      this._changedProperties.set(name, oldValue);
    }
    if (!this._hasConnected) return;
    this._updateScheduler.schedule();
  }

  get updateComplete(): Promise<boolean> {
    return this._updateScheduler.updateComplete;
  }

  protected willUpdate(_changedProperties: PropertyValues): void {
    this.config.willUpdate?.(this, _changedProperties);
  }

  protected update(_changedProperties: PropertyValues): void {
    this.config.update?.(this, _changedProperties);
  }

  protected updated(_changedProperties: PropertyValues): void {
    this.config.updated?.(this, _changedProperties);
  }

  private _performUpdate(): boolean {
    if (this._isUpdating) return true;
    this._isUpdating = true;

    const changedProperties = this._changedProperties;
    this._changedProperties = new Map();

    try {
      for (const controller of this._controllers) {
        controller.hostUpdate?.();
      }
      this.willUpdate(changedProperties);
      this.update(changedProperties);
      this.updated(changedProperties);
      for (const controller of this._controllers) {
        controller.hostUpdated?.();
      }
      return true;
    } catch (error) {
      this.handleError('Error during update cycle', error);
      return false;
    } finally {
      this._isUpdating = false;
    }
  }

  private notifyControllers(method: 'hostConnected' | 'hostDisconnected'): void {
    for (const controller of this._controllers) {
      try {
        controller[method]?.();
      } catch (error) {
        this.handleError(`Controller ${method} failed`, error);
      }
    }
  }

  querySlot(slotName?: string, selector?: string): Element[] {
    return querySlottedElements(this, slotName, { selector, flatten: true });
  }

  querySlotElement<T extends Element = Element>(
    slotName?: string,
    selector?: string,
  ): T | null {
    return querySlottedElement<T>(this, slotName, selector);
  }

  hasSlotContent(slotName?: string): boolean {
    return hasSlottedContent(this, slotName);
  }

  protected cleanup(): void {
    this.notifyControllers('hostDisconnected');
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

    const configKeys = Object.keys(this.config.slots);
    const kebabToConfig = new Map<string, { key: string; config: SlotConfig }>();
    for (const key of configKeys) {
      const kebab = key
        .replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`)
        .replace(/^-/, '');
      kebabToConfig.set(kebab, { key, config: this.config.slots[key] });
    }

    const handler = createSlotchangeHandler(
      this,
      (event: SlotchangeEvent) => {
        const slotName = event.slotName ?? '';
        const entry = kebabToConfig.get(slotName);
        if (!entry) return;

        const result = validateSlotElements(entry.key, event.elements, entry.config);
        this.reportSlotErrors(result);
      },
      { flatten: true },
    );

    handler.connect();
    this._slotCleanups.push(() => handler.disconnect());
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

  private async executeCallback(name: 'beforeConnect' | 'afterConnect' | 'onReady'): Promise<void> {
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

  public getShadowRoot(): ShadowRoot {
    return this.shadow;
  }

  private executeFirstConnected(): void {
    try {
      if (this.config.firstConnected) {
        this.config.firstConnected(this, this.shadow);
      }
      this.firstConnected();
    } catch (error) {
      this.handleError('Failed to execute firstConnected hook', error);
    }
  }

  protected firstConnected(): void {
    // No-op. Override in subclasses.
  }

  private executeWillFirstUpdate(): void {
    try {
      if (this.config.willFirstUpdate) {
        this.config.willFirstUpdate(this, this.shadow);
      }
      this.willFirstUpdate();
    } catch (error) {
      this.handleError('Failed to execute willFirstUpdate hook', error);
    }
  }

  protected willFirstUpdate(): void {
    // No-op. Override in subclasses.
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

export { IntersectionController, MediaQueryController } from './controllers';
export type { ReactiveController, ReactiveControllerHost } from '../_types';

export {
  registerComponent,
  registerComponents,
  isComponentRegistered,
  whenComponentDefined,
  getComponentConstructor,
  type RegisterOptions,
} from './registration';
export { ComponentRegistrationError, BatchRegistrationError } from './errors';
