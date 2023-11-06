import { ELEMENT_NAME, UMDAlertElement } from './component';

if (!window.customElements.get(ELEMENT_NAME)) {
  window.UMDAlertElement = UMDAlertElement;
  window.customElements.define(ELEMENT_NAME, UMDAlertElement);
}
