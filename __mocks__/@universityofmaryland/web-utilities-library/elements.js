/**
 * Mock for @universityofmaryland/web-utilities-library/elements
 */

const createImageOrLinkedImage = jest.fn().mockReturnValue(document.createElement('img'));
const createLinkWithSpan = jest.fn().mockReturnValue(document.createElement('a'));
const createSlot = jest.fn().mockReturnValue(document.createElement('slot'));
const createStyledSlotOrClone = jest.fn().mockImplementation((slotName, element) => {
  const slot = document.createElement('slot');
  slot.setAttribute('name', slotName);
  return slot;
});
const createStyleTemplate = jest.fn().mockReturnValue(document.createElement('template'));
const createTextContainer = jest.fn().mockReturnValue(document.createElement('div'));
const createTextWithLink = jest.fn().mockReturnValue(document.createElement('span'));
const createTimeElement = jest.fn().mockReturnValue(document.createElement('time'));

module.exports = {
  createImageOrLinkedImage,
  createLinkWithSpan,
  createSlot,
  createStyledSlotOrClone,
  createStyleTemplate,
  createTextContainer,
  createTextWithLink,
  createTimeElement,
};
