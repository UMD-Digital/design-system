import { color } from '../../token';
import { create } from '../../utilities';

// Consistent naming
const classNamePrefix = 'umd-element-event-sign';

// umd-element-event-sign-container
export const container = create.jssObject({
  className: `${classNamePrefix}-container`,
  display: 'flex',
  alignItems: 'center',

  '& *': {
    display: 'block',
    textTransform: 'uppercase',
    textAlign: 'center',
    maxWidth: '200px',
    fontWeight: '700',
    color: `${color.black}`,
  },
});
