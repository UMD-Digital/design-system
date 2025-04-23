import { convertToCSS } from '../transform';
import { jssObject } from '../create';
import type { JssObject } from '../../_types';

describe('Real World Example Test', () => {
  it('should process direct properties in media queries correctly', () => {
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
    // This is the common format in the codebase
    const directMediaQuery: JssObject = jssObject({
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
    const result = convertToCSS(directMediaQuery);
    console.log('Direct Media Query CSS Output:');
    console.log(result);

    // Verify key properties are present in the output
    expect(result).toContain('.umd-layout-grid-gap-two, .umd-grid-gap');
    expect(result).toContain('display: grid');
    expect(result).toContain('@media (min-width: 1024px)');
    expect(result).toContain('grid-template-columns: repeat(2, 1fr)');
    expect(result).toContain('grid-gap: 24px');
    expect(result).toContain('p {');
    expect(result).toContain('margin-bottom: 0');
    expect(result).toContain('@media (min-width: 1280px)');
    expect(result).toContain('grid-gap: 32px');

    // Now create the same example using the 'self' wrapper for comparison
    const selfWrappedMediaQuery: JssObject = jssObject({
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
    const selfResult = convertToCSS(selfWrappedMediaQuery);
    console.log('\nSelf-wrapped Media Query CSS Output:');
    console.log(selfResult);

    // Verify that the self-wrapped version also works correctly
    expect(selfResult).toContain('.umd-layout-grid-gap-two-self, .umd-grid-gap-self');
    expect(selfResult).toContain('display: grid');
    expect(selfResult).toContain('@media (min-width: 1024px)');
    expect(selfResult).toContain('grid-template-columns: repeat(2, 1fr)');
    expect(selfResult).toContain('grid-gap: 24px');
    expect(selfResult).toContain('p {');
    expect(selfResult).toContain('margin-bottom: 0');
    expect(selfResult).toContain('@media (min-width: 1280px)');
    expect(selfResult).toContain('grid-gap: 32px');

    // Both approaches should produce similar output
    // (exact format might differ, but the core selectors and properties should match)
  });
});