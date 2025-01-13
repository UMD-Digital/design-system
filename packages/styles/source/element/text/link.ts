import { color } from '../../token';
import { create } from '../../utilities';

// Consistent naming
const classNamePrefix = 'umd-text-link';

const base = {
  position: 'relative',
  backgroundPosition: 'left calc(100% - 1px)',
  backgroundRepeat: 'no-repeat',
  backgroundSize: '100% 1px',
  transition:
    'color 0.5s, background-size 0.5s, background-image 0.5s, background-position 0.5s',
};

const focusBase = {
  backgroundPosition: 'left calc(100%)',
  textDecoration: 'none !important',
  backgroundSize: '100% 1px',
};

// umd-text-link-red
export const red = create.jssObject({
  ...base,
  color: color.black,
  backgroundImage: 'linear-gradient(#000000, #000000)',

  '&:hover, &:focus': {
    ...focusBase,
    backgroundImage: `linear-gradient(${color.red}, ${color.red})`,
    color: `${color.black} !important`,
  },

  className: `${classNamePrefix}-red`,
});

// umd-text-link-white
export const white = create.jssObject({
  ...base,
  color: color.white,
  backgroundImage: 'linear-gradient(#ffffff, #ffffff)',

  '&:hover, &:focus': {
    ...focusBase,
    backgroundImage: `linear-gradient(${color.gold}, ${color.gold})`,
    color: `${color.white} !important`,
  },

  className: `${classNamePrefix}-white`,
});
