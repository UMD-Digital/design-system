import {
  Animations,
  Typography,
  Tokens,
  Fields,
} from '@universityofmaryland/variables';
import { ConvertJSSObjectToStyles } from 'helpers/styles';
import { CheckForAnimationLinkSpan } from 'helpers/ui';

const { Colors, Spacing } = Tokens;
const { LinkLineSlide } = Animations;
const { SansLarge } = Typography;

const BREAKPOINTS = {
  MOBILE: 650,
  TABLET: 768,
  DESKTOP: 1024,
};

export const VARIABLES = {
  ATTR_IMAGE: 'data-image',
};

const LIST_CONTAINER = 'umd-list-container';
const LIST_TEXT_CONTAINER = 'umd-list-text-container';
const LIST_IMAGE_CONTAINER = 'umd-list-image-container';
const LIST_HEADLINE_WRAPPER = 'umd-list-headline-wrapper';
const LIST_DATE_WRAPPER = 'umd-list-date-wrapper';
const LIST_TEXT_WRAPPER = 'umd-lisT-text-wrapper';

// prettier-ignore
const ColumnTextStyles = `

  .${LIST_TEXT_CONTAINER}  {

  }


`;

// prettier-ignore
export const ColumnImageStyles = `
  @media (max-width: ${BREAKPOINTS.MOBILE - 1}px) {
    .${LIST_IMAGE_CONTAINER} {
      width: 30%;
      order: 2;
    }
  }

  .${LIST_IMAGE_CONTAINER} a {
    display: block;
    line-height: 0;
    overflow: hidden;
  }

  .${LIST_IMAGE_CONTAINER} a img {
    object-fit: cover;
    object-position: 50% 50%;
    transform: scale(1);
    transition: transform 0.5s;
    width: 100%;
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

  .${LIST_HEADLINE_WRAPPER} * {
    color: ${Colors.black};
  }

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${LIST_HEADLINE_WRAPPER}`]: SansLarge,
    },
  })}

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${LIST_HEADLINE_WRAPPER} *`]: SansLarge,
    },
  })}

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${LIST_HEADLINE_WRAPPER} a`]:
      LinkLineSlide['.slidein-underline-black'],
    },
  })}
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
  .${LIST_TEXT_WRAPPER} a:focus {
    text-decoration: underline;
    color: ${Colors.red};
  }
`;

// prettier-ignore
export const STYLES_LIST = `
  .${LIST_CONTAINER} {
    max-width: 680px;
    container: umd-list / inline-size;
  }

  @media (max-width: ${BREAKPOINTS.MOBILE - 1}px) {
    .${LIST_CONTAINER}[${VARIABLES.ATTR_IMAGE}] {
      display: flex;
    }
  }

  @media (max-width: ${BREAKPOINTS.MOBILE - 1}px) {
    .${LIST_CONTAINER}[${VARIABLES.ATTR_IMAGE}] .${LIST_TEXT_CONTAINER} {
      width: 70%;
      padding-right: ${Spacing.md};
      order: 1;
    }
  }

  ${ColumnImageStyles}
  ${ColumnTextStyles}
  ${HeadlineStyles}
  ${DateStyles}
  ${TextStyles}
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
  date,
}: {
  image?: HTMLImageElement | null;
  headline?: HTMLElement | null;
  text?: HTMLElement | null;
  date?: HTMLElement | null;
}) => {
  const container = document.createElement('div');
  const textContainer = document.createElement('div');

  container.classList.add(LIST_CONTAINER);
  textContainer.classList.add(LIST_TEXT_CONTAINER);

  if (image) {
    const imageContainer = CreateImage({ image });
    container.setAttribute(VARIABLES.ATTR_IMAGE, '');
    container.appendChild(imageContainer);
  }

  if (headline) {
    CheckForAnimationLinkSpan({ element: headline });
    headline.classList.add(LIST_HEADLINE_WRAPPER);
    textContainer.appendChild(headline);
  }

  if (date) {
    date.classList.add(LIST_DATE_WRAPPER);
    textContainer.appendChild(date);
  }

  if (text) {
    text.classList.add(LIST_TEXT_WRAPPER);
    textContainer.appendChild(text);
  }

  container.appendChild(textContainer);

  return container;
};
