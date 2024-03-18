import { Tokens } from '@universityofmaryland/variables';
import { DARK_LOGO, LIGHT_LOGO } from 'assets/logos';
import { CreateCampaignRow, CAMPAIGN_COLUMN_WRAPPER } from '../campaign';
import {
  CreateCallToActionContainer,
  CALL_TO_ACTION_CONTAINER,
} from '../call-to-action';
import { BREAKPOINTS, ELEMENTS, VARIABLES, REFERENCES } from '../../../globals';
import { UMDFooterElement } from '../../../index';

const { Spacing } = Tokens;

const { LARGE } = BREAKPOINTS;
const { ELEMENT_NAME, THEME_OPTION_LIGHT } = VARIABLES;
const { ELEMENT_WRAPPER } = ELEMENTS;
const { IS_VERSION_SIMPLE } = REFERENCES;

const LOGO_CONTAINER = 'umd-footer-logo-container';
const LOGO_CONTAINER_LINK = 'umd-footer-logo-container_link';

// prettier-ignore
const ctaOverwriteStyles = `
  @container ${ELEMENT_NAME} (max-width: ${LARGE - 1}px) {
    .${LOGO_CONTAINER} .${CALL_TO_ACTION_CONTAINER} {
      margin-top: ${Spacing.md};
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

export const CreateLogoContainer = ({
  element,
}: {
  element: UMDFooterElement;
}) => {
  const theme = element._theme;
  const container = document.createElement('div');
  const logoLink = document.createElement('a');
  const campaignContainer = CreateCampaignRow({ element });
  const ctaWrapper = CreateCallToActionContainer({ element });

  logoLink.classList.add(LOGO_CONTAINER_LINK);
  logoLink.setAttribute('href', 'https://umd.edu');
  logoLink.setAttribute('target', '_blank');
  logoLink.setAttribute('rel', 'noopener noreferrer');
  logoLink.setAttribute(
    'aria-label',
    'Link to the Unvieristy of Maryland homepage',
  );

  logoLink.innerHTML =
    theme === THEME_OPTION_LIGHT ? `${LIGHT_LOGO}` : `${DARK_LOGO}`;

  container.classList.add(LOGO_CONTAINER);
  container.appendChild(logoLink);
  container.appendChild(campaignContainer);
  container.appendChild(ctaWrapper);

  return container;
};
