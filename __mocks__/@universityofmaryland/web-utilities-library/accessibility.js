/**
 * Mock for @universityofmaryland/web-utilities-library/accessibility
 */

const trapFocus = jest.fn();
const isScreenZoomed = jest.fn().mockReturnValue(false);
const isPreferredReducedMotion = jest.fn().mockReturnValue(false);
const imageHasAlt = jest.fn().mockReturnValue(true);

module.exports = {
  trapFocus,
  isScreenZoomed,
  isPreferredReducedMotion,
  imageHasAlt,
};
