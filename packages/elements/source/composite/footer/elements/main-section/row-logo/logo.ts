import { token } from '@universityofmaryland/web-styles-library';
import * as utilities from 'utilities';
import {
  createCampaign as createCampaignRow,
  CAMPAIGN_COLUMN_WRAPPER,
  type CampaignProps,
} from '../campaign';
import {
  createCallToAction as createCallToActionContainer,
  CALL_TO_ACTION_CONTAINER,
  type CallToActionProps,
} from '../call-to-action';
import { BREAKPOINTS, ELEMENTS, VARIABLES, REFERENCES } from '../../../globals';
import { BaseProps } from '../../../_types';

const { LARGE } = BREAKPOINTS;
const { ELEMENT_NAME } = VARIABLES;
const { ELEMENT_WRAPPER } = ELEMENTS;
const { IS_VERSION_SIMPLE } = REFERENCES;

const LOGO_CONTAINER = 'umd-footer-logo-container';
const LOGO_CONTAINER_LINK = 'umd-footer-logo-container_link';

// prettier-ignore
const ctaOverwriteStyles = `
  @container ${ELEMENT_NAME} (max-width: ${LARGE - 1}px) {
    .${LOGO_CONTAINER} .${CALL_TO_ACTION_CONTAINER} {
      margin-top: ${token.spacing.md};
    }
  }

  @container ${ELEMENT_NAME} (min-width: ${LARGE}px) {
    .${LOGO_CONTAINER} .${CALL_TO_ACTION_CONTAINER} {
      display: none;
    }
  }

  @container ${ELEMENT_NAME} (max-width: ${LARGE - 1}px) {
    .${ELEMENT_WRAPPER}${IS_VERSION_SIMPLE} .${LOGO_CONTAINER} .${CALL_TO_ACTION_CONTAINER} {
      display: none;
    }
  }
`;

const campaignOverwriteStyles = `
  @container ${ELEMENT_NAME} (min-width: ${LARGE}px) {
    .${LOGO_CONTAINER} .${CAMPAIGN_COLUMN_WRAPPER} {
      display: none;
    }
  }
`;

export const LogoContainerStyles = `
  .${LOGO_CONTAINER_LINK} {
    max-width: 310px;
    align-self: flex-start;
    background-size: 0;
    display: block !important;
  }

  .${LOGO_CONTAINER_LINK} svg {
    width: 100%;
  }

  ${campaignOverwriteStyles}
  ${ctaOverwriteStyles}
`;

export interface LogoProps
  extends BaseProps,
    CampaignProps,
    CallToActionProps {}

export const createLogo = (props: LogoProps) => {
  const { isThemeLight } = props;
  const container = document.createElement('div');
  const logoLink = document.createElement('a');
  const campaignContainer = createCampaignRow(props);
  const ctaWrapper = createCallToActionContainer(props);

  logoLink.classList.add(LOGO_CONTAINER_LINK);
  logoLink.setAttribute('href', 'https://umd.edu');
  logoLink.setAttribute('target', '_blank');
  logoLink.setAttribute('rel', 'noopener noreferrer');
  logoLink.setAttribute(
    'aria-label',
    'Link to the Unvieristy of Maryland homepage',
  );

  logoLink.innerHTML = !isThemeLight
    ? `${utilities.asset.logo.DARK_LOGO}`
    : `${utilities.asset.logo.LIGHT_LOGO}`;

  container.classList.add(LOGO_CONTAINER);
  container.appendChild(logoLink);
  container.appendChild(campaignContainer);
  container.appendChild(ctaWrapper);

  return container;
};
