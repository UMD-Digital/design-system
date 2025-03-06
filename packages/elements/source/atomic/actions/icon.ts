import { token } from '@universityofmaryland/web-styles-library';
import * as Utility from 'utilities';

export type TypeCardOverlayCtaIcon = {
  ctaIcon: HTMLElement;
  isThemeDark?: boolean;
  isThemeLight?: boolean;
};

const ATTRIBUTE_THEME = 'data-theme';
const THEME_DARK = 'dark';
const THEME_LIGHT = 'light';

const IS_THEME_DARK = `[${ATTRIBUTE_THEME}="${THEME_DARK}"]`;
const IS_THEME_LIGHT = `[${ATTRIBUTE_THEME}="${THEME_LIGHT}"]`;

const ELEMENT_CTA_ICON_CONTAINER = 'card-overlay-cta-icon-container';

const OVERWRITE_THEME_LIGHT_CONTAINER = `.${ELEMENT_CTA_ICON_CONTAINER}${IS_THEME_LIGHT}`;
const OVERWRITE_THEME_DARK_CONTAINER = `.${ELEMENT_CTA_ICON_CONTAINER}${IS_THEME_DARK}`;

// prettier-ignore
const OverwriteThemeLight = `
  ${OVERWRITE_THEME_LIGHT_CONTAINER} a {
    background-color: ${token.color.gray.darker};
  }

  ${OVERWRITE_THEME_LIGHT_CONTAINER} svg,
  ${OVERWRITE_THEME_LIGHT_CONTAINER} path {
    fill: ${token.color.white};
  }

  ${OVERWRITE_THEME_LIGHT_CONTAINER} a:hover,
  ${OVERWRITE_THEME_LIGHT_CONTAINER} a:focus {
    background-color: ${token.color.white};
    border: 1px solid ${token.color.gray.darker};
  }

  ${OVERWRITE_THEME_LIGHT_CONTAINER} a:hover svg,
  ${OVERWRITE_THEME_LIGHT_CONTAINER} a:hover path,
  ${OVERWRITE_THEME_LIGHT_CONTAINER} a:focus svg,
  ${OVERWRITE_THEME_LIGHT_CONTAINER} a:focus path {
    fill: ${token.color.gray.darker};
  }
`;

// prettier-ignore
const OverwriteThemeDark = `
  ${OVERWRITE_THEME_DARK_CONTAINER} a:hover,
  ${OVERWRITE_THEME_DARK_CONTAINER} a:focus {
    background-color: ${token.color.gray.darker};
    border: 1px solid ${token.color.white};
  }

  ${OVERWRITE_THEME_DARK_CONTAINER} a:hover svg path,
  ${OVERWRITE_THEME_DARK_CONTAINER} a:focus svg path {
    fill: ${token.color.white};
  }
`;

// prettier-ignore
const STYLES_OVERLAY_CARD_CTA_ICON_ELEMENT = `
  .${ELEMENT_CTA_ICON_CONTAINER} {
    position: absolute;
    bottom: ${token.spacing.sm};
    right: ${token.spacing.sm};
    z-index: 9999;
  }

  
  .${ELEMENT_CTA_ICON_CONTAINER} a {
    border-radius: 50%;
    height: 40px;
    width: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${token.color.white};
    transition: background-color 0.3s ease-in-out;
  }
  
  .${ELEMENT_CTA_ICON_CONTAINER} svg {
    height: 15px;
    width: 15px;
    fill: ${token.color.gray.darker};
    transition: background-color 0.3s ease-in-out;
  }

  .${ELEMENT_CTA_ICON_CONTAINER} svg,
  .${ELEMENT_CTA_ICON_CONTAINER} path {
    fill: ${token.color.gray.darker};
  }

  ${OverwriteThemeLight}
  ${OverwriteThemeDark}
`;

export default ({
  ctaIcon,
  isThemeDark,
  isThemeLight,
}: TypeCardOverlayCtaIcon) => {
  const container = document.createElement('div');

  const href = ctaIcon.getAttribute('href');
  const message = `Open Link to ${href}`;
  const hasIcon = ctaIcon.querySelector('svg');
  const label = ctaIcon.getAttribute('aria-label') || message;
  let styles = STYLES_OVERLAY_CARD_CTA_ICON_ELEMENT;

  ctaIcon.setAttribute('aria-label', label);
  container.classList.add(ELEMENT_CTA_ICON_CONTAINER);

  if (!hasIcon) {
    const isExternalLink = ctaIcon.getAttribute('target') === '_blank';
    const isDownloadLink = ctaIcon.getAttribute('download') === '';

    if (isExternalLink) {
      ctaIcon.innerHTML = Utility.asset.icon.NEW_WINDOW;
    }

    if (isDownloadLink) {
      ctaIcon.innerHTML = Utility.asset.icon.DOCUMENT;
    }

    if (!isExternalLink && !isDownloadLink) {
      ctaIcon.innerHTML = Utility.asset.icon.SHORT_ARROW;
    }
  }

  container.appendChild(ctaIcon);
  if (isThemeDark) container.setAttribute(ATTRIBUTE_THEME, THEME_DARK);
  if (isThemeLight) container.setAttribute(ATTRIBUTE_THEME, THEME_LIGHT);

  return { element: container, styles };
};
