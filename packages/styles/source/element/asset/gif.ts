import { color, spacing } from '../../token';
import { create } from '../../utilities';

// Consistent naming
const classNamePrefix = 'umd-asset-gif';

// umd-asset-gif-toggle
export const toggle = create.jssObject({
  className: `${classNamePrefix}-toggle`,
  display: 'block',
  height: '100%',
  width: '100%',

  ['& canvas, & img']: {
    display: 'block',
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    objectPosition: 'center',
    transform: 'scale(1)',
    transition: 'transform 0.5s ease-in-out',
  },

  ['& canvas']: {
    opacity: '0',
    objectFit: 'cover',
  },

  ['& button']: {
    position: 'absolute',
    top: '0',
    right: '0',
    width: '44px',
    height: '44px',
    backgroundColor: `rgba(0, 0, 0, 0.8)`,
    zIndex: '99',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    ['& svg']: {
      fill: `${color.white}`,
      width: `${spacing.md}`,
    },
  },
});
