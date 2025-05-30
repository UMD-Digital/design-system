import { Composite } from '@universityofmaryland/web-elements-library';
import { Attributes } from 'model';
import { createAlertComponent, type AlertBannerProps } from './_model';

export default createAlertComponent<AlertBannerProps>({
  tagName: 'umd-element-banner-promo',
  renderer: Composite.banner.promo,
  getAdditionalProps: (element: HTMLElement) => ({
    isThemeDark: Attributes.isTheme.dark({ element }),
    includeSeal: Attributes.isVisual.icon_seal({ element }),
  }),
});
