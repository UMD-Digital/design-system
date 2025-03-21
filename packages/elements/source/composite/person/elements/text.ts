import {
  animation,
  token,
  typography,
} from '@universityofmaryland/web-styles-library';
import * as Utility from 'utilities';
import PersonContact from './contact';
import { Person } from '../_types';

const { convertJSSObjectToStyles } = Utility.styles;

const ATTRIBUTE_THEME = 'theme';
const ATTRIBUTE_HAS_CONTACT = 'has-contact';
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
const ELEMENT_PERSON_ADDITONAL_CONTACT = 'person-additonal-contact';

const IS_DARK_THEME = `[${ATTRIBUTE_THEME}="${THEME_DARK}"]`;
const IS_HAS_CONTACT = `[${ATTRIBUTE_HAS_CONTACT}]`;

const IS_DARK_THEME_CONTAINER = `.${ELEMENT_PERSON_TEXT_CONTAINER}${IS_DARK_THEME}`;

const OVERWRITE_HAS_CONTACT_CONTAINER = `.${ELEMENT_PERSON_TEXT_CONTAINER}${IS_HAS_CONTACT}`;

// prettier-ignore
const ThemeDarkStyles = `
  ${IS_DARK_THEME_CONTAINER} * {
    color: ${token.color.white};
  }

  ${convertJSSObjectToStyles({
    styleObj: {
      [`${IS_DARK_THEME_CONTAINER} a.${ELEMENT_PERSON_NAME_CONTAINER}`]: animation.line.slideUnderWhite,
    },
  })}
`;

// prettier-ignore
const NameStyles = `
  .${ELEMENT_PERSON_NAME_CONTAINER} {
    font-weight: 700;
    margin-bottom: ${token.spacing.min};
    color: ${token.color.black};
    display: block;
  }

  ${convertJSSObjectToStyles({
    styleObj: {
      [`.${ELEMENT_PERSON_NAME_CONTAINER}`]: typography.sans.larger,
    },
  })}

  ${convertJSSObjectToStyles({
    styleObj: {
      [`a.${ELEMENT_PERSON_NAME_CONTAINER}`]: animation.line.slideUnderBlack,
    },
  })}
`;

// prettier-ignore
const JobStyles = `
  ${convertJSSObjectToStyles({
    styleObj: {
      [`.${ELEMENT_PERSON_JOB_CONTAINER}`]: typography.sans.small,
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

  ${convertJSSObjectToStyles({
    styleObj: {
      [`.${ELEMENT_PERSON_ASSOCIATION_CONTAINER}`]: typography.sans.small,
    },
  })}

  .${ELEMENT_PERSON_ASSOCIATION_CONTAINER} {
    line-height: 1.2em;
    display: block;
    color: ${token.color.gray.dark};
  }

  a.${ELEMENT_PERSON_ASSOCIATION_CONTAINER}:hover,
  a.${ELEMENT_PERSON_ASSOCIATION_CONTAINER}:focus {
    text-decoration: underline;
  }
`;

// prettier-ignore
const PronounsStyles = `
  * + .${ELEMENT_PERSON_PRONOUNS_CONTAINER} {
    margin-top: ${token.spacing.min};
  }

  .${ELEMENT_PERSON_PRONOUNS_CONTAINER} {
    font-style: italic;
  }

  ${convertJSSObjectToStyles({
    styleObj: {
      [`.${ELEMENT_PERSON_PRONOUNS_CONTAINER}`]: typography.sans.small,
    },
  })}
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
    margin-top: ${token.spacing.min};
  }

  .${ELEMENT_PERSON_SUB_TEXT_CONTAINER} {
    font-style: italic;
  }

  ${convertJSSObjectToStyles({
    styleObj: {
      [`.${ELEMENT_PERSON_SUB_TEXT_CONTAINER}`]: typography.sans.small,
    },
  })}
`;

// prettier-ignore
const ActionsStyles = `
  * + .${ELEMENT_PERSON_ACTIONS_CONTAINER} {
    margin-top: ${token.spacing.sm};
  }
`;

// prettier-ignore
const STYLES_PERSON_TEXT = `
  ${NameStyles}
  ${JobStyles}
  ${AssociationStyles}
  ${PronounsStyles}
  ${AdditonalContactStyles}
  ${SubTextStyles}
  ${ActionsStyles}
  ${ThemeDarkStyles}
  ${PersonContact.Styles}
`;

const CreatePersonTextContainer = (person: Person) => {
  const { name, job, association, pronouns, subText, actions, isThemeDark } =
    person;
  const container = document.createElement('div');
  const wrapper = document.createElement('div');
  const contactContainer = PersonContact.CreateElement(person);
  const isDisplayTabular = person.displayType === DISPLAY_TABULAR;

  container.classList.add(ELEMENT_PERSON_TEXT_CONTAINER);
  if (isThemeDark) container.setAttribute(ATTRIBUTE_THEME, THEME_DARK);

  wrapper.classList.add(ELEMENT_PERSON_TEXT_MAIN_WRAPPER);

  if (name) {
    name.classList.add(ELEMENT_PERSON_NAME_CONTAINER);
    Utility.markup.modify.animationLinkSpan({ element: name });
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
    container.setAttribute(ATTRIBUTE_HAS_CONTACT, '');
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
    containerWithContact: OVERWRITE_HAS_CONTACT_CONTAINER,
    contactContainer: PersonContact.Elements.contactContainer,
    mainWrapper: ELEMENT_PERSON_TEXT_MAIN_WRAPPER,
    name: ELEMENT_PERSON_NAME_CONTAINER,
    job: ELEMENT_PERSON_JOB_CONTAINER,
    association: ELEMENT_PERSON_ASSOCIATION_CONTAINER,
  },
};
