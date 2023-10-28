import { UMDFooterElement, ELEMENT_NAME } from './footer';

declare global {
  interface Window {
    UMDFooterElement: typeof UMDFooterElement;
  }
}

if (!window.customElements.get(ELEMENT_NAME)) {
  window.UMDFooterElement = UMDFooterElement;
  window.customElements.define(ELEMENT_NAME, UMDFooterElement);
}
