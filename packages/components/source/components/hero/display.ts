import { Reset } from 'helpers/styles';
import { SlotDefaultStyling } from 'helpers/ui';
import {
  HeroDefault,
  HeroElements,
  HeroLogo,
  HeroMinimal,
  HeroOverlay,
  HeroStacked,
} from 'elements';

import { UMDHeroElement } from './index';

const TYPE_DEFAULT = 'default';
const TYPE_DEFAULT_INTERIOR = 'default-interior';
const TYPE_DEFAULT_CENTERED = 'default-centered';
const TYPE_STACKED = 'stacked';
const TYPE_STACKED_INTERIOR = 'stacked-interior';
const TYPE_MINIMAL = 'minimal';
const TYPE_OVERLAY = 'overlay';
const TYPE_LOGO = 'logo';
const THEME_WHITE = 'white';
const TEXT_ALIGN_CENTER = 'center';

export const ComponentStyles = `
  :host {
    display: block;
  }

  ${Reset}
  ${HeroElements.Image.Styles}
  ${HeroElements.Text.Styles}
  ${HeroLogo.Styles}
  ${HeroOverlay.Styles}
  ${HeroMinimal.Styles}
  ${HeroStacked.Styles}
  ${HeroDefault.Styles}
`;

const MakeHeroData = ({ element }: { element: UMDHeroElement }) => {
  const { IMAGE, HEADLINE, EYEBROW, TEXT, ACTIONS } = element._slots;
  const type = element.getAttribute('type');
  const theme = element.getAttribute('theme');
  let isTextCenter = element.getAttribute('text-align') === TEXT_ALIGN_CENTER;
  let isInterior = false;
  let isWithLock = false;

  if (type === TYPE_DEFAULT_CENTERED) {
    isTextCenter = true;
  }

  if (type === TYPE_DEFAULT_INTERIOR) {
    isInterior = true;
  }

  if (type === TYPE_STACKED_INTERIOR) {
    isWithLock = true;
  }

  return {
    theme,
    isTextCenter,
    isInterior,
    isWithLock,
    eyebrow: SlotDefaultStyling({ element, slotRef: EYEBROW }),
    headline: SlotDefaultStyling({ element, slotRef: HEADLINE }),
    richText: SlotDefaultStyling({ element, slotRef: TEXT }),
    imageRef: SlotDefaultStyling({ element, slotRef: IMAGE }),
    actions: SlotDefaultStyling({ element, slotRef: ACTIONS }),
  };
};

export const CreateShadowDom = ({ element }: { element: UMDHeroElement }) => {
  const { VIDEO } = element._slots;
  const type = element.getAttribute('type');
  const videoRef = SlotDefaultStyling({ element, slotRef: VIDEO });

  if (type === TYPE_STACKED) {
    return HeroStacked.CreateElement({
      ...MakeHeroData({ element }),
      videoRef,
    });
  }

  if (type === TYPE_MINIMAL) {
    return HeroMinimal.CreateElement({
      ...MakeHeroData({ element }),
    });
  }

  if (type === TYPE_OVERLAY) {
    return HeroOverlay.CreateElement({
      ...MakeHeroData({ element }),
      videoRef,
    });
  }

  if (type === TYPE_LOGO) {
    return HeroLogo.CreateElement({
      ...MakeHeroData({ element }),
      videoRef,
    });
  }

  return HeroDefault.CreateElement({
    ...MakeHeroData({ element }),
    videoRef,
  });
};
