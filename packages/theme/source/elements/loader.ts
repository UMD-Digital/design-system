import { Tokens } from '@universityofmaryland/variables';

const { Colors, Spacing } = Tokens;

export const Loader = {
  '@keyframes loader-animation': {
    '0%, 100%': {
      boxShadow: `0 ${Spacing.min} 0 -3px ${Colors.gray.dark}`,
    },

    '50%': {
      boxShadow: `0 ${Spacing.min} 0 0 ${Colors.gray.dark}`,
    },
  },

  [`.umd-loader,
    .umd-loader:before,
    .umd-loader:after`]: {
    animation: 'loader-animation 1.5s infinite ease-in-out',
    display: 'block',
    borderRadius: '50%',
    width: Spacing.min,
    height: Spacing.min,
  },

  '.umd-loader': {
    color: Colors.black,
    position: 'relative',
    transform: `translate(${Spacing.sm}, -4px)`,

    '&:before, &:after': {
      content: '""',
      position: 'absolute',
      top: '0',
    },

    '&:before': {
      animationDelay: '-0.25s',
      left: `-${Spacing.sm}`,
    },

    '&:after': {
      animationDelay: '0.25s',
      left: Spacing.sm,
    },
  },
};
