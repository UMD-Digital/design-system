import { color, media, spacing } from '../../token';
import { sans } from '../../typography';
import { create } from '../../utilities';

// Consistent naming
const classNamePrefix = 'umd-action-button';

export const fullScreen = create.jssObject({
  className: `${classNamePrefix}-full-screen`,
  ...sans.min,
  position: 'absolute',
  bottom: '0',
  left: '0',
  color: `${color.white}`,
  textTransform: 'uppercase',
  fontWeight: '700',
  padding: `${spacing.min}`,
  display: `flex`,
  alignItems: `center`,
  backgroundColor: `rgba(0, 0, 0, 0.5)`,
  transition: `background-color 0.3s`,

  [`&:hover, &:focus`]: {
    backgroundColor: `rgba(0, 0, 0, 1)`,
  },

  '& > span': {
    display: `block`,
    height: `12px`,
    width: `1px`,
    backgroundColor: `${color.gray.mediumAA}`,
  },
});

export const videoState = create.jssObject({
  className: `${classNamePrefix}-video-state`,
  position: 'absolute',
  bottom: '0',
  right: '0',
  width: '40px',
  height: '40px',
  zIndex: '9999',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'rgba(0, 0, 0, 0.7)',
  transition: `background-color 0.3s`,

  [`@media (${media.queries.tablet.min})`]: {
    width: '44px',
    height: '44px',
  },

  [`&:hover, &:focus`]: {
    backgroundColor: `rgba(0, 0, 0, 1)`,
  },

  '& > svg': {
    fill: `${color.white}`,
    width: '20px',
  },
});
