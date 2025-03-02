import { Composite } from '@universityofmaryland/web-elements-library';
import { Attributes } from 'model';
import { createAlertComponent, type AlertSiteProps } from './_model';

export default createAlertComponent<AlertSiteProps>({
  tagName: 'umd-element-alert-site',
  renderer: Composite.alert.site,
  getAdditionalProps: (element: HTMLElement) => ({
    daysToHide: Attributes.getValue.daysToHide({ element }) || '10',
  }),
});
