import { MakeDefaultStyleTag } from 'helpers/ui';
import {
  ELEMENT_NAME,
  GetDefaultStyles,
  UMDEventsDateSliderElement,
} from './component';

const Load = () => {
  if (!window.customElements.get(ELEMENT_NAME)) {
    window.UMDEventsDateSliderElement = UMDEventsDateSliderElement;
    window.customElements.define(ELEMENT_NAME, UMDEventsDateSliderElement);

    return GetDefaultStyles();
  }
};

const IndividusalStyleString = () => {
  const styleString = GetDefaultStyles();
  MakeDefaultStyleTag({ styleString });
};

export { Load };

Load();
IndividusalStyleString();
