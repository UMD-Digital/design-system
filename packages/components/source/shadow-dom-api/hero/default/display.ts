import {
  HeroDefault,
  HeroElements,
  HeroMinimal,
  HeroOverlay,
  HeroStacked,
} from 'elements';
import { Attributes, Slots } from 'shadow-dom-model';
import { MarkupCreate, Styles } from 'utilities';
import { UMDHeroElement } from './index';
import { CommonHeroData } from '../common';

const { SlotWithDefaultStyling } = MarkupCreate;

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
  const type = element.getAttribute(Attributes.names.TYPE);
  const includesAnimation = Attributes.includesFeature.animation({ element });
  const isThemeDark = Attributes.isTheme.dark({ element });
  let isTextCenter =
    element.getAttribute('text-align') === Attributes.values.LAYOUT_TEXT_CENTER;
  let isInterior = false;
  let isWithLock = false;

  if (type === Attributes.values.LAYOUT_DEFAULT_CENTERED) {
    isTextCenter = true;
  }

  if (type === Attributes.values.LAYOUT_DEFAULT_INTERIOR) {
    isInterior = true;
  }

  if (type === Attributes.values.LAYOUT_DEFAULT_INTERIOR_CENTERED) {
    isInterior = true;
    isTextCenter = true;
  }

  if (type === Attributes.values.LAYOUT_STACKED_INTERIOR) {
    isWithLock = true;
  }

  return {
    isThemeDark,
    isTextCenter,
    isInterior,
    isWithLock,
    includesAnimation,
    ...CommonHeroData({
      element,
    }),
  };
};

export const CreateShadowDom = ({ element }: { element: UMDHeroElement }) => {
  const shadow = element.shadowRoot as ShadowRoot;
  const type = element.getAttribute('type');
  const videoRef = SlotWithDefaultStyling({
    element,
    slotRef: Slots.name.VIDEO,
  });

  shadow.appendChild(element._styles.content.cloneNode(true));

  if (
    type === Attributes.values.DISPLAY_STACKED ||
    type === Attributes.values.LAYOUT_STACKED_INTERIOR
  ) {
    shadow.appendChild(
      HeroStacked.CreateElement({
        ...MakeHeroData({ element }),
        videoRef,
      }),
    );
    return;
  }

  if (type === Attributes.values.DISPLAY_MINIMAL) {
    shadow.appendChild(
      HeroMinimal.CreateElement({
        ...MakeHeroData({ element }),
      }),
    );

    return;
  }

  if (type === Attributes.values.DISPLAY_OVERLAY) {
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
