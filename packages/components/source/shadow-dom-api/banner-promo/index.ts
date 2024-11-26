import { BannerPromo } from 'elements';
import { Attributes } from 'shadow-dom-model';
import { createAlertComponent, type AlertBannerProps } from '../_models/alert';

export default createAlertComponent<AlertBannerProps>({
  tagName: 'umd-element-banner-promo',
  renderer: BannerPromo,
  getAdditionalProps: (element: HTMLElement) => ({
    isThemeDark: Attributes.isTheme.dark({ element }),
    includeSeal: Attributes.isVisual.icon_seal({ element }),
  }),
});
