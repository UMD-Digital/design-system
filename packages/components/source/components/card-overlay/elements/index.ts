import { Reset } from 'helpers/styles';
import { CheckForImageAlt, SlotDefaultStyling } from 'helpers/ui';
import {
  CreateCardOverlayElement,
  STYLES_OVERLAY_CARD,
} from 'elements/card-overlay';
import { UMDCardOverlayElement } from '../index';
import { SLOTS } from '../globals';

const { IMAGE, EYEBROW, HEADLINE, TEXT, CTA, CTAICON, DATE } = SLOTS;

// prettier-ignore
export const ComponentStyles = `
  :host {
    display: block;
  }

  ${Reset}
  ${STYLES_OVERLAY_CARD}
`;

const GetImage = ({ element }: { element: UMDCardOverlayElement }) => {
  const isProperImage = CheckForImageAlt({ element, slotRef: IMAGE });
  const slotImage = SlotDefaultStyling({ element, slotRef: IMAGE });

  if (isProperImage && slotImage) {
    return slotImage.cloneNode(true) as HTMLImageElement;
  }

  return null;
};

export const CreateShadowDom = ({
  element,
}: {
  element: UMDCardOverlayElement;
}) =>
  CreateCardOverlayElement({
    image: GetImage({ element }),
    eyebrow: SlotDefaultStyling({ element, slotRef: EYEBROW }),
    headline: SlotDefaultStyling({ element, slotRef: HEADLINE }),
    text: SlotDefaultStyling({ element, slotRef: TEXT }),
    date: SlotDefaultStyling({ element, slotRef: DATE }),
    cta: SlotDefaultStyling({ element, slotRef: CTA }),
    ctaIcon: SlotDefaultStyling({ element, slotRef: CTAICON }),
    theme: element._theme,
  });
