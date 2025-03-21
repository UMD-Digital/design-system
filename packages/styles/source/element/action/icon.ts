import { color, spacing } from '../../token';
import { create } from '../../utilities';

// Consistent naming
const classNamePrefix = 'umd-element-action-icon';

const svgIcon = {
  width: '16px',
  height: '16px',
  fill: `${color.black}`,
};

const baseIconSmall = {
  width: '28px',
  height: '28px',
  display: 'flex',
  color: `${color.black}`,
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'background-color 0.3s',

  '&:hover, &:focus': {
    backgroundColor: `${color.gray.dark}`,

    '& svg, & path': {
      fill: `${color.gray.light}`,
    },
  },
};

// umd-element-action-icon-small
export const small = create.jssObject({
  className: `${classNamePrefix}-button`,
  ...baseIconSmall,
  backgroundColor: `${color.gray.lightest}`,

  '& svg, & path': {
    ...svgIcon,
  },
});

// umd-element-action-icon-small-dark
export const smallDark = create.jssObject({
  className: `${classNamePrefix}-button`,
  ...baseIconSmall,
  backgroundColor: `${color.gray.darker}`,
  color: `${color.white}`,

  '&:hover, &:focus': {
    backgroundColor: `${color.gray.light}`,

    '& svg, & path': {
      fill: `${color.gray.darker}`,
    },
  },

  '& svg, & path': {
    ...svgIcon,
    fill: `${color.white}`,
  },
});
