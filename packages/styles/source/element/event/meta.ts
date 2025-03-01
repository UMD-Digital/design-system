import { color, media, spacing } from '../../token';
import { sans } from '../../typography';
import { create } from '../../utilities';

// Consistent naming
const classNamePrefix = 'umd-element-event-meta';

const mobileBreakpoint = 400;

// umd-element-event-meta-container
export const container = create.jssObject({
  className: `${classNamePrefix}-container`,
  container: 'inline-size',

  '+ *': {
    marginTop: `${spacing.sm}`,

    [`@media (max-width: ${media.breakpoints.small.max})`]: {
      marginTop: spacing.min,
    },
  },
});

// umd-element-event-meta-wrapper
export const wrapper = create.jssObject({
  className: `${classNamePrefix}-wrapper`,
  display: 'flex',
  flexWrap: 'wrap',

  '> *': {
    marginRight: `5px`,
    marginTop: `5px`,
  },

  '> *:not(:first-child)': {
    display: 'flex',
    width: '100%',
  },

  '> *:first-child': {
    [`@container (min-width: ${mobileBreakpoint}px)`]: {
      display: 'flex',
    },

    '> *': {
      display: 'flex',
      alignItems: 'center',
    },

    '> *:not(:first-child)': {
      [`@container (min-width: ${mobileBreakpoint}px)`]: {
        marginLeft: `${spacing.xs}`,
      },

      [`@container (max-width: ${mobileBreakpoint - 1}px)`]: {
        marginTop: `3px`,
      },
    },
  },
});

// umd-element-event-meta-item
export const item = create.jssObject({
  ...sans.smaller,
  className: `${classNamePrefix}-item`,
  color: `${color.gray.dark}`,
  fontWeight: `400`,
  marginBottom: '0',

  '& > *:first-child': {
    width: '18px',
    display: 'flex',

    [`@container (min-width: ${mobileBreakpoint}px)`]: {
      width: '20px',
    },
  },

  '& svg': {
    width: '12px',
    height: '12px',

    [`@container (min-width: ${mobileBreakpoint}px)`]: {
      width: '14px',
      height: '14px',
    },
  },
});
