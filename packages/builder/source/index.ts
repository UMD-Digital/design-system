/**
 * @universityofmaryland/web-builder-library
 * Modern Fluent Builder API for the UMD Design System
 *
 * This package provides a modern, chainable interface for building HTML elements
 * with the UMD Design System styles.
 *
 * @example
 * ```typescript
 * import { ElementBuilder } from '@universityofmaryland/web-builder-library';
 * import * as Styles from '@universityofmaryland/web-styles-library';
 *
 * // Create a div (default)
 * const container = new ElementBuilder()
 *   .withClassName('container')
 *   .withText('Hello World')
 *   .build();
 *
 * // Create a specific element type
 * const link = new ElementBuilder('a')
 *   .withAttribute('href', '/about')
 *   .withText('About Us')
 *   .build();
 *
 * // Wrap an existing element with UMD styles
 * const headlineElement = document.createElement('h1');
 * const styledHeadline = new ElementBuilder(headlineElement)
 *   .styled(Styles.typography.sans.larger)
 *   .withThemeDark('dark')
 *   .withAnimation('fadeIn')
 *   .build();
 *
 * // Using preset builders (returns slot elements with UMD styles)
 * const actionSlot = actions.primary().build();
 * const headlineSlot = headlines.sansLarge().build();
 * ```
 */

export * from './core';
export * from './factories/presets';
export * from './factories/compose';
