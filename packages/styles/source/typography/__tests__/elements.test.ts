import * as elements from '../elements';
import { font } from '../../token';

describe('typography/elements', () => {
  it('should match snapshot', () => {
    expect(elements).toMatchSnapshot();
  });

  describe('element typography objects', () => {
    it('should contain typography styles for different UI elements', () => {
      // Test for common element typography exports
      expect(elements.eyebrow).toBeDefined();
      expect(elements.labelMedium).toBeDefined();
      expect(elements.labelSmall).toBeDefined();
      expect(elements.interativeMedium).toBeDefined();
      expect(elements.interativeSmall).toBeDefined();
    });

    it('should use appropriate font styles for elements', () => {
      // Elements should have appropriate font family
      expect(elements.labelMedium.fontFamily).toBe(font.family.sans);
      expect(elements.labelSmall.fontFamily).toBe(font.family.sans);
      expect(elements.interativeMedium.fontFamily).toBe(font.family.sans);
      expect(elements.interativeSmall.fontFamily).toBe(font.family.sans);
    });

    it('should match snapshots for element typography', () => {
      expect(elements.eyebrow).toMatchSnapshot('eyebrow');
      expect(elements.labelMedium).toMatchSnapshot('labelMedium');
      expect(elements.labelSmall).toMatchSnapshot('labelSmall');
      expect(elements.interativeMedium).toMatchSnapshot('interactiveMedium');
      expect(elements.interativeSmall).toMatchSnapshot('interactiveSmall');
    });
  });

  describe('fonts objects', () => {
    it('should have correctly named font objects with classNames', () => {
      // Check if the fonts object contains class definitions for the elements
      expect(elements.fonts.eyebrow.className).toBe('umd-eyebrow');
      expect(elements.fonts.labelMedium.className).toBe('umd-label-sans-medium');
      expect(elements.fonts.labelSmall.className).toBe('umd-label-sans-small');
      expect(elements.fonts.medium.className).toBe('umd-interactive-sans-medium');
      expect(elements.fonts.small.className).toBe('umd-interactive-sans-small');
    });

    it('should match snapshot for all fonts objects', () => {
      expect(elements.fonts).toMatchSnapshot();
    });
  });
});