import * as token from '../source/index';

describe('Token Package Main Export', () => {
  describe('Exports Structure', () => {
    it('exports color tokens', () => {
      expect(token).toHaveProperty('color');
      expect(token.color).toHaveProperty('red');
      expect(token.color.red).toBe('#E21833');
    });

    it('exports spacing tokens', () => {
      expect(token).toHaveProperty('spacing');
      expect(token.spacing).toHaveProperty('md');
      expect(token.spacing.md).toBe('24px');
    });

    it('exports font tokens as namespace', () => {
      expect(token).toHaveProperty('font');
      expect(token.font).toHaveProperty('size');
      expect(token.font).toHaveProperty('weight');
      expect(token.font).toHaveProperty('family');
    });

    it('exports media tokens as namespace', () => {
      expect(token).toHaveProperty('media');
      expect(token.media).toHaveProperty('breakpoints');
      expect(token.media).toHaveProperty('queries');
      expect(token.media).toHaveProperty('conditionals');
    });
  });

  describe('Token Values', () => {
    it('can access color values', () => {
      expect(token.color.white).toBe('#FFFFFF');
      expect(token.color.gray.dark).toBe('#454545');
    });

    it('can access spacing values', () => {
      expect(token.spacing.sm).toBe('16px');
      expect(token.spacing.lg).toBe('32px');
    });

    it('can access font values', () => {
      expect(token.font.size.base).toBe('16px');
      expect(token.font.weight.bold).toBe('700');
      expect(token.font.family.sans).toContain('Interstate');
    });

    it('can access media values', () => {
      expect(token.media.breakpoints.desktop.min).toBe('1024px');
      expect(token.media.queries.tablet.min).toBe('min-width: 768px');
    });
  });
});
