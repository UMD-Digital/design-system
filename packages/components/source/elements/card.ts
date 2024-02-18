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
const { TextDark } = Fields;

const BREAKPOINTS = {
  MOBILE: 650,
  TABLET: 768,
  DESKTOP: 1024,
};

export const VARIABLES = {
  ATTR_THEME: 'data-theme',
  ATTR_THEME_DARK: 'data-theme="dark"',
  ATTR_BORDER: 'data-border',
  ATTR_ALIGNED: 'data-aligned',
  ATTR_IMAGE: 'data-image',
};

export const ELEMENTS = {
  CARD_INTRO_CONTAINER: 'umd-card-overlay-intro-container',
};

const CARD_CONTAINER = 'umd-card-container';
const CARD_TEXT_CONTAINER = 'umd-card-text-container';
const IMAGE_CONTAINER = 'umd-card-image-container';

const CARD_INTRO_WRAPPER = 'umd-card-overlay-intro-wrapper';
const CARD_HEADLINE_WRAPPER = 'umd-card-overlay-headline-wrapper';
const CARD_EYEBROW_WRAPPER = 'umd-card-overlay-eyebrow-wrapper';

const CARD_BODY_CONTAINER = 'umd-card-body-container';
const CARD_BODY_TEXT_WRAPPER = 'umd-card-body-text-wrapper';
const CARD_BODY_DATE_WRAPPER = 'umd-card-body-date-wrapper';
const CARD_BODY_CTA_WRAPPER = 'umd-card-body-cta-wrapper';

// prettier-ignore
export const ImageStyles = `
  @media (max-width: ${BREAKPOINTS.MOBILE - 1}px) {
    .${IMAGE_CONTAINER} {
      width: 30%;
      order: 2;
    }
  }

  .${IMAGE_CONTAINER} a {
    display: block;
    line-height: 0;
    overflow: hidden;
  }

  .${IMAGE_CONTAINER} a img {
    object-fit: cover;
    object-position: 50% 50%;
    transform: scale(1);
    transition: transform 0.5s;
    width: 100%;
  }

  .${IMAGE_CONTAINER} a:hover img,
  .${IMAGE_CONTAINER} a:focus img {
    transform: scale(1.025);
  }
`;

// prettier-ignore
const EyebrowStyles = `
  .${CARD_EYEBROW_WRAPPER} * {
    color: ${Colors.black};
  }

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${CARD_EYEBROW_WRAPPER}`]:
      Typography['.umd-sans-smaller'],
    },
  })}

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${CARD_EYEBROW_WRAPPER} *`]:
      Typography['.umd-sans-smaller'],
    },
  })}

  .${CARD_EYEBROW_WRAPPER} a:hover,
  .${CARD_EYEBROW_WRAPPER} a:focus {
    text-decoration: underline;
  }
`;

// prettier-ignore
const HeadlineStyles = `
  * + .${CARD_HEADLINE_WRAPPER} {
    margin-top: ${Spacing.min}
  }

  .${CARD_HEADLINE_WRAPPER} * {
    color: ${Colors.black};
  }

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${CARD_HEADLINE_WRAPPER}`]:
      Typography['.umd-sans-large'],
    },
  })}

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${CARD_HEADLINE_WRAPPER} *`]:
      Typography['.umd-sans-large'],
    },
  })}

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${CARD_HEADLINE_WRAPPER} a`]:
      LinkLineSlide['.slidein-underline-black'],
    },
  })}
`;

// prettier-ignore
const DateStyles = `
  .${CARD_BODY_DATE_WRAPPER} {
    display: block;
  }

  * + .${CARD_BODY_DATE_WRAPPER} {
    margin-top: ${Spacing.min};
    display: block;
  }

  .${CARD_BODY_DATE_WRAPPER} * {
    color: ${Colors.gray.mediumAA};
  }

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${CARD_BODY_DATE_WRAPPER}`]: Typography['.umd-sans-min'],
    },
  })}

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${CARD_BODY_DATE_WRAPPER} *`]: Typography['.umd-sans-min'],
    },
  })}
`;

// prettier-ignore
const TextStyles = `
  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${CARD_BODY_TEXT_WRAPPER} *`]: Typography['.umd-sans-small'],
    },
  })}

  .${CARD_BODY_TEXT_WRAPPER} a {
    text-decoration: underline;
    transition: color 0.3s ease-in-out;
  }

  .${CARD_BODY_TEXT_WRAPPER} a:hover,
  .${CARD_BODY_TEXT_WRAPPER} a:focus {
    text-decoration: underline;
    color: ${Colors.red};
  }
`;

// prettier-ignore
const CtaStyles = `
  .${CARD_BODY_CTA_WRAPPER} {
    margin-top: ${Spacing.md};
  }
`;

// prettier-ignore
export const LayoutIntroStyles = `
  @media (max-width: ${BREAKPOINTS.TABLET - 1}px) {
    .${CARD_INTRO_WRAPPER} {
      display: flex;
      margin-bottom: ${Spacing.min};
    }
  }

  @media (min-width: ${BREAKPOINTS.TABLET}px) {
    .${CARD_INTRO_WRAPPER} {
      padding-top: ${Spacing.md};
    }
  }

  @media (max-width: ${BREAKPOINTS.TABLET - 1}px) {
    .${CARD_INTRO_WRAPPER} {
      width: 70%;
      padding-right: ${Spacing.md};
      flex: 1 0;
    }
  }

  ${EyebrowStyles}
  ${HeadlineStyles}
`;

// prettier-ignore
export const LayoutBodyStyles = `
  * + .${CARD_BODY_CONTAINER} {
    margin-top: ${Spacing.min};
  }

  ${DateStyles}
  ${TextStyles}
  ${CtaStyles}
`;

// prettier-ignore
const VariantThemeStyles = `
  .${CARD_CONTAINER}[${VARIABLES.ATTR_THEME_DARK}] {
    background-color: ${Colors.gray.darker};
    color: ${Colors.white};
    height: 100%;
  }

  .${CARD_CONTAINER}[${VARIABLES.ATTR_THEME_DARK}] * {
    color: ${Colors.white};
  }

  .${CARD_CONTAINER}[${VARIABLES.ATTR_THEME_DARK}] .${CARD_TEXT_CONTAINER} {
    padding: ${Spacing.md};
  }

  @media (min-width: ${BREAKPOINTS.TABLET}px) {
    .${CARD_CONTAINER}[${VARIABLES.ATTR_THEME_DARK}] .${CARD_TEXT_CONTAINER} {
      padding-top: 0;
    }
  }

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${CARD_CONTAINER}[${VARIABLES.ATTR_THEME_DARK}] .${CARD_BODY_TEXT_WRAPPER}`]:
      TextDark,
    },
  })}

  @media (max-width: ${BREAKPOINTS.MOBILE - 1}px) {
    .${CARD_CONTAINER}[${VARIABLES.ATTR_THEME_DARK}] .${IMAGE_CONTAINER} {
     margin-top: ${Spacing.md};
     margin-right: ${Spacing.md};
    }
  }
`;

// prettier-ignore
const VariantAlignedStyles = `
  .${CARD_CONTAINER}[${VARIABLES.ATTR_ALIGNED}] img {
    aspect-ratio: 4/3;
    object-fit: cover;
    object-position: center;
    width: 100%;
  }
`;

// prettier-ignore
const VariantBorderStyles = `
  .${CARD_CONTAINER}[${VARIABLES.ATTR_BORDER}] {
    border: 1px solid ${Colors.gray.light};
    height: 100%;
  }

  .${CARD_CONTAINER}[${VARIABLES.ATTR_BORDER}] .${CARD_TEXT_CONTAINER} {
    padding: ${Spacing.md};
  }

  @media (min-width: ${BREAKPOINTS.TABLET}px) {
    .${CARD_CONTAINER}[${VARIABLES.ATTR_BORDER}] .${CARD_TEXT_CONTAINER} {
      padding-top: 0;
    }
  }

  @media (max-width: ${BREAKPOINTS.MOBILE - 1}px) {
    .${CARD_CONTAINER}[${VARIABLES.ATTR_BORDER}] .${IMAGE_CONTAINER} {
     margin-top: ${Spacing.md};
     margin-right: ${Spacing.md};
    }
  }
`;

// prettier-ignore
export const STYLES_CARD = `
  .${CARD_CONTAINER} {
    max-width: 680px;
    container: umd-card / inline-size;
  }

  @media (max-width: ${BREAKPOINTS.MOBILE - 1}px) {
    .${CARD_CONTAINER}[${VARIABLES.ATTR_IMAGE}] {
      display: flex;
    }
  }

  @media (max-width: ${BREAKPOINTS.MOBILE - 1}px) {
    .${CARD_CONTAINER}[${VARIABLES.ATTR_IMAGE}] .${CARD_TEXT_CONTAINER} {
      width: 70%;
      padding-right: ${Spacing.md};
      order: 1;
    }
  }

  ${ImageStyles}
  ${LayoutIntroStyles}
  ${LayoutBodyStyles}
  ${VariantThemeStyles}
  ${VariantAlignedStyles}
  ${VariantBorderStyles}
`;

const CreateImage = ({ image }: { image: HTMLImageElement }) => {
  const container = document.createElement('div');

  container.classList.add(IMAGE_CONTAINER);
  container.appendChild(image);

  return container;
};

export const CreateCardElement = ({
  image,
  eyebrow,
  headline,
  text,
  date,
  cta,
  theme = null,
  aligned = false,
  border = false,
}: {
  image?: HTMLImageElement | null;
  eyebrow?: HTMLElement | null;
  headline?: HTMLElement | null;
  text?: HTMLElement | null;
  date?: HTMLElement | null;
  cta?: HTMLElement | null;
  theme?: string | null;
  aligned?: boolean;
  border?: boolean;
}) => {
  const container = document.createElement('div');
  const textContainer = document.createElement('div');
  const introWrapper = document.createElement('div');
  const bodyWrapper = document.createElement('div');

  container.classList.add(CARD_CONTAINER);
  textContainer.classList.add(CARD_TEXT_CONTAINER);
  introWrapper.classList.add(CARD_INTRO_WRAPPER);
  bodyWrapper.classList.add(CARD_BODY_CONTAINER);

  if (theme) {
    container.setAttribute(VARIABLES.ATTR_THEME, theme);
  }

  if (aligned) {
    container.setAttribute(VARIABLES.ATTR_ALIGNED, '');
  }

  if (border) {
    container.setAttribute(VARIABLES.ATTR_BORDER, '');
  }

  if (image) {
    const imageContainer = CreateImage({ image });
    container.setAttribute(VARIABLES.ATTR_IMAGE, '');
    container.appendChild(imageContainer);
  }

  if (eyebrow) {
    eyebrow.classList.add(CARD_EYEBROW_WRAPPER);
    introWrapper.appendChild(eyebrow);
  }

  if (headline) {
    CheckForAnimationLinkSpan({ element: headline });
    headline.classList.add(CARD_HEADLINE_WRAPPER);
    introWrapper.appendChild(headline);
  }

  if (text) {
    text.classList.add(CARD_BODY_TEXT_WRAPPER);
    bodyWrapper.appendChild(text);
  }

  if (date) {
    date.classList.add(CARD_BODY_DATE_WRAPPER);
    bodyWrapper.appendChild(date);
  }

  if (cta) {
    cta.classList.add(CARD_BODY_CTA_WRAPPER);
    bodyWrapper.appendChild(cta);
  }

  textContainer.appendChild(introWrapper);
  textContainer.appendChild(bodyWrapper);
  container.appendChild(textContainer);

  return container;
};
