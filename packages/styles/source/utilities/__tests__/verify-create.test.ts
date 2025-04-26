import { styleSheetString } from '../create';

describe('Create Utilities', () => {
  describe('styleSheetString', () => {
    it('should minify CSS by default', async () => {
      const media = { queries: { large: { min: 'min-width: 1024px' } } };
      const spacing = { lg: '24px' };

      const testStyles = {
        '.test-class': {
          display: 'grid',
          gridTemplateColumns: '1fr',
          [`@media (${media.queries.large.min})`]: {
            self: {
              gridTemplateColumns: 'repeat(2, 1fr)',
              gridGap: spacing.lg,
            },
          },
        },
      };

      const result = await styleSheetString(testStyles);

      expect(result).not.toContain('\n');
      expect(result).toContain('.test-class{');
      expect(result).toContain('display:grid');
      expect(result).toContain('@media(min-width:1024px)');

      const prettified = await styleSheetString(testStyles, { prettify: true });

      expect(prettified).not.toEqual(result);
      expect(prettified).toContain('\n');
    });

    it('should preserve formatting with prettify option', async () => {
      const media = { queries: { large: { min: 'min-width: 1024px' } } };
      const spacing = { lg: '24px' };

      const testStyles = {
        '.test-class': {
          display: 'grid',
          gridTemplateColumns: '1fr',
          [`@media (${media.queries.large.min})`]: {
            self: {
              gridTemplateColumns: 'repeat(2, 1fr)',
              gridGap: spacing.lg,
            },
          },
        },
      };

      const result = await styleSheetString(testStyles, { prettify: true });

      expect(result.split('\n').length).toBeGreaterThan(5);
      expect(result).toContain('@media (min-width: 1024px) {');
      expect(result).toContain('grid-template-columns: repeat(2, 1fr);');
      expect(result).toContain('grid-gap: 24px;');
    });
  });
});
