import { content } from '../skip';

describe('accessibility/skip', () => {
  describe('content', () => {
    it('should match snapshot', () => {
      expect(content).toMatchSnapshot();
    });

    it('should have correct className', () => {
      expect(content.className).toBe('umd-skip-content');
    });

    it('should have appropriate base styles', () => {
      expect(content.backgroundColor).toBe('#fff');
      expect(content.color).toBe('#e21833');
      expect(content.position).toBe('absolute');
      expect(content.opacity).toBe('0');
      expect(content.overflow).toBe('hidden');
      expect(content.whiteSpace).toBe('nowrap');
    });

    it('should have appropriate focus styles', () => {
      const focusStyles = content['&:focus'];
      expect(focusStyles).toBeDefined();
      expect(focusStyles.display).toBe('block');
      expect(focusStyles.opacity).toBe('1');
      expect(focusStyles.zIndex).toBe('9999');
    });
  });
});