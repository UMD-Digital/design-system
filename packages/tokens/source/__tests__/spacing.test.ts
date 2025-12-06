import spacing from '../spacing';
import { maxWidth } from '../spacing';

describe('Spacing Tokens', () => {
  describe('Spacing Scale', () => {
    it('exports min spacing', () => {
      expect(spacing.min).toBe('8px');
    });

    it('exports xs spacing', () => {
      expect(spacing.xs).toBe('12px');
    });

    it('exports sm spacing', () => {
      expect(spacing.sm).toBe('16px');
    });

    it('exports md spacing', () => {
      expect(spacing.md).toBe('24px');
    });

    it('exports lg spacing', () => {
      expect(spacing.lg).toBe('32px');
    });

    it('exports xl spacing', () => {
      expect(spacing.xl).toBe('40px');
    });

    it('exports max spacing', () => {
      expect(spacing.max).toBe('120px');
    });

    it('all spacing values have px unit', () => {
      const spacingValues = [
        spacing.min,
        spacing.xs,
        spacing.sm,
        spacing.md,
        spacing.lg,
        spacing.xl,
        spacing['2xl'],
        spacing.max,
      ];

      spacingValues.forEach(value => {
        expect(value).toMatch(/^\d+px$/);
      });
    });
  });

  describe('Max Width Tokens', () => {
    it('exports smallest max width', () => {
      expect(spacing.maxWidth.smallest).toBe('800px');
    });

    it('exports small max width', () => {
      expect(spacing.maxWidth.small).toBe('992px');
    });

    it('exports normal max width', () => {
      expect(spacing.maxWidth.normal).toBe('1280px');
    });

    it('exports large max width', () => {
      expect(spacing.maxWidth.large).toBe('1400px');
    });

    it('exports larger max width', () => {
      expect(spacing.maxWidth.larger).toBe('1600px');
    });

    it('all max widths have px unit', () => {
      Object.values(spacing.maxWidth).forEach(value => {
        expect(value).toMatch(/^\d+px$/);
      });
    });

    it('can import maxWidth separately', () => {
      expect(maxWidth.normal).toBe('1280px');
      expect(maxWidth.large).toBe('1400px');
    });
  });

  describe('Token Structure', () => {
    it('has expected spacing properties', () => {
      expect(spacing).toHaveProperty('min');
      expect(spacing).toHaveProperty('xs');
      expect(spacing).toHaveProperty('sm');
      expect(spacing).toHaveProperty('md');
      expect(spacing).toHaveProperty('lg');
      expect(spacing).toHaveProperty('xl');
      expect(spacing).toHaveProperty('max');
      expect(spacing).toHaveProperty('maxWidth');
    });

    it('has maxWidth object with expected properties', () => {
      expect(spacing.maxWidth).toHaveProperty('smallest');
      expect(spacing.maxWidth).toHaveProperty('small');
      expect(spacing.maxWidth).toHaveProperty('normal');
      expect(spacing.maxWidth).toHaveProperty('large');
      expect(spacing.maxWidth).toHaveProperty('larger');
    });

    it('supports numeric key access for extended scale', () => {
      expect(spacing['2xl']).toBe('48px');
      expect(spacing['3xl']).toBe('56px');
      expect(spacing['4xl']).toBe('64px');
    });
  });

  describe('Spacing Progression', () => {
    it('spacing values increase progressively', () => {
      const values = [
        parseInt(spacing.min),
        parseInt(spacing.xs),
        parseInt(spacing.sm),
        parseInt(spacing.md),
        parseInt(spacing.lg),
        parseInt(spacing.xl),
      ];

      for (let i = 1; i < values.length; i++) {
        expect(values[i]).toBeGreaterThan(values[i - 1]);
      }
    });

    it('max width values increase progressively', () => {
      const values = [
        parseInt(spacing.maxWidth.smallest),
        parseInt(spacing.maxWidth.small),
        parseInt(spacing.maxWidth.normal),
        parseInt(spacing.maxWidth.large),
        parseInt(spacing.maxWidth.larger),
      ];

      for (let i = 1; i < values.length; i++) {
        expect(values[i]).toBeGreaterThan(values[i - 1]);
      }
    });
  });
});
