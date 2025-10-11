import { createMediaQuery } from '../../styles/createMediaQuery';

describe('createMediaQuery', () => {
  describe('happy path', () => {
    it('should create max-width query by default', () => {
      const styles = { fontSize: '16px' };

      const result = createMediaQuery('max-width', 767, styles);

      expect(result).toHaveProperty('@media (max-width: 767px)');
      expect(result['@media (max-width: 767px)']).toEqual(styles);
    });

    it('should create min-width query', () => {
      const styles = { fontSize: '18px' };

      const result = createMediaQuery('min-width', 768, styles);

      expect(result).toHaveProperty('@media (min-width: 768px)');
      expect(result['@media (min-width: 768px)']).toEqual(styles);
    });

    it('should include px units in media query', () => {
      const styles = { padding: '2rem' };

      const result = createMediaQuery('min-width', 1024, styles);

      expect(result).toHaveProperty('@media (min-width: 1024px)');
    });

    it('should preserve all styles', () => {
      const styles = {
        fontSize: '18px',
        padding: '2rem',
        color: 'blue',
      };

      const result = createMediaQuery('min-width', 768, styles);

      expect(result['@media (min-width: 768px)']).toEqual(styles);
    });

    it('should work with nested style objects', () => {
      const styles = {
        fontSize: '18px',
        '&:hover': {
          color: 'blue',
        },
      };

      const result = createMediaQuery('min-width', 768, styles);

      expect(result['@media (min-width: 768px)']).toEqual(styles);
    });
  });

  describe('edge cases', () => {
    it('should handle zero breakpoint', () => {
      const styles = { fontSize: '14px' };

      const result = createMediaQuery('min-width', 0, styles);

      expect(result).toHaveProperty('@media (min-width: 0px)');
    });

    it('should handle negative breakpoint', () => {
      const styles = { fontSize: '14px' };

      const result = createMediaQuery('min-width', -100, styles);

      expect(result).toHaveProperty('@media (min-width: -100px)');
    });

    it('should handle very large breakpoint', () => {
      const styles = { fontSize: '24px' };

      const result = createMediaQuery('min-width', 99999, styles);

      expect(result).toHaveProperty('@media (min-width: 99999px)');
    });

    it('should handle empty styles object', () => {
      const result = createMediaQuery('min-width', 768, {});

      expect(result['@media (min-width: 768px)']).toEqual({});
    });

    it('should handle undefined styles (uses default)', () => {
      const result = createMediaQuery('min-width', 768);

      expect(result['@media (min-width: 768px)']).toEqual({});
    });

    it('should handle fractional breakpoints', () => {
      const styles = { fontSize: '16px' };

      const result = createMediaQuery('min-width', 768.5, styles);

      const key = Object.keys(result)[0];
      expect(key).toContain('768.5');
    });

    it('should handle styles with null values', () => {
      const styles = {
        fontSize: '16px',
        color: null,
      };

      const result = createMediaQuery('min-width', 768, styles);

      expect(result['@media (min-width: 768px)']).toEqual(styles);
    });

    it('should handle styles with undefined values', () => {
      const styles = {
        fontSize: '16px',
        color: undefined,
      };

      const result = createMediaQuery('min-width', 768, styles);

      expect(result['@media (min-width: 768px)']).toEqual(styles);
    });

    it('should handle styles with numeric values', () => {
      const styles = {
        opacity: 0.8,
        zIndex: 100,
      };

      const result = createMediaQuery('min-width', 768, styles);

      expect(result['@media (min-width: 768px)']).toEqual(styles);
    });

    it('should handle styles with array values', () => {
      const styles = {
        background: ['linear-gradient()', 'url(image.png)'],
      };

      const result = createMediaQuery('min-width', 768, styles);

      expect(result['@media (min-width: 768px)']).toEqual(styles);
    });
  });

  describe('common breakpoints', () => {
    it('should handle mobile breakpoint (max-width: 767px)', () => {
      const styles = { fontSize: '14px' };

      const result = createMediaQuery('max-width', 767, styles);

      expect(result).toHaveProperty('@media (max-width: 767px)');
    });

    it('should handle tablet breakpoint (min-width: 768px)', () => {
      const styles = { fontSize: '16px' };

      const result = createMediaQuery('min-width', 768, styles);

      expect(result).toHaveProperty('@media (min-width: 768px)');
    });

    it('should handle desktop breakpoint (min-width: 1024px)', () => {
      const styles = { fontSize: '18px' };

      const result = createMediaQuery('min-width', 1024, styles);

      expect(result).toHaveProperty('@media (min-width: 1024px)');
    });

    it('should handle large desktop breakpoint (min-width: 1440px)', () => {
      const styles = { fontSize: '20px' };

      const result = createMediaQuery('min-width', 1440, styles);

      expect(result).toHaveProperty('@media (min-width: 1440px)');
    });
  });

  describe('structure validation', () => {
    it('should have single top-level key', () => {
      const styles = { fontSize: '16px' };

      const result = createMediaQuery('min-width', 768, styles);

      expect(Object.keys(result).length).toBe(1);
    });

    it('should have media query as key', () => {
      const styles = { fontSize: '16px' };

      const result = createMediaQuery('min-width', 768, styles);

      const keys = Object.keys(result);
      expect(keys[0]).toContain('@media');
    });

    it('should have comparison in media query', () => {
      const styles = { fontSize: '16px' };

      const result = createMediaQuery('min-width', 768, styles);

      const keys = Object.keys(result);
      expect(keys[0]).toContain('min-width');
    });

    it('should have breakpoint in media query', () => {
      const styles = { fontSize: '16px' };

      const result = createMediaQuery('min-width', 768, styles);

      const keys = Object.keys(result);
      expect(keys[0]).toContain('768');
    });

    it('should have px units in media query', () => {
      const styles = { fontSize: '16px' };

      const result = createMediaQuery('min-width', 768, styles);

      const keys = Object.keys(result);
      expect(keys[0]).toContain('px');
    });
  });

  describe('immutability', () => {
    it('should not modify input styles object', () => {
      const styles = {
        fontSize: '16px',
        color: 'red',
      };

      const originalStyles = { ...styles };

      createMediaQuery('min-width', 768, styles);

      expect(styles).toEqual(originalStyles);
    });

    it('should return new object', () => {
      const styles = { fontSize: '16px' };

      const result = createMediaQuery('min-width', 768, styles);

      expect(result).not.toBe(styles);
    });
  });

  describe('return type', () => {
    it('should return an object', () => {
      const styles = { fontSize: '16px' };

      const result = createMediaQuery('min-width', 768, styles);

      expect(typeof result).toBe('object');
      expect(result).not.toBeNull();
    });

    it('should not return an array', () => {
      const styles = { fontSize: '16px' };

      const result = createMediaQuery('min-width', 768, styles);

      expect(Array.isArray(result)).toBe(false);
    });
  });

  describe('comparison types', () => {
    it('should support max-width comparison', () => {
      const styles = { fontSize: '14px' };

      const result = createMediaQuery('max-width', 767, styles);

      expect(result).toHaveProperty('@media (max-width: 767px)');
    });

    it('should support min-width comparison', () => {
      const styles = { fontSize: '18px' };

      const result = createMediaQuery('min-width', 768, styles);

      expect(result).toHaveProperty('@media (min-width: 768px)');
    });

    it('should default to max-width when comparison not provided', () => {
      const styles = { fontSize: '16px' };
      const comparison = undefined;

      // Would need to test the default parameter behavior
      const result = createMediaQuery(comparison as any, 767, styles);

      // With undefined, it uses default 'max-width' parameter
      expect(result).toHaveProperty('@media (max-width: 767px)');
    });
  });

  describe('use cases', () => {
    it('should support responsive font sizes', () => {
      const mobileStyles = createMediaQuery('max-width', 767, {
        fontSize: '14px',
      });

      const tabletStyles = createMediaQuery('min-width', 768, {
        fontSize: '16px',
      });

      expect(mobileStyles['@media (max-width: 767px)'].fontSize).toBe('14px');
      expect(tabletStyles['@media (min-width: 768px)'].fontSize).toBe('16px');
    });

    it('should support responsive layouts', () => {
      const result = createMediaQuery('min-width', 768, {
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '2rem',
      });

      const styles = result['@media (min-width: 768px)'];
      expect(styles.display).toBe('grid');
      expect(styles.gridTemplateColumns).toBe('repeat(2, 1fr)');
    });

    it('should support responsive spacing', () => {
      const result = createMediaQuery('min-width', 1024, {
        padding: '3rem',
        margin: '2rem auto',
      });

      const styles = result['@media (min-width: 1024px)'];
      expect(styles.padding).toBe('3rem');
      expect(styles.margin).toBe('2rem auto');
    });
  });
});
