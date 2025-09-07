/**
 * Root Type Definitions for UMD Web Components
 * 
 * THIS FILE MUST HAVE ZERO IMPORTS to avoid circular dependencies.
 * All shared types are defined here and imported by other modules.
 * 
 * ## Type Categories:
 * - Core interfaces (ElementRef, ComponentRef)
 * - Slot configuration types
 * - Event detail types
 * - Component configuration types
 * - Component property interfaces
 * - Function signatures
 * - Global type augmentations
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
}

/**
 * Complete slot configuration for a component
 */
export type SlotConfiguration = Record<string, SlotConfig>;

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

/**
 * Type for component factory functions used in composite components
 */
export type ComponentFactory<TProps, TReturn = ComponentRef> = (
  props: TProps,
) => TReturn;

// ============================================================================
// COMPONENT PROPERTY INTERFACES
// ============================================================================

/**
 * Theme properties shared by most components
 */
export interface ThemeProps {
  /** Light theme variant */
  isThemeLight?: boolean;
  /** Dark theme variant */
  isThemeDark?: boolean;
  /** Maryland brand theme */
  isThemeMaryland?: boolean;
}

/**
 * Visual state properties
 */
export interface VisualStateProps {
  /** Component is visually open */
  isVisualOpen?: boolean;
  /** Show icon indicator */
  isShowIcon?: boolean;
  /** Transparent background */
  isTransparent?: boolean;
  /** Component has border */
  isBordered?: boolean;
}

/**
 * Layout properties
 */
export interface LayoutProps {
  /** Fixed positioning */
  isFixed?: boolean;
  /** Hidden state */
  isHidden?: boolean;
  /** Alignment options */
  isAlignmentRight?: boolean;
  /** Full image layout */
  isFullImage?: boolean;
}

/**
 * Base content properties used by text-based components
 */
export interface BaseContentProps {
  /** Headline element */
  headline?: HTMLElement | null;
  /** Text content element */
  text?: HTMLElement | null;
  /** Action elements */
  actions?: HTMLElement | null;
}

/**
 * Extended content properties with additional slots
 */
export interface ExtendedContentProps extends BaseContentProps {
  /** Eyebrow text element */
  eyebrow?: HTMLElement | null;
  /** Image element */
  image?: HTMLElement | null;
  /** Generic content element */
  content?: HTMLElement | null;
}

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
  /** Hook called before shadow DOM connection */
  beforeConnect?: (ref: ComponentRef, shadow: ShadowRoot) => void;
  /** Hook called after shadow DOM connection */
  afterConnect?: (ref: ComponentRef, shadow?: ShadowRoot) => void;
  /** Hook called when component is ready */
  onReady?: (ref: ComponentRef) => void;
}

/**
 * Event handler types for component events
 */
export interface ComponentEvents {
  callback?: (shadow?: ShadowRoot) => void;
  close?: (options?: { hasAnimation?: boolean }) => void;
  hide?: () => void;
  load?: () => void;
  loadAnimation?: () => void;
  open?: (options?: { hasAnimation?: boolean }) => void;
  resize?: () => void;
  setPosition?: (options?: { value?: number | null }) => void;
  show?: () => void;
  size?: () => void;
}

/**
 * Extended component reference with typed events
 */
export interface TypedComponentRef {
  /** The DOM element or fragment */
  element: HTMLElement | DocumentFragment;
  /** Component styles */
  styles?: string;
  /** Typed component events */
  events?: ComponentEvents & Record<string, Function>;
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
// GLOBAL TYPE AUGMENTATIONS
// ============================================================================

/**
 * Global type augmentation for component events
 */
declare global {
  interface HTMLElementEventMap {
    'component:ready': CustomEvent<ComponentReadyDetail>;
    'component:error': CustomEvent<ComponentErrorDetail>;
    'component:resize': CustomEvent<ComponentResizeDetail>;
  }
}