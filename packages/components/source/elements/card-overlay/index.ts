import { Tokens, Typography } from '@universityofmaryland/variables';
import { Styles } from 'utilities';
import { TextLockupSmallScaling, TextLockupSmall } from 'macros';
import CtaIcon, { TypeCardOverlayCtaIcon } from './icon-cta';

type TypeCardOverlayElement = TypeCardOverlayCtaIcon & {
  headline?: HTMLElement | null;
  eyebrow?: HTMLElement | null;
  text?: HTMLElement | null;
  date?: HTMLElement | null;
  actions?: HTMLElement | null;
  theme?: string;
};

const { Spacing, Colors } = Tokens;
const { SansLarger, SansExtraLarge } = Typography;
const { ConvertJSSObjectToStyles } = Styles;

const MEDIUM = 500;

const ELEMENT_NAME = 'umd-card-overla-default';
const ATTRIBUTE_THEME = 'data-theme';
const THEME_DARK = 'dark';

const ELEMENT_CARD_OVERLAY_DEFAULT_CONTAINER = 'card-overlay-default-container';
const ELEMENT_CARD_OVERLAY_DEFAULT_WRAPPER = 'card-overlay-default-wrapper';

const IS_THEME_DARK = `[${ATTRIBUTE_THEME}="${THEME_DARK}"]`;

const OVERWRITE_THEME_DARK_WRAPPER = `.${ELEMENT_CARD_OVERLAY_DEFAULT_CONTAINER}${IS_THEME_DARK} .${ELEMENT_CARD_OVERLAY_DEFAULT_WRAPPER} `;

// prettier-ignore
const OverwriteThemeDark  = `
  ${OVERWRITE_THEME_DARK_WRAPPER} {
    background-color: ${Colors.gray.darker};
  }

  ${OVERWRITE_THEME_DARK_WRAPPER} * {
    color: ${Colors.white};
  }
`;

const OverwriteHeadline = `
  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${TextLockupSmall.Elements.headline}`]: SansLarger,
    },
  })}

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${TextLockupSmall.Elements.headline} *`]: SansLarger,
    },
  })}

  @container ${ELEMENT_NAME} (min-width: ${MEDIUM}px) {
    ${ConvertJSSObjectToStyles({
      styleObj: {
        [`.${TextLockupSmall.Elements.headline}`]: SansExtraLarge,
      },
    })}
  }
  
  @container ${ELEMENT_NAME} (min-width: ${MEDIUM}px) {
    ${ConvertJSSObjectToStyles({
      styleObj: {
        [`.${TextLockupSmall.Elements.headline} *`]: SansExtraLarge,
      },
    })}
  }
`;

// prettier-ignore
const STYLES_OVERLAY_CARD_ELEMENT = `
  .${ELEMENT_CARD_OVERLAY_DEFAULT_CONTAINER} {
    container: ${ELEMENT_NAME} / inline-size;
    height: 100%;
  }

  .${ELEMENT_CARD_OVERLAY_DEFAULT_WRAPPER} {
    background-color: ${Colors.gray.lightest};
    height: 100%;
    padding: ${Spacing.md};
    padding-top: ${Spacing.lg};
    padding-bottom: ${Spacing.lg};
    overflow: hidden;
  }

  @media (min-width: 768px) {
    .${ELEMENT_CARD_OVERLAY_DEFAULT_WRAPPER} {
      min-height: 456px;
      padding-top: ${Spacing['2xl']};
    }
  }

  ${TextLockupSmall.Styles}
  ${CtaIcon.Styles}
  ${OverwriteThemeDark}
  ${OverwriteHeadline}
`;

const CreateCardOverlayElement = (element: TypeCardOverlayElement) => {
  const { theme } = element;
  const elementContainer = document.createElement('div');
  const elementWrapper = document.createElement('div');
  const content = TextLockupSmall.CreateElement(element);
  const ctaIcon = CtaIcon.CreateElement(element);
  const scalingFontContainer = TextLockupSmallScaling.CreateElement();

  scalingFontContainer.appendChild(content);

  elementWrapper.classList.add(ELEMENT_CARD_OVERLAY_DEFAULT_WRAPPER);
  elementWrapper.appendChild(scalingFontContainer);
  if (ctaIcon) elementWrapper.appendChild(ctaIcon);

  if (theme) elementContainer.setAttribute(ATTRIBUTE_THEME, theme);
  elementContainer.classList.add(ELEMENT_CARD_OVERLAY_DEFAULT_CONTAINER);
  elementContainer.appendChild(elementWrapper);

  return elementContainer;
};

export default {
  CreateElement: CreateCardOverlayElement,
  Styles: STYLES_OVERLAY_CARD_ELEMENT,
};
