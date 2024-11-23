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
  image: MarkupValidate.ImageSlot({ element, ImageSlot: Slots.name.IMAGE }),
  name: SlotWithDefaultStyling({ element, slotRef: Slots.name.NAME }),
  job: SlotWithDefaultStyling({ element, slotRef: Slots.name.JOB_TITLE }),
  association: SlotWithDefaultStyling({
    element,
    slotRef: Slots.name.ASSOCIATION,
  }),
  pronouns: SlotWithDefaultStyling({ element, slotRef: Slots.name.PRONOUNS }),
  phone: SlotWithDefaultStyling({ element, slotRef: Slots.name.PHONE }),
  email: SlotWithDefaultStyling({ element, slotRef: Slots.name.EMAIL }),
  address: SlotWithDefaultStyling({ element, slotRef: Slots.name.ADDRESS }),
  linkendIn: SlotWithDefaultStyling({ element, slotRef: Slots.name.LINKEDIN }),
  additionalContact: SlotWithDefaultStyling({
    element,
    slotRef: Slots.name.ADDITIONAL_CONTACT,
  }),
  subText: SlotWithDefaultStyling({ element, slotRef: Slots.name.SUB_TEXT }),
  actions: Slots.defined.actions({ element }),
  isThemeDark,
});
