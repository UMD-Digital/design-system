import { create } from '../../utilities';

// Consistent naming
const classNamePrefix = 'umd-layout-alignment-block';

// umd-layout-alignment-block-center
export const center = create.jssObject({
  display: 'flex',
  justifyContent: 'center',

  className: [
    `${classNamePrefix}-center`,
    /** @deprecated Use 'umd-layout-alignment-block-center' instead */
    'umd-layout-element-alignment-center',
  ],
});
