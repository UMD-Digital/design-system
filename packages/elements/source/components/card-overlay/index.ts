import {
  Animations,
  Typography,
  Tokens,
  Elements,
} from '@universityofmaryland/variables';
import { ConvertJSSObjectToStyles } from 'helpers/styles';
import { CheckForAnimationLinkSpan } from 'helpers/ui';
import { Debounce } from 'helpers/performance';
import {
  DOCUMENT_ICON,
  NEW_WINDOW_ICON,
  SHORT_ARROW_ICON,
  PLAY_ICON,
  PAUSE_ICON,
} from 'assets/icons';

type TypeTextContainer = {
  eyebrow?: HTMLElement | null;
  headline?: HTMLElement | null;
  text?: HTMLElement | null;
  date?: HTMLElement | null;
  cta?: HTMLElement | null;
};

type TypeCardOverlayElement = TypeTextContainer & {
  image?: HTMLImageElement | null;
  ctaIcon?: HTMLElement | null;
  theme?: string | null;
};

const { Colors, Spacing } = Tokens;
const { Link } = Animations;
const { Text } = Elements;
const { SansExtraLarge, SansLarger, SansSmall, SansMin, Eyebrow } = Typography;

const SMALL = 300;

const CONTAINER_WIDTH_TEXT_BREAKPOINT_MAX = 600;
const CONTAINER_WIDTH_TEXT_BREAKPOINT_LARGE = 400;
const TEXT_CHARACTER_LIMIT_SMALL = 80;
const TEXT_CHARACTER_LIMIT_LARGE = 110;
const TEXT_CHARACTER_LIMIT_MAX = 232;

const ELEMENT_NAME = 'umd-card-overlay';
const ATTRIBUTE_THEME = 'data-theme';
const ATTRIBUTE_IMAGE = 'data-image';
const ATTRIBUTE_CTA_ICON = 'data-cta-icon';
const THEME_DARK = 'dark';
const THEME_LIGHT = 'light';

const IS_THEME_DARK = `[${ATTRIBUTE_THEME}="${THEME_DARK}"]`;
const IS_THEME_LIGHT = `[${ATTRIBUTE_THEME}="${THEME_LIGHT}"]`;
const IS_WITH_IMAGE = `[${ATTRIBUTE_IMAGE}]`;
const IS_WITH_CTA_ICON = `[${ATTRIBUTE_CTA_ICON}]`;

const CARD_OVERLAY_CONTAINER = 'umd-card-overlay-container';
const CARD_OVERLAY_IMAGE_CONTAINER = 'umd-card-overlay-image-container';
const CARD_OVERLAY_TINT_OVERLAY = 'umd-card-overlay-tint';
const CARD_OVERLAY_TEXT_CONTAINER = 'umd-card-overlay-text-container';
const CARD_OVERLAY_TEXT_WRAPPER = 'umd-card-overlay-content-wrapper';
const CARD_OVERLAY_CONTAINER_CTA = 'umd-card-overlay-container-cta';
const CARD_OVERLAY_CTA_ICON_CONTAINER = 'umd-card-overlay-cta-icon-container';
const CARD_OVERLAY_EYEBROW = 'umd-overlay-card-eyebrow';
const CARD_OVERLAY_DATE = 'umd-overlay-card-date';
const CARD_OVERLAY_HEADLINE = 'umd-overlay-card-headline';
const CARD_OVERLAY_TEXT = 'umd-overlay-card-text';

// prettier-ignore
const VariantLightThemeStyles = `
  .${CARD_OVERLAY_CONTAINER}${IS_THEME_LIGHT} .${CARD_OVERLAY_CTA_ICON_CONTAINER} a {
    background-color: ${Colors.gray.darker};
  }

  .${CARD_OVERLAY_CONTAINER}${IS_THEME_LIGHT} .${CARD_OVERLAY_CTA_ICON_CONTAINER} svg,
  .${CARD_OVERLAY_CONTAINER}${IS_THEME_LIGHT} .${CARD_OVERLAY_CTA_ICON_CONTAINER} path {
    fill: ${Colors.white};
  }

  .${CARD_OVERLAY_CONTAINER}${IS_THEME_LIGHT} .${CARD_OVERLAY_CTA_ICON_CONTAINER} a:hover,
  .${CARD_OVERLAY_CONTAINER}${IS_THEME_LIGHT} .${CARD_OVERLAY_CTA_ICON_CONTAINER} a:focus {
    background-color: ${Colors.white};
    border: 1px solid ${Colors.gray.darker};
  }

  .${CARD_OVERLAY_CONTAINER}${IS_THEME_LIGHT} .${CARD_OVERLAY_CTA_ICON_CONTAINER} a:hover svg,
  .${CARD_OVERLAY_CONTAINER}${IS_THEME_LIGHT} .${CARD_OVERLAY_CTA_ICON_CONTAINER} a:hover path,
  .${CARD_OVERLAY_CONTAINER}${IS_THEME_LIGHT} .${CARD_OVERLAY_CTA_ICON_CONTAINER} a:focus svg,
  .${CARD_OVERLAY_CONTAINER}${IS_THEME_LIGHT} .${CARD_OVERLAY_CTA_ICON_CONTAINER} a:focus path {
    fill: ${Colors.gray.darker};
  }

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${CARD_OVERLAY_CONTAINER}${IS_THEME_LIGHT} .${CARD_OVERLAY_HEADLINE} a`]:
      Link.LineSlideUnder.black,
    },
  })}
`;

// prettier-ignore
const VariantDarkThemeStyles = `
  .${CARD_OVERLAY_CONTAINER}${IS_THEME_DARK} {
    background-color: ${Colors.gray.darker};
  }

  .${CARD_OVERLAY_CONTAINER}${IS_THEME_DARK} * {
    color: ${Colors.white};
  }

  .${CARD_OVERLAY_CONTAINER}${IS_THEME_DARK} .${CARD_OVERLAY_CTA_ICON_CONTAINER} a:hover,
  .${CARD_OVERLAY_CONTAINER}${IS_THEME_DARK} .${CARD_OVERLAY_CTA_ICON_CONTAINER} a:focus {
    background-color: ${Colors.gray.darker};
    border: 1px solid ${Colors.white};
  }

  .${CARD_OVERLAY_CONTAINER}${IS_THEME_DARK} .${CARD_OVERLAY_CTA_ICON_CONTAINER} a:hover svg path,
  .${CARD_OVERLAY_CONTAINER}${IS_THEME_DARK} .${CARD_OVERLAY_CTA_ICON_CONTAINER} a:focus svg path {
    fill: ${Colors.white};
  }

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${CARD_OVERLAY_CONTAINER}${IS_THEME_DARK} .${CARD_OVERLAY_TEXT}`]:
      Text.RichTextDark,
    },
  })}
`;

// prettier-ignore
const VariantImageThemeContent = `
  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${CARD_OVERLAY_CONTAINER}${IS_WITH_IMAGE} .${CARD_OVERLAY_HEADLINE} a`]:
      Link.LineSlideUnder.white,
    },
  })}

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${CARD_OVERLAY_CONTAINER}${IS_WITH_IMAGE} .${CARD_OVERLAY_TEXT}`]:
      Text.RichTextDark,
    },
  })}
`;

// prettier-ignore
const VariantImageThemeCtaIcon = `
  .${CARD_OVERLAY_CONTAINER}${IS_WITH_IMAGE} .${CARD_OVERLAY_CTA_ICON_CONTAINER} a {
    background-color: ${Colors.white};
  }

  .${CARD_OVERLAY_CONTAINER}${IS_WITH_IMAGE} .${CARD_OVERLAY_CTA_ICON_CONTAINER} a svg,
  .${CARD_OVERLAY_CONTAINER}${IS_WITH_IMAGE} .${CARD_OVERLAY_CTA_ICON_CONTAINER} a path {
    fill: ${Colors.gray.darker};
  }

  .${CARD_OVERLAY_CONTAINER}${IS_WITH_IMAGE} .${CARD_OVERLAY_CTA_ICON_CONTAINER} a:hover,
  .${CARD_OVERLAY_CONTAINER}[${IS_WITH_IMAGE} .${CARD_OVERLAY_CTA_ICON_CONTAINER} a:focus {
    background-color: ${Colors.gray.darker};
    border: none;
  }

  .${CARD_OVERLAY_CONTAINER}${IS_WITH_IMAGE} .${CARD_OVERLAY_CTA_ICON_CONTAINER} a:hover svg,
  .${CARD_OVERLAY_CONTAINER}${IS_WITH_IMAGE} .${CARD_OVERLAY_CTA_ICON_CONTAINER} a:hover path,
  .${CARD_OVERLAY_CONTAINER}${IS_WITH_IMAGE} .${CARD_OVERLAY_CTA_ICON_CONTAINER} a:focus svg,
  .${CARD_OVERLAY_CONTAINER}${IS_WITH_IMAGE} .${CARD_OVERLAY_CTA_ICON_CONTAINER} a:focus path {
    fill: ${Colors.white};
  }
`;

// prettier-ignore
const VariantImageThemeTint = `
  .${CARD_OVERLAY_CONTAINER}${IS_WITH_IMAGE} .${CARD_OVERLAY_TINT_OVERLAY} {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.9) 100%);
    opacity: 1;
    transition: opacity 0.5s ease-in-out;
  }

  .${CARD_OVERLAY_CONTAINER}${IS_WITH_IMAGE}:hover .${CARD_OVERLAY_TINT_OVERLAY} {
    opacity: .7;
  }

  .${CARD_OVERLAY_CONTAINER}${IS_WITH_IMAGE}:hover .${CARD_OVERLAY_IMAGE_CONTAINER} img,
  .${CARD_OVERLAY_CONTAINER}${IS_WITH_IMAGE}:focus-within .${CARD_OVERLAY_IMAGE_CONTAINER} img {
    transform: scale(1.025);
  }
`

// prettier-ignore
const VariantImageThemeStyles = `
  .${CARD_OVERLAY_CONTAINER}${IS_WITH_IMAGE} {
    padding-top: ${Spacing['4xl']};
  }

  @media (max-width: 767px) {
    .${CARD_OVERLAY_CONTAINER}${IS_WITH_IMAGE} {
      min-height: 400px;
    }
  }

  @container ${ELEMENT_NAME} (min-width: ${SMALL}px) {
    .${CARD_OVERLAY_CONTAINER}${IS_WITH_IMAGE} {
      padding-top: ${Spacing['8xl']};
    }
  }

  .${CARD_OVERLAY_CONTAINER}${IS_WITH_IMAGE} * {
    color: ${Colors.white};
  }

  .${CARD_OVERLAY_CONTAINER}${IS_WITH_IMAGE} .${CARD_OVERLAY_TEXT_CONTAINER} {
    justify-content: flex-end;
  }

  ${VariantImageThemeTint}
  ${VariantImageThemeContent}
  ${VariantImageThemeCtaIcon}
`;

// prettier-ignore
const VariantCTAIconStyles = `
  .${CARD_OVERLAY_CONTAINER}${IS_WITH_CTA_ICON} .${CARD_OVERLAY_TEXT_CONTAINER} {
    padding-right: 40px;
  }
`;

// prettier-ignore
const VariantComboStyles = `
  .${CARD_OVERLAY_CONTAINER}${IS_WITH_IMAGE},
  .${CARD_OVERLAY_CONTAINER}${IS_WITH_CTA_ICON} {
    display: flex;
    align-items: flex-end;
  }
`;

// prettier-ignore
const CtaIconContainerStyles = `
  .${CARD_OVERLAY_CTA_ICON_CONTAINER} {
    position: absolute;
    bottom: ${Spacing.sm};
    right: ${Spacing.sm};
    z-index: 9999;
  }

  .${CARD_OVERLAY_CTA_ICON_CONTAINER} a {
    border-radius: 50%;
    height: 40px;
    width: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${Colors.white};
    transition: background-color 0.3s ease-in-out;
  }

  .${CARD_OVERLAY_CTA_ICON_CONTAINER} svg {
    height: 15px;
    width: 15px;
    fill: ${Colors.gray.darker};
    transition: background-color 0.3s ease-in-out;
  }
`;

// prettier-ignore
const ImageContainerStyles = `
  .${CARD_OVERLAY_IMAGE_CONTAINER} {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    display: flex;
  }

  .${CARD_OVERLAY_IMAGE_CONTAINER} img,
  .${CARD_OVERLAY_IMAGE_CONTAINER} canvas {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    transform: scale(1);
    transition: transform 0.5s ease-in-out;
  }

  .${CARD_OVERLAY_IMAGE_CONTAINER} canvas {
    display: block;
    opacity: 0;
  }

  .${CARD_OVERLAY_IMAGE_CONTAINER} button {
    position: absolute;
    top: 0;
    right: 0;
    width: 44px;
    height: 44px;
    background-color: rgba(0, 0, 0, 0.8);
    z-index: 99;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .${CARD_OVERLAY_IMAGE_CONTAINER} button svg {
    fill: white;
    width: 24px;
  }
`;

// prettier-ignore
const TextContainerStyles = `
  .${CARD_OVERLAY_TEXT_CONTAINER} {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
  }

  .${CARD_OVERLAY_TEXT_CONTAINER} > .${CARD_OVERLAY_TEXT_WRAPPER} {
    position: relative;
    z-index: 9;
  }
`;

// prettier-ignore
const EyebrowStyles = `
  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${CARD_OVERLAY_EYEBROW}`]: Eyebrow,
    },
  })}

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${CARD_OVERLAY_EYEBROW} *`]: Eyebrow,
    },
  })}
`;

// prettier-ignore
const HeadlineStyles = `
  * + .${CARD_OVERLAY_HEADLINE} {
    margin-top: ${Spacing.min}
  }

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${CARD_OVERLAY_HEADLINE}`]: SansLarger,
    },
  })}

  @container umd-card-overlay (min-width: 500px) {
    ${ConvertJSSObjectToStyles({
      styleObj: {
        [`.${CARD_OVERLAY_HEADLINE}`]: SansExtraLarge,
      },
    })}
  }

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${CARD_OVERLAY_HEADLINE} *`]: SansLarger,
    },
  })}

  @container umd-card-overlay (min-width: 500px) {
    ${ConvertJSSObjectToStyles({
      styleObj: {
        [`.${CARD_OVERLAY_HEADLINE} *`]: SansExtraLarge,
      },
    })}
  }

  .${CARD_OVERLAY_HEADLINE},
  .${CARD_OVERLAY_HEADLINE} * {
    font-weight: 700;
  }

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${CARD_OVERLAY_HEADLINE} a`]:
      Link.LineSlideUnder.white,
    },
  })}
`;

// prettier-ignore
const TextStyles = `
  * + .${CARD_OVERLAY_TEXT} {
    margin-top: ${Spacing.min}
  }

  @media (min-width: 768px) {
    * + .${CARD_OVERLAY_TEXT} {
      margin-top: ${Spacing.sm}
    }
  }

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${CARD_OVERLAY_TEXT} *`]: SansSmall,
    },
  })}

  .${CARD_OVERLAY_TEXT} a {
    text-decoration: underline;
    transition: color 0.3s ease-in-out;
  }

  .${CARD_OVERLAY_TEXT} a:hover,
  .${CARD_OVERLAY_TEXT} a:focus {
    text-decoration: underline;
    color: ${Colors.red};
  }
`;

// prettier-ignore
const DateStyles = `
  * + .${CARD_OVERLAY_DATE} {
    margin-top: ${Spacing.min}
  }

  .${CARD_OVERLAY_DATE} * {
    color: ${Colors.gray.mediumAA};
  }

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${CARD_OVERLAY_DATE}`]: SansMin,
    },
  })}

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${CARD_OVERLAY_DATE} *`]: SansMin,
    },
  })}
`

// prettier-ignore
const CtaStyles = `
  .${CARD_OVERLAY_CONTAINER_CTA} {
    margin-top: ${Spacing.sm};
  }
`;

// prettier-ignore
const STYLES_OVERLAY_CARD_ELEMENT = `
  .${CARD_OVERLAY_CONTAINER} {
    container: ${ELEMENT_NAME} / inline-size;
    height: 100%;
    position: relative;
    background-color: ${Colors.gray.lightest};
    padding: ${Spacing.md};
    padding-top: ${Spacing.lg};
    padding-bottom: ${Spacing.lg};
  }

  @media (min-width: 768px) {
    .${CARD_OVERLAY_CONTAINER} {
      min-height: 456px;
      padding-top: ${Spacing['2xl']};
    }
  }

  ${EyebrowStyles}
  ${HeadlineStyles}
  ${TextStyles}
  ${DateStyles}
  ${CtaStyles}
  ${TextContainerStyles}
  ${CtaIconContainerStyles}
  ${ImageContainerStyles}
  ${VariantCTAIconStyles}
  ${VariantLightThemeStyles}
  ${VariantDarkThemeStyles}
  ${VariantImageThemeStyles}
  ${VariantComboStyles}
`;

const gifFunctionality = ({
  container,
}: {
  container: HTMLDivElement | null;
}) => {
  if (!container) return;
  const image = container.querySelector('img');
  const isGif = image?.src.includes('.gif');

  if (!image || !isGif) return;

  const canvas = document.createElement('canvas');
  const button = document.createElement('button');
  const setButtonPlay = () => {
    button.setAttribute('aria-label', 'Pause');
    button.innerHTML = PAUSE_ICON;
    canvas.style.opacity = '0';
    image.style.opacity = '1';
  };
  const setButtonPause = () => {
    button.setAttribute('aria-label', 'Play');
    button.innerHTML = PLAY_ICON;
    canvas.style.opacity = '1';
    image.style.opacity = '0';
  };
  let isPlaying = true;

  button.setAttribute('type', 'button');
  button.addEventListener('click', () => {
    if (isPlaying) {
      setButtonPause();
      isPlaying = false;
    } else {
      setButtonPlay();
      isPlaying = true;
    }
  });

  image.addEventListener('load', () => {
    canvas.classList.add('gif-canvas');
    container.appendChild(canvas);
    container.appendChild(button);
    setButtonPlay();
    SizeCanvas({ container });
  });
};

const TruncateText = ({
  container,
  textCopy,
}: {
  container: HTMLDivElement;
  textCopy: HTMLDivElement;
}) => {
  const hasImage = container.hasAttribute(ATTRIBUTE_IMAGE);
  const textNode = container.querySelector(`.${CARD_OVERLAY_TEXT}`);

  if (hasImage && textCopy && textNode) {
    const containerWidth = container.offsetWidth;
    const isContainerLarge =
      containerWidth >= CONTAINER_WIDTH_TEXT_BREAKPOINT_LARGE;
    const isContainerMax =
      containerWidth >= CONTAINER_WIDTH_TEXT_BREAKPOINT_MAX;
    let textSize = TEXT_CHARACTER_LIMIT_SMALL;

    if (isContainerLarge) textSize = TEXT_CHARACTER_LIMIT_LARGE;
    if (isContainerMax) textSize = TEXT_CHARACTER_LIMIT_MAX;

    const isRequriesTrunciation = textCopy.innerHTML.length > textSize;

    if (isRequriesTrunciation) {
      let modifiedText = textCopy.innerHTML.substring(0, textSize);
      modifiedText += '...';
      textNode.innerHTML = modifiedText;
    }
  }
};

const SizeCanvas = ({ container }: { container: HTMLDivElement | null }) => {
  if (!container) return;
  const image = container.querySelector('img');
  const canvas = container.querySelector('canvas') as HTMLCanvasElement;

  if (!container || !canvas || !image) return;

  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

  const width = image.width;
  const height = image.height;

  const clientWidth = Math.ceil(width);
  const clientHeight = Math.ceil(height);

  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  canvas.setAttribute('width', clientWidth.toString());
  canvas.setAttribute('height', clientHeight.toString());

  ctx.imageSmoothingEnabled = true;
  ctx.drawImage(image, 0, 0, clientWidth, clientHeight);
};

const MakeCtaIconContainer = ({ ctaIcon }: TypeCardOverlayElement) => {
  const container = document.createElement('div');

  if (!ctaIcon) return null;
  const href = ctaIcon.getAttribute('href');
  const message = `Open Link to ${href}`;
  const hasIcon = ctaIcon.querySelector('svg');
  const label = ctaIcon.getAttribute('aria-label') || message;

  ctaIcon.setAttribute('aria-label', label);
  container.classList.add(CARD_OVERLAY_CTA_ICON_CONTAINER);

  if (!hasIcon) {
    const isExternalLink = ctaIcon.getAttribute('target') === '_blank';
    const isDownloadLink = ctaIcon.getAttribute('download') === '';

    if (isExternalLink) {
      ctaIcon.innerHTML = NEW_WINDOW_ICON;
    }

    if (isDownloadLink) {
      ctaIcon.innerHTML = DOCUMENT_ICON;
    }

    if (!isExternalLink && !isDownloadLink) {
      ctaIcon.innerHTML = SHORT_ARROW_ICON;
    }
  }

  container.appendChild(ctaIcon);

  return container;
};

const MakeTextContainer = ({
  eyebrow,
  headline,
  text,
  date,
  cta,
}: TypeTextContainer) => {
  const container = document.createElement('div');

  container.classList.add(CARD_OVERLAY_TEXT_WRAPPER);

  if (eyebrow) {
    eyebrow.classList.add(CARD_OVERLAY_EYEBROW);
    container.appendChild(eyebrow);
  }

  if (headline) {
    CheckForAnimationLinkSpan({ element: headline });
    headline.classList.add(CARD_OVERLAY_HEADLINE);
    container.appendChild(headline);
  }

  if (text) {
    text.classList.add(CARD_OVERLAY_TEXT);
    container.appendChild(text);
  }

  if (date) {
    date.classList.add(CARD_OVERLAY_DATE);
    container.appendChild(date);
  }

  if (cta) {
    const ctaWrapper = document.createElement('div');

    ctaWrapper.classList.add(CARD_OVERLAY_CONTAINER_CTA);
    ctaWrapper.appendChild(cta);

    container.appendChild(ctaWrapper);
  }

  return container;
};

const MakeImageContainer = ({ image }: TypeCardOverlayElement) => {
  if (image) {
    const container = document.createElement('div');

    container.classList.add(CARD_OVERLAY_IMAGE_CONTAINER);
    container.appendChild(image);
    return container;
  }

  return null;
};

const CreateCardOverlayElement = (element: TypeCardOverlayElement) => {
  const { theme, text } = element;
  const container = document.createElement('div');
  const textContainer = document.createElement('div');
  const content = MakeTextContainer(element);
  const image = MakeImageContainer(element);
  const ctaIcon = MakeCtaIconContainer(element);
  const sizeElements = () => {
    SizeCanvas({ container: image });

    if (text) {
      TruncateText({
        container,
        textCopy: text.cloneNode(true) as HTMLDivElement,
      });
    }
  };

  if (image) container.setAttribute(ATTRIBUTE_IMAGE, '');
  if (theme) container.setAttribute(ATTRIBUTE_THEME, theme);

  container.classList.add(CARD_OVERLAY_CONTAINER);

  if (image) {
    const tintOverlay = document.createElement('div');

    tintOverlay.classList.add(CARD_OVERLAY_TINT_OVERLAY);
    container.appendChild(image);
    container.appendChild(tintOverlay);
  }

  if (ctaIcon) {
    container.setAttribute(ATTRIBUTE_CTA_ICON, '');
    container.appendChild(ctaIcon);
  }

  textContainer.classList.add(CARD_OVERLAY_TEXT_CONTAINER);
  textContainer.appendChild(content);

  container.appendChild(textContainer);

  sizeElements();
  gifFunctionality({ container: image });

  window.addEventListener('resize', Debounce(sizeElements, 50));

  return container;
};

export default {
  CreateElement: CreateCardOverlayElement,
  Styles: STYLES_OVERLAY_CARD_ELEMENT,
};
