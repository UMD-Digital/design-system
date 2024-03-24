import { Reset } from 'helpers/styles';
import { CheckForImageAlt, SlotDefaultStyling } from 'helpers/ui';
import {
  CreatPersonBlockElement,
  STYLES_BLOCK_PERSON,
} from 'elements/block/person';
import {
  CreatPersonListElement,
  STYLES_LIST_PERSON,
} from 'elements/list/person';
import { UMDPersonElement } from '../index';
import { SLOTS, VARIABLES } from '../globals';

const {
  IMAGE,
  NAME,
  JOB_TITLE,
  ASSOCIATION,
  PRONOUNS,
  PHONE,
  EMAIL,
  LINKEDIN,
  ADDITIONAL_CONTACT,
  SUB_TEXT,
  ACTIONS,
} = SLOTS;
const { DISPLAY_LIST } = VARIABLES;

export const ComponentStyles = `
  :host {
    display: block;
  }

  ${Reset}
  ${STYLES_LIST_PERSON}
  ${STYLES_BLOCK_PERSON}
`;

const GetImage = ({ element }: { element: UMDPersonElement }) => {
  const isProperImage = CheckForImageAlt({ element, slotRef: IMAGE });
  const slotImage = SlotDefaultStyling({ element, slotRef: IMAGE });

  if (isProperImage && slotImage) {
    return slotImage.cloneNode(true) as HTMLImageElement;
  }

  return null;
};

export const CreateShadowDom = ({ element }: { element: UMDPersonElement }) => {
  if (element._display === DISPLAY_LIST) {
    return CreatPersonListElement({
      image: GetImage({ element }),
      name: SlotDefaultStyling({ element, slotRef: NAME }),
      job: SlotDefaultStyling({ element, slotRef: JOB_TITLE }),
      association: SlotDefaultStyling({ element, slotRef: ASSOCIATION }),
      pronouns: SlotDefaultStyling({ element, slotRef: PRONOUNS }),
      phone: SlotDefaultStyling({ element, slotRef: PHONE }),
      email: SlotDefaultStyling({ element, slotRef: EMAIL }),
      linkendIn: SlotDefaultStyling({ element, slotRef: LINKEDIN }),
      additionalContact: SlotDefaultStyling({
        element,
        slotRef: ADDITIONAL_CONTACT,
      }),
      subText: SlotDefaultStyling({ element, slotRef: SUB_TEXT }),
      actions: SlotDefaultStyling({ element, slotRef: ACTIONS }),
      theme: element._theme,
    });
  }

  return CreatPersonBlockElement({
    image: GetImage({ element }),
    headline: SlotDefaultStyling({ element, slotRef: NAME }),
    text: SlotDefaultStyling({ element, slotRef: JOB_TITLE }),
    theme: element._theme,
    isAligned: element._aligned,
    isBordered: element._border,
  });
};
