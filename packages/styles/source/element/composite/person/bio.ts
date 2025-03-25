import { color, media, spacing } from '../../../token';
import { image } from '../../asset';
import { create } from '../../../utilities';

// Consistent naming
const classNamePrefix = 'umd-element-composite-person-bio';

const createContainerQuery = (
  breakpoint: number,
  comparison = 'max-width',
  styles = {},
) => {
  return {
    [`@container (${comparison}: ${breakpoint}px)`]: styles,
  };
};

const bioLayout = {
  display: 'grid',
  gridGap: `${spacing.md}`,

  ...createContainerQuery(media.breakpointValues.large.min, 'min-width', {
    gridTemplateColumns: `repeat(8, 1fr)`,
    gridGap: `${spacing.lg}`,
    alignItems: `center`,
  }),

  [`& img`]: {
    ...createContainerQuery(media.breakpointValues.large.min, 'min-width', {
      width: `100%`,
      height: `auto`,
    }),
  },

  [`& > *`]: {
    ...createContainerQuery(media.breakpointValues.large.min, 'min-width', {
      gridColumn: `span 5`,
    }),
  },

  [`&:has(> :nth-child(2)) > *:first-child `]: {
    ...createContainerQuery(media.breakpointValues.large.min, 'min-width', {
      gridColumn: `span 3`,
    }),
  },
};

// umd-element-composite-person-bio-small
export const small = create.jssObject({
  className: `${classNamePrefix}-small`,
  ...bioLayout,
});

// umd-element-composite-person-bio-small-dark
export const smallDark = create.jssObject({
  className: `${classNamePrefix}-small-dark`,
  ...bioLayout,
});
