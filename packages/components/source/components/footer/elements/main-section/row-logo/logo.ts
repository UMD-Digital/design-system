import { spacing } from '@universityofmaryland/umd-web-configuration/dist/tokens/layout.js';
import { DARK_LOGO, LIGHT_LOGO } from 'assets/logos';
import { ELEMENT_TYPE } from '../../../component';
import { VARIABLES, ELEMENTS, BREAKPOINTS } from '../../../globals';
import { CreateCampaignRow, CAMPAIGN_COLUMN_WRAPPER } from '../campaign';
import {
  CreateCallToActionContainer,
  CALL_TO_ACTION_CONTAINER,
} from '../call-to-action';

const LOGO_CONTAINER = 'umd-footer-logo-container';
const LOGO_CONTAINER_LINK = 'umd-footer-logo-container_link';

const ctaOverwriteStyles = `
  @container umd-footer (max-width: ${BREAKPOINTS.large - 1}px) {
    .${LOGO_CONTAINER} .${CALL_TO_ACTION_CONTAINER} {
      margin-top: ${spacing.md};
    }
  }

  @container umd-footer (min-width: ${BREAKPOINTS.large}px) {
    .${LOGO_CONTAINER} .${CALL_TO_ACTION_CONTAINER} {
      display: none;
    }
  }

  @container umd-footer (max-width: ${BREAKPOINTS.large - 1}px) {
    .${ELEMENTS.ELEMENT_WRAPPER}[type="${
  VARIABLES.VERSION_TYPE_SIMPLE
}"] .${LOGO_CONTAINER} .${CALL_TO_ACTION_CONTAINER} {
      display: none;
    }
  }
`;

const campaignOverwriteStyles = `
  @container umd-footer (min-width: ${BREAKPOINTS.large}px) {
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

export const CreateLogoContainer = ({ element }: { element: ELEMENT_TYPE }) => {
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
    theme === VARIABLES.THEME_OPTION_LIGHT ? `${LIGHT_LOGO}` : `${DARK_LOGO}`;

  container.classList.add(LOGO_CONTAINER);
  container.appendChild(logoLink);
  container.appendChild(campaignContainer);
  container.appendChild(ctaWrapper);

  return container;
};
