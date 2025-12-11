import { jssToCSS } from '../../source/styles/jssToCSS';

// Mock postcss modules - use factory function for hoisting
jest.mock('postcss', () => {
  const mockProcess = jest.fn((styleObj: any, options: any) => {
    return { css: 'mock-css-output' };
  });

  return jest.fn(() => ({
    process: mockProcess,
  }));
});

jest.mock('postcss-nesting', () => ({}));
jest.mock('postcss-js', () => ({}));

const postcss = require('postcss') as jest.Mock;
const mockProcess = postcss().process as jest.Mock;

describe('jssToCSS', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('function calls', () => {
    it('should call postcss with styleObj', () => {
      const styleObj = {
        '.container': {
          padding: '1rem',
          color: 'red',
        },
      };

      jssToCSS({ styleObj });

      expect(postcss).toHaveBeenCalled();
      expect(mockProcess).toHaveBeenCalledWith(
        styleObj,
        expect.objectContaining({ parser: expect.anything() }),
      );
    });

    it('should return string from postcss', () => {
      const styleObj = { '.test': { display: 'block' } };

      const result = jssToCSS({ styleObj });

      expect(typeof result).toBe('string');
      expect(result).toBe('mock-css-output');
    });
  });
});
