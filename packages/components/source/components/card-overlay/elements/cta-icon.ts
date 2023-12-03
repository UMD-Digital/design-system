import { colors, spacing } from '@universityofmaryland/umd-web-configuration';
import { DOCUMENT_ICON, NEW_WINDOW_ICON, SHORT_ARROW_ICON } from 'assets/icons';
import { SLOTS, ELEMENTS } from '../globals';
import { CardType } from '../component';

export const CtaIconStyles = `
  .${ELEMENTS.CARD_OVERLAY_CTA_ICON_CONTAINER} {
    position: absolute;
    bottom: ${spacing.sm};
    right: ${spacing.sm};
    z-index: 9999;
  }

  .${ELEMENTS.CARD_OVERLAY_CTA_ICON_CONTAINER} a {
    border-radius: 50%;
    height: 40px;
    width: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${colors.white};
    transition: background-color 0.3s ease-in-out;
  }

  .${ELEMENTS.CARD_OVERLAY_CTA_ICON_CONTAINER} svg {
    height: 15px;
    width: 15px;
    fill: ${colors.gray.darker};
    transition: background-color 0.3s ease-in-out;
  }
`;

export const CreateCtaIcon = ({ element }: { element: CardType }) => {
  const container = document.createElement('div');
  const ctaIcon = element.querySelector(
    `[slot="${SLOTS.CTAICON}"]`,
  ) as HTMLAnchorElement;

  if (!ctaIcon) return null;

  const hasIcon = ctaIcon.querySelector('svg');
  const label =
    ctaIcon.getAttribute('aria-label') || `Open Link to ${ctaIcon.href}`;

  ctaIcon.setAttribute('aria-label', label);
  container.classList.add(ELEMENTS.CARD_OVERLAY_CTA_ICON_CONTAINER);

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
