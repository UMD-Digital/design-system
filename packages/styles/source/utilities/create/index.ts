/**
 * @module utilities/create
 * Provides utilities for creating JSS objects.
 */

export * as jss from './jss';
export * as style from './style';

/**
 * Creates a stylesheet string from a JSS object.
 * @deprecated {string}
 */
export { toString as stylesheetString } from './style';
