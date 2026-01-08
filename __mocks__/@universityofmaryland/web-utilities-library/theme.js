/**
 * Mock for @universityofmaryland/web-utilities-library/theme
 */

const theme = {
  foreground: jest.fn().mockReturnValue('#000000'),
  fontColor: jest.fn().mockReturnValue('#000000'),
  background: jest.fn().mockReturnValue('#ffffff'),
};

module.exports = {
  theme,
};
