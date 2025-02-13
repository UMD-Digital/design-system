import { token, typography } from '@universityofmaryland/web-styles-library';
import * as Utility from 'utilities';
import { TextLockupSmallScaling, TextLockupSmall } from 'macros';

import CtaIcon, { TypeCardOverlayCtaIcon } from './elements/icon-cta';

type TypeCardOverlayElement = TypeCardOverlayCtaIcon & {
  headline: HTMLElement | null;
  eyebrow?: HTMLElement | null;
  text?: HTMLElement | null;
  actions?: HTMLElement | null;
  isThemeDark?: boolean;
  isThemeLight?: boolean;
};

const { convertJSSObjectToStyles } = Utility.styles;

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

const OVERWRITE_CTA_ICON_BLOCK_CONTAINER = `.${ELEMENT_CARD_OVERLAY_DEFAULT_CONTAINER}${IS_WITH_CTA_ICON} .${TextLockupSmall.Elements.container}`;

const OVERWRITE_SCALING_TEXT_LOCK_CONTAINER = `.${ELEMENT_CARD_OVERLAY_DEFAULT_CONTAINER} .${TextLockupSmallScaling.Elements.container}`;
const OVERWRITE_TEXT_LOCK_CONTAINER = `.${ELEMENT_CARD_OVERLAY_DEFAULT_CONTAINER} .${TextLockupSmall.Elements.container}`;
const OVERWRITE_TEXT_LOCK_HEADLINE = `.${ELEMENT_CARD_OVERLAY_DEFAULT_CONTAINER} .${TextLockupSmall.Elements.headline}`;
const OVERWRITE_TEXT_LOCK_ACTIONS = `.${ELEMENT_CARD_OVERLAY_DEFAULT_CONTAINER} .${TextLockupSmall.Elements.actions}`;

// prettier-ignore
const OverwriteCtaIcon  = `
  ${OVERWRITE_CTA_ICON_BLOCK_CONTAINER} {
    padding-right: ${token.spacing['2xl']};
  }
`;

// prettier-ignore
const OverwriteThemeDark  = `
  ${OVERWRITE_THEME_DARK_WRAPPER} {
    background-color: ${token.color.gray.darker};
  }

  ${OVERWRITE_THEME_DARK_WRAPPER} * {
    color: ${token.color.white};
  }
`;

const OverwriteHeadline = `
  ${convertJSSObjectToStyles({
    styleObj: {
      [`${OVERWRITE_TEXT_LOCK_HEADLINE}`]: typography.sans.larger,
    },
  })}

  ${convertJSSObjectToStyles({
    styleObj: {
      [`${OVERWRITE_TEXT_LOCK_HEADLINE} *`]: typography.sans.larger,
    },
  })}

  @container ${ELEMENT_NAME} (min-width: ${MEDIUM}px) {
    ${convertJSSObjectToStyles({
      styleObj: {
        [`${OVERWRITE_TEXT_LOCK_HEADLINE}`]: typography.sans.extraLarge,
      },
    })}
  }
  
  @container ${ELEMENT_NAME} (min-width: ${MEDIUM}px) {
    ${convertJSSObjectToStyles({
      styleObj: {
        [`${OVERWRITE_TEXT_LOCK_HEADLINE} *`]: typography.sans.extraLarge,
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
    padding: ${token.spacing.md};
    padding-top: ${token.spacing.lg};
    padding-bottom: ${token.spacing.lg};
  }

  ${OVERWRITE_TEXT_LOCK_ACTIONS} {
    margin-top: ${token.spacing.sm};
  }

  ${OVERWRITE_SCALING_TEXT_LOCK_CONTAINER} > div > *:not(.${TextLockupSmall.Elements.actions}) {
    margin-bottom: ${token.spacing.sm};
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
    background-color: ${token.color.gray.lightest};
    height: 100%;
    overflow: hidden;
  }

  @media (min-width: 768px) {
    .${ELEMENT_CARD_OVERLAY_DEFAULT_WRAPPER} {
      min-height: 456px;
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
  const { isThemeDark } = props;
  const elementContainer = document.createElement('div');
  const elementWrapper = document.createElement('div');
  const scalingFontContainer = TextLockupSmallScaling.CreateElement(props);
  const ctaIcon = CtaIcon.CreateElement({
    ...props,
    isThemeLight: !isThemeDark,
  });

  elementWrapper.classList.add(ELEMENT_CARD_OVERLAY_DEFAULT_WRAPPER);
  elementWrapper.appendChild(scalingFontContainer);
  if (ctaIcon) {
    elementWrapper.appendChild(ctaIcon);
    elementContainer.setAttribute(ATTRIBUTE_CTA_ICON, '');
  }

  if (isThemeDark) elementContainer.setAttribute(ATTRIBUTE_THEME, THEME_DARK);
  elementContainer.classList.add(ELEMENT_CARD_OVERLAY_DEFAULT_CONTAINER);
  elementContainer.appendChild(elementWrapper);

  return elementContainer;
};

export default {
  CreateElement: CreateCardOverlayElement,
  Styles: STYLES_OVERLAY_CARD_ELEMENT,
};
