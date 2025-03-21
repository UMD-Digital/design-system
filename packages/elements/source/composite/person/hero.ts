import {
  token,
  layout,
  typography,
} from '@universityofmaryland/web-styles-library';
import * as Utility from 'utilities';
import contact from './elements/contact';
import PersonImage from './elements/image';
import { PersonContact } from './_types';

interface PersonText {
  name: HTMLElement | null;
  job?: HTMLElement | null;
  subText?: HTMLElement | null;
}

type PersonInfo = PersonContact & {
  image?: HTMLImageElement | null;
  association?: HTMLElement | null;
  pronouns?: HTMLElement | null;
};

interface PersonHero extends PersonText, PersonInfo {
  isThemeDark?: boolean;
  breadcrumbMobile?: HTMLElement | null;
  breadcrumbDesktop?: HTMLElement | null;
}

const { convertJSSObjectToStyles } = Utility.styles;

const MEDIUM = 768;
const ATTRIBUTE_THEME = 'theme';
const THEME_DARK = 'dark';

const ELEMENT_NAME = 'umd-person-hero';
const ELEMENT_PERSON_HERO_CONTAINER = 'person-hero-container';
const ELEMENT_PERSON_HERO_LOCK = 'person-hero-lock';
const ELEMENT_PERSON_HERO_WRAPPER = 'person-hero-wrapper';
const ELEMENT_PERSON_HERO_BREADCRUMB = 'person-hero-breadcrumb';

const ELEMENT_PERSON_HERO_TEXT_COLUMN = 'person-hero-text-column';
const ELEMENT_PERSON_HERO_TEXT_CONTAINER = 'person-hero-text-container';
const ELEMENT_PERSON_HERO_TEXT_CONTAINER_WRAPPER =
  'person-hero-text-container-wrapper';
const ELEMENT_PERSON_HERO_TEXT_JOB = 'person-hero-text-job';
const ELEMENT_PERSON_HERO_TEXT_NAME = 'person-hero-text-name';
const ELEMENT_PERSON_HERO_TEXT_SUBTEXT = 'person-hero-text-subtext';
const ELEMENT_PERSON_HERO_TEXT_COLUMN_BREADCRUMB =
  'person-hero-text-column-breadcrumb';

const ELEMENT_PERSON_HERO_IMAGE_BLOCK = 'person-hero-image-block';
const ELEMENT_PERSON_HERO_IMAGE_BLOCK_WRAPPER =
  'person-hero-image-block-wrapper';
const ELEMENT_PERSON_HERO_IMAGE_ASSOCIATION = 'person-hero-image-association';
const ELEMENT_PERSON_HERO_IMAGE_PRONOUNS = 'person-hero-image-pronouns';

const IS_THEME_DARK = `[${ATTRIBUTE_THEME}="${THEME_DARK}"]`;

const OVERWRITE_IMAGE_CONTAINER = `.${ELEMENT_PERSON_HERO_CONTAINER} .${PersonImage.Elements.container}`;

const OVERWRITE_DARK_THEME_CONTAINER = `.${ELEMENT_PERSON_HERO_CONTAINER}${IS_THEME_DARK}`;
const OVERWRITE_DARK_THEME_TEXT_CONTAINER = `${OVERWRITE_DARK_THEME_CONTAINER} .${ELEMENT_PERSON_HERO_TEXT_CONTAINER}`;
const OVERWRITE_DARK_THEME_TEXT_WRAPPER = `${OVERWRITE_DARK_THEME_CONTAINER} .${ELEMENT_PERSON_HERO_TEXT_CONTAINER_WRAPPER}`;
const OVERWRITE_DARK_THEME_IMAGE_BLOCK = `${OVERWRITE_DARK_THEME_CONTAINER} .${ELEMENT_PERSON_HERO_IMAGE_BLOCK}`;
const OVERWRITE_DARK_THEME_IMAGE_CONTAINER = `${OVERWRITE_DARK_THEME_CONTAINER} .${PersonImage.Elements.container}`;

const OverwriteThemeDarkStyles = `
  ${OVERWRITE_DARK_THEME_TEXT_CONTAINER} {
    background-color: ${token.color.black};
  }

  ${OVERWRITE_DARK_THEME_TEXT_CONTAINER}:before {
    background-color: ${token.color.black};
  }

  ${OVERWRITE_DARK_THEME_TEXT_CONTAINER} * {
    color: ${token.color.white};
  }

  ${OVERWRITE_DARK_THEME_TEXT_WRAPPER} {
    border-left: 2px solid ${token.color.gold};
  }

  ${OVERWRITE_DARK_THEME_IMAGE_BLOCK} {
    background-color: ${token.color.gray.lightest};
  }

  ${OVERWRITE_DARK_THEME_IMAGE_BLOCK} * {
    color: ${token.color.black};
  }

  ${OVERWRITE_DARK_THEME_IMAGE_CONTAINER} {
    background-color: ${token.color.gray.lighter};
  }
`;

const OverwriteImageContainer = `
  ${OVERWRITE_IMAGE_CONTAINER} {
    background-color: ${token.color.gray.darker};
    display: flex;
    justify-content: center;
  }

  @container (max-width: ${MEDIUM - 1}px) {
    ${OVERWRITE_IMAGE_CONTAINER} img {
      max-height: 160px;
    }
  }
`;

const ImageBlockStyles = `
  .${ELEMENT_PERSON_HERO_IMAGE_BLOCK} {
    padding-top: ${token.spacing.lg};
    padding-bottom: ${token.spacing.lg};
    background-color: ${token.color.black};
    position: relative;
  }

  @container (max-width: ${MEDIUM - 1}px) {
    ${convertJSSObjectToStyles({
      styleObj: {
        [`.${ELEMENT_PERSON_HERO_IMAGE_BLOCK}`]: layout.space.horizontal.max,
      },
    })}
  }

  @container (min-width: ${MEDIUM}px) {
    .${ELEMENT_PERSON_HERO_IMAGE_BLOCK} {
      padding: ${token.spacing.md};
      width: 30%;
      max-width: 320px;
    }
  }

  .${ELEMENT_PERSON_HERO_IMAGE_BLOCK} * {
    color: ${token.color.white};
  }

  * + .${ELEMENT_PERSON_HERO_IMAGE_ASSOCIATION} {
    margin-top: ${token.spacing.sm};
  }

  ${convertJSSObjectToStyles({
    styleObj: {
      [`.${ELEMENT_PERSON_HERO_IMAGE_ASSOCIATION}`]: typography.sans.large,
    },
  })}

  .${ELEMENT_PERSON_HERO_IMAGE_ASSOCIATION} {
    display: block;
  }

  * + .${ELEMENT_PERSON_HERO_IMAGE_PRONOUNS} {
    margin-top: ${token.spacing.min};
  }

  .${ELEMENT_PERSON_HERO_IMAGE_PRONOUNS} {
    font-style: italic;
  }
`;

const TextContainerStyles = `
  @container (min-width: ${MEDIUM}px) {
    .${ELEMENT_PERSON_HERO_TEXT_COLUMN} {
      width: 70%;
    }
  }

  .${ELEMENT_PERSON_HERO_TEXT_CONTAINER} {
    background-color: ${token.color.gray.lightest};
    padding-top: ${token.spacing['3xl']};
    padding-bottom: ${token.spacing['3xl']};
    position: relative;
  }

  @container (max-width: ${MEDIUM - 1}px) {
    ${convertJSSObjectToStyles({
      styleObj: {
        [`.${ELEMENT_PERSON_HERO_TEXT_CONTAINER}`]: layout.space.horizontal.max,
      },
    })}
  }

  @container (min-width: ${MEDIUM}px) {
    .${ELEMENT_PERSON_HERO_TEXT_CONTAINER} {
      padding-top: 0;
      padding-bottom: ${token.spacing['7xl']};
      align-self: flex-start;
    }
  }

  .${ELEMENT_PERSON_HERO_TEXT_CONTAINER}:before {
    content: '';
    position: absolute;
    top: -100px;
    left: 0;
    bottom: 0;
    width: 200vw;
    transform: translateX(-20%);
    background-color: ${token.color.gray.lightest};
  }

  .${ELEMENT_PERSON_HERO_TEXT_CONTAINER_WRAPPER} {
    padding: 0 ${token.spacing.md};
    border-left: 2px solid ${token.color.red};
    position: relative;
  }

  ${convertJSSObjectToStyles({
    styleObj: {
      [`.${ELEMENT_PERSON_HERO_TEXT_SUBTEXT}`]: typography.sans.small,
    },
  })}

  .${ELEMENT_PERSON_HERO_TEXT_SUBTEXT} {
    display: block;
    text-transform: uppercase;
    font-weight: 700;
    max-width: 650px;
  }

  * + .${ELEMENT_PERSON_HERO_TEXT_NAME} {
    margin-top: ${token.spacing.min};
  }

  @container (min-width: ${MEDIUM}px) {
    * + .${ELEMENT_PERSON_HERO_TEXT_NAME} {
      margin-top: ${token.spacing.sm};
    }
  }

  ${convertJSSObjectToStyles({
    styleObj: {
      [`.${ELEMENT_PERSON_HERO_TEXT_NAME}`]: typography.campaign.large,
    },
  })}

  .${ELEMENT_PERSON_HERO_TEXT_NAME} {
    text-transform: uppercase;
    font-weight: 700;
    color: ${token.color.black};
    display: block;
  }

  * + .${ELEMENT_PERSON_HERO_TEXT_JOB} {
    margin-top: ${token.spacing.min};
  }

  @container (min-width: ${MEDIUM}px) {
    * + .${ELEMENT_PERSON_HERO_TEXT_JOB} {
      margin-top: ${token.spacing.md};
    }
  }

  ${convertJSSObjectToStyles({
    styleObj: {
      [`.${ELEMENT_PERSON_HERO_TEXT_JOB}`]: typography.sans.medium,
    },
  })}

  .${ELEMENT_PERSON_HERO_TEXT_JOB} {
    display: block;
  }

  @container (max-width: ${MEDIUM - 1}px) {
    .${ELEMENT_PERSON_HERO_TEXT_COLUMN_BREADCRUMB} {
      display: none;
    }
  }
`;

const WrapperStyles = `
  @container (min-width: ${MEDIUM}px) {
    .${ELEMENT_PERSON_HERO_WRAPPER} {
      display: flex;
      justify-content: space-between;
      padding-top: ${token.spacing['7xl']};
    }
  }
`;

const LockStyles = `
  ${convertJSSObjectToStyles({
    styleObj: {
      [`.${ELEMENT_PERSON_HERO_LOCK}`]: layout.space.horizontal.max,
    },
  })}

  @container (max-width: ${MEDIUM - 1}px) {
    .${ELEMENT_PERSON_HERO_LOCK} {
      padding: 0;
    }
  }
`;

// prettier-ignore
const STYLES_PERSON_HERO_ELEMENT = `
  .${ELEMENT_PERSON_HERO_CONTAINER} {
    container: ${ELEMENT_NAME} / inline-size;
    overflow: hidden;
  }
    
  ${convertJSSObjectToStyles({
    styleObj: {
      [`.${ELEMENT_PERSON_HERO_BREADCRUMB}`]: layout.space.horizontal.max,
    },
  })}

  @container (min-width: ${MEDIUM}px) {
    .${ELEMENT_PERSON_HERO_BREADCRUMB} {
      display: none;
    }
  }

  ${PersonImage.Styles}
  ${contact.Styles}
  ${LockStyles}
  ${WrapperStyles}
  ${TextContainerStyles}
  ${ImageBlockStyles}
  ${OverwriteImageContainer}
  ${OverwriteThemeDarkStyles}
`;

const CreateImageBlock = (props: PersonInfo) => {
  const { image, association, pronouns, isThemeDark } = props;
  const container = document.createElement('div');
  const wrapper = document.createElement('div');
  const contactContainer = contact.CreateElement({
    ...props,
    isThemeDark: !isThemeDark,
  });

  wrapper.classList.add(ELEMENT_PERSON_HERO_IMAGE_BLOCK_WRAPPER);

  if (image) {
    const imageBlock = PersonImage.CreateElement({ image });
    wrapper.appendChild(imageBlock);
  }

  if (association) {
    association.classList.add(ELEMENT_PERSON_HERO_IMAGE_ASSOCIATION);
    wrapper.appendChild(association);
  }

  if (pronouns) {
    pronouns.classList.add(ELEMENT_PERSON_HERO_IMAGE_PRONOUNS);
    wrapper.appendChild(pronouns);
  }

  if (contactContainer) {
    wrapper.appendChild(contactContainer);
  }

  container.appendChild(wrapper);
  container.classList.add(ELEMENT_PERSON_HERO_IMAGE_BLOCK);
  return container;
};

const CreateTextContainer = ({ name, job, subText }: PersonText) => {
  const container = document.createElement('div');
  const wrapper = document.createElement('div');

  wrapper.classList.add(ELEMENT_PERSON_HERO_TEXT_CONTAINER_WRAPPER);

  if (subText) {
    subText.classList.add(ELEMENT_PERSON_HERO_TEXT_SUBTEXT);
    wrapper.appendChild(subText);
  }

  if (name) {
    name.classList.add(ELEMENT_PERSON_HERO_TEXT_NAME);
    wrapper.appendChild(name);
  }

  if (job) {
    job.classList.add(ELEMENT_PERSON_HERO_TEXT_JOB);
    wrapper.appendChild(job);
  }

  container.appendChild(wrapper);

  container.classList.add(ELEMENT_PERSON_HERO_TEXT_CONTAINER);
  return container;
};

export default (props: PersonHero) => {
  const { isThemeDark, breadcrumbMobile, breadcrumbDesktop } = props;
  const elementContainer = document.createElement('div');
  const elementLock = document.createElement('div');
  const elementWrapper = document.createElement('div');
  const textColumns = document.createElement('div');
  const textContainer = CreateTextContainer(props);
  const imageBlock = CreateImageBlock(props);
  let styles = STYLES_PERSON_HERO_ELEMENT;

  textColumns.appendChild(textContainer);
  textColumns.classList.add(ELEMENT_PERSON_HERO_TEXT_COLUMN);

  if (breadcrumbDesktop) {
    const textColumnBreadcrumb = document.createElement('div');
    textColumnBreadcrumb.classList.add(
      ELEMENT_PERSON_HERO_TEXT_COLUMN_BREADCRUMB,
    );

    textColumnBreadcrumb.appendChild(breadcrumbDesktop);
    textColumns.appendChild(textColumnBreadcrumb);
  }

  elementWrapper.classList.add(ELEMENT_PERSON_HERO_WRAPPER);
  elementWrapper.appendChild(textColumns);
  elementWrapper.appendChild(imageBlock);

  elementLock.classList.add(ELEMENT_PERSON_HERO_LOCK);
  elementLock.appendChild(elementWrapper);

  if (isThemeDark) elementContainer.setAttribute(ATTRIBUTE_THEME, THEME_DARK);
  elementContainer.appendChild(elementLock);
  elementContainer.classList.add(ELEMENT_PERSON_HERO_CONTAINER);

  if (breadcrumbMobile) {
    const mainBreadcrumb = document.createElement('div');
    mainBreadcrumb.classList.add(ELEMENT_PERSON_HERO_BREADCRUMB);
    mainBreadcrumb.appendChild(breadcrumbMobile);
    elementContainer.appendChild(mainBreadcrumb);
  }

  return { element: elementContainer, styles };
};
