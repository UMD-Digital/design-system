/**
 * Mock for @universityofmaryland/web-utilities-library/validation
 */

const getValidatedSlotImage = jest.fn().mockReturnValue(null);
const isHTMLElement = jest.fn().mockReturnValue(true);

module.exports = {
  getValidatedSlotImage,
  isHTMLElement,
};
