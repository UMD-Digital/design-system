import postcss from 'postcss';
import postcssNesting from 'postcss-nesting';
import postcssJs from 'postcss-js';

/**
 * Converts a JSS (JavaScript Style Sheets) object to a CSS string using PostCSS.
 * Processes nested CSS structures and converts them into standard CSS syntax.
 * This utility requires the postcss, postcss-nesting, and postcss-js dependencies.
 *
 * @param styleObj - A JSS object with CSS properties and nested selectors
 * @returns A CSS string ready to be injected into a style element
 *
 * @example
 * ```typescript
 * const jssObject = {
 *   '.container': {
 *     padding: '1rem',
 *     '& .child': {
 *       margin: '0.5rem'
 *     },
 *     '&:hover': {
 *       background: '#f0f0f0'
 *     }
 *   }
 * };
 *
 * const css = jssToCSS({ styleObj: jssObject });
 * // Returns:
 * // .container {
 * //   padding: 1rem;
 * // }
 * // .container .child {
 * //   margin: 0.5rem;
 * // }
 * // .container:hover {
 * //   background: #f0f0f0;
 * // }
 * ```
 */
export const jssToCSS = ({ styleObj }: { styleObj: any }): string => {
  // @ts-ignore - PostCSS version incompatibility between monorepo dependencies
  const result = postcss([postcssNesting]).process(styleObj, {
    parser: postcssJs as any,
  });
  return result.css;
};
