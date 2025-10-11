import { createMediaQueryRange } from '../../styles/createMediaQueryRange';

describe('createMediaQueryRange', () => {
  describe('happy path', () => {
    it('should create range query with min and max', () => {
      const styles = { fontSize: '18px' };

      const result = createMediaQueryRange(768, 1023, styles);

      expect(result).toHaveProperty('@media (min-width: 768px) and (max-width: 1023px)');
      expect(result['@media (min-width: 768px) and (max-width: 1023px)']).toEqual(
        styles,
      );
    });

    it('should include px units on both values', () => {
      const styles = { padding: '2rem' };

      const result = createMediaQueryRange(768, 1023, styles);

      const key = Object.keys(result)[0];
      expect(key).toContain('768px');
      expect(key).toContain('1023px');
    });

    it('should use "and" to combine min and max', () => {
      const styles = { fontSize: '16px' };

      const result = createMediaQueryRange(768, 1023, styles);

      const key = Object.keys(result)[0];
      expect(key).toContain(' and ');
    });

    it('should preserve all styles', () => {
      const styles = {
        fontSize: '18px',
        padding: '2rem',
        color: 'blue',
        display: 'grid',
      };

      const result = createMediaQueryRange(768, 1023, styles);

      expect(result['@media (min-width: 768px) and (max-width: 1023px)']).toEqual(
        styles,
      );
    });

    it('should work with nested style objects', () => {
      const styles = {
        fontSize: '18px',
        '&:hover': {
          color: 'blue',
        },
        '@supports (display: grid)': {
          display: 'grid',
        },
      };

      const result = createMediaQueryRange(768, 1023, styles);

      expect(result['@media (min-width: 768px) and (max-width: 1023px)']).toEqual(
        styles,
      );
    });
  });

  describe('edge cases', () => {
    it('should handle zero as min breakpoint', () => {
      const styles = { fontSize: '14px' };

      const result = createMediaQueryRange(0, 767, styles);

      expect(result).toHaveProperty('@media (min-width: 0px) and (max-width: 767px)');
    });

    it('should handle zero as max breakpoint', () => {
      const styles = { fontSize: '14px' };

      const result = createMediaQueryRange(-100, 0, styles);

      expect(result).toHaveProperty('@media (min-width: -100px) and (max-width: 0px)');
    });

    it('should handle negative breakpoints', () => {
      const styles = { fontSize: '14px' };

      const result = createMediaQueryRange(-200, -100, styles);

      expect(result).toHaveProperty(
        '@media (min-width: -200px) and (max-width: -100px)',
      );
    });

    it('should handle very large breakpoints', () => {
      const styles = { fontSize: '24px' };

      const result = createMediaQueryRange(5000, 10000, styles);

      expect(result).toHaveProperty(
        '@media (min-width: 5000px) and (max-width: 10000px)',
      );
    });

    it('should handle min greater than max', () => {
      const styles = { fontSize: '16px' };

      const result = createMediaQueryRange(1024, 768, styles);

      // Still creates the query, even if logically incorrect
      expect(result).toHaveProperty(
        '@media (min-width: 1024px) and (max-width: 768px)',
      );
    });

    it('should handle min equal to max', () => {
      const styles = { fontSize: '16px' };

      const result = createMediaQueryRange(768, 768, styles);

      expect(result).toHaveProperty(
        '@media (min-width: 768px) and (max-width: 768px)',
      );
    });

    it('should handle empty styles object', () => {
      const result = createMediaQueryRange(768, 1023, {});

      expect(result['@media (min-width: 768px) and (max-width: 1023px)']).toEqual({});
    });

    it('should handle undefined styles (uses default)', () => {
      const result = createMediaQueryRange(768, 1023);

      expect(result['@media (min-width: 768px) and (max-width: 1023px)']).toEqual({});
    });

    it('should handle fractional breakpoints', () => {
      const styles = { fontSize: '16px' };

      const result = createMediaQueryRange(768.5, 1023.75, styles);

      const key = Object.keys(result)[0];
      expect(key).toContain('768.5');
      expect(key).toContain('1023.75');
    });

    it('should handle styles with null values', () => {
      const styles = {
        fontSize: '16px',
        color: null,
      };

      const result = createMediaQueryRange(768, 1023, styles);

      expect(result['@media (min-width: 768px) and (max-width: 1023px)']).toEqual(
        styles,
      );
    });

    it('should handle styles with undefined values', () => {
      const styles = {
        fontSize: '16px',
        color: undefined,
      };

      const result = createMediaQueryRange(768, 1023, styles);

      expect(result['@media (min-width: 768px) and (max-width: 1023px)']).toEqual(
        styles,
      );
    });
  });

  describe('common tablet range', () => {
    it('should handle typical tablet range (768-1023)', () => {
      const styles = {
        fontSize: '18px',
        padding: '2rem',
      };

      const result = createMediaQueryRange(768, 1023, styles);

      expect(result).toHaveProperty('@media (min-width: 768px) and (max-width: 1023px)');
    });

    it('should handle portrait tablet range', () => {
      const styles = { columns: 2 };

      const result = createMediaQueryRange(768, 991, styles);

      expect(result).toHaveProperty('@media (min-width: 768px) and (max-width: 991px)');
    });

    it('should handle landscape tablet range', () => {
      const styles = { columns: 3 };

      const result = createMediaQueryRange(992, 1199, styles);

      expect(result).toHaveProperty('@media (min-width: 992px) and (max-width: 1199px)');
    });
  });

  describe('structure validation', () => {
    it('should have single top-level key', () => {
      const styles = { fontSize: '16px' };

      const result = createMediaQueryRange(768, 1023, styles);

      expect(Object.keys(result).length).toBe(1);
    });

    it('should have media query as key', () => {
      const styles = { fontSize: '16px' };

      const result = createMediaQueryRange(768, 1023, styles);

      const keys = Object.keys(result);
      expect(keys[0]).toContain('@media');
    });

    it('should have min-width in media query', () => {
      const styles = { fontSize: '16px' };

      const result = createMediaQueryRange(768, 1023, styles);

      const keys = Object.keys(result);
      expect(keys[0]).toContain('min-width');
    });

    it('should have max-width in media query', () => {
      const styles = { fontSize: '16px' };

      const result = createMediaQueryRange(768, 1023, styles);

      const keys = Object.keys(result);
      expect(keys[0]).toContain('max-width');
    });

    it('should have both breakpoints in media query', () => {
      const styles = { fontSize: '16px' };

      const result = createMediaQueryRange(768, 1023, styles);

      const keys = Object.keys(result);
      expect(keys[0]).toContain('768');
      expect(keys[0]).toContain('1023');
    });

    it('should have px units in media query', () => {
      const styles = { fontSize: '16px' };

      const result = createMediaQueryRange(768, 1023, styles);

      const keys = Object.keys(result);
      expect((keys[0].match(/px/g) || []).length).toBe(2);
    });
  });

  describe('immutability', () => {
    it('should not modify input styles object', () => {
      const styles = {
        fontSize: '16px',
        color: 'red',
      };

      const originalStyles = { ...styles };

      createMediaQueryRange(768, 1023, styles);

      expect(styles).toEqual(originalStyles);
    });

    it('should return new object', () => {
      const styles = { fontSize: '16px' };

      const result = createMediaQueryRange(768, 1023, styles);

      expect(result).not.toBe(styles);
    });
  });

  describe('return type', () => {
    it('should return an object', () => {
      const styles = { fontSize: '16px' };

      const result = createMediaQueryRange(768, 1023, styles);

      expect(typeof result).toBe('object');
      expect(result).not.toBeNull();
    });

    it('should not return an array', () => {
      const styles = { fontSize: '16px' };

      const result = createMediaQueryRange(768, 1023, styles);

      expect(Array.isArray(result)).toBe(false);
    });
  });

  describe('use cases', () => {
    it('should support tablet-specific layouts', () => {
      const result = createMediaQueryRange(768, 1023, {
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '2rem',
      });

      const styles = result['@media (min-width: 768px) and (max-width: 1023px)'];
      expect(styles.gridTemplateColumns).toBe('repeat(2, 1fr)');
    });

    it('should support responsive typography', () => {
      const result = createMediaQueryRange(768, 1023, {
        fontSize: '18px',
        lineHeight: 1.6,
      });

      const styles = result['@media (min-width: 768px) and (max-width: 1023px)'];
      expect(styles.fontSize).toBe('18px');
      expect(styles.lineHeight).toBe(1.6);
    });

    it('should support device-specific styles', () => {
      const result = createMediaQueryRange(768, 1023, {
        padding: '2rem',
        maxWidth: '960px',
        margin: '0 auto',
      });

      const styles = result['@media (min-width: 768px) and (max-width: 1023px)'];
      expect(styles.maxWidth).toBe('960px');
    });

    it('should support combining with other media queries', () => {
      const styles = {
        fontSize: '18px',
        '@media (orientation: landscape)': {
          columns: 3,
        },
      };

      const result = createMediaQueryRange(768, 1023, styles);

      const rangeStyles = result['@media (min-width: 768px) and (max-width: 1023px)'];
      expect(rangeStyles).toEqual(styles);
    });
  });

  describe('comparison with createMediaQuery', () => {
    it('should create more specific query than createMediaQuery', () => {
      const styles = { fontSize: '16px' };

      const result = createMediaQueryRange(768, 1023, styles);
      const key = Object.keys(result)[0];

      // Should have both min and max
      expect(key).toContain('min-width');
      expect(key).toContain('max-width');
      expect(key).toContain(' and ');
    });

    it('should limit styles to specific viewport range', () => {
      const tabletOnlyStyles = createMediaQueryRange(768, 1023, {
        columns: 2,
      });

      // This media query will ONLY apply between 768px and 1023px
      expect(tabletOnlyStyles).toHaveProperty(
        '@media (min-width: 768px) and (max-width: 1023px)',
      );
    });
  });
});
