import { Tokens } from '@universityofmaryland/variables';
import { AssetIcon } from 'utilities';

type TypeCardOverlayCtaIcon = {
  ctaIcon?: HTMLElement | null;
  theme?: string | null;
};

const { Colors, Spacing } = Tokens;

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
    background-color: ${Colors.gray.darker};
  }

  ${OVERWRITE_THEME_LIGHT_CONTAINER} svg,
  ${OVERWRITE_THEME_LIGHT_CONTAINER} path {
    fill: ${Colors.white};
  }

  ${OVERWRITE_THEME_LIGHT_CONTAINER} a:hover,
  ${OVERWRITE_THEME_LIGHT_CONTAINER} a:focus {
    background-color: ${Colors.white};
    border: 1px solid ${Colors.gray.darker};
  }

  ${OVERWRITE_THEME_LIGHT_CONTAINER} a:hover svg,
  ${OVERWRITE_THEME_LIGHT_CONTAINER} a:hover path {
    fill: ${Colors.gray.darker};
  }
`;

// prettier-ignore
const OverwriteThemeDark = `
  ${OVERWRITE_THEME_DARK_CONTAINER} a:hover,
  ${OVERWRITE_THEME_DARK_CONTAINER} a:focus {
    background-color: ${Colors.gray.darker};
    border: 1px solid ${Colors.white};
  }

  ${OVERWRITE_THEME_DARK_CONTAINER} a:hover svg path,
  ${OVERWRITE_THEME_DARK_CONTAINER} a:focus svg path {
    fill: ${Colors.white};
  }
`;

// prettier-ignore
const STYLES_OVERLAY_CARD_CTA_ICON_ELEMENT = `
  .${ELEMENT_CTA_ICON_CONTAINER} {
    position: absolute;
    bottom: ${Spacing.sm};
    right: ${Spacing.sm};
    z-index: 9999;
  }
  
  .${ELEMENT_CTA_ICON_CONTAINER} a {
    border-radius: 50%;
    height: 40px;
    width: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${Colors.white};
    transition: background-color 0.3s ease-in-out;
  }
  
  .${ELEMENT_CTA_ICON_CONTAINER} svg {
    height: 15px;
    width: 15px;
    fill: ${Colors.gray.darker};
    transition: background-color 0.3s ease-in-out;
  }

  ${OverwriteThemeLight}
  ${OverwriteThemeDark}
`;

const MakeCtaIconContainer = ({ ctaIcon, theme }: TypeCardOverlayCtaIcon) => {
  const container = document.createElement('div');

  if (!ctaIcon) return null;
  const href = ctaIcon.getAttribute('href');
  const message = `Open Link to ${href}`;
  const hasIcon = ctaIcon.querySelector('svg');
  const label = ctaIcon.getAttribute('aria-label') || message;

  ctaIcon.setAttribute('aria-label', label);
  container.classList.add(ELEMENT_CTA_ICON_CONTAINER);

  if (!hasIcon) {
    const isExternalLink = ctaIcon.getAttribute('target') === '_blank';
    const isDownloadLink = ctaIcon.getAttribute('download') === '';

    if (isExternalLink) {
      ctaIcon.innerHTML = AssetIcon.NEW_WINDOW;
    }

    if (isDownloadLink) {
      ctaIcon.innerHTML = AssetIcon.DOCUMENT;
    }

    if (!isExternalLink && !isDownloadLink) {
      ctaIcon.innerHTML = AssetIcon.SHORT_ARROW;
    }
  }

  container.appendChild(ctaIcon);
  if (theme) container.setAttribute(ATTRIBUTE_THEME, theme);

  return container;
};
export default {
  CreateElement: MakeCtaIconContainer,
  Styles: STYLES_OVERLAY_CARD_CTA_ICON_ELEMENT,
};
