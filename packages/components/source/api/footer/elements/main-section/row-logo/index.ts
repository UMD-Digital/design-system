import { Tokens, Layout } from '@universityofmaryland/variables';
import { Styles } from 'utilities';
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
import { BREAKPOINTS, VARIABLES, ELEMENTS, REFERENCES } from '../../../globals';
import { UMDFooterElement } from '../../../index';

const { Colors, Spacing } = Tokens;
const { LockMax } = Layout;

const { ConvertJSSObjectToStyles } = Styles;

const { MEDIUM, LARGE } = BREAKPOINTS;
const { ELEMENT_WRAPPER } = ELEMENTS;
const { ELEMENT_NAME, VERSION_TYPE_SIMPLE } = VARIABLES;
const { IS_THEME_LIGHT, IS_VERSION_SIMPLE } = REFERENCES;

const ROW_LOGO_CONTAINER = 'umd-footer-row-logo-container';
const ROW_LOGO_CONTAINER_WRAPPER = 'umd-footer-row-logo-container-wrapper';
const ROW_LOGO_CONTAINER_LOCK = 'umd-footer-row-logo-container-lock';

const ctaOverwriteStyles = `
  @container ${ELEMENT_NAME} (max-width: ${LARGE - 1}px) {
    .${ROW_LOGO_CONTAINER_WRAPPER} > .${CALL_TO_ACTION_CONTAINER} {
      display: none;
    }
  }
`;

// prettier-ignore
const themeOverwriteStyles = `
  .${ELEMENT_WRAPPER}${IS_THEME_LIGHT} .${ROW_LOGO_CONTAINER} {
    background-color: ${Colors.gray.lightest} !important;
  }

  @container ${ELEMENT_NAME} (max-width: ${LARGE - 1}px) {
    .${ELEMENT_WRAPPER}${IS_VERSION_SIMPLE} .${ROW_LOGO_CONTAINER} .${SOCIAL_COLUMN_WRAPPER} {
      display: none;
    }
  }
`;

// prettier-ignore
export const RowLogoStyles = `
  .${ROW_LOGO_CONTAINER} {
    background-color: ${Colors.black};
  }

  @container ${ELEMENT_NAME} (max-width: ${LARGE - 1}px) {
    .${ROW_LOGO_CONTAINER} {
      padding-top: ${Spacing['2xl']};
    }
  }

  @container ${ELEMENT_NAME} (min-width: ${MEDIUM}px) and (max-width: ${LARGE}px) {
    .${ROW_LOGO_CONTAINER_WRAPPER} {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: ${Spacing.md};
    }
  }

  @container ${ELEMENT_NAME} (max-width: ${LARGE - 1}px) {
    .${ROW_LOGO_CONTAINER} {
      padding-bottom: ${Spacing['md']} ;
    }
  }

  @container ${ELEMENT_NAME} (min-width: ${LARGE}px) {
    .${ROW_LOGO_CONTAINER_WRAPPER} {
      display: flex;
      padding: ${Spacing['5xl']} 0 ${Spacing['2xl']};
    }
  }

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${ROW_LOGO_CONTAINER_LOCK}`]: LockMax 
    },
  })}

  ${LogoContainerStyles}
  ${ContactContainerStyles}
  ${SocialContainerStyles}
  ${CallToActionStyles}
  ${ctaOverwriteStyles}
  ${themeOverwriteStyles}
`;

export const CreateRowLogo = ({ element }: { element: UMDFooterElement }) => {
  const type = element._type;
  const container = document.createElement('div');
  const lock = document.createElement('div');
  const wrapper = document.createElement('div');

  container.classList.add(ROW_LOGO_CONTAINER);
  wrapper.classList.add(ROW_LOGO_CONTAINER_WRAPPER);
  lock.classList.add(ROW_LOGO_CONTAINER_LOCK);

  const makeThirdColumn = () => {
    const includeSocial = type === VERSION_TYPE_SIMPLE;

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
