import { Components } from '@universityofmaryland/web-elements-library';
import { Attributes } from 'shadow-dom-model';
import { createAlertComponent, type AlertSiteProps } from '../_models/alert';

const { AlertSite } = Components;

export default createAlertComponent<AlertSiteProps>({
  tagName: 'umd-element-alert-site',
  renderer: AlertSite,
  getAdditionalProps: (element: HTMLElement) => ({
    daysToHide: Attributes.getValue.daysToHide({ element }) || '10',
  }),
});
