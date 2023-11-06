import { MakeDefaultStyleTag } from 'helpers/ui';
import { ELEMENT_NAME, UMDFooterElement, GetDefaultStyles } from './component';

if (!window.customElements.get(ELEMENT_NAME)) {
  const styleString = GetDefaultStyles();

  window.UMDFooterElement = UMDFooterElement;
  window.customElements.define(ELEMENT_NAME, UMDFooterElement);

  MakeDefaultStyleTag({ styleString });
}
