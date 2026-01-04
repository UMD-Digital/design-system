/**
 * Mock for @universityofmaryland/web-utilities-library/dom
 */

const addClass = jest.fn();
const cloneElementWithoutAttributes = jest.fn().mockImplementation((el) => el.cloneNode(true));
const findParent = jest.fn().mockReturnValue(null);
const extractIconElement = jest.fn().mockReturnValue(null);
const getImageFromSlot = jest.fn().mockReturnValue(null);
const getLinkFromSlot = jest.fn().mockReturnValue(null);
const removeClass = jest.fn();
const wrapTextNodeInSpan = jest.fn();

module.exports = {
  addClass,
  cloneElementWithoutAttributes,
  findParent,
  extractIconElement,
  getImageFromSlot,
  getLinkFromSlot,
  removeClass,
  wrapTextNodeInSpan,
};
