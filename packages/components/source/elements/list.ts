import {
  Animations,
  Typography,
  Tokens,
} from '@universityofmaryland/variables';
import { ConvertJSSObjectToStyles } from 'helpers/styles';
import { CheckForAnimationLinkSpan } from 'helpers/ui';

const { Colors, Spacing } = Tokens;
const { LinkLineSlide } = Animations;
const { SansLarger, SansMin, Eyebrow } = Typography;

const ELEMENT_NAME = 'umd-list';

const ATTRIBUTE_IMAGE = 'image';
const ATTRIBUTE_DATA_BLOCK = 'with-date-block';
const ATTRIBUTE_THEME = 'theme';
const THEME_DARK = 'dark';

const MOBILE = 650;

const LIST_CONTAINER = 'umd-list-container';
const LIST_CONTAINER_WRAPPER = 'umd-list-container-wrapper';
const LIST_DATE_BLOCK_CONTAINER = 'umd-list-date-container';
const LIST_TEXT_CONTAINER = 'umd-list-text-container';
const LIST_IMAGE_CONTAINER = 'umd-list-image-container';
const LIST_EYEBROW_WRAPPER = 'umd-list-eyebrow-wrapper';
const LIST_HEADLINE_WRAPPER = 'umd-list-headline-wrapper';
const LIST_DETAILS_WRAPPER = 'umd-list-date-wrapper';
const LIST_TEXT_WRAPPER = 'umd-list-text-wrapper';
const LIST_DATE_WRAPPER = 'umd-list-date-wrapper';
const LIST_ACTIONS_WRAPPER = 'umd-list-actions-wrapper';

const IS_WITH_DATE_BLOCK = `[${ATTRIBUTE_DATA_BLOCK}]`;
const IS_THEME_DARK = `[${ATTRIBUTE_THEME}="${THEME_DARK}"]`;

// prettier-ignore
const VariationThemeStyles = `
  .${LIST_CONTAINER}${IS_THEME_DARK} .${LIST_TEXT_CONTAINER} * {
    color: ${Colors.white};
  }

  .${LIST_CONTAINER}${IS_THEME_DARK} .${LIST_CONTAINER_WRAPPER} {
    border-bottom: 1px solid ${Colors.gray.dark};
  }

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${LIST_CONTAINER}${IS_THEME_DARK} .${LIST_HEADLINE_WRAPPER} a`]:
      LinkLineSlide['.slidein-underline-white'],
    },
  })}
`;

// prettier-ignore
const VariationDateBlockStyles = `
  @container ${ELEMENT_NAME} (min-width: ${MOBILE}px) {
    .${LIST_CONTAINER}${IS_WITH_DATE_BLOCK} .${LIST_CONTAINER_WRAPPER} {
      padding-left: ${Spacing.md};
    }
  }
  
  @container ${ELEMENT_NAME} (min-width: ${MOBILE}px) {
    .${LIST_CONTAINER}${IS_WITH_DATE_BLOCK} .${LIST_TEXT_CONTAINER} {
      padding: 0 ${Spacing.md};
    }
  }
`;

// prettier-ignore
const WrapperStyles = `
  .${LIST_CONTAINER_WRAPPER} {
    padding-bottom: ${Spacing.md};
    border-bottom: 1px solid ${Colors.gray.light};
    overflow: hidden;
  }

  @container ${ELEMENT_NAME} (min-width: ${MOBILE}px) {
    .${LIST_CONTAINER_WRAPPER} {
      display: flex;
      justify-content: space-between;
    }
  }
`;

// prettier-ignore
const ColumnDateStyles = `
  .${LIST_DATE_BLOCK_CONTAINER} {
    width: ${Spacing['6xl']};
  }

  @container ${ELEMENT_NAME} (max-width: ${MOBILE - 1}px) {
    .${LIST_DATE_BLOCK_CONTAINER} {
      display: none;
    }
  }
`;

// prettier-ignore
const ColumnTextStyles = `
  .${LIST_TEXT_CONTAINER} {
    padding-right: ${Spacing.min};
    flex: 1 0;
  }

  @container ${ELEMENT_NAME} (min-width: ${MOBILE}px) {
    .${LIST_TEXT_CONTAINER} {
      padding-right: ${Spacing.md};
      order: 2;
    }
  }
`;

// prettier-ignore
export const ColumnImageStyles = `
  @container ${ELEMENT_NAME} (max-width: ${MOBILE -1}px) {
    .${LIST_IMAGE_CONTAINER} {
      width: 90px;
      float: right;
    }
  }

  @container ${ELEMENT_NAME} (min-width: ${MOBILE}px) {
    .${LIST_IMAGE_CONTAINER} {
      width: 140px;
      order: 3;
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
const EyebrowStyles = `
  * + .${LIST_EYEBROW_WRAPPER} {
    margin-top: ${Spacing.min}
  }

  .${LIST_EYEBROW_WRAPPER} * {
    color: ${Colors.black};
  }

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${LIST_EYEBROW_WRAPPER}`]: Eyebrow,
    },
  })}

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${LIST_EYEBROW_WRAPPER} *`]: Eyebrow,
    },
  })}

  .${LIST_EYEBROW_WRAPPER} a:hover,
  .${LIST_EYEBROW_WRAPPER} a:focus {
    text-decoration: underline;
  }
`;

// prettier-ignore
const HeadlineStyles = `
  * + .${LIST_HEADLINE_WRAPPER} {
    margin-top: ${Spacing.min}
  }

  @container ${ELEMENT_NAME} (max-width: ${MOBILE - 1}px) {
    .${LIST_HEADLINE_WRAPPER} {
      max-width: calc(100% - 110px);
    }
  }

  .${LIST_HEADLINE_WRAPPER} * {
    color: ${Colors.black};
  }

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${LIST_HEADLINE_WRAPPER}`]: SansLarger,
    },
  })}

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${LIST_HEADLINE_WRAPPER} *`]: SansLarger,
    },
  })}

  .${LIST_HEADLINE_WRAPPER}, 
  .${LIST_HEADLINE_WRAPPER} * {
    font-weight: 700;
  }

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${LIST_HEADLINE_WRAPPER} a`]:
      LinkLineSlide['.slidein-underline-black'],
    },
  })}
`;

// prettier-ignore
const DetailsStyles = `
  .${LIST_DETAILS_WRAPPER} {
    display: block;
  }

  * + .${LIST_DETAILS_WRAPPER} {
    margin-top: ${Spacing.min};
    display: block;
  }
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
const DateStyles = `
  .${LIST_DATE_WRAPPER} {
    display: block;
  }

  * + .${LIST_DATE_WRAPPER} {
    margin-top: ${Spacing.min};
    display: block;
  }

  .${LIST_DATE_WRAPPER} * {
    color: ${Colors.gray.mediumAA};
  }

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${LIST_DATE_WRAPPER}`]: SansMin,
    },
  })}

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${LIST_DATE_WRAPPER} *`]: SansMin,
    },
  })}
`;

// prettier-ignore
const ActionStyles = `
  .${LIST_ACTIONS_WRAPPER}  {
    margin-top: ${Spacing.sm};
  }
`;

// prettier-ignore
export const STYLES_LIST = `
  .${LIST_CONTAINER} {
    container: ${ELEMENT_NAME} / inline-size;
  }

  .${LIST_CONTAINER} + * {
    margin-top: ${Spacing.md}; 
  }

  ${WrapperStyles}
  ${ColumnDateStyles}
  ${ColumnImageStyles}
  ${ColumnTextStyles}
  ${EyebrowStyles}
  ${HeadlineStyles}
  ${DetailsStyles}
  ${TextStyles}
  ${DateStyles}
  ${ActionStyles}
  ${VariationThemeStyles}
  ${VariationDateBlockStyles}
`;

const CreateImage = ({ image }: { image: HTMLImageElement }) => {
  const container = document.createElement('div');

  container.classList.add(LIST_IMAGE_CONTAINER);
  container.appendChild(image);

  return container;
};

export const CreateListElement = ({
  image,
  eyebrow,
  headline,
  text,
  details,
  dateBlock,
  date,
  theme,
  actions,
}: {
  image?: HTMLImageElement | null;
  headline?: HTMLElement | null;
  eyebrow?: HTMLElement | null;
  text?: HTMLElement | null;
  details?: HTMLElement | null;
  dateBlock?: HTMLElement | null;
  date?: HTMLElement | null;
  theme?: string;
  actions?: HTMLElement | null;
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

  if (dateBlock) {
    const dateBlockContainer = document.createElement('div');

    dateBlockContainer.classList.add(LIST_DATE_BLOCK_CONTAINER);
    dateBlockContainer.appendChild(dateBlock);
    container.setAttribute(ATTRIBUTE_DATA_BLOCK, '');
    wrapper.appendChild(dateBlockContainer);
  }

  if (image) {
    const imageContainer = CreateImage({ image });
    container.setAttribute(ATTRIBUTE_IMAGE, '');
    wrapper.appendChild(imageContainer);
  }

  if (eyebrow) {
    eyebrow.classList.add(LIST_EYEBROW_WRAPPER);
    textContainer.appendChild(eyebrow);
  }

  if (headline) {
    CheckForAnimationLinkSpan({ element: headline });
    headline.classList.add(LIST_HEADLINE_WRAPPER);
    textContainer.appendChild(headline);
  }

  if (details) {
    details.classList.add(LIST_DETAILS_WRAPPER);
    textContainer.appendChild(details);
  }

  if (text) {
    text.classList.add(LIST_TEXT_WRAPPER);
    textContainer.appendChild(text);
  }

  if (date) {
    date.classList.add(LIST_DATE_WRAPPER);
    textContainer.appendChild(date);
  }

  if (actions) {
    actions.classList.add(LIST_ACTIONS_WRAPPER);
    textContainer.appendChild(actions);
  }

  wrapper.appendChild(textContainer);
  container.appendChild(wrapper);

  return container;
};
