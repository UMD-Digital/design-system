import * as Styles from '@universityofmaryland/web-styles-library';
import { ElementModel } from 'model';
import { asset } from 'utilities';

interface ActionIconProps {
  ctaIcon: HTMLElement;
  isThemeLight?: boolean;
}

export default ({ ctaIcon, isThemeLight }: ActionIconProps) => {
  const href = ctaIcon.getAttribute('href');
  const message = `Open Link to ${href}`;
  const hasIcon = ctaIcon.querySelector('svg');
  const label = ctaIcon.getAttribute('aria-label') || message;

  ctaIcon.setAttribute('aria-label', label);

  if (!hasIcon) {
    const isExternalLink = ctaIcon.getAttribute('target') === '_blank';
    const isDownloadLink = ctaIcon.getAttribute('download') === '';

    if (isExternalLink) {
      ctaIcon.innerHTML = asset.icon.NEW_WINDOW;
    }

    if (isDownloadLink) {
      ctaIcon.innerHTML = asset.icon.DOCUMENT;
    }

    if (!isExternalLink && !isDownloadLink) {
      ctaIcon.innerHTML = asset.icon.SHORT_ARROW;
    }
  }

  const container = ElementModel.createDiv({
    className: 'actions-cta-icon',
    elementStyles: {
      element: {
        position: 'absolute',
        bottom: Styles.token.spacing.sm,
        right: Styles.token.spacing.sm,
        zIndex: 9999,

        ['& a']: {
          borderRadius: '50%',
          height: '40px',
          width: '40px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: Styles.token.color.white,
          transition: 'background-color 0.3s ease-in-out',

          ...(isThemeLight && {
            backgroundColor: `${Styles.token.color.gray.darker}`,
          }),
        },

        ['& a:hover, & a:focus']: {
          backgroundColor: `${Styles.token.color.gray.darker}`,
          border: `1px solid ${Styles.token.color.white}`,

          ...(isThemeLight && {
            backgroundColor: `${Styles.token.color.white}`,
            border: `1px solid ${Styles.token.color.gray.darker}`,
          }),

          [`& svg, & path`]: {
            fill: Styles.token.color.white,

            ...(isThemeLight && {
              fill: `${Styles.token.color.gray.darker}`,
            }),
          },
        },

        ['& svg']: {
          height: '15px',
          width: '15px',
          fill: Styles.token.color.gray.darker,
          transition: 'background-color 0.3s ease-in-out',
        },

        ['& svg, & path']: {
          fill: `${Styles.token.color.gray.darker}`,

          ...(isThemeLight && {
            fill: `${Styles.token.color.white}`,
          }),
        },
      },
    },
  });

  container.element.appendChild(ctaIcon);

  return container;
};
