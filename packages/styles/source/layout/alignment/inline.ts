import { create } from '../../utilities';

// Tailwind class - text-center
export const center = create.jssObject({
  className: [
    `text-center`,
    /** @deprecated Use 'text-center' instead */
    'umd-layout-text-alignment-center',
  ],
});
