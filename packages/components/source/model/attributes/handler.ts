import AttributeNames from './names';
import AttributeValues from './values';

/**
 * Attribute Handler System
 * 
 * Provides reactive attribute observation for web components.
 * Handlers watch for specific attribute changes and execute callbacks.
 * 
 * ## Handler Types:
 * 
 * 1. **State Transitions**: Watch for specific value changes
 *    - e.g., state changing from "closed" to "open"
 * 
 * 2. **Boolean Triggers**: Watch for true/false changes
 *    - e.g., resize="true" triggers recalculation
 * 
 * 3. **Value Changes**: Watch for any value change
 *    - e.g., data-layout-position updates
 * 
 * ## Usage Example:
 * ```typescript
 * const attributes = Attributes.handler.combine(
 *   Attributes.handler.observe.resize({
 *     callback: (element) => element.events?.recalculate()
 *   }),
 *   Attributes.handler.observe.visuallyOpen({
 *     callback: (element) => element.events?.SetOpen({ hasAnimation: true })
 *   })
 * );
 * ```
 */
/**
 * Type definitions for the attribute handler system
 */
export namespace AttributeHandlerTypes {
  /**
   * Callback function type for attribute handlers
   * @typeParam T - The element reference type, defaults to ElementRef
   */
  type Callback<T = ElementRef> = (arg: T, arg2?: any) => void;

  /**
   * Reference to an element with optional event handlers
   */
  export interface ElementRef {
    /** The HTML element being observed */
    element: HTMLElement;
    /** Optional event handlers attached to the element */
    events?: Record<string, Function>;
  }

  /**
   * Configuration for an attribute handler
   */
  export interface Config {
    /** The attribute name to observe */
    name: string;
    /** Handler function called when the attribute changes */
    handler: (
      ref: ElementRef,
      oldValue: string | null,
      newValue: string | null,
    ) => void;
  }

  /**
   * Properties for creating attribute handlers
   */
  export interface Props {
    /** Callback function to execute when attribute changes */
    callback: Callback;
    /** Optional attribute name override */
    name?: string;
  }
}

/**
 * Combines multiple attribute handlers for the same attribute name.
 * When multiple handlers target the same attribute, they execute in sequence.
 * 
 * @param configs - Array of attribute handler configurations
 * @returns Combined handler configurations
 * 
 * @example
 * ```typescript
 * const handlers = combine(
 *   handler1, // First to execute
 *   handler2  // Second to execute
 * );
 * ```
 */
const combine = (
  ...configs: AttributeHandlerTypes.Config[]
): AttributeHandlerTypes.Config[] => {
  const handlerMap = new Map<
    string,
    ((
      ref: AttributeHandlerTypes.ElementRef,
      oldValue: string | null,
      newValue: string | null,
    ) => void)[]
  >();

  configs.forEach((config) => {
    const handlers = handlerMap.get(config.name) || [];
    handlers.push(config.handler);
    handlerMap.set(config.name, handlers);
  });

  return Array.from(handlerMap.entries()).map(([name, handlers]) => ({
    name,
    handler: (
      ref: AttributeHandlerTypes.ElementRef,
      oldValue: string | null,
      newValue: string | null,
    ) => {
      handlers.forEach((handler) => handler(ref, oldValue, newValue));
    },
  }));
};

/**
 * Observes the 'resize' attribute.
 * Triggers callback when resize="true".
 * Commonly used to recalculate component dimensions.
 */
const resize = ({
  callback,
  name,
}: AttributeHandlerTypes.Props): AttributeHandlerTypes.Config => ({
  name: name || AttributeNames.RESIZE,
  handler: (ref, _, newValue) => {
    if (newValue === AttributeValues.state.TRUE) {
      callback(ref);
    }
  },
});

/**
 * @deprecated Use visuallyOpen instead
 * Observes 'state' attribute transition from "closed" to "open".
 */
const stateOpen = ({
  callback,
  name,
}: AttributeHandlerTypes.Props): AttributeHandlerTypes.Config => ({
  name: name || AttributeNames.STATE,
  handler: (ref, oldValue, newValue) => {
    if (
      newValue === AttributeValues.state.OPENED &&
      oldValue === AttributeValues.state.CLOSED
    ) {
      callback(ref);
    }
  },
});

/**
 * @deprecated Use visuallyClosed instead
 * Observes 'state' attribute transition from "open" to "closed".
 */
const stateClosed = ({
  callback,
  name,
}: AttributeHandlerTypes.Props): AttributeHandlerTypes.Config => ({
  name: name || AttributeNames.STATE,
  handler: (ref, oldValue, newValue) => {
    if (
      newValue === AttributeValues.state.CLOSED &&
      oldValue === AttributeValues.state.OPENED
    ) {
      callback(ref);
    }
  },
});

/**
 * Observes 'data-visual-open' attribute.
 * Triggers callback when changing from "true" to "false".
 * Used for closing animations and transitions.
 */
const visuallyClosed = ({
  callback,
  name,
}: AttributeHandlerTypes.Props): AttributeHandlerTypes.Config => ({
  name: name || AttributeNames.visual.open,
  handler: (ref, oldValue, newValue) => {
    if (
      newValue === AttributeValues.state.FALSE &&
      oldValue === AttributeValues.state.TRUE
    ) {
      callback(ref);
    }
  },
});

const visuallyHide = ({
  callback,
  name,
}: AttributeHandlerTypes.Props): AttributeHandlerTypes.Config => ({
  name: name || AttributeNames.layout.HIDDEN,
  handler: (ref, oldValue, newValue) => {
    if (
      newValue === AttributeValues.state.TRUE &&
      oldValue === AttributeValues.state.FALSE
    ) {
      callback(ref);
    }
  },
});

const visuallyOpen = ({
  callback,
  name,
}: AttributeHandlerTypes.Props): AttributeHandlerTypes.Config => ({
  name: name || AttributeNames.visual.open,
  handler: (ref, oldValue, newValue) => {
    if (
      newValue === AttributeValues.state.TRUE &&
      oldValue === AttributeValues.state.FALSE
    ) {
      callback(ref);
    }
  },
});

const visuallyPosition = ({
  callback,
  name,
}: AttributeHandlerTypes.Props): AttributeHandlerTypes.Config => ({
  name: name || AttributeNames.layout.POSITION,
  handler: (ref, oldValue, newValue) => {
    if (newValue !== oldValue) {
      const top = newValue ? parseInt(newValue) : null;
      if (top) {
        callback(ref, top);
      } else {
        callback(ref);
      }
    }
  },
});

const visuallyShow = ({
  callback,
  name,
}: AttributeHandlerTypes.Props): AttributeHandlerTypes.Config => ({
  name: name || AttributeNames.layout.HIDDEN,
  handler: (ref, oldValue, newValue) => {
    if (
      newValue === AttributeValues.state.FALSE &&
      oldValue === AttributeValues.state.TRUE
    ) {
      callback(ref);
    }
  },
});

const observe = {
  resize,
  stateOpen,
  stateClosed,
  visuallyHide,
  visuallyOpen,
  visuallyClosed,
  visuallyPosition,
  visuallyShow,
};

/**
 * Common attribute handler combinations for standard component behaviors.
 * These pre-configured handlers simplify component implementation.
 */
const common = {
  /**
   * Resize observer for responsive components
   */
  resize: (callback: (element: AttributeHandlerTypes.ElementRef) => void) =>
    resize({ callback }),

  /**
   * Visual show/hide handlers for modals and overlays
   */
  visualShowHide: (options: {
    onShow?: (element: AttributeHandlerTypes.ElementRef) => void;
    onHide?: (element: AttributeHandlerTypes.ElementRef) => void;
  }) =>
    combine(
      ...(options.onShow
        ? [
            visuallyShow({
              callback: options.onShow,
            }),
          ]
        : []),
      ...(options.onHide
        ? [
            visuallyHide({
              callback: options.onHide,
            }),
          ]
        : []),
    ),

  /**
   * Visual open/close handlers for expandable components
   */
  visualToggle: (options: {
    onOpen?: (element: AttributeHandlerTypes.ElementRef) => void;
    onClose?: (element: AttributeHandlerTypes.ElementRef) => void;
  }) =>
    combine(
      ...(options.onOpen
        ? [
            visuallyOpen({
              callback: options.onOpen,
            }),
          ]
        : []),
      ...(options.onClose
        ? [
            visuallyClosed({
              callback: options.onClose,
            }),
          ]
        : []),
    ),

  /**
   * Standard accordion handlers with open/close transitions
   */
  accordion: () =>
    combine(
      resize({
        callback: (element) => element.events?.SetOpen({ hasAnimation: false }),
      }),
      visuallyOpen({
        callback: (element) => element.events?.SetOpen({ hasAnimation: true }),
      }),
      visuallyClosed({
        callback: (element) =>
          element.events?.SetClosed({ hasAnimation: true }),
      }),
      // Deprecated handlers for backwards compatibility
      stateClosed({
        callback: (element) =>
          element.events?.SetClosed({ hasAnimation: true }),
      }),
      stateOpen({
        callback: (element) => element.events?.SetOpen({ hasAnimation: true }),
      }),
    ),
};

/**
 * @deprecated Use Attributes.handler.common instead
 */
export const CommonAttributeHandlers = common;

export default { combine, observe, common };
