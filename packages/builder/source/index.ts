/**
 * @universityofmaryland/web-builder-library
 * Element Builder for the University of Maryland Design System
 *
 * This package provides the ElementBuilder with pre-styled elements and
 * utilities for creating custom styled HTML elements.
 */

import { ElementBuilder as ElementBuilderClass, createStyledElement, styleObject } from './core';
import * as actions from './styledElements/actions';
import * as assets from './styledElements/assets';
import * as buttons from './styledElements/buttons';
import * as event from './styledElements/event';
import * as headline from './styledElements/headline';
import * as layout from './styledElements/layout';
import * as richText from './styledElements/rich-text';
import * as text from './styledElements/text';
import { create, createDiv, createParagraph, createSpan } from './styledElements';

export * from './core/_types';
export type { styleObject } from './core';

/**
 * ElementBuilder - Main interface for the UMD Design System Element Builder
 *
 * @example
 * ```typescript
 * // Use pre-styled elements
 * import ElementBuilder from '@universityofmaryland/web-builder-library';
 * const button = ElementBuilder.styled.actions.primary({ element });
 *
 * // Create custom elements
 * const custom = ElementBuilder.create({ element, className: 'my-class' });
 * ```
 */
const ElementBuilder = {
  /**
   * Pre-styled element categories from the UMD Design System
   */
  styled: {
    actions,
    assets,
    buttons,
    event,
    headline,
    layout,
    richText,
    text,
  },

  /**
   * Create custom styled elements
   */
  create: {
    /**
     * Create a styled element with custom className and styles
     */
    element: create,

    /**
     * Create a styled div element
     */
    div: createDiv,

    /**
     * Create a styled paragraph element
     */
    paragraph: createParagraph,

    /**
     * Create a styled span element
     */
    span: createSpan,

    /**
     * Advanced: Direct access to the createStyledElement factory with builder variants
     */
    advanced: createStyledElement,
  },

  /**
   * Advanced: Direct access to the ElementBuilder class
   */
  ElementBuilder: ElementBuilderClass,
};

export default ElementBuilder;
