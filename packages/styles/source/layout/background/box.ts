import { color, spacing } from '../../token';
import { create } from '../../utilities';

// Consistent naming
const classNamePrefix = 'umd-layout-background-box';

// umd-layout-background-box-white
export const white = create.jssObject({
  className: `${classNamePrefix}-white`,
  display: 'inline-block',
  zIndex: '9',
  backgroundColor: `${color.white}`,
  padding: `${spacing.sm} ${spacing.sm} ${spacing.min} ${spacing.sm}`,
});
