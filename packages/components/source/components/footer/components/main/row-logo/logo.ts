import { CreateCampaignRow } from '../campaign';
import { DARK_LOGO, LIGHT_LOGO } from 'assets/logos';
import {
  THEME_OPTION_LIGHT,
  BREAKPOINTS,
  CAMPAIGN_COLUMN_WRAPPER,
} from '../../../variables';

const LOGO_CONTAINER = 'umd-footer-logo-container';
const LOGO_CONTAINER_LINK = 'umd-footer-logo-container_link';

const campaignOverwriteStyles = `
  @container umd-footer (max-width: ${BREAKPOINTS.large - 1}px) {
    .${LOGO_CONTAINER} .${CAMPAIGN_COLUMN_WRAPPER} {
    
    }
  }

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
`;

export const CreateLogoContainer = ({ theme }: { theme: string }) => {
  const container = document.createElement('div');
  const logoLink = document.createElement('a');
  const campaignContainer = CreateCampaignRow({ theme });

  logoLink.classList.add(LOGO_CONTAINER_LINK);
  logoLink.setAttribute('href', 'https://umd.edu');
  logoLink.setAttribute('target', '_blank');
  logoLink.setAttribute('rel', 'noopener noreferrer');

  logoLink.innerHTML =
    theme === THEME_OPTION_LIGHT ? `${LIGHT_LOGO}` : `${DARK_LOGO}`;

  container.classList.add(LOGO_CONTAINER);
  container.appendChild(logoLink);
  container.appendChild(campaignContainer);

  return container;
};
