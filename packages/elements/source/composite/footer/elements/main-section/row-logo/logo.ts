import * as token from '@universityofmaryland/web-styles-library/token';
import ElementBuilder from '@universityofmaryland/web-builder-library';
import * as Logos from '@universityofmaryland/web-icons-library/logos';
import createCampaignRow, { type CampaignProps } from '../campaign';
import createCallToAction, { type CallToActionProps } from '../call-to-action';
import { BREAKPOINTS } from '../../../globals';
import { BaseProps } from '../../../_types';
import { type ElementVisual } from '../../../../../_types';

const { LARGE } = BREAKPOINTS;

export interface LogoProps extends BaseProps, CampaignProps, CallToActionProps {
  slotLogo: HTMLImageElement | HTMLAnchorElement | null;
}

const createLogoLinkElement = (
  isThemeLight?: boolean,
  logo?: HTMLImageElement | HTMLAnchorElement | null,
): ElementVisual => {
  const createDefaultLogoLink = () => {
    const logoLink = document.createElement('a');
    logoLink.setAttribute('href', 'https://umd.edu');
    logoLink.setAttribute('target', '_blank');
    logoLink.setAttribute('rel', 'noopener noreferrer');
    logoLink.setAttribute(
      'aria-label',
      'Link to the University of Maryland homepage',
    );

    logoLink.innerHTML = !isThemeLight ? `${Logos.umd.dark}` : `${Logos.umd.light}`;

    return logoLink;
  };

  const logoLink = logo ?? createDefaultLogoLink();

  return ElementBuilder.create.element({
    element: logoLink,
    className: 'umd-footer-logo-container_link',
    elementStyles: {
      element: {
        maxWidth: '310px',
        alignSelf: 'flex-start',
        backgroundSize: 0,
        display: 'block !important',

        [`& svg`]: {
          width: '100%',
        },
      },
    },
  });
};

const createContainer = (
  logoLinkElement: ElementVisual,
  campaignElement: ElementVisual,
  callToActionElement: ElementVisual,
): ElementVisual => {
  return ElementBuilder.create.div({
    className: 'umd-footer-logo-container',
    children: [logoLinkElement, campaignElement, callToActionElement],
    elementStyles: {
      element: {
        [`@container (max-width: ${LARGE - 1}px)`]: {
          [`& .umd-footer-call-to-action-container`]: {
            marginTop: token.spacing.md,
          },
        },
        [`@container (min-width: ${LARGE}px)`]: {
          [`& > .campaign-column-wrapper`]: {
            display: 'none',
          },

          ['& > .umd-footer-call-to-action-container']: {
            display: 'none',
          },
        },
      },
    },
  });
};

export default (props: LogoProps): ElementVisual => {
  const { isThemeLight, slotLogo } = props;

  const logoLinkElement = createLogoLinkElement(isThemeLight, slotLogo);
  const campaignElement = createCampaignRow(props);
  const callToActionElement = createCallToAction(props);

  return createContainer(logoLinkElement, campaignElement, callToActionElement);
};
