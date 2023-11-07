import { MakeDefaultStyleTag } from 'helpers/ui';
import { ELEMENT_NAME, UMDFooterElement, GetDefaultStyles } from './component';

const Load = () => {
  if (!window.customElements.get(ELEMENT_NAME)) {
    window.UMDFooterElement = UMDFooterElement;
    window.customElements.define(ELEMENT_NAME, UMDFooterElement);

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
