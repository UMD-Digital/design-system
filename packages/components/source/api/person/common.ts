import * as validation from '@universityofmaryland/web-utilities-library/validation';
import { Slots } from 'model';
import slots from 'model/slots';

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
  email: slots.contact.email({ element }),
  job: Slots.person.jobTitle({ element }),
  pronouns: Slots.person.pronouns({ element }),
  phone: Slots.contact.phone({ element }),
  linkendIn: Slots.social.linkedin({ element }),
  image: validation.slotImage({
    element,
    slotName: Slots.name.assets.image,
  }),
  additionalContact: Slots.contact.additional({ element }),
  subText: Slots.text.subText({ element }),
  actions: Slots.actions.default({ element }),
  isThemeDark,
});
