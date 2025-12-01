import { ElementBuilder } from '@universityofmaryland/web-builder-library';
import * as token from '@universityofmaryland/web-token-library';
import * as Logos from '@universityofmaryland/web-icons-library/logos';
import createCampaignRow from '../campaign';
import createCallToAction from '../call-to-action';
import { BREAKPOINTS } from '../../../globals';
import { LogoProps } from '../../../_types';
import { type UMDElement } from '../../../../../_types';

const { LARGE } = BREAKPOINTS;

const createLogoLinkElement = (
  props: Pick<LogoProps, 'isThemeLight' | 'slotLogo'>,
): UMDElement => {
  const { slotLogo, isThemeLight } = props;

  const createDefaultLogoLink = () => {
    const logoLink = document.createElement('a');
    logoLink.setAttribute('href', 'https://umd.edu');
    logoLink.setAttribute('target', '_blank');
    logoLink.setAttribute('rel', 'noopener noreferrer');
    logoLink.setAttribute(
      'aria-label',
      'Link to the University of Maryland homepage',
    );

    logoLink.innerHTML = !isThemeLight
      ? `${Logos.umd.dark}`
      : `${Logos.umd.light}`;

    return logoLink;
  };

  const logoLink = slotLogo ?? createDefaultLogoLink();

  return new ElementBuilder(logoLink)
    .withClassName('umd-footer-logo-container_link')
    .withStyles({
      element: {
        maxWidth: '310px',
        alignSelf: 'flex-start',
        backgroundSize: 0,
        display: 'block !important',

        [`& svg`]: {
          width: '100%',
        },
      },
    })
    .build();
};

const createContainer = (
  logoLinkElement: UMDElement,
  campaignElement: UMDElement,
  callToActionElement: UMDElement,
): UMDElement => {
  return new ElementBuilder()
    .withClassName('umd-footer-logo-container')
    .withChildren(logoLinkElement, campaignElement, callToActionElement)
    .withStyles({
      element: {
        marginTop: '5px',

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
    })
    .build();
};

export default (props: LogoProps): UMDElement => {
  const logoLinkElement = createLogoLinkElement(props);
  const campaignElement = createCampaignRow(props);
  const callToActionElement = createCallToAction(props);

  return createContainer(logoLinkElement, campaignElement, callToActionElement);
};
