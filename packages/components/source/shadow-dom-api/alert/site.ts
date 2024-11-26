import { AlertSite } from 'elements';
import { Attributes } from 'shadow-dom-model';
import { createAlertComponent, type AlertSiteProps } from '../_models/alert';

export default createAlertComponent<AlertSiteProps>({
  tagName: 'umd-element-alert-site',
  renderer: AlertSite,
  getAdditionalProps: (element: HTMLElement) => ({
    daysToHide: Attributes.getValue.daysToHide({ element }),
  }),
});
