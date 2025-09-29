/**
 * Style processing utilities
 *
 * Functions for working with CSS-in-JS, JSS objects, media queries, and style manipulation.
 * Note: Some utilities require postcss dependencies (postcss, postcss-nesting, postcss-js).
 *
 * @module styles
 */

export { combineStyles } from './combineStyles';
export { convertJSSObjectToStyles } from './convertJSSObjectToStyles';
export { getStyleStringFromJssObject } from './getStyleStringFromJssObject';
export { withViewTimelineAnimation } from './withViewTimelineAnimation';
export { createContainerQuery } from './createContainerQuery';
export { createRangeContainerQuery } from './createRangeContainerQuery';