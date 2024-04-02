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
import { SLOTS, VARIABLES } from '../globals';
import { UMDHeroElement } from '../index';

const {
  THEME_WHITE,
  TYPE_DEFAULT,
  TYPE_DEFAULT_INTERIOR,
  TYPE_DEFAULT_CENTERED,
  TYPE_STACKED,
  TYPE_STACKED_INTERIOR,
  TYPE_MINIMAL,
  TYPE_OVERLAY,
  TYPE_LOGO,
  TEXT_ALIGN_LEFT,
  TEXT_ALIGN_CENTER,
} = VARIABLES;

const { IMAGE, VIDEO, HEADLINE, EYEBROW, TEXT, ACTIONS } = SLOTS;

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

export const CreateShadowDom = ({ element }: { element: UMDHeroElement }) => {
  let type = element.getAttribute('type') || TYPE_DEFAULT;
  let theme = element.getAttribute('theme') || THEME_WHITE;
  let textAlignment = element.getAttribute('text-align') || TEXT_ALIGN_LEFT;
  let isInterior = false;
  let isWithLock = false;

  if (type === TYPE_DEFAULT_CENTERED) {
    type = TYPE_DEFAULT;
    textAlignment = TEXT_ALIGN_CENTER;
  }

  if (type === TYPE_DEFAULT_INTERIOR) {
    type = TYPE_DEFAULT;
    isInterior = true;
  }

  if (type === TYPE_STACKED_INTERIOR) {
    type = TYPE_STACKED;
    isWithLock = true;
  }

  if (type === TYPE_DEFAULT) {
    textAlignment = TEXT_ALIGN_CENTER;

    return HeroDefault.CreateElement({
      theme,
      textAlignment,
      isInterior,
      isWithLock,
      eyebrow: SlotDefaultStyling({ element, slotRef: EYEBROW }),
      headline: SlotDefaultStyling({ element, slotRef: HEADLINE }),
      richText: SlotDefaultStyling({ element, slotRef: TEXT }),
      imageRef: SlotDefaultStyling({ element, slotRef: IMAGE }),
      videoRef: SlotDefaultStyling({ element, slotRef: VIDEO }),
      actions: SlotDefaultStyling({ element, slotRef: ACTIONS }),
    });
  }

  if (type === TYPE_STACKED) {
    return HeroStacked.CreateElement({
      theme,
      textAlignment,
      isInterior,
      isWithLock,
      eyebrow: SlotDefaultStyling({ element, slotRef: EYEBROW }),
      headline: SlotDefaultStyling({ element, slotRef: HEADLINE }),
      richText: SlotDefaultStyling({ element, slotRef: TEXT }),
      imageRef: SlotDefaultStyling({ element, slotRef: IMAGE }),
      videoRef: SlotDefaultStyling({ element, slotRef: VIDEO }),
      actions: SlotDefaultStyling({ element, slotRef: ACTIONS }),
    });
  }

  if (type === TYPE_MINIMAL) {
    return HeroMinimal.CreateElement({
      theme,
      textAlignment,
      isInterior,
      isWithLock,
      eyebrow: SlotDefaultStyling({ element, slotRef: EYEBROW }),
      headline: SlotDefaultStyling({ element, slotRef: HEADLINE }),
      richText: SlotDefaultStyling({ element, slotRef: TEXT }),
      imageRef: SlotDefaultStyling({ element, slotRef: IMAGE }),
      videoRef: SlotDefaultStyling({ element, slotRef: VIDEO }),
      actions: SlotDefaultStyling({ element, slotRef: ACTIONS }),
    });
  }

  if (type === TYPE_OVERLAY) {
    return HeroOverlay.CreateElement({
      theme,
      textAlignment,
      isInterior,
      isWithLock,
      eyebrow: SlotDefaultStyling({ element, slotRef: EYEBROW }),
      headline: SlotDefaultStyling({ element, slotRef: HEADLINE }),
      richText: SlotDefaultStyling({ element, slotRef: TEXT }),
      imageRef: SlotDefaultStyling({ element, slotRef: IMAGE }),
      videoRef: SlotDefaultStyling({ element, slotRef: VIDEO }),
      actions: SlotDefaultStyling({ element, slotRef: ACTIONS }),
    });
  }

  if (type === TYPE_LOGO) {
    return HeroLogo.CreateElement({
      theme,
      textAlignment,
      isInterior,
      isWithLock,
      eyebrow: SlotDefaultStyling({ element, slotRef: EYEBROW }),
      headline: SlotDefaultStyling({ element, slotRef: HEADLINE }),
      richText: SlotDefaultStyling({ element, slotRef: TEXT }),
      imageRef: SlotDefaultStyling({ element, slotRef: IMAGE }),
      videoRef: SlotDefaultStyling({ element, slotRef: VIDEO }),
      actions: SlotDefaultStyling({ element, slotRef: ACTIONS }),
    });
  }

  return null;
};
