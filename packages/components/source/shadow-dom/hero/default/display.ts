import {
  HeroDefault,
  HeroElements,
  HeroMinimal,
  HeroOverlay,
  HeroStacked,
} from 'elements';
import { MarkupCreate, Styles, WebComponents } from 'utilities';
import { UMDHeroElement } from './index';
import { CommonHeroData } from '../common';

const { SlotWithDefaultStyling } = MarkupCreate;
const { Attributes, AttributesValues, Slots } = WebComponents;

export const ComponentStyles = `
  :host {
    display: block;
  }

  ${Styles.ResetString}
  ${HeroElements.Image.Styles}
  ${HeroElements.Text.Styles}
  ${HeroOverlay.Styles}
  ${HeroMinimal.Styles}
  ${HeroStacked.Styles}
  ${HeroDefault.Styles}
`;

const MakeHeroData = ({ element }: { element: UMDHeroElement }) => {
  const type = element.getAttribute(Attributes.TYPE);
  const theme = element.getAttribute(Attributes.THEME);
  let isTextCenter =
    element.getAttribute('text-align') === AttributesValues.LAYOUT_TEXT_CENTER;
  let isInterior = false;
  let isWithLock = false;

  if (type === AttributesValues.LAYOUT_DEFAULT_CENTERED) {
    isTextCenter = true;
  }

  if (type === AttributesValues.LAYOUT_DEFAULT_INTERIOR) {
    isInterior = true;
  }

  if (type === AttributesValues.LAYOUT_DEFAULT_INTERIOR_CENTERED) {
    isInterior = true;
    isTextCenter = true;
  }

  if (type === AttributesValues.LAYOUT_STACKED_INTERIOR) {
    isWithLock = true;
  }

  return {
    theme,
    isTextCenter,
    isInterior,
    isWithLock,
    ...CommonHeroData({
      element,
    }),
  };
};

export const CreateShadowDom = ({ element }: { element: UMDHeroElement }) => {
  const shadow = element.shadowRoot as ShadowRoot;
  const type = element.getAttribute('type');
  const videoRef = SlotWithDefaultStyling({ element, slotRef: Slots.VIDEO });

  shadow.appendChild(element._styles.content.cloneNode(true));

  if (
    type === AttributesValues.DISPLAY_STACKED ||
    type === AttributesValues.LAYOUT_STACKED_INTERIOR
  ) {
    shadow.appendChild(
      HeroStacked.CreateElement({
        ...MakeHeroData({ element }),
        videoRef,
      }),
    );
    return;
  }

  if (type === AttributesValues.DISPLAY_MINIMAL) {
    shadow.appendChild(
      HeroMinimal.CreateElement({
        ...MakeHeroData({ element }),
      }),
    );

    return;
  }

  if (type === AttributesValues.DISPLAY_OVERLAY) {
    shadow.appendChild(
      HeroOverlay.CreateElement({
        ...MakeHeroData({ element }),
        videoRef,
      }),
    );

    return;
  }

  shadow.appendChild(
    HeroDefault.CreateElement({
      ...MakeHeroData({ element }),
      videoRef,
    }),
  );
};
