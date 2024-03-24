import { Reset } from 'helpers/styles';
import { CheckForImageAlt, SlotDefaultStyling } from 'helpers/ui';
import {
  CreatPersonListElement,
  STYLES_LIST_PERSON,
} from 'elements/list/person';
import { UMDPersonElement } from '../index';
import { SLOTS } from '../globals';

const { IMAGE, NAME, TEXT, SUB_TEXT } = SLOTS;

export const ComponentStyles = `
  :host {
    display: block;
  }

  ${Reset}
  ${STYLES_LIST_PERSON}
`;

const GetImage = ({ element }: { element: UMDPersonElement }) => {
  const isProperImage = CheckForImageAlt({ element, slotRef: IMAGE });
  const slotImage = SlotDefaultStyling({ element, slotRef: IMAGE });

  if (isProperImage && slotImage) {
    return slotImage.cloneNode(true) as HTMLImageElement;
  }

  return null;
};

export const CreateShadowDom = ({ element }: { element: UMDPersonElement }) =>
  CreatPersonListElement({
    image: GetImage({ element }),
    headline: SlotDefaultStyling({ element, slotRef: NAME }),
    text: SlotDefaultStyling({ element, slotRef: TEXT }),
    theme: element._theme,
  });
