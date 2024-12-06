import { Components } from '@universityofmaryland/web-elements-library';
import { Attributes } from 'shadow-dom-model';
import { createAlertComponent, type AlertPageProps } from '../_models/alert';

const { AlertPage } = Components;

export default createAlertComponent<AlertPageProps>({
  tagName: 'umd-element-alert-page',
  renderer: AlertPage,
  getAdditionalProps: (element: HTMLElement) => ({
    isThemeLight: Attributes.isTheme.light({ element }),
    isThemeDark: Attributes.isTheme.dark({ element }),
    isShowIcon: Attributes.isVisual.showIcon({ element }),
  }),
});
