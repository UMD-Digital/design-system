import { colors } from '@universityofmaryland/design-system-configuration/dist/configuration/tokens/colors.js';
import { spacing } from '@universityofmaryland/design-system-configuration/dist/configuration/tokens/layout.js';
import { ContactContainerStyles, CreateContactContainer } from './contact';
import { SocialContainerStyles, CreateSocialCampaignColumns } from '../social';
import { LogoContainerStyles, CreateLogoContainer } from './logo';
import {
  CallToActionStyles,
  CreateCallToActionContainer,
  CALL_TO_ACTION_CONTAINER,
} from '../call-to-action';
import {
  BREAKPOINTS,
  ELEMENT_WRAPPER,
  THEME_OPTION_LIGHT,
  VERSION_TYPE_SIMPLE,
} from '../../../variables';

const ROW_LOGO_CONTAINER = 'umd-footer-row-logo-container';
const ROW_LOGO_CONTAINER_WRAPPER = 'umd-footer-row-logo-container-wrapper';

const ctaOverwriteStyles = `
  @container umd-footer (max-width: ${BREAKPOINTS.large - 1}px) {
    .${ROW_LOGO_CONTAINER_WRAPPER} > .${CALL_TO_ACTION_CONTAINER} {
      display: none;
    }
  }
`;

const themeOverwriteStyles = `
  .${ELEMENT_WRAPPER}[theme="${THEME_OPTION_LIGHT}"] .${ROW_LOGO_CONTAINER} {
    background-color: ${colors.gray.lightest} !important;
  }
`;

export const RowLogoStyles = `
  .${ROW_LOGO_CONTAINER} {
    background-color: ${colors.black};
    padding: ${spacing['2xl']} 0 ${spacing['md']} ;
  }

  @container umd-footer (min-width: ${BREAKPOINTS.medium}px) and (max-width: ${BREAKPOINTS.large}px) {
    .${ROW_LOGO_CONTAINER_WRAPPER}  {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: ${spacing.md};
    }
  }
  
  @container umd-footer (min-width: ${BREAKPOINTS.large}px) {
    .${ROW_LOGO_CONTAINER_WRAPPER}  {
      display: flex;
      padding: ${spacing['5xl']} 0 ${spacing['2xl']};
    }
  }
  
  ${LogoContainerStyles}
  ${ContactContainerStyles}
  ${SocialContainerStyles}
  ${CallToActionStyles}
  ${ctaOverwriteStyles}
  ${themeOverwriteStyles}
`;

export const CreateRowLogo = ({
  type,
  theme,
  element,
}: {
  type: string;
  theme: string;
  element: HTMLElement;
}) => {
  const container = document.createElement('div');
  const lock = document.createElement('div');
  const wrapper = document.createElement('div');

  container.classList.add(ROW_LOGO_CONTAINER);
  wrapper.classList.add(ROW_LOGO_CONTAINER_WRAPPER);
  lock.classList.add('umd-lock');

  const makeThirdColumn = () => {
    const includeSocial = type === VERSION_TYPE_SIMPLE;

    if (includeSocial) {
      const socialColumnWrapper = CreateSocialCampaignColumns({
        element,
        theme,
      });
      wrapper.appendChild(socialColumnWrapper);
    } else {
      const ctaWrapper = CreateCallToActionContainer({ element });
      wrapper.appendChild(ctaWrapper);
    }
  };

  const logoElement = CreateLogoContainer({ theme, element });
  const contactElement = CreateContactContainer({ element });
  wrapper.appendChild(logoElement);
  wrapper.appendChild(contactElement);

  makeThirdColumn();
  lock.appendChild(wrapper);
  container.appendChild(lock);
  return container;
};
