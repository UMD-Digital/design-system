import { UMDCarouselCardsElement, ELEMENT_NAME } from './component';

if (!window.customElements.get(ELEMENT_NAME)) {
  window.UMDCarouselCardsElement = UMDCarouselCardsElement;
  window.customElements.define(ELEMENT_NAME, UMDCarouselCardsElement);
}
