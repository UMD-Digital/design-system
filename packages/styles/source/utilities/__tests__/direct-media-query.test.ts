import { convertToCSS } from '../transform';
import { jssObject } from '../create';
import type { JssObject } from '../../_types';

// Mock the variables to match the example
const media = { queries: { large: { min: 'min-width: 1024px' }, desktop: { min: 'min-width: 1280px' } } };
const spacing = { lg: '24px', xl: '32px' };
const classNamePrefix = 'umd-layout-grid-gap';

// Create a test object similar to the user's example with direct properties in media queries
describe('Direct Media Query Properties', () => {
  it('should handle direct properties in media queries without self wrapper', () => {
    // Define a simple base object
    const base = { 
      two: { 
        display: 'grid', 
        gridTemplateColumns: '1fr' 
      } 
    };
    
    // Define paragraph overwrite
    const paragraphOverwrite = { '& p': { marginBottom: 0 } };

    // Create test object with directly nested properties in media queries
    const directMediaQuery: JssObject = jssObject({
      ...base.two,

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
    const result = convertToCSS(directMediaQuery);
    console.log('Direct Media Query CSS Output:');
    console.log(result);
    
    // Verify key properties are present
    expect(result).toContain('.umd-layout-grid-gap-two, .umd-grid-gap');
    expect(result).toContain('display: grid');
    expect(result).toContain('grid-template-columns: 1fr');
    
    // Check that media queries are properly handled
    expect(result).toContain('@media (min-width: 1024px)');
    expect(result).toContain('grid-template-columns: repeat(2, 1fr)');
    expect(result).toContain('grid-gap: 24px');
    
    // Check that nested selectors inside media queries work
    expect(result).toContain('p {');
    expect(result).toContain('margin-bottom: 0');
    
    // Check second media query
    expect(result).toContain('@media (min-width: 1280px)');
    expect(result).toContain('grid-gap: 32px');
  });
});