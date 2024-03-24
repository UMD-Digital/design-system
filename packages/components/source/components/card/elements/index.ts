import { Reset } from 'helpers/styles';
import { CheckForImageAlt, SlotDefaultStyling } from 'helpers/ui';
import {
  CreatStandardBlockElement,
  STYLES_BLOCK_STANDARD,
} from 'elements/block/standard';
import {
  CreatStandardListElement,
  STYLES_LIST_STANDARD,
} from 'elements/list/standard';
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
  ${STYLES_BLOCK_STANDARD}
  ${STYLES_LIST_STANDARD}
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
    return CreatStandardListElement({
      image: GetImage({ element }),
      eyebrow: SlotDefaultStyling({ element, slotRef: EYEBROW }),
      headline: SlotDefaultStyling({ element, slotRef: HEADLINE }),
      text: SlotDefaultStyling({ element, slotRef: TEXT }),
      actions: SlotDefaultStyling({ element, slotRef: CTA }),
      theme: element._theme,
    });
  }

  return CreatStandardBlockElement({
    image: GetImage({ element }),
    eyebrow: SlotDefaultStyling({ element, slotRef: EYEBROW }),
    headline: SlotDefaultStyling({ element, slotRef: HEADLINE }),
    text: SlotDefaultStyling({ element, slotRef: TEXT }),
    actions: SlotDefaultStyling({ element, slotRef: CTA }),
    theme: element._theme,
    isAligned: element._aligned,
    isBordered: element._border,
  });
};
