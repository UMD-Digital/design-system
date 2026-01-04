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
  association: Slots.person.association({ element }),
  name: Slots.person.name({ element }),
  email: Slots.contact.email({ element }),
  job: Slots.person.jobTitle({ element }),
  pronouns: Slots.person.pronouns({ element }),
  phone: Slots.contact.phone({ element }),
  linkedin: Slots.social.linkedin({ element }),
  image: validation.getValidatedSlotImage({
    element,
    slotName: Slots.name.assets.image,
  }),
  additionalContact: Slots.contact.additional({ element }),
  subText: Slots.text.subText({ element }),
  actions: Slots.actions.default({ element }),
  isThemeDark,
});
