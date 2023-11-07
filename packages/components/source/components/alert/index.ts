import { MakeDefaultStyleTag } from 'helpers/ui';
import { ELEMENT_NAME, UMDAlertElement, GetDefaultStyles } from './component';

if (!window.customElements.get(ELEMENT_NAME)) {
  window.UMDAlertElement = UMDAlertElement;
  window.customElements.define(ELEMENT_NAME, UMDAlertElement);
}

const Load = () => {
  if (!window.customElements.get(ELEMENT_NAME)) {
    window.UMDAlertElement = UMDAlertElement;
    window.customElements.define(ELEMENT_NAME, UMDAlertElement);

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
