import { convertToCSS } from '../transform/jss';

const media = {
  queries: {
    large: { min: 'min-width: 1024px' },
    desktop: { min: 'min-width: 1280px' },
  },
};
const spacing = { lg: '24px', xl: '32px' };
const classNamePrefix = 'umd-layout-grid-gap';
const base = { two: { display: 'grid', gridTemplateColumns: '1fr' } };

const two = {
  ...base.two,

  [`@media (${media.queries.large.min})`]: {
    self: {
      gridTemplateColumns: 'repeat(2, 1fr)',
      gridGap: spacing.lg,
    },
    '& p': {
      marginBottom: 0,
    },
  },

  [`@media (${media.queries.desktop.min})`]: {
    self: {
      // Using 'self' is important for proper nesting in media queries
      gridGap: spacing.xl,
    },
  },

  className: [`${classNamePrefix}-two`, 'umd-grid-gap'],
};

describe('Verify Example JSS Object', () => {
  it('should correctly convert the example to CSS', () => {
    const result = convertToCSS(two);

    expect(result).toContain('.umd-layout-grid-gap-two, .umd-grid-gap');
    expect(result).toContain('display: grid');
    expect(result).toContain('grid-template-columns: 1fr');

    expect(result).toContain('@media (min-width: 1024px)');
    expect(result).toContain('grid-template-columns: repeat(2, 1fr)');
    expect(result).toContain('grid-gap: 24px');
    expect(result).toContain('margin-bottom: 0');

    expect(result).toContain('@media (min-width: 1280px)');
    expect(result).toContain('grid-gap: 32px');
  });
});
