/**
 * Core utilities for building web components in the UMD design system.
 * Provides the foundational tools for attribute handling, slot management,
 * component registration, and custom element creation.
 * 
 * ## Overview
 * 
 * The Model system provides:
 * - **Attributes** - Comprehensive attribute handling with validation and observation
 * - **Model** - Base class and factory for creating custom elements
 * - **Register** - Component registration utilities
 * - **Slots** - Slot extraction and validation utilities
 * 
 * ## Usage
 * 
 * Components typically use all four utilities together:
 * 
 * ```typescript
 * import { Attributes, Model, Register, Slots } from 'model';
 * 
 * const tagName = 'umd-my-component';
 * 
 * const slots = {
 *   headline: { required: true, allowedElements: ['h2', 'h3'] },
 *   content: { allowedElements: ['div', 'p'] }
 * };
 * 
 * const attributes = Attributes.handler.combine(
 *   Attributes.handler.observe.resize({
 *     callback: (element) => element.events?.handleResize()
 *   })
 * );
 * 
 * const createComponent = (element: HTMLElement) => {
 *   return {
 *     element: createDOMStructure(),
 *     styles: componentStyles,
 *     events: componentEvents
 *   };
 * };
 * 
 * export default () => {
 *   Register.registerWebComponent({
 *     name: tagName,
 *     element: Model.createCustomElement({
 *       tagName,
 *       slots,
 *       attributes,
 *       createComponent
 *     })
 *   });
 * };
 * ```
 * 
 * ## Best Practices
 * 
 * 1. Always validate required slots
 * 2. Use data-* attributes for configuration
 * 3. Implement proper attribute observers for dynamic behavior
 * 4. Handle slot deprecation warnings gracefully
 * 5. Provide meaningful error messages for validation failures
 */
import * as Attributes from './attributes';
import * as Model from './model';
import * as Register from './utilities/register';
import Slots from './slots';
import * as Types from './types';
import * as Lifecycle from './utilities/lifecycle';

export { Attributes, Model, Register, Slots, Types, Lifecycle };
