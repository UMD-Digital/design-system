import { color } from '../source/color';

describe('Color Tokens', () => {
  describe('Brand Colors', () => {
    it('exports UMD primary red', () => {
      expect(color.red).toBe('#E21833');
    });

    it('exports UMD gold', () => {
      expect(color.gold).toBe('#FFD200');
    });

    it('exports blue', () => {
      expect(color.blue).toBe('#2F7EDA');
    });

    it('exports green', () => {
      expect(color.green).toBe('#008000');
    });

    it('exports dark red variant', () => {
      expect(color.redDark).toBe('#A90007');
    });
  });

  describe('Base Colors', () => {
    it('exports white', () => {
      expect(color.white).toBe('#FFFFFF');
    });

    it('exports black', () => {
      expect(color.black).toBe('#000000');
    });
  });

  describe('Gray Scale', () => {
    it('exports darker gray', () => {
      expect(color.gray.darker).toBe('#242424');
    });

    it('exports dark gray', () => {
      expect(color.gray.dark).toBe('#454545');
    });

    it('exports medium AA compliant gray', () => {
      expect(color.gray.mediumAA).toBe('#757575');
    });

    it('exports medium gray', () => {
      expect(color.gray.medium).toBe('#7F7F7F');
    });

    it('exports light gray', () => {
      expect(color.gray.light).toBe('#E6E6E6');
    });

    it('exports lighter gray', () => {
      expect(color.gray.lighter).toBe('#F1F1F1');
    });

    it('exports lightest gray', () => {
      expect(color.gray.lightest).toBe('#FAFAFA');
    });
  });

  describe('Color Format', () => {
    it('all colors are valid hex codes', () => {
      const hexPattern = /^#[0-9A-F]{6}$/i;

      expect(color.red).toMatch(hexPattern);
      expect(color.gold).toMatch(hexPattern);
      expect(color.blue).toMatch(hexPattern);
      expect(color.green).toMatch(hexPattern);
      expect(color.white).toMatch(hexPattern);
      expect(color.black).toMatch(hexPattern);
      expect(color.redDark).toMatch(hexPattern);
    });

    it('all gray scale colors are valid hex codes', () => {
      const hexPattern = /^#[0-9A-F]{6}$/i;

      Object.values(color.gray).forEach(grayValue => {
        expect(grayValue).toMatch(hexPattern);
      });
    });
  });

  describe('Token Structure', () => {
    it('has expected top-level properties', () => {
      expect(color).toHaveProperty('red');
      expect(color).toHaveProperty('gold');
      expect(color).toHaveProperty('blue');
      expect(color).toHaveProperty('green');
      expect(color).toHaveProperty('white');
      expect(color).toHaveProperty('black');
      expect(color).toHaveProperty('redDark');
      expect(color).toHaveProperty('gray');
    });

    it('has all expected gray scale properties', () => {
      expect(color.gray).toHaveProperty('darker');
      expect(color.gray).toHaveProperty('dark');
      expect(color.gray).toHaveProperty('mediumAA');
      expect(color.gray).toHaveProperty('medium');
      expect(color.gray).toHaveProperty('light');
      expect(color.gray).toHaveProperty('lighter');
      expect(color.gray).toHaveProperty('lightest');
    });
  });
});
