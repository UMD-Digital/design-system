import { create } from '../utilities';
import { fadeInFromBottom } from './effects/object';

export const gridFadeIn = create.jssObject({
  className: 'umd-grid-fade-in',
  ...fadeInFromBottom,
});
