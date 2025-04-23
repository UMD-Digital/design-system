import { styleSheetString, jssObject } from '../create';
import { convertToCSS } from '../transform';

describe('Create Utilities', () => {
  describe('styleSheetString', () => {
    it('should minify CSS by default', async () => {
      const media = { queries: { large: { min: 'min-width: 1024px' } } };
      const spacing = { lg: '24px' };
      
      // Create test object with media query
      const testStyles = {
        '.test-class': {
          display: 'grid',
          gridTemplateColumns: '1fr',
          [`@media (${media.queries.large.min})`]: {
            self: {
              gridTemplateColumns: 'repeat(2, 1fr)',
              gridGap: spacing.lg,
            }
          }
        }
      };
      
      const result = await styleSheetString(testStyles);
      
      // Debug info
      console.log('Minified CSS result:');
      console.log(result);
      
      // The output should be minified
      expect(result).not.toContain('\n');  // No line breaks
      expect(result).toContain('.test-class{'); // No spaces before/after braces
      expect(result).toContain('display:grid'); // No spaces before/after colons
      expect(result).toContain('@media(min-width:1024px)'); // No spaces in media query
      
      // Compare with prettified version - should have different formatting
      const prettified = await styleSheetString(testStyles, { prettify: true });
      console.log('Prettified CSS result:');
      console.log(prettified);
      
      expect(prettified).not.toEqual(result);
      expect(prettified).toContain('\n'); // Prettified version has line breaks
    });
    
    it('should preserve formatting with prettify option', async () => {
      const media = { queries: { large: { min: 'min-width: 1024px' } } };
      const spacing = { lg: '24px' };
      
      // Create test object with media query
      const testStyles = {
        '.test-class': {
          display: 'grid',
          gridTemplateColumns: '1fr',
          [`@media (${media.queries.large.min})`]: {
            self: {
              gridTemplateColumns: 'repeat(2, 1fr)',
              gridGap: spacing.lg,
            }
          }
        }
      };
      
      const result = await styleSheetString(testStyles, { prettify: true });
      
      // Should have multiple lines with proper formatting
      expect(result.split('\n').length).toBeGreaterThan(5);
      
      // Verify media query is properly formatted
      expect(result).toContain('@media (min-width: 1024px) {');
      expect(result).toContain('grid-template-columns: repeat(2, 1fr);');
      expect(result).toContain('grid-gap: 24px;');
    });
  });
});