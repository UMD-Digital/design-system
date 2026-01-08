/**
 * Mock for @universityofmaryland/web-styles-library/typography
 */

const createMockJssObject = (className) => ({
  className,
  fontFamily: "'Interstate', sans-serif",
  fontSize: '16px',
  lineHeight: '1.4em',
});

const sans = {
  compose: jest.fn().mockImplementation((size, options) => {
    return createMockJssObject(`umd-sans-${size || 'medium'}`);
  }),
  small: createMockJssObject('umd-sans-small'),
  medium: createMockJssObject('umd-sans-medium'),
  large: createMockJssObject('umd-sans-large'),
  larger: createMockJssObject('umd-sans-larger'),
  extralarge: createMockJssObject('umd-sans-extralarge'),
};

const serif = {
  compose: jest.fn().mockImplementation((size, options) => {
    return createMockJssObject(`umd-serif-${size || 'medium'}`);
  }),
  small: createMockJssObject('umd-serif-small'),
  medium: createMockJssObject('umd-serif-medium'),
  large: createMockJssObject('umd-serif-large'),
};

const campaign = {
  compose: jest.fn().mockImplementation((size, options) => {
    return createMockJssObject(`umd-campaign-${size || 'medium'}`);
  }),
  small: createMockJssObject('umd-campaign-small'),
  medium: createMockJssObject('umd-campaign-medium'),
  large: createMockJssObject('umd-campaign-large'),
};

module.exports = {
  sans,
  serif,
  campaign,
};
