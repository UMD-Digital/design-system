import { Tokens, Layout, Typography } from '@universityofmaryland/variables';
import { Styles } from 'utilities';
import PersonContact, { TypeContactProps } from './elements/contact';
import PersonImage from './elements/image';

type TypeTextContainer = {
  name: HTMLElement | null;
  job?: HTMLElement | null;
  subText?: HTMLElement | null;
};

type TypeImageBlockContainer = TypeContactProps & {
  image?: HTMLImageElement | null;
  association?: HTMLElement | null;
  pronouns?: HTMLElement | null;
};

type TypePersonHeroProps = TypeTextContainer &
  TypeImageBlockContainer & {
    theme?: string | null;
  };

const { ConvertJSSObjectToStyles } = Styles;
const { SansSmaller, CampaignLarge, SansMedium, SansLarge } = Typography;
const { Spacing, Colors } = Tokens;
const { LockMax } = Layout;

const MEDIUM = 768;
const ATTRIBUTE_THEME = 'theme';
const THEME_DARK = 'dark';
const THEME_LIGHT = 'light';

const ELEMENT_NAME = 'umd-person-hero';
const ELEMENT_PERSON_HERO_CONTAINER = 'person-hero-container';
const ELEMENT_PERSON_HERO_LOCK = 'person-hero-lock';
const ELEMENT_PERSON_HERO_WRAPPER = 'person-hero-wrapper';

const ELEMENT_PERSON_HERO_TEXT_CONTAINER = 'person-hero-text-container';
const ELEMENT_PERSON_HERO_TEXT_CONTAINER_WRAPPER =
  'person-hero-text-container-wrapper';
const ELEMENT_PERSON_HERO_TEXT_JOB = 'person-hero-text-job';
const ELEMENT_PERSON_HERO_TEXT_NAME = 'person-hero-text-name';
const ELEMENT_PERSON_HERO_TEXT_SUBTEXT = 'person-hero-text-subtext';

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
    background-color: ${Colors.black};
  }

  ${OVERWRITE_DARK_THEME_TEXT_CONTAINER}:before {
    background-color: ${Colors.black};
  }

  ${OVERWRITE_DARK_THEME_TEXT_CONTAINER} * {
    color: ${Colors.white};
  }

  ${OVERWRITE_DARK_THEME_TEXT_WRAPPER} {
    border-left: 2px solid ${Colors.gold};
  }

  ${OVERWRITE_DARK_THEME_IMAGE_BLOCK} {
    background-color: ${Colors.gray.lightest};
  }

  ${OVERWRITE_DARK_THEME_IMAGE_BLOCK} * {
    color: ${Colors.black};
  }

  ${OVERWRITE_DARK_THEME_IMAGE_CONTAINER} {
    background-color: ${Colors.gray.lighter};
  }
`;

const OverwriteImageContainer = `
  ${OVERWRITE_IMAGE_CONTAINER} {
    background-color: ${Colors.gray.darker};
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
    padding-top: ${Spacing.lg};
    padding-bottom: ${Spacing.lg};
    background-color: ${Colors.black};
    position: relative;
  }

  @container (max-width: ${MEDIUM - 1}px) {
    ${ConvertJSSObjectToStyles({
      styleObj: {
        [`.${ELEMENT_PERSON_HERO_IMAGE_BLOCK}`]: LockMax,
      },
    })}
  }

  @container (min-width: ${MEDIUM}px) {
    .${ELEMENT_PERSON_HERO_IMAGE_BLOCK} {
      padding: ${Spacing.md};
      width: 30%;
      max-width: 320px;
    }
  }

  .${ELEMENT_PERSON_HERO_IMAGE_BLOCK} * {
    color: ${Colors.white};
  }

  * + .${ELEMENT_PERSON_HERO_IMAGE_ASSOCIATION} {
    margin-top: ${Spacing.sm};
  }

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${ELEMENT_PERSON_HERO_IMAGE_ASSOCIATION}`]: SansLarge,
    },
  })}

  .${ELEMENT_PERSON_HERO_IMAGE_ASSOCIATION} {
    display: block;
  }

  * + .${ELEMENT_PERSON_HERO_IMAGE_PRONOUNS} {
    margin-top: ${Spacing.min};
  }

  .${ELEMENT_PERSON_HERO_IMAGE_PRONOUNS} {
    font-style: italic;
  }
`;

const TextContainerStyles = `
  .${ELEMENT_PERSON_HERO_TEXT_CONTAINER} {
    background-color: ${Colors.gray.lightest};
    padding-top: ${Spacing['3xl']};
    padding-bottom: ${Spacing['3xl']};
    position: relative;
  }

  @container (max-width: ${MEDIUM - 1}px) {
    ${ConvertJSSObjectToStyles({
      styleObj: {
        [`.${ELEMENT_PERSON_HERO_TEXT_CONTAINER}`]: LockMax,
      },
    })}
  }

  @container (min-width: ${MEDIUM}px) {
    .${ELEMENT_PERSON_HERO_TEXT_CONTAINER} {
      padding-top: 0;
      padding-bottom: ${Spacing['7xl']};
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
    background-color: ${Colors.gray.lightest};
  }

  .${ELEMENT_PERSON_HERO_TEXT_CONTAINER_WRAPPER} {
    padding: 0 ${Spacing.md};
    border-left: 2px solid ${Colors.red};
    position: relative;
  }

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${ELEMENT_PERSON_HERO_TEXT_SUBTEXT}`]: SansMedium,
    },
  })}

  .${ELEMENT_PERSON_HERO_TEXT_SUBTEXT} {
    display: block;
    text-transform: uppercase;
    max-width: 650px;
  }

  * + .${ELEMENT_PERSON_HERO_TEXT_NAME} {
    margin-top: ${Spacing.min};
  }

  @container (min-width: ${MEDIUM}px) {
    * + .${ELEMENT_PERSON_HERO_TEXT_NAME} {
      margin-top: ${Spacing.sm};
    }
  }

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${ELEMENT_PERSON_HERO_TEXT_NAME}`]: CampaignLarge,
    },
  })}

  .${ELEMENT_PERSON_HERO_TEXT_NAME} {
    text-transform: uppercase;
    font-weight: 700;
    color: ${Colors.black};
    display: block;
  }

  * + .${ELEMENT_PERSON_HERO_TEXT_JOB} {
    margin-top: ${Spacing.min};
  }

  @container (min-width: ${MEDIUM}px) {
    * + .${ELEMENT_PERSON_HERO_TEXT_JOB} {
      margin-top: ${Spacing.md};
    }
  }

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${ELEMENT_PERSON_HERO_TEXT_JOB}`]: SansSmaller,
    },
  })}

  .${ELEMENT_PERSON_HERO_TEXT_JOB} {
    text-transform: uppercase;
    font-weight: 700;
    display: block;
  }
`;

const WrapperStyles = `
  @container (min-width: ${MEDIUM}px) {
    .${ELEMENT_PERSON_HERO_WRAPPER} {
      display: flex;
      justify-content: space-between;
      padding-top: ${Spacing['7xl']};
    }
  }
`;

const LockStyles = `
  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${ELEMENT_PERSON_HERO_LOCK}`]: LockMax,
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

  ${PersonImage.Styles}
  ${PersonContact.Styles}
  ${LockStyles}
  ${WrapperStyles}
  ${TextContainerStyles}
  ${ImageBlockStyles}
  ${OverwriteImageContainer}
  ${OverwriteThemeDarkStyles}
`;

const CreateImageBlock = (props: TypeImageBlockContainer) => {
  const { image, association, pronouns, theme } = props;
  const container = document.createElement('div');
  const wrapper = document.createElement('div');
  const contactContainer = PersonContact.CreateElement({
    ...props,
    theme: theme === THEME_DARK ? THEME_LIGHT : THEME_DARK,
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

const CreateTextContainer = ({ name, job, subText }: TypeTextContainer) => {
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

const CreatePersonHeroElement = (props: TypePersonHeroProps) => {
  const { theme } = props;
  const elementContainer = document.createElement('div');
  const elementLock = document.createElement('div');
  const elementWrapper = document.createElement('div');
  const textContainer = CreateTextContainer(props);
  const imageBlock = CreateImageBlock(props);

  elementWrapper.classList.add(ELEMENT_PERSON_HERO_WRAPPER);
  elementWrapper.appendChild(textContainer);
  elementWrapper.appendChild(imageBlock);

  elementLock.classList.add(ELEMENT_PERSON_HERO_LOCK);
  elementLock.appendChild(elementWrapper);

  if (theme) elementContainer.setAttribute(ATTRIBUTE_THEME, theme);
  elementContainer.appendChild(elementLock);
  elementContainer.classList.add(ELEMENT_PERSON_HERO_CONTAINER);

  return elementContainer;
};

export default {
  CreateElement: CreatePersonHeroElement,
  Styles: STYLES_PERSON_HERO_ELEMENT,
};
