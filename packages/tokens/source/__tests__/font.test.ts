import * as font from '../font';

describe('Font Tokens', () => {
  describe('Font Sizes', () => {
    it('exports min size', () => {
      expect(font.size.min).toBe('12px');
    });

    it('exports sm size', () => {
      expect(font.size.sm).toBe('14px');
    });

    it('exports base size', () => {
      expect(font.size.base).toBe('16px');
    });

    it('exports lg size', () => {
      expect(font.size.lg).toBe('18px');
    });

    it('exports xl size', () => {
      expect(font.size.xl).toBe('20px');
    });

    it('exports max size', () => {
      expect(font.size.max).toBe('120px');
    });

    it('all sizes have px unit', () => {
      Object.values(font.size).forEach(size => {
        expect(size).toMatch(/^\d+px$/);
      });
    });
  });

  describe('Font Weights', () => {
    it('exports thin weight', () => {
      expect(font.weight.thin).toBe('100');
    });

    it('exports normal weight', () => {
      expect(font.weight.normal).toBe('400');
    });

    it('exports medium weight', () => {
      expect(font.weight.medium).toBe('500');
    });

    it('exports semiBold weight', () => {
      expect(font.weight.semiBold).toBe('600');
    });

    it('exports bold weight', () => {
      expect(font.weight.bold).toBe('700');
    });

    it('exports extraBlack weight', () => {
      expect(font.weight.extraBlack).toBe('950');
    });

    it('all weights are numeric strings', () => {
      Object.values(font.weight).forEach(weight => {
        expect(weight).toMatch(/^\d+$/);
        const numWeight = parseInt(weight, 10);
        expect(numWeight).toBeGreaterThanOrEqual(100);
        expect(numWeight).toBeLessThanOrEqual(950);
      });
    });
  });

  describe('Font Families', () => {
    it('exports sans family', () => {
      expect(font.family.sans).toContain('Interstate');
    });

    it('exports serif family', () => {
      expect(font.family.serif).toContain('Crimson Pro');
    });

    it('exports campaign family', () => {
      expect(font.family.campaign).toContain('Barlow Condensed');
    });

    it('exports mono family', () => {
      expect(font.family.mono).toBe('monospace');
    });

    it('all families are strings', () => {
      Object.values(font.family).forEach(family => {
        expect(typeof family).toBe('string');
        expect(family.length).toBeGreaterThan(0);
      });
    });
  });

  describe('Token Structure', () => {
    it('has size property', () => {
      expect(font).toHaveProperty('size');
    });

    it('has weight property', () => {
      expect(font).toHaveProperty('weight');
    });

    it('has family property', () => {
      expect(font).toHaveProperty('family');
    });

    it('size has expected scale', () => {
      expect(font.size).toHaveProperty('min');
      expect(font.size).toHaveProperty('sm');
      expect(font.size).toHaveProperty('base');
      expect(font.size).toHaveProperty('lg');
      expect(font.size).toHaveProperty('xl');
      expect(font.size).toHaveProperty('2xl');
      expect(font.size).toHaveProperty('max');
    });

    it('weight has expected values', () => {
      expect(font.weight).toHaveProperty('thin');
      expect(font.weight).toHaveProperty('normal');
      expect(font.weight).toHaveProperty('bold');
    });

    it('family has expected fonts', () => {
      expect(font.family).toHaveProperty('sans');
      expect(font.family).toHaveProperty('serif');
      expect(font.family).toHaveProperty('campaign');
      expect(font.family).toHaveProperty('mono');
    });
  });
});
