import { MakeDefaultStyleTag } from 'helpers/ui';
import { ELEMENT_NAME, UMDCardElement } from './component';

const GetDefaultStyles = () => require('./styles/site.css').toString();

const Load = () => {
  if (!window.customElements.get(ELEMENT_NAME)) {
    window.UMDCardElement = UMDCardElement;
    window.customElements.define(ELEMENT_NAME, UMDCardElement);

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
