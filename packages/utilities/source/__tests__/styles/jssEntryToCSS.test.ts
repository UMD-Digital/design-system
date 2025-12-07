import { jssEntryToCSS } from '../../styles/jssEntryToCSS';
import * as convertModule from '../../styles/jssToCSS';

// Mock the jssToCSS function
jest.mock('../../styles/jssToCSS', () => ({
  jssToCSS: jest.fn(() => 'mock-css-output'),
}));

// Mock the styles library
jest.mock('@universityofmaryland/web-styles-library', () => ({}));

describe('jssEntryToCSS', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('function calls', () => {
    it('should call jssToCSS with wrapped object', () => {
      const jssEntry = {
        className: 'test-class',
        fontSize: '16px',
        color: 'blue',
      } as any;

      jssEntryToCSS(jssEntry);

      expect(convertModule.jssToCSS).toHaveBeenCalledWith({
        styleObj: {
          '.test-class': jssEntry,
        },
      });
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

  describe('className wrapping', () => {
    it('should prepend dot to className', () => {
      const jssEntry = {
        className: 'test',
        color: 'red',
      } as any;

      jssEntryToCSS(jssEntry);

      const callArgs = (convertModule.jssToCSS as jest.Mock).mock.calls[0][0];
      expect(Object.keys(callArgs.styleObj)[0]).toBe('.test');
    });

    it('should pass original jssEntry as value', () => {
      const jssEntry = {
        className: 'test',
        color: 'blue',
        fontSize: '16px',
      } as any;

      jssEntryToCSS(jssEntry);

      const callArgs = (convertModule.jssToCSS as jest.Mock).mock.calls[0][0];
      expect(callArgs.styleObj['.test']).toBe(jssEntry);
    });
  });
});
