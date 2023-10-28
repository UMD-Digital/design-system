import { DARK_LOGO, LIGHT_LOGO } from '../../../assets';
import { THEME_OPTION_LIGHT } from '../../../variables';

const LOGO_CONTAINER = 'umd-footer-logo-container';

export const LogoContainerStyles = `
  .${LOGO_CONTAINER} {
    max-width: 310px;
    align-self: flex-start;
    background-size: 0;
    display: block !important;
  }
  
  .${LOGO_CONTAINER} svg {
    width: 100%;
  }
`;

export const CreateLogoContainer = ({ theme }: { theme: string }) => {
  const logoLink = document.createElement('a');
  const logoElmement = document.createElement('div');

  logoLink.classList.add(LOGO_CONTAINER);
  logoLink.setAttribute('href', 'https://umd.edu');
  logoLink.setAttribute('target', '_blank');
  logoLink.setAttribute('rel', 'noopener noreferrer');

  logoElmement.innerHTML =
    theme === THEME_OPTION_LIGHT ? `${LIGHT_LOGO}` : `${DARK_LOGO}`;

  logoLink.appendChild(logoElmement);

  return logoLink;
};
