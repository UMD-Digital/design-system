import * as validation from '@universityofmaryland/web-utilities-library/validation';
import { Slots } from '@universityofmaryland/web-model-library';

export const CommonPersonData = ({
  element,
  isThemeDark,
}: {
  element: HTMLElement;
  isThemeDark?: boolean;
}) => ({
  address: Slots.contact.address({ element }),
  slotTwo: Slots.person.association({ element }),
  name: Slots.person.name({ element }),
  email: Slots.contact.email({ element }),
  slotOne: Slots.person.jobTitle({ element }),
  slotThreeItalic: Slots.person.pronouns({ element }),
  phone: Slots.contact.phone({ element }),
  linkedin: Slots.social.linkedin({ element }),
  bluesky: Slots.social.bluesky({ element }),
  substack: Slots.social.substack({ element }),
  image: validation.getValidatedSlotImage({
    element,
    slotName: Slots.name.assets.image,
  }),
  additionalContact: Slots.contact.additional({ element }),
  slotFour: Slots.text.subText({ element }),
  actions: Slots.actions.default({ element }),
  isThemeDark,
});
