import { Tokens, Layout } from '@universityofmaryland/variables';
import { ConvertJSSObjectToStyles } from 'helpers/styles';
import { ELEMENT_TYPE } from 'components/footer';
import { BREAKPOINTS, VARIABLES, ELEMENTS } from 'components/footer/globals';
import {
  SocialContainerStyles,
  CreateSocialCampaignColumns,
  SOCIAL_COLUMN_WRAPPER,
} from '../social';
import {
  CallToActionStyles,
  CreateCallToActionContainer,
  CALL_TO_ACTION_CONTAINER,
} from '../call-to-action';
import { ContactContainerStyles, CreateContactContainer } from './contact';
import { LogoContainerStyles, CreateLogoContainer } from './logo';

const { Colors, Spacing } = Tokens;
const { Lock } = Layout;

const ROW_LOGO_CONTAINER = 'umd-footer-row-logo-container';
const ROW_LOGO_CONTAINER_WRAPPER = 'umd-footer-row-logo-container-wrapper';
const ROW_LOGO_CONTAINER_LOCK = 'umd-footer-row-logo-container-lock';

const ctaOverwriteStyles = `
  @container umd-footer (max-width: ${BREAKPOINTS.large - 1}px) {
    .${ROW_LOGO_CONTAINER_WRAPPER} > .${CALL_TO_ACTION_CONTAINER} {
      display: none;
    }
  }
`;

// prettier-ignore
const themeOverwriteStyles = `
  .${ELEMENTS.ELEMENT_WRAPPER}[theme="${VARIABLES.THEME_OPTION_LIGHT}"] .${ROW_LOGO_CONTAINER} {
    background-color: ${Colors.gray.lightest} !important;
  }

  @container umd-footer (max-width: ${BREAKPOINTS.large - 1}px) {
    .${ELEMENTS.ELEMENT_WRAPPER}[type="${VARIABLES.VERSION_TYPE_SIMPLE}"] .${ROW_LOGO_CONTAINER} .${SOCIAL_COLUMN_WRAPPER} {
      display: none;
    }
  }
`;

// prettier-ignore
export const RowLogoStyles = `
  .${ROW_LOGO_CONTAINER} {
    background-color: ${Colors.black};
  }

  @container umd-footer (max-width: ${BREAKPOINTS.large - 1}px) {
    .${ROW_LOGO_CONTAINER} {
      padding-top: ${Spacing['2xl']};
    }
  }

  @container umd-footer (min-width: ${BREAKPOINTS.medium}px) and (max-width: ${BREAKPOINTS.large}px) {
    .${ROW_LOGO_CONTAINER_WRAPPER}  {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: ${Spacing.md};
    }
  }

  @container umd-footer (max-width: ${BREAKPOINTS.large - 1}px) {
    .${ROW_LOGO_CONTAINER} {
      padding-bottom: ${Spacing['md']} ;
    }
  }

  @container umd-footer (min-width: ${BREAKPOINTS.large}px) {
    .${ROW_LOGO_CONTAINER_WRAPPER}  {
      display: flex;
      padding: ${Spacing['5xl']} 0 ${Spacing['2xl']};
    }
  }

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${ROW_LOGO_CONTAINER_LOCK}`]: Lock['.base']
    },
  })}

  ${LogoContainerStyles}
  ${ContactContainerStyles}
  ${SocialContainerStyles}
  ${CallToActionStyles}
  ${ctaOverwriteStyles}
  ${themeOverwriteStyles}
`;

export const CreateRowLogo = ({ element }: { element: ELEMENT_TYPE }) => {
  const type = element._type;
  const container = document.createElement('div');
  const lock = document.createElement('div');
  const wrapper = document.createElement('div');

  container.classList.add(ROW_LOGO_CONTAINER);
  wrapper.classList.add(ROW_LOGO_CONTAINER_WRAPPER);
  lock.classList.add(ROW_LOGO_CONTAINER_LOCK);

  const makeThirdColumn = () => {
    const includeSocial = type === VARIABLES.VERSION_TYPE_SIMPLE;

    if (includeSocial) {
      const socialColumnWrapper = CreateSocialCampaignColumns({
        element,
      });
      wrapper.appendChild(socialColumnWrapper);
    } else {
      const ctaWrapper = CreateCallToActionContainer({ element });
      wrapper.appendChild(ctaWrapper);
    }
  };

  const logoElement = CreateLogoContainer({ element });
  const contactElement = CreateContactContainer({ element });
  wrapper.appendChild(logoElement);
  wrapper.appendChild(contactElement);

  makeThirdColumn();
  lock.appendChild(wrapper);
  container.appendChild(lock);
  return container;
};
