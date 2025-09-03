import { token } from '@universityofmaryland/web-styles-library';
import { ElementModel } from 'model';
import * as utilities from 'utilities';
import createCampaignRow, { type CampaignProps } from '../campaign';
import createCallToAction, { type CallToActionProps } from '../call-to-action';
import { BREAKPOINTS, VARIABLES, REFERENCES } from '../../../globals';
import { BaseProps } from '../../../_types';
import { type ElementVisual } from '../../../../../_types';

const { LARGE } = BREAKPOINTS;
const { ELEMENT_NAME } = VARIABLES;
const { IS_VERSION_SIMPLE } = REFERENCES;

export interface LogoProps
  extends BaseProps,
    CampaignProps,
    CallToActionProps {}

const createLogoLinkElement = (isThemeLight?: boolean): ElementVisual => {
  const logoLink = document.createElement('a');
  logoLink.setAttribute('href', 'https://umd.edu');
  logoLink.setAttribute('target', '_blank');
  logoLink.setAttribute('rel', 'noopener noreferrer');
  logoLink.setAttribute(
    'aria-label',
    'Link to the University of Maryland homepage',
  );

  logoLink.innerHTML = !isThemeLight
    ? `${utilities.asset.logo.DARK_LOGO}`
    : `${utilities.asset.logo.LIGHT_LOGO}`;

  return ElementModel.create({
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
  return ElementModel.createDiv({
    className: 'umd-footer-logo-container',
    children: [logoLinkElement, campaignElement, callToActionElement],
    elementStyles: {
      element: {
        // CTA overwrite
        [`@container ${ELEMENT_NAME} (max-width: ${LARGE - 1}px)`]: {
          [`.umd-footer-logo-container .umd-footer-call-to-action-container`]: {
            marginTop: token.spacing.md,
          },
        },
        [`@container ${ELEMENT_NAME} (min-width: ${LARGE}px)`]: {
          [`.umd-footer-logo-container .umd-footer-call-to-action-container`]: {
            display: 'none',
          },
        },
        [`@container ${ELEMENT_NAME} (max-width: ${LARGE - 1}px)`]: {
          [`.umd-footer-element-wrapper${IS_VERSION_SIMPLE} .umd-footer-logo-container .umd-footer-call-to-action-container`]:
            {
              display: 'none',
            },
        },

        // Campaign overwrite
        [`@container ${ELEMENT_NAME} (min-width: ${LARGE}px)`]: {
          [`.umd-footer-logo-container .umd-footer-campaign-column-wrapper`]: {
            display: 'none',
          },
        },
      },
    },
  });
};

export default (props: LogoProps): ElementVisual => {
  const { isThemeLight } = props;

  const logoLinkElement = createLogoLinkElement(isThemeLight);
  const campaignElement = createCampaignRow(props);
  const callToActionElement = createCallToAction(props);

  return createContainer(logoLinkElement, campaignElement, callToActionElement);
};
