// Helper to convert JSS-like object to CSS string for testing
const jssObjectToCSS = (jssObject, selector = '') => {
  if (!jssObject || typeof jssObject !== 'object') return '';

  let css = '';
  const properties = [];

  for (const [key, value] of Object.entries(jssObject)) {
    if (key === 'className') continue;

    if (typeof value === 'object' && value !== null) {
      // Handle nested selectors like '&:hover', '@media', etc.
      const nestedSelector = key.startsWith('&')
        ? selector + key.slice(1)
        : key.startsWith('@')
          ? key
          : selector + ' ' + key;

      if (key.startsWith('@')) {
        css += `${key} { ${jssObjectToCSS(value, selector)} } `;
      } else {
        css += jssObjectToCSS(value, nestedSelector);
      }
    } else if (value !== undefined && value !== null) {
      // Convert camelCase to kebab-case
      const kebabKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
      properties.push(`${kebabKey}: ${value}`);
    }
  }

  if (properties.length > 0 && selector) {
    css = `${selector} { ${properties.join('; ')} } ` + css;
  } else if (properties.length > 0) {
    css = properties.join('; ') + '; ' + css;
  }

  return css.trim();
};

module.exports = {
  combineStyles: jest.fn((...styles) => styles.filter(Boolean).join(' ')),
  jssToCSS: jest.fn((jssObject) => {
    if (!jssObject) return '';
    // Handle object with className
    if (jssObject.className) {
      const className = Array.isArray(jssObject.className)
        ? jssObject.className[0]
        : jssObject.className;
      return jssObjectToCSS(jssObject, `.${className}`);
    }
    // Handle plain object with selectors as keys
    let css = '';
    for (const [selector, styles] of Object.entries(jssObject)) {
      if (typeof styles === 'object') {
        css += jssObjectToCSS(styles, selector) + ' ';
      }
    }
    return css.trim();
  }),
  jssEntryToCSS: jest.fn((entry) => {
    if (!entry) return '';
    const [selector, styles] = entry;
    return jssObjectToCSS(styles, selector);
  }),
  withViewTimelineAnimation: jest.fn((element, options) => element),
  createMediaQuery: jest.fn((breakpoint, styles) => `@media (min-width: ${breakpoint}) { ${styles} }`),
  createMediaQueryRange: jest.fn((min, max, styles) => `@media (min-width: ${min}) and (max-width: ${max}) { ${styles} }`),
  parsePixelValue: jest.fn((value) => {
    if (typeof value === 'number') return value;
    if (typeof value === 'string') return parseInt(value, 10) || 0;
    return 0;
  }),
};
