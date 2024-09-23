import { Tokens, Typography } from '@universityofmaryland/variables';
import { Styles } from 'utilities';
import { TextLockupSmallScaling, TextLockupSmall } from 'macros';

import CtaIcon, { TypeCardOverlayCtaIcon } from './elements/icon-cta';

type TypeCardOverlayElement = TypeCardOverlayCtaIcon & {
  headline: HTMLElement | null;
  eyebrow?: HTMLElement | null;
  text?: HTMLElement | null;
  actions?: HTMLElement | null;
  theme?: string;
};

const { Spacing, Colors } = Tokens;
const { SansLarger, SansExtraLarge } = Typography;
const { ConvertJSSObjectToStyles } = Styles;

const MEDIUM = 500;

const ELEMENT_NAME = 'umd-card-overla-default';
const ATTRIBUTE_THEME = 'data-theme';
const ATTRIBUTE_CTA_ICON = 'cta-icon';
const THEME_DARK = 'dark';

const ELEMENT_CARD_OVERLAY_DEFAULT_CONTAINER = 'card-overlay-default-container';
const ELEMENT_CARD_OVERLAY_DEFAULT_WRAPPER = 'card-overlay-default-wrapper';

const IS_THEME_DARK = `[${ATTRIBUTE_THEME}="${THEME_DARK}"]`;
const IS_WITH_CTA_ICON = `[${ATTRIBUTE_CTA_ICON}]`;

const OVERWRITE_THEME_DARK_WRAPPER = `.${ELEMENT_CARD_OVERLAY_DEFAULT_CONTAINER}${IS_THEME_DARK} .${ELEMENT_CARD_OVERLAY_DEFAULT_WRAPPER}`;

const OVERWRITE_CTA_ICON_BLOCK_CONTAINER = `.${ELEMENT_CARD_OVERLAY_DEFAULT_CONTAINER}${IS_WITH_CTA_ICON} .${ELEMENT_CARD_OVERLAY_DEFAULT_WRAPPER}`;

const OVERWRITE_SCALING_TEXT_LOCK_CONTAINER = `.${ELEMENT_CARD_OVERLAY_DEFAULT_CONTAINER} .${TextLockupSmallScaling.Elements.container}`;
const OVERWRITE_TEXT_LOCK_CONTAINER = `.${ELEMENT_CARD_OVERLAY_DEFAULT_CONTAINER} .${TextLockupSmall.Elements.container}`;
const OVERWRITE_TEXT_LOCK_HEADLINE = `.${ELEMENT_CARD_OVERLAY_DEFAULT_CONTAINER} .${TextLockupSmall.Elements.headline}`;
const OVERWRITE_TEXT_LOCK_ACTIONS = `.${ELEMENT_CARD_OVERLAY_DEFAULT_CONTAINER} .${TextLockupSmall.Elements.actions}`;

// prettier-ignore
const OverwriteCtaIcon  = `
  ${OVERWRITE_CTA_ICON_BLOCK_CONTAINER} {
    padding-right: ${Spacing['2xl']};
  }
`;

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
      [`${OVERWRITE_TEXT_LOCK_HEADLINE}`]: SansLarger,
    },
  })}

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`${OVERWRITE_TEXT_LOCK_HEADLINE} *`]: SansLarger,
    },
  })}

  @container ${ELEMENT_NAME} (min-width: ${MEDIUM}px) {
    ${ConvertJSSObjectToStyles({
      styleObj: {
        [`${OVERWRITE_TEXT_LOCK_HEADLINE}`]: SansExtraLarge,
      },
    })}
  }
  
  @container ${ELEMENT_NAME} (min-width: ${MEDIUM}px) {
    ${ConvertJSSObjectToStyles({
      styleObj: {
        [`${OVERWRITE_TEXT_LOCK_HEADLINE} *`]: SansExtraLarge,
      },
    })}
  }
`;

const OverwriteTextContainer = `
  ${OVERWRITE_SCALING_TEXT_LOCK_CONTAINER} {
    height: 100%;
  }

  ${OVERWRITE_TEXT_LOCK_CONTAINER} {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  ${OVERWRITE_TEXT_LOCK_ACTIONS} {
    margin-top: ${Spacing.sm};
  }

  ${OVERWRITE_SCALING_TEXT_LOCK_CONTAINER} > div > *:not(.${TextLockupSmall.Elements.actions}) {
    margin-bottom: ${Spacing.sm};
  }

  @media (min-width: 768px) {
    ${OVERWRITE_TEXT_LOCK_ACTIONS} {
      margin-top: auto;
    }
  }
`;

// prettier-ignore
const STYLES_OVERLAY_CARD_ELEMENT = `
  .${ELEMENT_CARD_OVERLAY_DEFAULT_CONTAINER} {
    container: ${ELEMENT_NAME} / inline-size;
    height: 100%;
    position: relative;
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

  ${TextLockupSmallScaling.Styles}
  ${CtaIcon.Styles}
  ${OverwriteHeadline}
  ${OverwriteThemeDark}
  ${OverwriteCtaIcon}
  ${OverwriteTextContainer}
`;

const CreateCardOverlayElement = (props: TypeCardOverlayElement) => {
  const { theme } = props;
  const elementContainer = document.createElement('div');
  const elementWrapper = document.createElement('div');
  const scalingFontContainer = TextLockupSmallScaling.CreateElement(props);
  const ctaIcon = CtaIcon.CreateElement(props);

  elementWrapper.classList.add(ELEMENT_CARD_OVERLAY_DEFAULT_WRAPPER);
  elementWrapper.appendChild(scalingFontContainer);
  if (ctaIcon) {
    elementWrapper.appendChild(ctaIcon);
    elementContainer.setAttribute(ATTRIBUTE_CTA_ICON, '');
  }

  if (theme) elementContainer.setAttribute(ATTRIBUTE_THEME, theme);
  elementContainer.classList.add(ELEMENT_CARD_OVERLAY_DEFAULT_CONTAINER);
  elementContainer.appendChild(elementWrapper);

  return elementContainer;
};

export default {
  CreateElement: CreateCardOverlayElement,
  Styles: STYLES_OVERLAY_CARD_ELEMENT,
};
