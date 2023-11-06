import { MakeDefaultStyleTag } from 'helpers/ui';
import {
  UMDAlertElement,
  ELEMENT_NAME as ELEMENT_ALERT_NAME,
  GetDefaultStyles as AlertStyles,
} from './components/alert/component';
import {
  UMDEventsDateSliderElement,
  ELEMENT_NAME as ELEMENT_EVENTS_DATES_SLIDER_NAME,
  GetDefaultStyles as EventsDateSliderStyles,
} from './components/events-date-slider/component';
import {
  UMDFooterElement,
  ELEMENT_NAME as ELEMENT_FOOTER_NAME,
  GetDefaultStyles as FooterStyles,
} from './components/footer/component';
let styleString = '';

declare global {
  interface Window {
    UMDFooterElement: typeof UMDFooterElement;
    UMDAlertElement: typeof UMDAlertElement;
    UMDEventsDateSliderElement: typeof UMDEventsDateSliderElement;
  }
}

if (!window.customElements.get(ELEMENT_ALERT_NAME)) {
  window.UMDAlertElement = UMDAlertElement;
  window.customElements.define(ELEMENT_ALERT_NAME, UMDAlertElement);

  styleString += AlertStyles();
}

if (!window.customElements.get(ELEMENT_EVENTS_DATES_SLIDER_NAME)) {
  window.UMDEventsDateSliderElement = UMDEventsDateSliderElement;
  window.customElements.define(
    ELEMENT_EVENTS_DATES_SLIDER_NAME,
    UMDEventsDateSliderElement,
  );

  styleString += EventsDateSliderStyles();
}

if (!window.customElements.get(ELEMENT_FOOTER_NAME)) {
  window.UMDFooterElement = UMDFooterElement;
  window.customElements.define(ELEMENT_FOOTER_NAME, UMDFooterElement);

  styleString = styleString + FooterStyles();
}

MakeDefaultStyleTag({ styleString });
