import { Composite } from '@universityofmaryland/web-elements-library';
import { Attributes } from 'model';
import { createAlertComponent, type AlertPageProps } from './_model';

export default createAlertComponent<AlertPageProps>({
  tagName: 'umd-element-alert-page',
  renderer: Composite.alert.page,
  getAdditionalProps: (element: HTMLElement) => ({
    isThemeLight: Attributes.isTheme.light({ element }),
    isThemeDark: Attributes.isTheme.dark({ element }),
    isShowIcon: Attributes.isVisual.showIcon({ element }),
  }),
});
