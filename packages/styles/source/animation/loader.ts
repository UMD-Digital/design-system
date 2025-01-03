import { color, spacing } from '../token';
import { create } from '../utilities';

// Consistent naming
const classNamePrefix = 'umd-animation-loader';

export const keyFrameBoxShadow = create.jssObject({
  className: `${classNamePrefix}-keyframes`,
  '@keyframes loader-animation': {
    '0%, 100%': {
      boxShadow: `0 ${spacing.min} 0 -3px ${color.gray.dark}`,
    },
    '50%': {
      boxShadow: `0 ${spacing.min} 0 0 ${color.gray.dark}`,
    },
  },
});

const dotsAniamtion = {
  animation: 'loader-animation 1.5s infinite ease-in-out',
  display: 'block',
  borderRadius: '50%',
  width: spacing.min,
  height: spacing.min,
};

// umd-animation-loader-dots
export const dots = create.jssObject({
  className: [
    `${classNamePrefix}-dots`,
    /** @deprecated Use 'umd-animation-loader-dots' instead */
    'umd-loader',
  ],

  color: color.black,
  position: 'relative',
  transform: `translate(${spacing.sm}, -4px)`,
  ...dotsAniamtion,

  '&:before, &:after': {
    content: '""',
    position: 'absolute',
    top: '0',
    ...dotsAniamtion,
  },

  '&:before': {
    animationDelay: '-0.25s',
    left: `-${spacing.sm}`,
  },

  '&:after': {
    animationDelay: '0.25s',
    left: spacing.sm,
  },
});
