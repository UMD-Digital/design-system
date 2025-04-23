const fs = require('fs');
const transform = require('./source/utilities/transform');
const create = require('./source/utilities/create');

// Mock the variables from layout
const media = { 
  queries: { 
    large: { min: 'min-width: 1024px' }, 
    desktop: { min: 'min-width: 1280px' } 
  } 
};
const spacing = { lg: '24px', xl: '32px' };
const classNamePrefix = 'umd-layout-grid-gap';

// Define paragraph overwrite
const paragraphOverwrite = { '& p': { marginBottom: 0 } };

// Create test object with directly nested properties in media queries
// This is the format we're fixing support for
const directMediaQuery = create.jssObject({
  display: 'grid',
  gridTemplateColumns: '1fr',

  [`@media (${media.queries.large.min})`]: {
    gridTemplateColumns: 'repeat(2, 1fr)',
    gridGap: spacing.lg,
    ...paragraphOverwrite,
  },

  [`@media (${media.queries.desktop.min})`]: {
    gridGap: spacing.xl,
  },

  className: [
    `${classNamePrefix}-two`,
    'umd-grid-gap',
  ],
});

// Convert the object to CSS
const result = transform.convertToCSS(directMediaQuery);
console.log('Direct Media Query CSS Output:');
console.log(result);

// Write the result to a file for easier review
fs.writeFileSync('direct-media-query-result.css', result);
console.log('Output written to direct-media-query-result.css');

// Now create the same example using the 'self' wrapper for comparison
const selfWrappedMediaQuery = create.jssObject({
  display: 'grid',
  gridTemplateColumns: '1fr',

  [`@media (${media.queries.large.min})`]: {
    self: {
      gridTemplateColumns: 'repeat(2, 1fr)',
      gridGap: spacing.lg,
    },
    '& p': {
      marginBottom: 0
    }
  },

  [`@media (${media.queries.desktop.min})`]: {
    self: {
      gridGap: spacing.xl,
    }
  },

  className: [
    `${classNamePrefix}-two-self`,
    'umd-grid-gap-self',
  ],
});

// Convert the object to CSS
const selfResult = transform.convertToCSS(selfWrappedMediaQuery);
console.log('\nSelf-wrapped Media Query CSS Output:');
console.log(selfResult);

// Write the result to a file for easier review
fs.writeFileSync('self-wrapped-media-query-result.css', selfResult);
console.log('Output written to self-wrapped-media-query-result.css');