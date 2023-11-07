import { MakeDefaultStyleTag } from 'helpers/ui';
import { ELEMENT_NAME, UMDEventsDateSliderElement } from './component';

const GetDefaultStyles = () => require('./styles/site.css').toString();

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
