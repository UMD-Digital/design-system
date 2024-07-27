import { Tokens } from '@universityofmaryland/variables';
import { AssetIcon, AssetSocial } from 'utilities';

export type TypeContactProps = {
  phone?: HTMLElement | null;
  email?: HTMLElement | null;
  linkendIn?: HTMLElement | null;
  address?: HTMLElement | null;
  additionalContact?: HTMLElement | null;
  theme?: string | null;
};

const { Spacing, Colors } = Tokens;

const ATTRIBUTE_THEME = 'theme';
const THEME_DARK = 'dark';

const ELEMENT_PERSON_CONTACT_CONTAINER = 'person-contact-container';
const ELEMENT_PERSON_CONTACT_ITEM = 'person-contact-item';
const ELEMENT_PERSON_ADDITONAL_CONTACT = 'person-additonal-contact';

const IS_DARK_THEME = `[${ATTRIBUTE_THEME}="${THEME_DARK}"]`;

const IS_DARK_THEME_CONTAINER = `.${ELEMENT_PERSON_CONTACT_CONTAINER}${IS_DARK_THEME}`;
const IS_DARK_THEME_CONTACT_ITEM = `.${ELEMENT_PERSON_CONTACT_CONTAINER}${IS_DARK_THEME} .${ELEMENT_PERSON_CONTACT_ITEM}`;

// prettier-ignore
const ThemeDarkStyles = `
  ${IS_DARK_THEME_CONTAINER} * {
    color: ${Colors.white};
  }

  ${IS_DARK_THEME_CONTACT_ITEM} > span:first-child {
    background-color: ${Colors.gray.darker};
  }

  ${IS_DARK_THEME_CONTACT_ITEM} svg path {
    fill: ${Colors.white};
  }

  ${IS_DARK_THEME_CONTACT_ITEM}:hover > span:first-child,
  ${IS_DARK_THEME_CONTACT_ITEM}:focus > span:first-child {
    background-color: ${Colors.gray.light};
  }

  ${IS_DARK_THEME_CONTACT_ITEM}:hover path,
  ${IS_DARK_THEME_CONTACT_ITEM}:focus path {
    fill: ${Colors.gray.dark};
  }

  ${IS_DARK_THEME_CONTACT_ITEM} > span:last-child {
    color: ${Colors.gray.light};
  }
`;

// prettier-ignore
const ContactContainerStyles = `
  * + .${ELEMENT_PERSON_CONTACT_CONTAINER} {
    margin-top: ${Spacing.sm};
  }
`;

// prettier-ignore
const ContactItemStyles = `
  .${ELEMENT_PERSON_CONTACT_ITEM} {
    display: flex;
    align-items: center;
  }

  .${ELEMENT_PERSON_CONTACT_ITEM} + .${ELEMENT_PERSON_CONTACT_ITEM} {
    margin-top: 4px;
  }

  .${ELEMENT_PERSON_CONTACT_ITEM} path {
    fill: ${Colors.black};
    transition: fill 0.3s;
  }

  .${ELEMENT_PERSON_CONTACT_ITEM} > span:first-child {
    width: 28px;
    height: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: ${Spacing.sm};
    background-color: ${Colors.gray.lightest};
    transition: background-color 0.3s;
  }

  .${ELEMENT_PERSON_CONTACT_ITEM} > span:last-child {
    line-height: 1.25em;
    color: ${Colors.gray.dark};
  }

  .${ELEMENT_PERSON_CONTACT_ITEM}:hover > span:first-child,
  .${ELEMENT_PERSON_CONTACT_ITEM}:focus > span:first-child {
    background-color: ${Colors.gray.dark};
  }

  .${ELEMENT_PERSON_CONTACT_ITEM}:hover path,
  .${ELEMENT_PERSON_CONTACT_ITEM}:focus path {
    fill: ${Colors.gray.light};
  }

  a.${ELEMENT_PERSON_CONTACT_ITEM}:hover > span:last-child,
  a.${ELEMENT_PERSON_CONTACT_ITEM}:focus > span:last-child {
    text-decoration: underline;
  }

  .${ELEMENT_PERSON_CONTACT_ITEM} svg {
    width: 16px;
    height: 16px;
  }
`;

// prettier-ignore
const STYLES_PERSON_CONTACT = `
  ${ContactContainerStyles}
  ${ContactItemStyles}
  ${ThemeDarkStyles}
`;

const MakeContactText = ({
  element,
  icon,
}: {
  element: HTMLElement | HTMLAnchorElement;
  icon: string;
}) => {
  const text = document.createElement('span');

  text.classList.add(ELEMENT_PERSON_CONTACT_ITEM);
  text.innerHTML = `<span>${icon}</span> <span>${element.innerHTML}</span>`;

  return text;
};

const MakeContactLink = ({
  element,
  icon,
}: {
  element: HTMLElement | HTMLAnchorElement;
  icon: string;
}) => {
  if (!element) return null;
  if (!element.getAttribute('href') && icon === AssetIcon.PIN) {
    return MakeContactText({ element, icon });
  }
  if (!element.hasAttribute('href')) return null;

  const link = document.createElement('a');
  const textSpan = document.createElement('span');
  const iconSpan = document.createElement('span');
  const ariaLabel = element.getAttribute('aria-label');

  link.setAttribute('href', element.getAttribute('href') || '');
  if (ariaLabel) link.setAttribute('aria-label', ariaLabel);
  link.classList.add(ELEMENT_PERSON_CONTACT_ITEM);

  iconSpan.innerHTML = icon;
  textSpan.innerHTML = element.innerHTML;

  link.appendChild(iconSpan);
  link.appendChild(textSpan);

  return link;
};

const CreatePersonContactContainer = ({
  phone,
  email,
  linkendIn,
  address,
  additionalContact,
  theme,
}: TypeContactProps) => {
  if (!phone && !email && !linkendIn && !address && !additionalContact)
    return null;

  const container = document.createElement('div');
  if (theme) container.setAttribute(ATTRIBUTE_THEME, theme);
  container.classList.add(ELEMENT_PERSON_CONTACT_CONTAINER);

  if (phone) {
    const phoneLink = MakeContactLink({
      element: phone,
      icon: AssetIcon.PHONE,
    });
    if (phoneLink) container.appendChild(phoneLink);
  }

  if (email) {
    const emailLink = MakeContactLink({
      element: email,
      icon: AssetIcon.EMAIL,
    });
    if (emailLink) container.appendChild(emailLink);
  }

  if (linkendIn) {
    const link = MakeContactLink({
      element: linkendIn,
      icon: AssetSocial.LINKEDIN,
    });
    if (link) container.appendChild(link);
  }

  if (address) {
    const link = MakeContactLink({ element: address, icon: AssetIcon.PIN });
    if (link) container.appendChild(link);
  }

  if (additionalContact) {
    additionalContact.classList.add(ELEMENT_PERSON_ADDITONAL_CONTACT);
    container.appendChild(additionalContact);
  }

  return container;
};

export default {
  CreateElement: CreatePersonContactContainer,
  Styles: STYLES_PERSON_CONTACT,
  Elements: {
    contactContainer: ELEMENT_PERSON_CONTACT_CONTAINER,
  },
};
