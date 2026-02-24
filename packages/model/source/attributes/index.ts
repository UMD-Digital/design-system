/**
 * Attribute System for UMD Web Components
 *
 * This module provides a comprehensive attribute handling system for web components.
 * It includes utilities for checking attribute states, observing changes, and managing values.
 *
 * ## Key Concepts:
 *
 * 1. **Attribute Names**: Centralized constants for all attribute names (see ./names.ts)
 * 2. **Attribute Values**: Predefined values for attributes (see ./values.ts)
 * 3. **Check Functions**: Utilities to check attribute states (see ./checks.ts)
 * 4. **Handlers**: Reactive observers for attribute changes (see ./handler.ts)
 *
 * ## Usage Patterns:
 *
 * ### Configuration Attributes (data-*)
 * Used for initial component configuration:
 * - `data-theme="dark"` - Sets visual theme
 * - `data-display="list"` - Sets display mode
 * - `data-visual-open="true"` - Sets initial state
 *
 * ### Observed Attributes
 * Used to trigger component behavior:
 * - `is-visual-open` - Triggers open animation
 * - `resize` - Triggers size recalculation
 * - `state-open` (deprecated) - Use data-visual-open
 *
 * ### Accessing Attribute Names
 * - Current attributes: `Attributes.names.visual.size`
 * - Single-value attributes: `Attributes.names.theme.default`, `Attributes.names.display.default`
 * - Deprecated attributes: `Attributes.names.deprecated.visual.VISUAL_SIZE`
 *
 * @module Attributes
 */
import { handler } from './handler';
import { AttributeNames as names } from './names';
import { AttributeValues as values } from './values';

export {
  hasInfo,
  hasDecoration,
  includesFeature,
  isDisplay,
  isData,
  isInfo,
  isLayout,
  isSharing,
  includesSharing,
  isTheme,
  isVisual,
  getValue,
  type AttributeElementProps,
} from './checks';
export { handler, names, values };
export type {
  AttributeElementRef,
  AttributeCallback,
  AttributeHandlerConfig,
  AttributeHandlerProps,
} from './handler';

// Reactive attribute system (v1.1.0)
export { AttributeTypeError, AttributeValidationError, devWarning, reportAttributeErrors } from './errors';
export {
  Converters,
  resolveConverter,
  type AttributeConverter,
  type AttributeType,
} from './converters';
export {
  toAttributeName,
  defineObservedAttributes,
  readAttributes,
  resolveAttributeConfigs,
  type ReactiveAttributeConfig,
  type ReactiveAttributeMap,
  type ResolvedAttributeConfig,
} from './config';
export {
  defaultEquality,
  jsonEquality,
  ChangeDetector,
  ChangeDetectors,
  type EqualityFn,
  type HasChangedFn,
} from './change-detection';
