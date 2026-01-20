/**
 * @module exports/cdn
 * CDN build entry point - exposes everything on window.Styles
 *
 * This module is used for the CDN IIFE build that allows usage without
 * a build tool. All exports are attached to the window.Styles global.
 *
 * @example
 * ```html
 * <script src="https://cdn.example.com/styles/cdn.js"></script>
 * <script>
 *   const { token, layout, typography } = window.Styles;
 *   console.log(token.color.red); // #E21833
 * </script>
 * ```
 *
 * @since 1.8.0
 */

import * as token from '@universityofmaryland/web-token-library';
import * as typography from '../typography';
import * as layout from '../layout';
import * as element from '../element';
import * as animation from '../animation';
import * as accessibility from '../accessibility';
import * as utilities from '../utilities';
import * as tailwind from '../tailwind';

export const Styles = {
  token,
  typography,
  layout,
  element,
  animation,
  accessibility,
  utilities,
  tailwind,
};

// For CDN usage
if (typeof window !== 'undefined') {
  (window as any).Styles = Styles;
}
