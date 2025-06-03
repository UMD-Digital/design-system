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
  attributes?: ReturnType<typeof Attributes.handler.combine>;
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
  /** Initialize component */
  load?: () => void;
  /** Handle resize */
  resize?: () => void;
  /** Show component */
  show?: () => void;
  /** Hide component */
  hide?: () => void;
  /** Open with animation options */
  SetOpen?: (options?: { hasAnimation?: boolean }) => void;
  /** Close with animation options */
  SetClosed?: (options?: { hasAnimation?: boolean }) => void;
  /** Load animation */
  loadAnimation?: () => void;
  /** Set position */
  setPosition?: (options?: { value?: number | null }) => void;
  /** Set date element sizes */
  SetDateElementsSizes?: () => void;
  /** Generic callback */
  callback?: (shadow?: ShadowRoot) => void;
}

/**
 * Extended component reference with typed events
 */
export interface TypedComponentRef extends Omit<ComponentRef, 'events'> {
  events?: ComponentEvents & Record<string, Function>;
}