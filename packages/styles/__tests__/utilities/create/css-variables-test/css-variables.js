// Import directly using the full path
const { toString } = require('/Users/magnessjo/umd/design-system/packages/styles/source/utilities/create/style');

// Example JSS object with CSS variables
const stylesObject = {
  ':root': {
    '--primary-color': 'red',
    '--secondaryColor': 'blue', // Camel case to test conversion
    '--fontSize-base': '16px', // Mixed case to test conversion
    '--spacing-unit': '8px'
  },
  'h1': {
    color: 'var(--primary-color)',
    fontSize: 'var(--fontSize-base)',
    margin: 'var(--spacing-unit)'
  },
  '.container': {
    backgroundColor: 'var(--secondaryColor)',
    padding: 'calc(var(--spacing-unit) * 2)'
  }
};

// Convert to CSS
toString(stylesObject, { prettify: true })
  .then(css => {
    console.log('Generated CSS:');
    console.log(css);
    
    // Verify CSS variables have double dashes
    const hasDoubleDash = css.includes('--primary-color') 
      && css.includes('--secondary-color')
      && css.includes('--font-size-base');
    
    console.log('\nCSS variables have double dashes:', hasDoubleDash);
  })
  .catch(error => {
    console.error('Error:', error);
  });