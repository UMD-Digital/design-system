import { Tokens, Typography } from '@universityofmaryland/variables';
import { Styles } from 'utilities';
import PersonContact, { TypeContactProps } from './contact';

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
    color: ${Colors.white};
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

const CreatePersonTextContainer = (person: TypePersonProps) => {
  const { name, job, association, pronouns, subText, actions, theme } = person;
  const container = document.createElement('div');
  const wrapper = document.createElement('div');
  const contactContainer = PersonContact.CreateElement(person);
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
