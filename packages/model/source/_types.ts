/**
 * Type Definitions for UMD Web Model Library
 *
 * THIS FILE MUST HAVE ZERO IMPORTS to avoid circular dependencies.
 * All shared types used by the model system are defined here.
 *
 * ## Type Categories:
 * - Core interfaces (ElementRef, ComponentRef)
 * - Slot configuration types
 * - Event detail types
 * - Component configuration types
 * - Function signatures
 */

// ============================================================================
// CORE INTERFACES
// ============================================================================

/**
 * Base element reference returned by component factories
 */
export interface ElementRef {
  /** The DOM element or fragment */
  element: HTMLElement | DocumentFragment;
  /** Component styles */
  styles?: string;
  /** Component events/methods */
  events?: {
    load?: () => void;
    destroy?: () => void;
    recalculate?: () => void;
    resize?: () => void;
    [key: string]: any;
  };
}

/**
 * Component reference type
 * Duplicates ElementRef structure to avoid type alias issues
 */
export interface ComponentRef {
  /** The DOM element or fragment */
  element: HTMLElement | DocumentFragment;
  /** Component styles */
  styles?: string;
  /** Component events/methods */
  events?: {
    load?: () => void;
    destroy?: () => void;
    recalculate?: () => void;
    resize?: () => void;
    [key: string]: any;
  };
}

// ============================================================================
// SLOT CONFIGURATION TYPES
// ============================================================================

/**
 * Configuration for a single slot
 */
export interface SlotConfig {
  /** Whether this slot is required */
  required?: boolean;
  /** Allowed HTML elements for this slot */
  allowedElements?: string[];
  /** Deprecation message if this slot is deprecated */
  deprecated?: string;
  /** Replacement slot name if deprecated */
  replacement?: string;
  /** Disallowed HTML elements for this slot */
  disallowedElements?: string[];
  /** Custom validation function — return true to pass, false or string message to fail */
  validate?: (elements: Element[]) => boolean | string;
  /** Minimum number of slotted elements */
  minItems?: number;
  /** Maximum number of slotted elements */
  maxItems?: number;
}

/**
 * Complete slot configuration for a component
 */
export type SlotConfiguration = Record<string, SlotConfig>;

// ============================================================================
// SLOT VALIDATION TYPES
// ============================================================================

export type SlotErrorType =
  | 'missing'
  | 'deprecated'
  | 'invalid-elements'
  | 'disallowed-elements'
  | 'min-items'
  | 'max-items'
  | 'custom-validation';

export interface SlotValidationError {
  slot: string;
  error: SlotErrorType;
  message: string;
  invalidElements?: Element[];
}

export interface SlotValidationResult {
  isValid: boolean;
  errors: SlotValidationError[];
}

// ============================================================================
// EVENT DETAIL TYPES
// ============================================================================

/**
 * Base detail for all component events
 */
export interface ComponentEventDetail {
  /** Component tag name */
  tagName: string;
  /** Component element reference */
  element: HTMLElement;
  /** Timestamp of event */
  timestamp?: number;
}

/**
 * Detail for component ready event
 */
export interface ComponentReadyDetail extends ComponentEventDetail {
  /** Shadow root reference */
  shadowRoot: ShadowRoot;
  /** Component reference with methods */
  ref?: any;
}

/**
 * Detail for component error event
 */
export interface ComponentErrorDetail extends ComponentEventDetail {
  /** Error type */
  type: 'validation' | 'initialization' | 'runtime';
  /** Error message */
  message: string;
  /** Optional error details */
  details?: any;
}

/**
 * Detail for component resize event
 */
export interface ComponentResizeDetail extends ComponentEventDetail {
  /** Previous dimensions */
  previousSize?: { width: number; height: number };
  /** Current dimensions */
  currentSize: { width: number; height: number };
  /** Source of resize trigger */
  source?: 'attribute' | 'window' | 'manual';
}

// ============================================================================
// FUNCTION SIGNATURES
// ============================================================================

/**
 * Function signature for creating a component from an HTML element
 */
export type CreateComponentFunction = (element: HTMLElement) => ComponentRef;

/**
 * Function signature for component registration
 */
export type ComponentRegistration = () => void;

// ============================================================================
// COMPONENT CONFIGURATION TYPES
// ============================================================================

/**
 * Configuration passed to Model.createCustomElement
 */
export interface ComponentConfiguration {
  /** Component tag name */
  tagName: string;
  /** Slot configuration */
  slots?: SlotConfiguration;
  /** Component creation function */
  createComponent: CreateComponentFunction;
  /** Attribute handlers - using any to avoid circular dependency */
  attributes?: any | any[];
  /** Reactive attribute map for declarative type-safe attributes */
  reactiveAttributes?: Record<string, {
    attribute?: string | false;
    type?: 'string' | 'number' | 'boolean' | 'object' | 'array';
    reflect?: boolean;
    converter?: { fromAttribute: (value: string | null, name: string) => unknown; toAttribute: (value: unknown) => string | null };
    defaultValue?: unknown;
    validate?: (value: unknown) => string | void;
    onChange?: (host: HTMLElement, newValue: unknown, oldValue: unknown) => void;
    hasChanged?: (newValue: unknown, oldValue: unknown) => boolean;
  }>;
  /** Hook called once on first connection, before component DOM is created */
  firstConnected?: (host: HTMLElement, shadow: ShadowRoot) => void;
  /** Hook called once before the first createComponent call */
  willFirstUpdate?: (host: HTMLElement, shadow: ShadowRoot) => void;
  /** Hook called before shadow DOM connection */
  beforeConnect?: (ref: ComponentRef, shadow: ShadowRoot) => void;
  /** Hook called after shadow DOM connection */
  afterConnect?: (ref: ComponentRef, shadow?: ShadowRoot) => void;
  /** Hook called when component is ready */
  onReady?: (ref: ComponentRef) => void;
}

/**
 * Attribute handler element reference
 * Duplicates ElementRef structure to avoid type alias issues
 */
export interface AttributeElementRef {
  /** The DOM element or fragment */
  element: HTMLElement | DocumentFragment;
  /** Component styles */
  styles?: string;
  /** Component events/methods */
  events?: {
    load?: () => void;
    destroy?: () => void;
    recalculate?: () => void;
    resize?: () => void;
    [key: string]: any;
  };
}

// ============================================================================
// CONTROLLER INTERFACES
// ============================================================================

export type PropertyValues<T = any> = Map<keyof T & string, unknown>;

export interface ReactiveController {
  hostConnected?(): void;
  hostDisconnected?(): void;
  hostUpdate?(): void;
  hostUpdated?(): void;
}

export interface ReactiveControllerHost extends HTMLElement {
  addController(controller: ReactiveController): void;
  removeController(controller: ReactiveController): void;
  requestUpdate(name?: string, oldValue?: unknown): void;
  readonly updateComplete: Promise<boolean>;
}
