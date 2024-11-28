import { Slots } from 'shadow-dom-model';
import slots from 'shadow-dom-model/slots';
import { MarkupValidate } from 'utilities';

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
  image: MarkupValidate.ImageSlot({
    element,
    ImageSlot: Slots.name.assets.image,
  }),
  additionalContact: Slots.contact.additional({ element }),
  subText: Slots.text.subText({ element }),
  actions: Slots.actions.default({ element }),
  isThemeDark,
});
