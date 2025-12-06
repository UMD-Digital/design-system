import * as media from '../media';

describe('Media Tokens', () => {
  describe('Breakpoint Values', () => {
    it('exports small breakpoint', () => {
      expect(media.breakpointValues.small.min).toBe(320);
      expect(media.breakpointValues.small.max).toBe(479);
    });

    it('exports tablet breakpoint', () => {
      expect(media.breakpointValues.tablet.min).toBe(768);
      expect(media.breakpointValues.tablet.max).toBe(1023);
    });

    it('exports desktop breakpoint', () => {
      expect(media.breakpointValues.desktop.min).toBe(1024);
      expect(media.breakpointValues.desktop.max).toBe(1199);
    });

    it('all min values are numbers', () => {
      Object.values(media.breakpointValues).forEach(bp => {
        expect(typeof bp.min).toBe('number');
        expect(bp.min).toBeGreaterThan(0);
      });
    });
  });

  describe('Breakpoints with Units', () => {
    it('exports small with px units', () => {
      expect(media.breakpoints.small.min).toBe('320px');
      expect(media.breakpoints.small.max).toBe('479px');
    });

    it('exports tablet with px units', () => {
      expect(media.breakpoints.tablet.min).toBe('768px');
      expect(media.breakpoints.tablet.max).toBe('1023px');
    });

    it('exports desktop with px units', () => {
      expect(media.breakpoints.desktop.min).toBe('1024px');
      expect(media.breakpoints.desktop.max).toBe('1199px');
    });

    it('all values have px suffix', () => {
      Object.values(media.breakpoints).forEach((bp: any) => {
        expect(bp.min).toMatch(/^\d+px$/);
        if (bp.max) {
          expect(bp.max).toMatch(/^\d+px$/);
        }
      });
    });
  });

  describe('Media Queries', () => {
    it('desktop min query is formatted correctly', () => {
      expect(media.queries.desktop.min).toBe('min-width: 1024px');
    });

    it('tablet max query is formatted correctly', () => {
      expect(media.queries.tablet.max).toBe('max-width: 1023px');
    });

    it('all queries follow min-width/max-width format', () => {
      Object.values(media.queries).forEach((query: any) => {
        expect(query.min).toMatch(/^min-width: \d+px$/);
        if (query.max) {
          expect(query.max).toMatch(/^max-width: \d+px$/);
        }
      });
    });
  });

  describe('Conditionals', () => {
    it('exports conditional variables', () => {
      expect(media.conditionals).toHaveProperty('--isMediaSmall');
      expect(media.conditionals).toHaveProperty('--isMediaTablet');
      expect(media.conditionals).toHaveProperty('--isMediaDesktop');
    });

    it('conditional flags are boolean false by default', () => {
      expect(media.conditionals['--isMediaSmall']).toBe(false);
      expect(media.conditionals['--isMediaDesktop']).toBe(false);
    });
  });

  describe('Token Structure', () => {
    it('has all required properties', () => {
      expect(media).toHaveProperty('breakpointValues');
      expect(media).toHaveProperty('breakpoints');
      expect(media).toHaveProperty('queries');
      expect(media).toHaveProperty('conditionals');
    });

    it('has all expected breakpoint names', () => {
      const expectedNames = ['small', 'medium', 'large', 'tablet', 'desktop', 'highDef', 'maximum'];

      expectedNames.forEach(name => {
        expect(media.breakpointValues).toHaveProperty(name);
        expect(media.breakpoints).toHaveProperty(name);
        expect(media.queries).toHaveProperty(name);
      });
    });
  });

  describe('Breakpoint Consistency', () => {
    it('breakpointValues and breakpoints match', () => {
      expect(media.breakpoints.desktop.min).toBe(`${media.breakpointValues.desktop.min}px`);
      expect(media.breakpoints.tablet.min).toBe(`${media.breakpointValues.tablet.min}px`);
    });

    it('queries use breakpoints values', () => {
      expect(media.queries.desktop.min).toBe(`min-width: ${media.breakpoints.desktop.min}`);
      expect(media.queries.tablet.max).toBe(`max-width: ${media.breakpoints.tablet.max}`);
    });
  });
});
