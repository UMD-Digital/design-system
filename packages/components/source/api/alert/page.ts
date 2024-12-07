import { Components } from '@universityofmaryland/web-elements-library';
import { Attributes } from 'model';
import { createAlertComponent, type AlertPageProps } from '../_models/alert';

export default createAlertComponent<AlertPageProps>({
  tagName: 'umd-element-alert-page',
  renderer: Components.AlertPage,
  getAdditionalProps: (element: HTMLElement) => ({
    isThemeLight: Attributes.isTheme.light({ element }),
    isThemeDark: Attributes.isTheme.dark({ element }),
    isShowIcon: Attributes.isVisual.showIcon({ element }),
  }),
});
