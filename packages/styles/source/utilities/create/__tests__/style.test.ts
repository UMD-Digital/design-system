import { toString } from '../style';

// Mock postcss module
jest.mock('postcss', () => {
  return jest.fn().mockImplementation(() => ({
    process: jest.fn().mockImplementation((css) => {
      return Promise.resolve({ css });
    }),
  }));
});

describe('create/stylesheet utilities', () => {
  describe('styleSheetString', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should create CSS stylesheet from JSS objects', async () => {
      // Mock input styles
      const styles = {
        '.test-class': { color: 'red', fontSize: '16px' },
        '.another-class': {
          backgroundColor: 'blue',
          padding: '10px',
          ':hover': {
            backgroundColor: 'darkblue',
          },
        },
      };

      const result = await toString(styles);
      expect(typeof result).toBe('string');
      expect(result).toContain('.test-class{');
      expect(result).toContain('color:red');
      expect(result).toContain('font-size:16px');
      expect(result).toContain('.another-class{');
      expect(result).toContain('background-color:blue');
      expect(result).toContain('padding:10px');
      expect(result).toContain('.another-class:hover{');
      expect(result).toContain('background-color:darkblue');
    });

    it('should handle empty styles object', async () => {
      const result = await toString({});
      expect(typeof result).toBe('string');
      expect(result).toBe('');
    });

    it('should handle non-class selectors like :root and h1', async () => {
      // Mock input styles with non-class selectors
      const styles = {
        ':root': {
          '--primary-color': 'red',
          '--secondary-color': 'blue',
          '--font-size-base': '16px',
        },
        h1: {
          fontSize: '2rem',
          fontWeight: 'bold',
          color: 'var(--primary-color)',
          marginBottom: '1rem',
        },
        'body > div': {
          padding: '20px',
          backgroundColor: '#f5f5f5',
        },
      };

      const result = await toString(styles);
      expect(typeof result).toBe('string');
      expect(result).toContain(':root{');
      expect(result).toContain('--primary-color:red');
      expect(result).toContain('h1{');
      expect(result).toContain('font-size:2rem');
      expect(result).toContain('body > div{');
      expect(result).toContain('padding:20px');
    });

    it('should handle mixed class and non-class selectors', async () => {
      // Mock input styles with both class and non-class selectors
      const styles = {
        ':root': {
          '--primary-color': 'red',
        },
        '.container': {
          maxWidth: '1200px',
          margin: '0 auto',
        },
        'h1, h2, h3': {
          fontFamily: 'sans-serif',
          color: 'var(--primary-color)',
        },
      };

      const result = await toString(styles);
      expect(typeof result).toBe('string');
      expect(result).toContain(':root{');
      expect(result).toContain('.container{');
      expect(result).toContain('h1,h2,h3{');
    });

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

      const result = await toString(testStyles);

      expect(result).not.toContain('\n');
      expect(result).toContain('.test-class{');
      expect(result).toContain('display:grid');
      expect(result).toContain('@media(min-width:1024px)');

      const prettified = await toString(testStyles, { prettify: true });

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

      const result = await toString(testStyles, { prettify: true });

      expect(result.split('\n').length).toBeGreaterThan(5);
      expect(result).toContain('@media (min-width: 1024px)');
      expect(result).toContain('grid-template-columns: 1fr');
      expect(result).toContain('grid-template-columns: repeat(2, 1fr)');
      expect(result).toContain('grid-gap: 24px');
    });

    it('should handle media queries with non-class selectors', async () => {
      const testStyles = {
        h1: {
          fontSize: '24px',
          '@media (min-width: 768px)': {
            self: {
              fontSize: '32px',
            },
          },
        },
      };

      const result = await toString(testStyles);
      expect(result).toContain('h1{');
      expect(result).toContain('font-size:24px');
      expect(result).toContain('@media(min-width:768px)');
      expect(result).toContain('font-size:32px');
    });

    it('should work with objects having selector property', async () => {
      // Create styles that will be processed by toString directly
      const styles = {
        ':root': {
          '--primary-color': 'red',
          '--text-color': 'black',
          '--spacing-unit': '8px',
        },
        'h1, h2, h3': {
          fontFamily: 'sans-serif',
          color: 'var(--text-color)',
          marginBottom: 'var(--spacing-unit)',
        },
      };

      // Process the styles into a CSS string
      const result = await toString(styles);

      // Verify CSS variables in :root
      expect(result).toContain(':root{');
      expect(result).toContain('--primary-color:red');
      expect(result).toContain('--text-color:black');
      expect(result).toContain('--spacing-unit:8px');

      // Verify heading styles
      expect(result).toContain('h1,h2,h3{');
      expect(result).toContain('font-family:sans-serif');
      expect(result).toContain('color:var(--text-color)');
      expect(result).toContain('margin-bottom:var(--spacing-unit)');
    });
  });
});
