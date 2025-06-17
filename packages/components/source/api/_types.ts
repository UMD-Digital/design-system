/**
 * Common Type Definitions for UMD Web Components
 *
 * This file contains shared type definitions used across all components
 * to ensure consistency and reduce duplication.
 *
 * This is a pure type declaration file - no runtime code should be included here.
 * All implementation functions and constants have been moved to their appropriate modules.
 */

import type { Model, Attributes } from '../model/index';

/**
 * Base component reference returned by all component factories
 */
export type ComponentRef = Model.ElementRef;

/**
 * Function signature for creating a component from an HTML element
 */
export type CreateComponentFunction = (element: HTMLElement) => ComponentRef;

/**
 * Function signature for component registration
 */
export type ComponentRegistration = () => void;

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
}

/**
 * Map of slot names to their configurations
 */
export type SlotConfiguration = Record<string, SlotConfig>;

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
  /** Attribute handlers */
  attributes?:
    | Attributes.AttributeHandlerTypes.Config
    | Attributes.AttributeHandlerTypes.Config[];
  /** Hook called before shadow DOM connection */
  beforeConnect?: (ref: ComponentRef, shadow: ShadowRoot) => void;
  /** Hook called after shadow DOM connection */
  afterConnect?: (ref: ComponentRef, shadow?: ShadowRoot) => void;
  /** Hook called when component is ready */
  onReady?: (ref: ComponentRef) => void;
}

/**
 * Type alias for attribute handler element reference
 */
export type AttributeElementRef = Parameters<
  Parameters<typeof Attributes.handler.observe.resize>[0]['callback']
>[0];

/**
 * Type for component factory functions used in composite components
 */
export type ComponentFactory<TProps, TReturn = ComponentRef> = (
  props: TProps,
) => TReturn;

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
export interface TypedComponentRef extends Omit<ComponentRef, 'events'> {
  events?: ComponentEvents & Record<string, Function>;
}

/**
 * Base event detail for all component events
 */
export interface ComponentEventDetail {
  /** Component tag name */
  tagName: string;
  /** Component element reference */
  element: HTMLElement;
  /** Timestamp of event */
  timestamp: number;
}

/**
 * Event detail for component:ready event
 */
export interface ComponentReadyDetail extends ComponentEventDetail {
  /** Shadow root reference */
  shadowRoot: ShadowRoot;
  /** Component reference with methods */
  componentRef: ComponentRef;
}

/**
 * Event detail for component:error event
 */
export interface ComponentErrorDetail extends ComponentEventDetail {
  /** Error type */
  type: 'validation' | 'initialization' | 'runtime';
  /** Error message */
  message: string;
  /** Original error or additional details */
  details?: unknown;
}

/**
 * Event detail for component:resize event
 */
export interface ComponentResizeDetail extends ComponentEventDetail {
  /** Previous dimensions */
  previousSize?: { width: number; height: number };
  /** Current dimensions */
  currentSize: { width: number; height: number };
  /** Source of resize trigger */
  source: 'attribute' | 'window' | 'manual';
}

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
