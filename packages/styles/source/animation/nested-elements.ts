import { colors } from '../tokens';
import { create } from '../utilities';

export const linksDark = {
  '& a': {
    position: 'relative',
    backgroundImage: 'linear-gradient(#ffffff, #ffffff)',
    backgroundPosition: 'left calc(100% - 1px)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100% 1px',
    transition: 'color 0.5s, background-image 0.5s, background-position 0.5s',
    color: colors.white,

    '&:hover, &:focus': {
      backgroundImage: `linear-gradient(${colors.gold}, ${colors.gold})`,
      backgroundPosition: 'left calc(100%)',
      textDecoration: 'none !important',
      color: `${colors.white} !important`,
    },
  },
};

// umd-animation-grid
export const gridSetup = create.jssObject({
  '& > *': {
    [`@media (prefers-reduced-motion: no-preference)`]: {
      opacity: '0',
      transform: 'translateY(50px)',
    },
  },

  className: [
    `umd-animation-grid`,
    /** @deprecated Use 'umd-animation-grid' instead */
    'umd-grid-animation',
  ],
});
