import { MakeDefaultStyleTag } from 'helpers/ui';
import { ELEMENT_NAME, UMDNavDropdownElement } from './component';

const GetDefaultStyles = () => require('./styles/site.css').toString();

const Load = () => {
  if (!window.customElements.get(ELEMENT_NAME)) {
    window.UMDNavDropdownElement = UMDNavDropdownElement;
    window.customElements.define(ELEMENT_NAME, UMDNavDropdownElement);

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
