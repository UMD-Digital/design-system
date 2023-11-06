import { MakeDefaultStyleTag } from 'helpers/ui';
import {
  ELEMENT_NAME,
  GetDefaultStyles,
  UMDEventsDateSliderElement,
} from './component';

if (!window.customElements.get(ELEMENT_NAME)) {
  const styleString = GetDefaultStyles();

  window.UMDEventsDateSliderElement = UMDEventsDateSliderElement;
  window.customElements.define(ELEMENT_NAME, UMDEventsDateSliderElement);

  MakeDefaultStyleTag({ styleString });
}
