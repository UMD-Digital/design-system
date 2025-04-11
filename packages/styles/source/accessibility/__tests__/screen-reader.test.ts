import { only } from '../screen-reader';

describe('accessibility/screen-reader', () => {
  describe('only', () => {
    it('should match snapshot', () => {
      expect(only).toMatchSnapshot();
    });

    it('should have correct className', () => {
      expect(only.className).toBe('sr-only');
    });

    it('should have appropriate styles for screen reader only content', () => {
      expect(only.clip).toBe('rect(0,0,0,0)');
      expect(only.position).toBe('absolute');
      expect(only.width).toBe('1px');
      expect(only.height).toBe('1px');
      expect(only.overflow).toBe('hidden');
      expect(only.whiteSpace).toBe('nowrap');
    });
  });
});