import { SLOTS } from 'components/card/globals';
import { CardType } from 'components/card/component';
import { Reset } from 'helpers/styles';
import { CheckForImageAlt, SlotDefaultStyling } from 'helpers/ui';
import { CreateCardElement, STYLES_CARD } from 'elements/card';

// prettier-ignore
export const ComponentStyles = `
  :host {
    display: block;
  }

  ${Reset}
  ${STYLES_CARD}
`;

const GetImage = ({ element }: { element: CardType }) => {
  const isProperImage = CheckForImageAlt({ element, slotRef: SLOTS.IMAGE });
  const slotImage = SlotDefaultStyling({ element, slotRef: SLOTS.IMAGE });

  if (isProperImage && slotImage) {
    return slotImage.cloneNode(true) as HTMLImageElement;
  }

  return null;
};

export const CreateShadowDom = ({ element }: { element: CardType }) =>
  CreateCardElement({
    image: GetImage({ element }),
    eyebrow: SlotDefaultStyling({ element, slotRef: SLOTS.EYEBROW }),
    headline: SlotDefaultStyling({ element, slotRef: SLOTS.HEADLINE }),
    text: SlotDefaultStyling({ element, slotRef: SLOTS.TEXT }),
    date: SlotDefaultStyling({ element, slotRef: SLOTS.DATE }),
    cta: SlotDefaultStyling({ element, slotRef: SLOTS.CTA }),
    theme: element._theme,
    aligned: element._aligned,
    border: element._border,
  });
