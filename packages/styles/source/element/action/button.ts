import { color, spacing } from '../../token';
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
    backgroundColor: `rgba(0, 0, 0, 0.8)`,
  },

  '& > span': {
    display: `block`,
    height: `12px`,
    width: `1px`,
    backgroundColor: `${color.gray.mediumAA}`,
    margin: `0 4px`,
  },
});
