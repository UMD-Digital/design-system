import { MakeDefaultStyleTag } from 'helpers/ui';

import {
  UMDCarouselCardsElement,
  ELEMENT_NAME,
  GetDefaultStyles,
} from './component';

if (!window.customElements.get(ELEMENT_NAME)) {
  window.UMDCarouselCardsElement = UMDCarouselCardsElement;
  window.customElements.define(ELEMENT_NAME, UMDCarouselCardsElement);
}

const Load = () => {
  if (!window.customElements.get(ELEMENT_NAME)) {
    window.UMDCarouselCardsElement = UMDCarouselCardsElement;
    window.customElements.define(ELEMENT_NAME, UMDCarouselCardsElement);

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
