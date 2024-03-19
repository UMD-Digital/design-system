import {
  Animations,
  Typography,
  Tokens,
} from '@universityofmaryland/variables';
import { ConvertJSSObjectToStyles } from 'helpers/styles';
import { CheckForAnimationLinkSpan } from 'helpers/ui';

const { Colors, Spacing } = Tokens;
const { LinkLineSlide } = Animations;
const { SansLarger, Eyebrow } = Typography;

const ELEMENT_NAME = 'umd-list';

const ATTRIBUTE_IMAGE = 'image';
const ATTRIBUTE_THEME = 'theme';
const THEME_DARK = 'dark';

const MOBILE = 650;

const LIST_CONTAINER = 'umd-list-person-container';
const LIST_CONTAINER_WRAPPER = 'umd-list-person-container-wrapper';
const LIST_TEXT_CONTAINER = 'umd-list-person-text-container';
const LIST_IMAGE_CONTAINER = 'umd-list-person-image-container';
const LIST_NAME_WRAPPER = 'umd-list-person-name-wrapper';
const LIST_TEXT_WRAPPER = 'umd-list-person-text-wrapper';
const LIST_SUB_TEXT_WRAPPER = 'umd-list-person-sub-text-wrapper';

const IS_THEME_DARK = `[${ATTRIBUTE_THEME}="${THEME_DARK}"]`;

// prettier-ignore
const VariationThemeStyles = `
  .${LIST_CONTAINER}${IS_THEME_DARK} .${LIST_TEXT_CONTAINER} * {
    color: ${Colors.white};
  }

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${LIST_CONTAINER}${IS_THEME_DARK} .${LIST_NAME_WRAPPER} a`]:
      LinkLineSlide['.slidein-underline-white'],
    },
  })}
`;

// prettier-ignore
const WrapperStyles = `
  .${LIST_CONTAINER_WRAPPER} {
    padding-bottom: ${Spacing.md};
    border-bottom: 1px solid ${Colors.gray.light};
    overflow: hidden;
    display: flex;
    justify-content: space-between;
  }
`;

// prettier-ignore
const ColumnTextStyles = `
  .${LIST_TEXT_CONTAINER} {
    padding-left: ${Spacing.min};
    flex: 1 0;
    order: 2;
  }

  @container ${ELEMENT_NAME} (min-width: ${MOBILE}px) {
    .${LIST_TEXT_CONTAINER} {
      padding-left: ${Spacing.md};
    }
  }
`;

// prettier-ignore
export const ColumnImageStyles = `
  @container ${ELEMENT_NAME} (max-width: ${MOBILE -1}px) {
    .${LIST_IMAGE_CONTAINER} {
      width: 90px;
    }
  }

  @container ${ELEMENT_NAME} (min-width: ${MOBILE}px) {
    .${LIST_IMAGE_CONTAINER} {
      width: 140px;
      order: 1;
    }
  }

  .${LIST_IMAGE_CONTAINER} a {
    display: block;
    overflow: hidden;
  }

  .${LIST_IMAGE_CONTAINER} img {
    object-fit: cover;
    object-position: center;
    transform: scale(1);
    transition: transform 0.5s;
  }

  .${LIST_IMAGE_CONTAINER} a:hover img,
  .${LIST_IMAGE_CONTAINER} a:focus img {
    transform: scale(1.025);
  }
`;

// prettier-ignore
const NameStyles = `
  * + .${LIST_NAME_WRAPPER} {
    margin-top: ${Spacing.min}
  }

  @container ${ELEMENT_NAME} (max-width: ${MOBILE - 1}px) {
    .${LIST_NAME_WRAPPER} {
      max-width: calc(100% - 110px);
    }
  }

  .${LIST_NAME_WRAPPER} * {
    color: ${Colors.black};
  }

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${LIST_NAME_WRAPPER}`]: SansLarger,
    },
  })}

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${LIST_NAME_WRAPPER} *`]: SansLarger,
    },
  })}

  .${LIST_NAME_WRAPPER}, 
  .${LIST_NAME_WRAPPER} * {
    font-weight: 700;
  }

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${LIST_NAME_WRAPPER} a`]:
      LinkLineSlide['.slidein-underline-black'],
    },
  })}
`;

// prettier-ignore
const TextStyles = `
  * + .${LIST_TEXT_WRAPPER} {
    margin-top: ${Spacing.min};
    display: block;
  }

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${LIST_TEXT_WRAPPER}`]: Typography.SansSmall,
    },
  })}

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${LIST_TEXT_WRAPPER} *`]: Typography.SansSmall,
    },
  })}

  .${LIST_TEXT_WRAPPER} a {
    text-decoration: underline;
    transition: color 0.3s ease-in-out;
  }

  .${LIST_TEXT_WRAPPER} a:hover,
  .${LIST_TEXT_WRAPPER} a:focus{
    text-decoration: underline;
    color: ${Colors.red};
  }
`;

// prettier-ignore
const SubTextStyles = `
  .${LIST_SUB_TEXT_WRAPPER} {
    margin-top: ${Spacing.min};
  }

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${LIST_SUB_TEXT_WRAPPER}`]: Typography.SansMin,
    },
  })}
  
  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${LIST_SUB_TEXT_WRAPPER} *`]: Typography.SansMin,
    },
  })}

  .${LIST_SUB_TEXT_WRAPPER},
  .${LIST_SUB_TEXT_WRAPPER} * {
    font-style: italic;
  }
`

// prettier-ignore
export const STYLES_LIST = `
  .${LIST_CONTAINER} {
    container: ${ELEMENT_NAME} / inline-size;
  }

  .${LIST_CONTAINER} + * {
    margin-top: ${Spacing.md}; 
  }

  ${WrapperStyles}
  ${ColumnImageStyles}
  ${ColumnTextStyles}
  ${NameStyles}
  ${TextStyles}
  ${SubTextStyles}
  ${VariationThemeStyles}
`;

const CreateImage = ({ image }: { image: HTMLImageElement }) => {
  const container = document.createElement('div');

  container.classList.add(LIST_IMAGE_CONTAINER);
  container.appendChild(image);

  return container;
};

export const CreateListPersonElement = ({
  image,
  name,
  text,
  subText,
  theme,
}: {
  image?: HTMLImageElement | null;
  name?: HTMLElement | null;
  text?: HTMLElement | null;
  subText?: HTMLElement | null;
  theme?: string;
}) => {
  const container = document.createElement('div');
  const wrapper = document.createElement('div');
  const textContainer = document.createElement('div');

  container.classList.add(LIST_CONTAINER);
  wrapper.classList.add(LIST_CONTAINER_WRAPPER);
  textContainer.classList.add(LIST_TEXT_CONTAINER);

  if (theme) {
    container.setAttribute(ATTRIBUTE_THEME, theme);
  }

  if (image) {
    const imageContainer = CreateImage({ image });
    container.setAttribute(ATTRIBUTE_IMAGE, '');
    wrapper.appendChild(imageContainer);
  }

  if (name) {
    CheckForAnimationLinkSpan({ element: name });
    name.classList.add(LIST_NAME_WRAPPER);
    textContainer.appendChild(name);
  }

  if (text) {
    text.classList.add(LIST_TEXT_WRAPPER);
    textContainer.appendChild(text);
  }

  if (subText) {
    subText.classList.add(LIST_SUB_TEXT_WRAPPER);
    textContainer.appendChild(subText);
  }

  wrapper.appendChild(textContainer);
  container.appendChild(wrapper);

  return container;
};
