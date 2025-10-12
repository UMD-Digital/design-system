import * as Styles from '@universityofmaryland/web-styles-library';
import { jssToCSS } from './jssToCSS';

/**
 * Converts a JSS entry object with a className property into a CSS string.
 * Takes a JSS object that includes a className and wraps it in the appropriate
 * CSS selector before converting to a string.
 *
 * @param styleObj - A JSS entry object with className and style properties
 * @returns A CSS string with the class selector applied
 *
 * @example
 * ```typescript
 * const jssEntry = {
 *   className: 'my-component',
 *   padding: '1rem',
 *   color: 'red',
 *   '&:hover': {
 *     color: 'blue'
 *   }
 * };
 *
 * const css = jssEntryToCSS(jssEntry);
 * // Returns:
 * // .my-component {
 * //   padding: 1rem;
 * //   color: red;
 * // }
 * // .my-component:hover {
 * //   color: blue;
 * // }
 * ```
 *
 * @category styles
 */
export const jssEntryToCSS = (
  styleObj: Styles.JssEntry
): string =>
  jssToCSS({
    styleObj: {
      [`.${styleObj.className}`]: styleObj,
    },
  });
