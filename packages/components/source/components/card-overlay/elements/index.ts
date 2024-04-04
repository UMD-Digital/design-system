import { CardOverlay } from 'elements';
import { Styles, MarkupCreate } from 'utilities';
import { CheckForImageAlt } from 'utilities/ui';
import { UMDCardOverlayElement } from '../index';
import { SLOTS } from '../globals';

const { SlotWithDefaultStyling } = MarkupCreate;

const { IMAGE, EYEBROW, HEADLINE, TEXT, ACTIONS, CTAICON, DATE } = SLOTS;

// prettier-ignore
export const ComponentStyles = `
  :host {
    display: block;
  }

  ${Styles.ResetString}
  ${CardOverlay.Styles}
`;

const GetImage = ({ element }: { element: UMDCardOverlayElement }) => {
  const isProperImage = CheckForImageAlt({ element, slotRef: IMAGE });
  const slotImage = SlotWithDefaultStyling({ element, slotRef: IMAGE });

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
  CardOverlay.CreateElement({
    image: GetImage({ element }),
    eyebrow: SlotWithDefaultStyling({ element, slotRef: EYEBROW }),
    headline: SlotWithDefaultStyling({ element, slotRef: HEADLINE }),
    text: SlotWithDefaultStyling({ element, slotRef: TEXT }),
    date: SlotWithDefaultStyling({ element, slotRef: DATE }),
    actions: SlotWithDefaultStyling({ element, slotRef: ACTIONS }),
    ctaIcon: SlotWithDefaultStyling({ element, slotRef: CTAICON }),
    theme: element._theme,
  });
