import { Reset } from 'helpers/styles';
import { CheckForImageAlt, SlotDefaultStyling } from 'helpers/ui';
import { CreateCardElement, STYLES_CARD } from 'elements/card';
import { CreateListElement, STYLES_LIST } from 'elements/list';
import { SLOTS, VARIABLES } from '../globals';
import { UMDCardElement } from '../index';

const { EYEBROW, HEADLINE, TEXT, IMAGE, CTA } = SLOTS;
const { DISPLAY_LIST } = VARIABLES;

// prettier-ignore
export const ComponentStyles = `
  :host {
    display: block;
  }

  ${Reset}
  ${STYLES_CARD}
  ${STYLES_LIST}
`;

const GetImage = ({ element }: { element: UMDCardElement }) => {
  const isProperImage = CheckForImageAlt({ element, slotRef: IMAGE });
  const slotImage = SlotDefaultStyling({ element, slotRef: IMAGE });

  if (isProperImage && slotImage) {
    return slotImage.cloneNode(true) as HTMLImageElement;
  }

  return null;
};

export const CreateShadowDom = ({ element }: { element: UMDCardElement }) => {
  if (element._display === DISPLAY_LIST) {
    return CreateListElement({
      image: GetImage({ element }),
      eyebrow: SlotDefaultStyling({ element, slotRef: EYEBROW }),
      headline: SlotDefaultStyling({ element, slotRef: HEADLINE }),
      text: SlotDefaultStyling({ element, slotRef: TEXT }),
      actions: SlotDefaultStyling({ element, slotRef: CTA }),
      theme: element._theme,
    });
  }

  return CreateCardElement({
    image: GetImage({ element }),
    eyebrow: SlotDefaultStyling({ element, slotRef: EYEBROW }),
    headline: SlotDefaultStyling({ element, slotRef: HEADLINE }),
    text: SlotDefaultStyling({ element, slotRef: TEXT }),
    cta: SlotDefaultStyling({ element, slotRef: CTA }),
    theme: element._theme,
    aligned: element._aligned,
    border: element._border,
  });
};
