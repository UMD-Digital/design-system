import { Tokens, Typography } from '@universityofmaryland/variables';
import { ConvertJSSObjectToStyles } from 'helpers/styles';
import { PHONE_ICON, EMAIL_ICON } from 'assets/icons';

type TypeContactProps = {
  phone?: HTMLElement | null;
  email?: HTMLElement | null;
  linkendIn?: HTMLElement | null;
  additionalContact?: HTMLElement | null;
};

export type TypePersonProps = TypeContactProps & {
  name: HTMLElement | null;
  job?: HTMLElement | null;
  association?: HTMLElement | null;
  pronouns?: HTMLElement | null;
  subText?: HTMLElement | null;
  actions?: HTMLElement | null;
  theme?: string;
};

const { Spacing, Colors } = Tokens;
const { SansLarger, SansSmall, SansSmaller } = Typography;

const ATTRIBUTE_THEME = 'theme';
const THEME_DARK = 'dark';

export const PERSON_TEXT_CONTAINER = 'person-text-container';
const PERSON_NAME_CONTAINER = 'person-name-container';
const PERSON_JOB_CONTAINER = 'person-job-container';
const PERSON_ASSOCIATION_CONTAINER = 'person-association-container';
const PERSON_PRONOUNS_CONTAINER = 'person-pronouns-container';
const PERSON_SUB_TEXT_CONTAINER = 'person-sub-text-container';
const PERSON_ACTIONS_CONTAINER = 'person-actions-container';

const PERSON_CONTACT_CONTAINER = 'list-person-contact-container';
const PERSON_CONTACT_ITEM_CONTAINER = 'list-person-contact-item-container';
const PERSON_ADDITONAL_CONTACT_CONTAINER =
  'list-person-additonal-contact-container';

const IS_DARK_THEME = `.${PERSON_TEXT_CONTAINER}[${ATTRIBUTE_THEME}="${THEME_DARK}"]`;

// prettier-ignore
const ThemeDarkStyles = `
  ${IS_DARK_THEME} * {
    color: ${Colors.white};
  }

  ${IS_DARK_THEME} .${PERSON_CONTACT_ITEM_CONTAINER} > span:first-child {
    background-color: ${Colors.gray.darker};
  }

  ${IS_DARK_THEME} .${PERSON_CONTACT_ITEM_CONTAINER} svg path {
    fill: ${Colors.white};
  }

  ${IS_DARK_THEME} .${PERSON_CONTACT_ITEM_CONTAINER}:hover > span:first-child,
  ${IS_DARK_THEME} .${PERSON_CONTACT_ITEM_CONTAINER}:focus > span:first-child {
    background-color: ${Colors.gray.light};
  }

  ${IS_DARK_THEME} .${PERSON_CONTACT_ITEM_CONTAINER}:hover path,
  ${IS_DARK_THEME} .${PERSON_CONTACT_ITEM_CONTAINER}:focus path {
    fill: ${Colors.gray.dark};
  }
`;

// prettier-ignore
const NameStyles = `
  .${PERSON_NAME_CONTAINER} {
    font-weight: 700;
    margin-bottom: ${Spacing.min};
  }

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${PERSON_NAME_CONTAINER}`]: SansLarger,
    },
  })}
`;

// prettier-ignore
const JobStyles = `
  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${PERSON_JOB_CONTAINER}`]: SansSmall,
    },
  })}

  .${PERSON_JOB_CONTAINER} {
    line-height: 1.2em;
  }
`;

// prettier-ignore
const AssociationStyles = `
  * + .${PERSON_ASSOCIATION_CONTAINER} {
    margin-top: 4px;
  }

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${PERSON_ASSOCIATION_CONTAINER}`]: SansSmall,
    },
  })}

  .${PERSON_ASSOCIATION_CONTAINER} {
    line-height: 1.2em;
  }
`;

// prettier-ignore
const PronounsStyles = `
  * + .${PERSON_PRONOUNS_CONTAINER} {
    margin-top: ${Spacing.min};
  }

  .${PERSON_PRONOUNS_CONTAINER} {
    font-style: italic;
  }

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${PERSON_PRONOUNS_CONTAINER}`]: SansSmaller,
    },
  })}
`;

// prettier-ignore
const ContactContainerStyles = `
  * + .${PERSON_CONTACT_CONTAINER} {
    margin-top: ${Spacing.sm};
  }
`;

// prettier-ignore
const ContactItemStyles = `
  .${PERSON_CONTACT_ITEM_CONTAINER} {
    display: flex;
    align-items: center;
  }

  .${PERSON_CONTACT_ITEM_CONTAINER} + .${PERSON_CONTACT_ITEM_CONTAINER} {
    margin-top: 4px;
  }

  .${PERSON_CONTACT_ITEM_CONTAINER} path {
    fill: ${Colors.black};
    transition: fill 0.3s;
  }

  .${PERSON_CONTACT_ITEM_CONTAINER} > span:first-child {
    width: 28px;
    height: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: ${Spacing.sm};
    background-color: ${Colors.gray.lightest};
    transition: background-color 0.3s;
  }

  .${PERSON_CONTACT_ITEM_CONTAINER}:hover > span:first-child,
  .${PERSON_CONTACT_ITEM_CONTAINER}:focus > span:first-child {
    background-color: ${Colors.gray.dark};
  }

  .${PERSON_CONTACT_ITEM_CONTAINER}:hover path,
  .${PERSON_CONTACT_ITEM_CONTAINER}:focus path {
    fill: ${Colors.gray.light};
  }

  .${PERSON_CONTACT_ITEM_CONTAINER}:hover > span:last-child,
  .${PERSON_CONTACT_ITEM_CONTAINER}:focus > span:last-child {
    text-decoration: underline;
  }
`;

// prettier-ignore
const AdditonalContactStyles = `
  .${PERSON_ADDITONAL_CONTACT_CONTAINER} {
    margin-top: 4px;
  }
`;

// prettier-ignore
const SubTextStyles = `
  * + .${PERSON_SUB_TEXT_CONTAINER} {
    margin-top: ${Spacing.min};
  }

  .${PERSON_SUB_TEXT_CONTAINER} {
    font-style: italic;
  }

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${PERSON_SUB_TEXT_CONTAINER}`]: SansSmaller,
    },
  })}
`;

// prettier-ignore
const ActionsStyles = `
  * + .${PERSON_ACTIONS_CONTAINER} {
    margin-top: ${Spacing.sm};
  }
`;

// prettier-ignore
export const STYLES_PERSON_TEXT = `
  .${PERSON_TEXT_CONTAINER} {

  }

  ${NameStyles}
  ${JobStyles}
  ${AssociationStyles}
  ${PronounsStyles}
  ${ContactContainerStyles}
  ${ContactItemStyles}
  ${AdditonalContactStyles}
  ${SubTextStyles}
  ${ActionsStyles}
  ${ThemeDarkStyles}
`;

const MakeContactLink = ({
  element,
  icon,
}: {
  element: HTMLElement | HTMLAnchorElement;
  icon: string;
}) => {
  if (!element) return null;
  if (!element.hasAttribute('href')) return null;

  const link = document.createElement('a');
  const textSpan = document.createElement('span');
  const iconSpan = document.createElement('span');
  const ariaLabel = element.getAttribute('aria-label');

  link.setAttribute('href', element.getAttribute('href') || '');
  if (ariaLabel) link.setAttribute('aria-label', ariaLabel);
  link.classList.add(PERSON_CONTACT_ITEM_CONTAINER);

  iconSpan.innerHTML = icon;
  textSpan.innerHTML = element.innerHTML;

  link.appendChild(iconSpan);
  link.appendChild(textSpan);

  return link;
};

const CreateContactContainer = ({
  phone,
  email,
  linkendIn,
  additionalContact,
}: TypeContactProps) => {
  if (!phone && !email && !additionalContact) return null;

  const container = document.createElement('div');
  container.classList.add(PERSON_CONTACT_CONTAINER);

  if (phone) {
    const phoneLink = MakeContactLink({ element: phone, icon: PHONE_ICON });
    if (phoneLink) container.appendChild(phoneLink);
  }

  if (email) {
    const emailLink = MakeContactLink({ element: email, icon: EMAIL_ICON });
    if (emailLink) container.appendChild(emailLink);
  }

  if (linkendIn) {
    const link = MakeContactLink({ element: linkendIn, icon: EMAIL_ICON });
    if (link) container.appendChild(link);
  }

  if (additionalContact) {
    additionalContact.classList.add(PERSON_ADDITONAL_CONTACT_CONTAINER);
    container.appendChild(additionalContact);
  }

  return container;
};

export const CreatePersonTextContainer = (person: TypePersonProps) => {
  const { name, job, association, pronouns, subText, actions, theme } = person;
  const container = document.createElement('div');
  const contactContainer = CreateContactContainer(person);

  container.classList.add(PERSON_TEXT_CONTAINER);
  if (theme) container.setAttribute(ATTRIBUTE_THEME, theme);

  if (name) {
    name.classList.add(PERSON_NAME_CONTAINER);
    container.appendChild(name);
  }

  if (job) {
    job.classList.add(PERSON_JOB_CONTAINER);
    container.appendChild(job);
  }

  if (association) {
    association.classList.add(PERSON_ASSOCIATION_CONTAINER);
    container.appendChild(association);
  }

  if (pronouns) {
    pronouns.classList.add(PERSON_PRONOUNS_CONTAINER);
    container.appendChild(pronouns);
  }

  if (subText) {
    subText.classList.add(PERSON_SUB_TEXT_CONTAINER);
    container.appendChild(subText);
  }

  if (contactContainer) container.appendChild(contactContainer);

  if (actions) {
    actions.classList.add(PERSON_ACTIONS_CONTAINER);
    container.appendChild(actions);
  }

  return container;
};
