import { ElementBuilder } from '@universityofmaryland/web-builder-library';
import * as token from '@universityofmaryland/web-token-library';
import { external_link as iconExternalLink } from '@universityofmaryland/web-icons-library/controls';
import { document as iconDocument } from '@universityofmaryland/web-icons-library/files';
import { arrow_long as iconArrowLong } from '@universityofmaryland/web-icons-library/arrows';

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
      ctaIcon.innerHTML = iconExternalLink;
    }

    if (isDownloadLink) {
      ctaIcon.innerHTML = iconDocument;
    }

    if (!isExternalLink && !isDownloadLink) {
      ctaIcon.innerHTML = iconArrowLong;
    }
  }

  return new ElementBuilder()
    .withClassName('actions-cta-icon')
    .withStyles({
      element: {
        position: 'absolute',
        bottom: token.spacing.sm,
        right: token.spacing.sm,
        zIndex: 9999,

        ['& a']: {
          borderRadius: '50%',
          height: '40px',
          width: '40px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: token.color.white,
          transition: 'background-color 0.3s ease-in-out',

          ...(isThemeLight && {
            backgroundColor: `${token.color.gray.darker}`,
          }),
        },

        ['& a:hover, & a:focus']: {
          backgroundColor: `${token.color.gray.darker}`,
          border: `1px solid ${token.color.white}`,

          ...(isThemeLight && {
            backgroundColor: `${token.color.white}`,
            border: `1px solid ${token.color.gray.darker}`,
          }),

          [`& svg, & path`]: {
            fill: token.color.white,

            ...(isThemeLight && {
              fill: `${token.color.gray.darker}`,
            }),
          },
        },

        ['& svg']: {
          height: '15px',
          width: '15px',
          fill: token.color.gray.darker,
          transition: 'background-color 0.3s ease-in-out',
        },

        ['& svg, & path']: {
          fill: `${token.color.gray.darker}`,

          ...(isThemeLight && {
            fill: `${token.color.white}`,
          }),
        },
      },
    })
    .withChild(ctaIcon)
    .build();
};
