import { MakeDefaultStyleTag } from 'helpers/ui';
import { ELEMENT_NAME, UMDExampleElement } from './component';

const GetDefaultStyles = () => require('./styles/site.css').toString();

const Load = () => {
  if (!window.customElements.get(ELEMENT_NAME)) {
    window.UMDExampleElement = UMDExampleElement;
    window.customElements.define(ELEMENT_NAME, UMDExampleElement);

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
