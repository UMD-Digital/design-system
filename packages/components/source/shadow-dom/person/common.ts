import { MarkupCreate, MarkupValidate } from 'utilities';

const { SlotWithDefaultStyling } = MarkupCreate;

export const SLOTS = {
  IMAGE: 'image',
  NAME: 'name',
  JOB_TITLE: 'job-title',
  ASSOCIATION: 'association',
  PRONOUNS: 'pronouns',
  PHONE: 'phone',
  EMAIL: 'email',
  LINKEDIN: 'linkedin',
  ADDRESS: 'address',
  ADDITIONAL_CONTACT: 'additional-contact',
  SUB_TEXT: 'sub-text',
  ACTIONS: 'actions',
};

export const CommonPersonData = ({
  element,
  slots,
  theme,
}: {
  element: HTMLElement;
  slots: Record<string, string>;
  theme?: string | null;
}) => {
  const {
    NAME,
    JOB_TITLE,
    ASSOCIATION,
    PRONOUNS,
    IMAGE,
    PHONE,
    EMAIL,
    LINKEDIN,
    ADDRESS,
    ADDITIONAL_CONTACT,
    SUB_TEXT,
    ACTIONS,
  } = slots;

  return {
    image: MarkupValidate.ImageSlot({ element, ImageSlot: IMAGE }),
    name: SlotWithDefaultStyling({ element, slotRef: NAME }),
    job: SlotWithDefaultStyling({ element, slotRef: JOB_TITLE }),
    association: SlotWithDefaultStyling({ element, slotRef: ASSOCIATION }),
    pronouns: SlotWithDefaultStyling({ element, slotRef: PRONOUNS }),
    phone: SlotWithDefaultStyling({ element, slotRef: PHONE }),
    email: SlotWithDefaultStyling({ element, slotRef: EMAIL }),
    address: SlotWithDefaultStyling({ element, slotRef: ADDRESS }),
    linkendIn: SlotWithDefaultStyling({ element, slotRef: LINKEDIN }),
    additionalContact: SlotWithDefaultStyling({
      element,
      slotRef: ADDITIONAL_CONTACT,
    }),
    subText: SlotWithDefaultStyling({ element, slotRef: SUB_TEXT }),
    actions: SlotWithDefaultStyling({ element, slotRef: ACTIONS }),
    theme,
  };
};
