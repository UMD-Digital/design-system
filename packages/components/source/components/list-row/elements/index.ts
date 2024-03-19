import { Reset } from 'helpers/styles';
import { CheckForImageAlt, SlotDefaultStyling } from 'helpers/ui';
import { CreateListElement, STYLES_LIST } from 'elements/list';
import { UMDListRowElement } from '../index';
import { SLOTS } from '../globals';

const { IMAGE, EYEBROW, HEADLINE, TEXT, DATE, ACTIONS, SUB_TEXT } = SLOTS;

export const ComponentStyles = `
  :host {
    display: block;
  }

  ${Reset}
  ${STYLES_LIST}
`;

const GetImage = ({ element }: { element: UMDListRowElement }) => {
  const isProperImage = CheckForImageAlt({ element, slotRef: IMAGE });
  const slotImage = SlotDefaultStyling({ element, slotRef: IMAGE });

  if (isProperImage && slotImage) {
    return slotImage.cloneNode(true) as HTMLImageElement;
  }

  return null;
};

export const CreateShadowDom = ({ element }: { element: UMDListRowElement }) =>
  CreateListElement({
    image: GetImage({ element }),
    eyebrow: SlotDefaultStyling({ element, slotRef: EYEBROW }),
    headline: SlotDefaultStyling({ element, slotRef: HEADLINE }),
    text: SlotDefaultStyling({ element, slotRef: TEXT }),
    subText: SlotDefaultStyling({ element, slotRef: SUB_TEXT }),
    date: SlotDefaultStyling({ element, slotRef: DATE }),
    actions: SlotDefaultStyling({ element, slotRef: ACTIONS }),
    theme: element._theme,
    isImageFirst: element._type === 'person',
  });
