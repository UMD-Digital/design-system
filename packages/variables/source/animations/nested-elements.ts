import { Colors } from '../tokens';
import { fadeUnder } from './line';

export const linksDark = {
  '& a': {
    position: 'relative',
    backgroundImage: 'linear-gradient(#ffffff, #ffffff)',
    backgroundPosition: 'left calc(100% - 1px)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100% 1px',
    transition: 'color 0.5s, background-image 0.5s, background-position 0.5s',
    color: Colors.white,

    '&:hover, &:focus': {
      backgroundImage: `linear-gradient(${Colors.gold}, ${Colors.gold})`,
      backgroundPosition: 'left calc(100%)',
      textDecoration: 'none !important',
      color: `${Colors.white} !important`,
    },
  },
};
