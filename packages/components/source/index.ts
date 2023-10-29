import { UMDFooterElement, ELEMENT_FOOTER_NAME } from './components/footer';
import { UMDAlertElement, ELEMENT_ALERT_NAME } from './components/alert';
import {
  UMDEventsDateSliderElement,
  ELEMENT_EVENTS_DATES_SLIDER_NAME,
} from './components/events-date-slider';

declare global {
  interface Window {
    UMDFooterElement: typeof UMDFooterElement;
    UMDAlertElement: typeof UMDAlertElement;
    UMDEventsDateSliderElement: typeof UMDEventsDateSliderElement;
  }
}

if (!window.customElements.get(ELEMENT_FOOTER_NAME)) {
  window.UMDFooterElement = UMDFooterElement;
  window.customElements.define(ELEMENT_FOOTER_NAME, UMDFooterElement);
}

if (!window.customElements.get(ELEMENT_ALERT_NAME)) {
  window.UMDAlertElement = UMDAlertElement;
  window.customElements.define(ELEMENT_ALERT_NAME, UMDAlertElement);
}

if (!window.customElements.get(ELEMENT_EVENTS_DATES_SLIDER_NAME)) {
  window.UMDEventsDateSliderElement = UMDEventsDateSliderElement;
  window.customElements.define(
    ELEMENT_EVENTS_DATES_SLIDER_NAME,
    UMDEventsDateSliderElement,
  );
}
