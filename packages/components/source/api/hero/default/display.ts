import { Composite } from '@universityofmaryland/web-elements-library';
import { Attributes, Slots } from 'model';
import { Markup, Styles } from 'utilities';
import { UMDHeroElement } from './index';
import { CommonHeroData } from '../common';

const { SlotWithDefaultStyling } = Markup.create;

export const ComponentStyles = `
  :host {
    display: block;
  }

  ${Styles.reset}
  ${Composite.hero.elements.image.Styles}
  ${Composite.hero.elements.text.Styles}
  ${Composite.hero.overlay.Styles}
  ${Composite.hero.minimal.Styles}
  ${Composite.hero.stacked.Styles}
  ${Composite.hero.standard.Styles}
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
      Composite.hero.stacked.CreateElement({
        ...MakeHeroData({ element }),
        videoRef,
      }),
    );
    return;
  }

  if (type === Attributes.values.display.MINIMAL) {
    shadow.appendChild(
      Composite.hero.minimal.CreateElement({
        ...MakeHeroData({ element }),
      }),
    );

    return;
  }

  if (type === Attributes.values.display.OVERLAY) {
    shadow.appendChild(
      Composite.hero.overlay.CreateElement({
        ...MakeHeroData({ element }),
        videoRef,
      }),
    );

    return;
  }

  shadow.appendChild(
    Composite.hero.standard.CreateElement({
      ...MakeHeroData({ element }),
      videoRef,
    }),
  );
};
