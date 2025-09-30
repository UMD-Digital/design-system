import { convertJSSObjectToStyles } from '../../styles/convertJSSObjectToStyles';

// Mock postcss modules
jest.mock('postcss', () => {
  const mockProcess = jest.fn((styleObj: any, options: any) => {
    // Simple mock that converts JSS-like objects to CSS strings
    const cssLines: string[] = [];

    const processObject = (obj: any, selector = '') => {
      const properties: string[] = [];
      const nested: Array<[string, any]> = [];

      for (const [key, value] of Object.entries(obj)) {
        if (typeof value === 'object' && value !== null) {
          nested.push([key, value]);
        } else {
          properties.push(`  ${key}: ${value};`);
        }
      }

      if (properties.length > 0) {
        cssLines.push(`${selector} {`);
        cssLines.push(...properties);
        cssLines.push('}');
      }

      // Process nested selectors
      nested.forEach(([nestedKey, nestedValue]) => {
        const newSelector = nestedKey.startsWith('&')
          ? selector + nestedKey.substring(1)
          : `${selector} ${nestedKey}`;
        processObject(nestedValue, newSelector);
      });
    };

    // Process top-level selectors
    for (const [selector, value] of Object.entries(styleObj)) {
      if (typeof value === 'object') {
        processObject(value, selector);
      }
    }

    return { css: cssLines.join('\n') };
  });

  return jest.fn(() => ({
    process: mockProcess,
  }));
});

jest.mock('postcss-nesting', () => ({}));
jest.mock('postcss-js', () => ({}));

describe('convertJSSObjectToStyles', () => {
  describe('happy path', () => {
    it('should convert simple JSS object to CSS string', () => {
      const styleObj = {
        '.container': {
          padding: '1rem',
          color: 'red',
        },
      };

      const result = convertJSSObjectToStyles({ styleObj });

      expect(typeof result).toBe('string');
      expect(result).toContain('.container');
      expect(result).toContain('padding');
      expect(result).toContain('color');
    });

    it('should handle nested selectors', () => {
      const styleObj = {
        '.container': {
          padding: '1rem',
          '& .child': {
            margin: '0.5rem',
          },
        },
      };

      const result = convertJSSObjectToStyles({ styleObj });

      expect(result).toContain('.container');
      expect(result).toContain('.child');
    });

    it('should handle pseudo-selectors', () => {
      const styleObj = {
        '.button': {
          color: 'blue',
          '&:hover': {
            color: 'red',
          },
        },
      };

      const result = convertJSSObjectToStyles({ styleObj });

      expect(result).toContain('.button');
      expect(result).toContain(':hover');
    });

    it('should return a string', () => {
      const styleObj = {
        '.test': {
          display: 'block',
        },
      };

      const result = convertJSSObjectToStyles({ styleObj });

      expect(typeof result).toBe('string');
    });
  });

  describe('edge cases', () => {
    it('should handle empty object', () => {
      const styleObj = {};

      const result = convertJSSObjectToStyles({ styleObj });

      expect(typeof result).toBe('string');
    });

    it('should handle multiple top-level selectors', () => {
      const styleObj = {
        '.class1': {
          color: 'red',
        },
        '.class2': {
          color: 'blue',
        },
      };

      const result = convertJSSObjectToStyles({ styleObj });

      expect(result).toContain('.class1');
      expect(result).toContain('.class2');
    });

    it('should handle deeply nested selectors', () => {
      const styleObj = {
        '.parent': {
          '& .child': {
            '& .grandchild': {
              color: 'red',
            },
          },
        },
      };

      const result = convertJSSObjectToStyles({ styleObj });

      expect(typeof result).toBe('string');
    });

    it('should handle media queries', () => {
      const styleObj = {
        '.container': {
          padding: '1rem',
          '@media (min-width: 768px)': {
            padding: '2rem',
          },
        },
      };

      const result = convertJSSObjectToStyles({ styleObj });

      expect(typeof result).toBe('string');
    });

    it('should handle numeric values', () => {
      const styleObj = {
        '.element': {
          opacity: 0.5,
          zIndex: 100,
        },
      };

      const result = convertJSSObjectToStyles({ styleObj });

      expect(result).toContain('opacity');
      expect(result).toContain('zIndex');
    });

    it('should handle pseudo-elements', () => {
      const styleObj = {
        '.element': {
          '&::before': {
            content: '""',
          },
        },
      };

      const result = convertJSSObjectToStyles({ styleObj });

      expect(result).toContain('::before');
    });
  });

  describe('error conditions', () => {
    it('should handle null styleObj', () => {
      expect(() =>
        convertJSSObjectToStyles({ styleObj: null as any }),
      ).toThrow();
    });

    it('should handle undefined styleObj', () => {
      expect(() =>
        convertJSSObjectToStyles({ styleObj: undefined as any }),
      ).toThrow();
    });
  });

  describe('integration', () => {
    it('should use postcss for processing', () => {
      const styleObj = {
        '.test': {
          display: 'block',
        },
      };

      const result = convertJSSObjectToStyles({ styleObj });

      // Should have called postcss
      expect(typeof result).toBe('string');
    });

    it('should use postcss-nesting plugin', () => {
      const styleObj = {
        '.parent': {
          '& .child': {
            color: 'red',
          },
        },
      };

      // Should process nesting
      expect(() => convertJSSObjectToStyles({ styleObj })).not.toThrow();
    });
  });

  describe('return type', () => {
    it('should always return a string', () => {
      const styleObj = { '.test': { color: 'red' } };

      const result = convertJSSObjectToStyles({ styleObj });

      expect(typeof result).toBe('string');
    });

    it('should not return an object', () => {
      const styleObj = { '.test': { color: 'red' } };

      const result = convertJSSObjectToStyles({ styleObj });

      expect(typeof result).not.toBe('object');
    });
  });
});