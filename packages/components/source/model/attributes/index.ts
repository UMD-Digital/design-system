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
 * @module Attributes
 */
import handler, { AttributeHandlerTypes } from './handler';
import names from './names';
import values from './values';

export {
  includesFeature,
  isDisplay,
  isData,
  isInfo,
  hasInfo,
  isLayout,
  isSharing,
  includesSharing,
  isTheme,
  isVisual,
  getValue,
} from './checks';
export { handler, names, values, AttributeHandlerTypes };
