import {
  Animations,
  Typography,
  Tokens,
} from '@universityofmaryland/variables';
import { ConvertJSSObjectToStyles } from 'helpers/styles';
import { CheckForAnimationLinkSpan } from 'helpers/ui';

const { Colors, Spacing } = Tokens;
const { LinkLineSlide } = Animations;
const { SansLarger } = Typography;

const BREAKPOINTS = {
  MOBILE: 650,
  TABLET: 768,
  DESKTOP: 1024,
};

export const VARIABLES = {
  ATTR_IMAGE: 'data-image',
};

const ELEMENT_NAME = 'umd-list';

const LIST_CONTAINER = 'umd-list-container';
const LIST_CONTAINER_WRAPPER = 'umd-list-container-wrapper';
const LIST_DATE_CONTAINER = 'umd-list-date-container';
const LIST_TEXT_CONTAINER = 'umd-list-text-container';
const LIST_IMAGE_CONTAINER = 'umd-list-image-container';
const LIST_HEADLINE_WRAPPER = 'umd-list-headline-wrapper';
const LIST_DETAILS_WRAPPER = 'umd-list-date-wrapper';
const LIST_TEXT_WRAPPER = 'umd-list-text-wrapper';

// prettier-ignore
const VariationImageStyles = `
  @media (max-width: ${BREAKPOINTS.MOBILE - 1}px) {
    .${LIST_CONTAINER}[${VARIABLES.ATTR_IMAGE}] {

    }
  }
  
  @media (max-width: ${BREAKPOINTS.MOBILE - 1}px) {
    .${LIST_CONTAINER}[${VARIABLES.ATTR_IMAGE}] .${LIST_TEXT_CONTAINER} {
 
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

  @container ${ELEMENT_NAME} (min-width: ${BREAKPOINTS.MOBILE}px) {
    .${LIST_CONTAINER_WRAPPER} {
      padding-left: ${Spacing.md};
      display: flex;
      justify-content: space-between;
    }
  }
`;

// prettier-ignore
const ColumnDateStyles = `
  .${LIST_DATE_CONTAINER} {
    width: ${Spacing['6xl']};
  }

  @container ${ELEMENT_NAME} (max-width: ${BREAKPOINTS.MOBILE - 1}px) {
    .${LIST_DATE_CONTAINER} {
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

  @container ${ELEMENT_NAME} (min-width: ${BREAKPOINTS.MOBILE}px) {
    .${LIST_TEXT_CONTAINER} {
      padding: 0 ${Spacing.md};
      order: 2;
    }
  }
`;

// prettier-ignore
export const ColumnImageStyles = `
  @container ${ELEMENT_NAME} (max-width: ${BREAKPOINTS.MOBILE -1}px) {
    .${LIST_IMAGE_CONTAINER} {
      width: 90px;
      float: right;
    }
  }

  @container ${ELEMENT_NAME} (min-width: ${BREAKPOINTS.MOBILE}px) {
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
const HeadlineStyles = `
  * + .${LIST_HEADLINE_WRAPPER} {
    margin-top: ${Spacing.min}
  }

  @container ${ELEMENT_NAME} (max-width: ${BREAKPOINTS.MOBILE - 1}px) {
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
  ${HeadlineStyles}
  ${DetailsStyles}
  ${TextStyles}
  ${VariationImageStyles}
`;

const CreateImage = ({ image }: { image: HTMLImageElement }) => {
  const container = document.createElement('div');

  container.classList.add(LIST_IMAGE_CONTAINER);
  container.appendChild(image);

  return container;
};

export const CreateListElement = ({
  image,
  headline,
  text,
  details,
  date,
}: {
  image?: HTMLImageElement | null;
  headline?: HTMLElement | null;
  text?: HTMLElement | null;
  details?: HTMLElement | null;
  date?: HTMLElement | null;
}) => {
  const container = document.createElement('div');
  const wrapper = document.createElement('div');
  const textContainer = document.createElement('div');
  const dateContainer = document.createElement('div');

  container.classList.add(LIST_CONTAINER);
  wrapper.classList.add(LIST_CONTAINER_WRAPPER);
  textContainer.classList.add(LIST_TEXT_CONTAINER);

  if (date) {
    dateContainer.classList.add(LIST_DATE_CONTAINER);
    dateContainer.appendChild(date);
    wrapper.appendChild(dateContainer);
  }

  if (image) {
    const imageContainer = CreateImage({ image });
    container.setAttribute(VARIABLES.ATTR_IMAGE, '');
    wrapper.appendChild(imageContainer);
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

  wrapper.appendChild(textContainer);
  container.appendChild(wrapper);

  return container;
};