import { jssEntryToCSS } from '../../styles/jssEntryToCSS';
import * as convertModule from '../../styles/jssToCSS';

// Mock the jssToCSS function
jest.mock('../../styles/jssToCSS', () => ({
  jssToCSS: jest.fn(({ styleObj }) => {
    // Simple mock that returns a CSS-like string
    const selector = Object.keys(styleObj)[0];
    const properties = styleObj[selector];
    let css = `${selector} {\n`;

    for (const [key, value] of Object.entries(properties)) {
      if (key !== 'className' && typeof value !== 'object') {
        css += `  ${key}: ${value};\n`;
      }
    }

    css += '}';
    return css;
  }),
}));

// Mock the styles library
jest.mock('@universityofmaryland/web-styles-library', () => ({}));

describe('jssEntryToCSS', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('happy path', () => {
    it('should wrap styleObj with className selector', () => {
      const jssEntry = {
        className: 'my-component',
        padding: '1rem',
        color: 'red',
      } as any;

      const result = jssEntryToCSS(jssEntry);

      expect(result).toContain('.my-component');
      expect(result).toContain('padding');
      expect(result).toContain('color');
    });

    it('should call jssToCSS', () => {
      const jssEntry = {
        className: 'test',
        color: 'blue',
      } as any;

      jssEntryToCSS(jssEntry);

      expect(convertModule.jssToCSS).toHaveBeenCalled();
    });

    it('should pass wrapped object to jssToCSS', () => {
      const jssEntry = {
        className: 'test-class',
        fontSize: '16px',
      } as any;

      jssEntryToCSS(jssEntry);

      expect(convertModule.jssToCSS).toHaveBeenCalledWith({
        styleObj: {
          '.test-class': jssEntry,
        },
      });
    });

    it('should return a string', () => {
      const jssEntry = {
        className: 'component',
        margin: '0',
      } as any;

      const result = jssEntryToCSS(jssEntry);

      expect(typeof result).toBe('string');
    });

    it('should handle complex style properties', () => {
      const jssEntry = {
        className: 'complex',
        padding: '1rem',
        color: 'red',
        display: 'flex',
      } as any;

      const result = jssEntryToCSS(jssEntry);

      expect(result).toContain('.complex');
    });
  });

  describe('edge cases', () => {
    it('should handle className with hyphens', () => {
      const jssEntry = {
        className: 'my-custom-component',
        color: 'blue',
      } as any;

      const result = jssEntryToCSS(jssEntry);

      expect(result).toContain('.my-custom-component');
    });

    it('should handle className with underscores', () => {
      const jssEntry = {
        className: 'my_component',
        color: 'blue',
      } as any;

      const result = jssEntryToCSS(jssEntry);

      expect(result).toContain('.my_component');
    });

    it('should handle className with numbers', () => {
      const jssEntry = {
        className: 'component123',
        color: 'blue',
      } as any;

      const result = jssEntryToCSS(jssEntry);

      expect(result).toContain('.component123');
    });

    it('should handle empty className', () => {
      const jssEntry = {
        className: '',
        color: 'blue',
      } as any;

      const result = jssEntryToCSS(jssEntry);

      expect(result).toContain('.');
    });

    it('should handle styleObj with nested properties', () => {
      const jssEntry = {
        className: 'nested',
        color: 'blue',
        '&:hover': {
          color: 'red',
        },
      } as any;

      expect(() => jssEntryToCSS(jssEntry)).not.toThrow();
    });

    it('should handle styleObj with pseudo-selectors', () => {
      const jssEntry = {
        className: 'hover-test',
        '&:hover': {
          opacity: 0.8,
        },
      } as any;

      expect(() => jssEntryToCSS(jssEntry)).not.toThrow();
    });

    it('should handle styleObj with media queries', () => {
      const jssEntry = {
        className: 'responsive',
        fontSize: '14px',
        '@media (min-width: 768px)': {
          fontSize: '16px',
        },
      } as any;

      expect(() => jssEntryToCSS(jssEntry)).not.toThrow();
    });
  });

  describe('className wrapping', () => {
    it('should prepend dot to className', () => {
      const jssEntry = {
        className: 'test',
        color: 'red',
      } as any;

      jssEntryToCSS(jssEntry);

      const callArgs = (convertModule.jssToCSS as jest.Mock).mock
        .calls[0][0];
      expect(Object.keys(callArgs.styleObj)[0]).toBe('.test');
    });

    it('should create object with className as key', () => {
      const jssEntry = {
        className: 'my-class',
        padding: '10px',
      } as any;

      jssEntryToCSS(jssEntry);

      const callArgs = (convertModule.jssToCSS as jest.Mock).mock
        .calls[0][0];
      const keys = Object.keys(callArgs.styleObj);
      expect(keys[0]).toBe('.my-class');
    });

    it('should pass original jssEntry as value', () => {
      const jssEntry = {
        className: 'test',
        color: 'blue',
        fontSize: '16px',
      } as any;

      jssEntryToCSS(jssEntry);

      const callArgs = (convertModule.jssToCSS as jest.Mock).mock
        .calls[0][0];
      expect(callArgs.styleObj['.test']).toBe(jssEntry);
    });
  });

  describe('error conditions', () => {
    it('should handle null jssEntry', () => {
      expect(() => jssEntryToCSS(null as any)).toThrow();
    });

    it('should handle undefined jssEntry', () => {
      expect(() => jssEntryToCSS(undefined as any)).toThrow();
    });

    it('should handle jssEntry without className', () => {
      const jssEntry = {
        color: 'red',
      } as any;

      expect(() => jssEntryToCSS(jssEntry)).not.toThrow();
    });

    it('should handle null className', () => {
      const jssEntry = {
        className: null,
        color: 'red',
      } as any;

      expect(() => jssEntryToCSS(jssEntry)).not.toThrow();
    });

    it('should handle undefined className', () => {
      const jssEntry = {
        className: undefined,
        color: 'red',
      } as any;

      expect(() => jssEntryToCSS(jssEntry)).not.toThrow();
    });
  });

  describe('integration with jssToCSS', () => {
    it('should delegate CSS generation to jssToCSS', () => {
      const jssEntry = {
        className: 'delegated',
        margin: '10px',
      } as any;

      jssEntryToCSS(jssEntry);

      expect(convertModule.jssToCSS).toHaveBeenCalledTimes(1);
    });

    it('should return result from jssToCSS', () => {
      (convertModule.jssToCSS as jest.Mock).mockReturnValueOnce(
        'mocked css string',
      );

      const jssEntry = {
        className: 'test',
        color: 'red',
      } as any;

      const result = jssEntryToCSS(jssEntry);

      expect(result).toBe('mocked css string');
    });
  });

  describe('return type', () => {
    it('should always return a string', () => {
      const jssEntry = {
        className: 'test',
        color: 'red',
      } as any;

      const result = jssEntryToCSS(jssEntry);

      expect(typeof result).toBe('string');
    });

    it('should not return an object', () => {
      const jssEntry = {
        className: 'test',
        color: 'red',
      } as any;

      const result = jssEntryToCSS(jssEntry);

      expect(typeof result).not.toBe('object');
    });

    it('should not return undefined', () => {
      const jssEntry = {
        className: 'test',
        color: 'red',
      } as any;

      const result = jssEntryToCSS(jssEntry);

      expect(result).not.toBeUndefined();
    });
  });

  describe('className formats', () => {
    it('should handle camelCase className', () => {
      const jssEntry = {
        className: 'myComponent',
        color: 'red',
      } as any;

      const result = jssEntryToCSS(jssEntry);

      expect(result).toContain('.myComponent');
    });

    it('should handle kebab-case className', () => {
      const jssEntry = {
        className: 'my-component',
        color: 'red',
      } as any;

      const result = jssEntryToCSS(jssEntry);

      expect(result).toContain('.my-component');
    });

    it('should handle PascalCase className', () => {
      const jssEntry = {
        className: 'MyComponent',
        color: 'red',
      } as any;

      const result = jssEntryToCSS(jssEntry);

      expect(result).toContain('.MyComponent');
    });

    it('should handle snake_case className', () => {
      const jssEntry = {
        className: 'my_component',
        color: 'red',
      } as any;

      const result = jssEntryToCSS(jssEntry);

      expect(result).toContain('.my_component');
    });
  });
});
