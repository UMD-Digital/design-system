import { AlertPage } from 'elements';
import { Attributes } from 'shadow-dom-model';
import { createAlertComponent, type AlertPageProps } from '../_models/alert';

export default createAlertComponent<AlertPageProps>({
  tagName: 'umd-element-alert-page',
  renderer: AlertPage,
  getAdditionalProps: (element: HTMLElement) => ({
    isThemeLight: Attributes.isTheme.light({ element }),
    isThemeDark: Attributes.isTheme.dark({ element }),
    isShowIcon: Attributes.isVisual.showIcon({ element }),
  }),
});
