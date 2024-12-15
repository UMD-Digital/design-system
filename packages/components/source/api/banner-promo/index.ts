import { Composite } from '@universityofmaryland/web-elements-library';
import { Attributes } from 'model';
import { createAlertComponent, type AlertBannerProps } from '../_models/alert';

const { BannerPromo } = Composite;

export default createAlertComponent<AlertBannerProps>({
  tagName: 'umd-element-banner-promo',
  renderer: BannerPromo,
  getAdditionalProps: (element: HTMLElement) => ({
    isThemeDark: Attributes.isTheme.dark({ element }),
    includeSeal: Attributes.isVisual.icon_seal({ element }),
  }),
});
