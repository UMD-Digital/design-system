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
  let isTextCenter = Attributes.isVisual.textCentered({ element });

  let isInterior = false;
  let isWithLock = false;

  if (type === Attributes.values.layout.DEFAULT_CENTERED) {
    isTextCenter = true;
  }

  if (type === Attributes.values.layout.DEFAULT_INTERIOR) {
    isInterior = true;
  }

  if (type === Attributes.values.layout.DEFAULT_INTERIOR_CENTERED) {
    isInterior = true;
    isTextCenter = true;
  }

  if (type === Attributes.values.layout.STACKED_INTERIOR) {
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

  const videoRef = SlotWithDefaultStyling({
    element,
    slotRef: Slots.name.VIDEO,
  });

  // Type Attribute should be deprecated for display
  const type = element.getAttribute('type');

  shadow.appendChild(element._styles.content.cloneNode(true));

  if (
    type === Attributes.values.display.STACKED ||
    type === Attributes.values.layout.STACKED_INTERIOR
  ) {
    shadow.appendChild(
      HeroStacked.CreateElement({
        ...MakeHeroData({ element }),
        videoRef,
      }),
    );
    return;
  }

  if (type === Attributes.values.display.MINIMAL) {
    shadow.appendChild(
      HeroMinimal.CreateElement({
        ...MakeHeroData({ element }),
      }),
    );

    return;
  }

  if (type === Attributes.values.display.OVERLAY) {
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
