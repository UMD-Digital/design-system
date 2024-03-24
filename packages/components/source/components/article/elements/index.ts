import { Reset } from 'helpers/styles';
import { CheckForImageAlt, SlotDefaultStyling } from 'helpers/ui';
import { CreateCardElement, STYLES_CARD } from 'elements/card';
import {
  CreatStandardListElement,
  STYLES_LIST_STANDARD,
} from 'elements/list/standard';
import { SLOTS, VARIABLES } from '../globals';
import { UMDArticleElement } from '../index';

const { EYEBROW, HEADLINE, TEXT, DATE, IMAGE, CTA } = SLOTS;
const { DISPLAY_LIST } = VARIABLES;

// prettier-ignore
export const ComponentStyles = `
  :host {
    display: block;
  }

  ${Reset}
  ${STYLES_CARD}
  ${STYLES_LIST_STANDARD}
`;

const GetImage = ({ element }: { element: UMDArticleElement }) => {
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
  element: UMDArticleElement;
}) => {
  if (element._display === DISPLAY_LIST) {
    return CreatStandardListElement({
      image: GetImage({ element }),
      eyebrow: SlotDefaultStyling({ element, slotRef: EYEBROW }),
      headline: SlotDefaultStyling({ element, slotRef: HEADLINE }),
      text: SlotDefaultStyling({ element, slotRef: TEXT }),
      date: SlotDefaultStyling({ element, slotRef: DATE }),
      actions: SlotDefaultStyling({ element, slotRef: CTA }),
      theme: element._theme,
    });
  }

  return CreateCardElement({
    image: GetImage({ element }),
    eyebrow: SlotDefaultStyling({ element, slotRef: EYEBROW }),
    headline: SlotDefaultStyling({ element, slotRef: HEADLINE }),
    text: SlotDefaultStyling({ element, slotRef: TEXT }),
    date: SlotDefaultStyling({ element, slotRef: DATE }),
    cta: SlotDefaultStyling({ element, slotRef: CTA }),
    theme: element._theme,
    aligned: element._aligned,
    border: element._border,
  });
};
