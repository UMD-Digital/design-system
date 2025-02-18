import { Composite } from '@universityofmaryland/web-elements-library';
import { Attributes, Model, Register, Slots } from 'model';
import { CommonHeroData } from '../common';
import { Markup } from 'utilities';

const tagName = 'umd-element-hero';

const { SlotWithDefaultStyling } = Markup.create;

const MakeHeroData = ({ element }: { element: HTMLElement }) => {
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

const createComponent = (element: HTMLElement) => {
  const videoRef = SlotWithDefaultStyling({
    element,
    slotRef: Slots.name.VIDEO,
  });

  // Type Attribute should be deprecated for display
  const type = element.getAttribute('type');

  if (
    type === Attributes.values.display.STACKED ||
    type === Attributes.values.layout.STACKED_INTERIOR
  ) {
    return Composite.hero.stacked.CreateElement({
      ...MakeHeroData({ element }),
      videoRef,
    });
  }

  if (type === Attributes.values.display.MINIMAL) {
    return Composite.hero.minimal.CreateElement({
      ...MakeHeroData({ element }),
    });
  }

  if (type === Attributes.values.display.OVERLAY) {
    return Composite.hero.overlay.CreateElement({
      ...MakeHeroData({ element }),
      videoRef,
    });
  }

  return Composite.hero.standard.CreateElement({
    ...MakeHeroData({ element }),
    videoRef,
  });
};

const Load = () => {
  Register.registerWebComponent({
    name: tagName,
    element: Model.createCustomElement({
      tagName,
      createComponent,
      afterConnect: (element) => {
        element?.events?.load();
      },
    }),
  });
};

export default {
  Load,
};
