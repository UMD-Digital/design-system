import { Slots } from 'shadow-dom-model';
import { MarkupCreate, MarkupValidate } from 'utilities';

const { SlotWithDefaultStyling } = MarkupCreate;

export const CommonPersonData = ({
  element,
  isThemeDark,
}: {
  element: HTMLElement;
  isThemeDark?: boolean;
}) => ({
  image: MarkupValidate.ImageSlot({ element, ImageSlot: Slots.IMAGE }),
  name: SlotWithDefaultStyling({ element, slotRef: Slots.NAME }),
  job: SlotWithDefaultStyling({ element, slotRef: Slots.JOB_TITLE }),
  association: SlotWithDefaultStyling({ element, slotRef: Slots.ASSOCIATION }),
  pronouns: SlotWithDefaultStyling({ element, slotRef: Slots.PRONOUNS }),
  phone: SlotWithDefaultStyling({ element, slotRef: Slots.PHONE }),
  email: SlotWithDefaultStyling({ element, slotRef: Slots.EMAIL }),
  address: SlotWithDefaultStyling({ element, slotRef: Slots.ADDRESS }),
  linkendIn: SlotWithDefaultStyling({ element, slotRef: Slots.LINKEDIN }),
  additionalContact: SlotWithDefaultStyling({
    element,
    slotRef: Slots.ADDITIONAL_CONTACT,
  }),
  subText: SlotWithDefaultStyling({ element, slotRef: Slots.SUB_TEXT }),
  actions: Slots.SlottedActions({ element }),
  isThemeDark,
});
