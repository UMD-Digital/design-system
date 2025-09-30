import { withViewTimelineAnimation } from '../../styles/withViewTimelineAnimation';

describe('withViewTimelineAnimation', () => {
  describe('happy path', () => {
    it('should wrap styles in media query and supports', () => {
      const styles = {
        animation: 'fadeIn 1s ease-in',
        'animation-timeline': 'view()',
      };

      const result = withViewTimelineAnimation(styles);

      expect(result).toHaveProperty('@media (prefers-reduced-motion: no-preference)');
      expect(result['@media (prefers-reduced-motion: no-preference)']).toHaveProperty(
        '@supports (animation-timeline: view())',
      );
    });

    it('should preserve original styles', () => {
      const styles = {
        animation: 'fadeIn 1s',
        color: 'red',
      };

      const result = withViewTimelineAnimation(styles);

      const innerStyles =
        result['@media (prefers-reduced-motion: no-preference)'][
          '@supports (animation-timeline: view())'
        ];

      expect(innerStyles).toEqual(styles);
    });

    it('should work with empty styles object', () => {
      const styles = {};

      const result = withViewTimelineAnimation(styles);

      const innerStyles =
        result['@media (prefers-reduced-motion: no-preference)'][
          '@supports (animation-timeline: view())'
        ];

      expect(innerStyles).toEqual({});
    });

    it('should work with complex style objects', () => {
      const styles = {
        animation: 'fadeIn 1s',
        'animation-timeline': 'view()',
        '&:hover': {
          opacity: 0.8,
        },
        '@media (min-width: 768px)': {
          fontSize: '18px',
        },
      };

      const result = withViewTimelineAnimation(styles);

      const innerStyles =
        result['@media (prefers-reduced-motion: no-preference)'][
          '@supports (animation-timeline: view())'
        ];

      expect(innerStyles).toEqual(styles);
    });
  });

  describe('edge cases', () => {
    it('should handle styles with numeric values', () => {
      const styles = {
        opacity: 0.5,
        zIndex: 100,
        order: 1,
      };

      const result = withViewTimelineAnimation(styles);

      const innerStyles =
        result['@media (prefers-reduced-motion: no-preference)'][
          '@supports (animation-timeline: view())'
        ];

      expect(innerStyles).toEqual(styles);
    });

    it('should handle styles with array values', () => {
      const styles = {
        background: ['linear-gradient()', 'url(image.png)'],
      };

      const result = withViewTimelineAnimation(styles);

      const innerStyles =
        result['@media (prefers-reduced-motion: no-preference)'][
          '@supports (animation-timeline: view())'
        ];

      expect(innerStyles).toEqual(styles);
    });

    it('should handle styles with null values', () => {
      const styles = {
        animation: 'fadeIn 1s',
        color: null,
      };

      const result = withViewTimelineAnimation(styles);

      const innerStyles =
        result['@media (prefers-reduced-motion: no-preference)'][
          '@supports (animation-timeline: view())'
        ];

      expect(innerStyles).toEqual(styles);
    });

    it('should handle styles with undefined values', () => {
      const styles = {
        animation: 'fadeIn 1s',
        color: undefined,
      };

      const result = withViewTimelineAnimation(styles);

      const innerStyles =
        result['@media (prefers-reduced-motion: no-preference)'][
          '@supports (animation-timeline: view())'
        ];

      expect(innerStyles).toEqual(styles);
    });

    it('should handle deeply nested style objects', () => {
      const styles = {
        '&:hover': {
          '&::before': {
            content: '""',
          },
        },
      };

      const result = withViewTimelineAnimation(styles);

      const innerStyles =
        result['@media (prefers-reduced-motion: no-preference)'][
          '@supports (animation-timeline: view())'
        ];

      expect(innerStyles).toEqual(styles);
    });

    it('should handle styles with special characters', () => {
      const styles = {
        content: '"\\2192"',
        fontFamily: '"Open Sans", sans-serif',
      };

      const result = withViewTimelineAnimation(styles);

      const innerStyles =
        result['@media (prefers-reduced-motion: no-preference)'][
          '@supports (animation-timeline: view())'
        ];

      expect(innerStyles).toEqual(styles);
    });
  });

  describe('structure validation', () => {
    it('should have correct media query key', () => {
      const styles = { animation: 'fadeIn 1s' };

      const result = withViewTimelineAnimation(styles);

      expect(result).toHaveProperty('@media (prefers-reduced-motion: no-preference)');
    });

    it('should have correct supports query key', () => {
      const styles = { animation: 'fadeIn 1s' };

      const result = withViewTimelineAnimation(styles);

      const mediaQuery = result['@media (prefers-reduced-motion: no-preference)'];
      expect(mediaQuery).toHaveProperty('@supports (animation-timeline: view())');
    });

    it('should nest supports inside media query', () => {
      const styles = { animation: 'fadeIn 1s' };

      const result = withViewTimelineAnimation(styles);

      expect(Object.keys(result)).toEqual(['@media (prefers-reduced-motion: no-preference)']);
      expect(Object.keys(result['@media (prefers-reduced-motion: no-preference)'])).toEqual([
        '@supports (animation-timeline: view())',
      ]);
    });

    it('should only have one top-level key', () => {
      const styles = { animation: 'fadeIn 1s' };

      const result = withViewTimelineAnimation(styles);

      expect(Object.keys(result).length).toBe(1);
    });
  });

  describe('immutability', () => {
    it('should not modify the input styles object', () => {
      const styles = {
        animation: 'fadeIn 1s',
        color: 'red',
      };

      const originalStyles = { ...styles };

      withViewTimelineAnimation(styles);

      expect(styles).toEqual(originalStyles);
    });

    it('should create new object reference', () => {
      const styles = { animation: 'fadeIn 1s' };

      const result = withViewTimelineAnimation(styles);

      const innerStyles =
        result['@media (prefers-reduced-motion: no-preference)'][
          '@supports (animation-timeline: view())'
        ];

      expect(innerStyles).toBe(styles); // Should reference same object
      expect(result).not.toBe(styles); // But wrapper should be new
    });
  });

  describe('return type', () => {
    it('should return an object', () => {
      const styles = { animation: 'fadeIn 1s' };

      const result = withViewTimelineAnimation(styles);

      expect(typeof result).toBe('object');
      expect(result).not.toBeNull();
    });

    it('should not return an array', () => {
      const styles = { animation: 'fadeIn 1s' };

      const result = withViewTimelineAnimation(styles);

      expect(Array.isArray(result)).toBe(false);
    });
  });

  describe('use cases', () => {
    it('should support view timeline animations', () => {
      const styles = {
        animation: 'fadeIn linear',
        'animation-timeline': 'view()',
      };

      const result = withViewTimelineAnimation(styles);

      const innerStyles =
        result['@media (prefers-reduced-motion: no-preference)'][
          '@supports (animation-timeline: view())'
        ];

      expect(innerStyles['animation-timeline']).toBe('view()');
    });

    it('should support scroll-driven animations', () => {
      const styles = {
        animation: 'slideIn linear',
        'animation-timeline': 'scroll()',
        'animation-range': 'entry 0% cover 50%',
      };

      const result = withViewTimelineAnimation(styles);

      const innerStyles =
        result['@media (prefers-reduced-motion: no-preference)'][
          '@supports (animation-timeline: view())'
        ];

      expect(innerStyles).toEqual(styles);
    });

    it('should support multiple animations', () => {
      const styles = {
        animation: 'fadeIn 1s, slideIn 1s',
        'animation-timeline': 'view(), scroll()',
      };

      const result = withViewTimelineAnimation(styles);

      const innerStyles =
        result['@media (prefers-reduced-motion: no-preference)'][
          '@supports (animation-timeline: view())'
        ];

      expect(innerStyles).toEqual(styles);
    });
  });

  describe('accessibility consideration', () => {
    it('should respect reduced motion preference by wrapping in media query', () => {
      const styles = { animation: 'fadeIn 1s' };

      const result = withViewTimelineAnimation(styles);

      // Animation only applies when user has NOT requested reduced motion
      expect(result).toHaveProperty('@media (prefers-reduced-motion: no-preference)');
    });
  });

  describe('browser support consideration', () => {
    it('should check for animation-timeline support', () => {
      const styles = { animation: 'fadeIn 1s' };

      const result = withViewTimelineAnimation(styles);

      const mediaQuery = result['@media (prefers-reduced-motion: no-preference)'];

      // Animation only applies when browser supports animation-timeline
      expect(mediaQuery).toHaveProperty('@supports (animation-timeline: view())');
    });
  });
});