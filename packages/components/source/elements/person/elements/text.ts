import { Tokens, Typography } from '@universityofmaryland/variables';
import { Styles, AssetIcon, AssetSocial } from 'utilities';

type TypeContactProps = {
  phone?: HTMLElement | null;
  email?: HTMLElement | null;
  linkendIn?: HTMLElement | null;
  address?: HTMLElement | null;
  additionalContact?: HTMLElement | null;
};

export type TypePersonProps = TypeContactProps & {
  name: HTMLElement | null;
  job?: HTMLElement | null;
  association?: HTMLElement | null;
  pronouns?: HTMLElement | null;
  subText?: HTMLElement | null;
  actions?: HTMLElement | null;
  theme?: string | null;
  displayType?: string;
};

const { Spacing, Colors } = Tokens;
const { SansLarger, SansSmall, SansSmaller } = Typography;

const { ConvertJSSObjectToStyles } = Styles;

const ATTRIBUTE_THEME = 'theme';
const THEME_DARK = 'dark';
export const DISPLAY_TABULAR = 'tabular';

const ELEMENT_PERSON_TEXT_CONTAINER = 'person-text';
const ELEMENT_PERSON_TEXT_MAIN_WRAPPER = 'person-text-main-wrapper';
const ELEMENT_PERSON_NAME_CONTAINER = 'person-name';
const ELEMENT_PERSON_JOB_CONTAINER = 'person-job';
const ELEMENT_PERSON_ASSOCIATION_CONTAINER = 'person-association';
const ELEMENT_PERSON_PRONOUNS_CONTAINER = 'person-pronouns';
const ELEMENT_PERSON_SUB_TEXT_CONTAINER = 'person-sub-text';
const ELEMENT_PERSON_ACTIONS_CONTAINER = 'person-actions';
const ELEMENT_PERSON_CONTACT_CONTAINER = 'person-contact-container';
const ELEMENT_PERSON_CONTACT_ITEM = 'person-contact-item';
const ELEMENT_PERSON_ADDITONAL_CONTACT = 'person-additonal-contact';

const IS_DARK_THEME = `[${ATTRIBUTE_THEME}="${THEME_DARK}"]`;

const IS_DARK_THEME_CONTAINER = `.${ELEMENT_PERSON_TEXT_CONTAINER}${IS_DARK_THEME}`;
const IS_DARK_THEME_CONTACT_ITEM = `.${ELEMENT_PERSON_TEXT_CONTAINER}${IS_DARK_THEME} .${ELEMENT_PERSON_CONTACT_ITEM}`;

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
const NameStyles = `
  .${ELEMENT_PERSON_NAME_CONTAINER} {
    font-weight: 700;
    margin-bottom: ${Spacing.min};
    color: ${Colors.black};
  }

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${ELEMENT_PERSON_NAME_CONTAINER}`]: SansLarger,
    },
  })}
`;

// prettier-ignore
const JobStyles = `
  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${ELEMENT_PERSON_JOB_CONTAINER}`]: SansSmall,
    },
  })}

  .${ELEMENT_PERSON_JOB_CONTAINER} {
    line-height: 1.25em;
  }
`;

// prettier-ignore
const AssociationStyles = `
  * + .${ELEMENT_PERSON_ASSOCIATION_CONTAINER} {
    margin-top: 4px;
  }

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${ELEMENT_PERSON_ASSOCIATION_CONTAINER}`]: SansSmall,
    },
  })}

  .${ELEMENT_PERSON_ASSOCIATION_CONTAINER} {
    line-height: 1.2em;
  }
`;

// prettier-ignore
const PronounsStyles = `
  * + .${ELEMENT_PERSON_PRONOUNS_CONTAINER} {
    margin-top: ${Spacing.min};
  }

  .${ELEMENT_PERSON_PRONOUNS_CONTAINER} {
    font-style: italic;
  }

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${ELEMENT_PERSON_PRONOUNS_CONTAINER}`]: SansSmaller,
    },
  })}
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
const AdditonalContactStyles = `
  .${ELEMENT_PERSON_ADDITONAL_CONTACT} {
    margin-top: 4px;
  }
`;

// prettier-ignore
const SubTextStyles = `
  * + .${ELEMENT_PERSON_SUB_TEXT_CONTAINER} {
    margin-top: ${Spacing.min};
  }

  .${ELEMENT_PERSON_SUB_TEXT_CONTAINER} {
    font-style: italic;
  }

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${ELEMENT_PERSON_SUB_TEXT_CONTAINER}`]: SansSmaller,
    },
  })}
`;

// prettier-ignore
const ActionsStyles = `
  * + .${ELEMENT_PERSON_ACTIONS_CONTAINER} {
    margin-top: ${Spacing.sm};
  }
`;

// prettier-ignore
const STYLES_PERSON_TEXT = `
  .${ELEMENT_PERSON_TEXT_CONTAINER} {

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

const CreateContactContainer = ({
  phone,
  email,
  linkendIn,
  address,
  additionalContact,
}: TypeContactProps) => {
  if (!phone && !email && !linkendIn && !address && !additionalContact)
    return null;

  const container = document.createElement('div');
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

const CreatePersonTextContainer = (person: TypePersonProps) => {
  const { name, job, association, pronouns, subText, actions, theme } = person;
  const container = document.createElement('div');
  const wrapper = document.createElement('div');
  const contactContainer = CreateContactContainer(person);
  const isDisplayTabular = person.displayType === DISPLAY_TABULAR;

  container.classList.add(ELEMENT_PERSON_TEXT_CONTAINER);
  if (theme) container.setAttribute(ATTRIBUTE_THEME, theme);

  wrapper.classList.add(ELEMENT_PERSON_TEXT_MAIN_WRAPPER);

  if (name) {
    name.classList.add(ELEMENT_PERSON_NAME_CONTAINER);
    wrapper.appendChild(name);
  }

  if (job) {
    job.classList.add(ELEMENT_PERSON_JOB_CONTAINER);
    wrapper.appendChild(job);
  }

  if (association) {
    association.classList.add(ELEMENT_PERSON_ASSOCIATION_CONTAINER);
    wrapper.appendChild(association);
  }

  if (pronouns) {
    pronouns.classList.add(ELEMENT_PERSON_PRONOUNS_CONTAINER);
    wrapper.appendChild(pronouns);
  }

  if (subText) {
    subText.classList.add(ELEMENT_PERSON_SUB_TEXT_CONTAINER);
    wrapper.appendChild(subText);
  }

  if (actions) actions.classList.add(ELEMENT_PERSON_ACTIONS_CONTAINER);

  container.appendChild(wrapper);

  if (contactContainer) {
    if (actions && isDisplayTabular) wrapper.appendChild(actions);

    container.appendChild(contactContainer);
  }

  if (actions && !isDisplayTabular) container.appendChild(actions);

  return container;
};

export default {
  CreateElement: CreatePersonTextContainer,
  Styles: STYLES_PERSON_TEXT,
  Elements: {
    container: ELEMENT_PERSON_TEXT_CONTAINER,
    mainWrapper: ELEMENT_PERSON_TEXT_MAIN_WRAPPER,
    name: ELEMENT_PERSON_NAME_CONTAINER,
    job: ELEMENT_PERSON_JOB_CONTAINER,
    association: ELEMENT_PERSON_ASSOCIATION_CONTAINER,
  },
};
