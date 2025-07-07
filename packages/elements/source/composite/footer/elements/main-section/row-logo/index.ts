import { token, layout } from '@universityofmaryland/web-styles-library';
import * as Utils from 'utilities';
import createSocialCampaignColumns, {
  SocialContainerStyles,
  SOCIAL_COLUMN_WRAPPER,
  type SocialCampaignColumnsProps,
} from '../social';
import createCallToActionContainer, {
  CallToActionStyles,
  CALL_TO_ACTION_CONTAINER,
  type CallToActionProps,
} from '../call-to-action';
import createContactContainer, {
  ContactContainerStyles,
  type ContactProps,
} from './contact';
import createLogoContainer, { LogoContainerStyles } from './logo';
import { BREAKPOINTS, VARIABLES, ELEMENTS, REFERENCES } from '../../../globals';

const { MEDIUM, LARGE } = BREAKPOINTS;
const { ELEMENT_WRAPPER } = ELEMENTS;
const { ELEMENT_NAME } = VARIABLES;
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
    background-color: ${token.color.gray.lightest} !important;
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
    background-color: ${token.color.black};
  }

  @container ${ELEMENT_NAME} (max-width: ${LARGE - 1}px) {
    .${ROW_LOGO_CONTAINER} {
      padding-top: ${token.spacing['2xl']};
    }
  }

  @container ${ELEMENT_NAME} (min-width: ${MEDIUM}px) and (max-width: ${LARGE}px) {
    .${ROW_LOGO_CONTAINER_WRAPPER} {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: ${token.spacing.md};
    }
  }

  @container ${ELEMENT_NAME} (max-width: ${LARGE - 1}px) {
    .${ROW_LOGO_CONTAINER} {
      padding-bottom: ${token.spacing['md']} ;
    }
  }

  @container ${ELEMENT_NAME} (min-width: ${LARGE}px) {
    .${ROW_LOGO_CONTAINER_WRAPPER} {
      display: flex;
      padding: ${token.spacing['5xl']} 0 ${token.spacing['2xl']};
    }
  }

  ${Utils.theme.convertJSSObjectToStyles({
    styleObj: {
      [`.${ROW_LOGO_CONTAINER_LOCK}`]: layout.space.horizontal.max 
    },
  })}

  ${LogoContainerStyles}
  ${ContactContainerStyles}
  ${SocialContainerStyles}
  ${CallToActionStyles}
  ${ctaOverwriteStyles}
  ${themeOverwriteStyles}
`;

export interface RowLogoProps
  extends SocialCampaignColumnsProps,
    CallToActionProps,
    ContactProps {}

export default (props: RowLogoProps) => {
  const { isTypeSimple } = props;
  const container = document.createElement('div');
  const lock = document.createElement('div');
  const wrapper = document.createElement('div');

  container.classList.add(ROW_LOGO_CONTAINER);
  wrapper.classList.add(ROW_LOGO_CONTAINER_WRAPPER);
  lock.classList.add(ROW_LOGO_CONTAINER_LOCK);

  const makeThirdColumn = () => {
    if (isTypeSimple) {
      const socialColumnWrapper = createSocialCampaignColumns(props);
      wrapper.appendChild(socialColumnWrapper);
    } else {
      const ctaWrapper = createCallToActionContainer(props);
      wrapper.appendChild(ctaWrapper);
    }
  };

  const logoElement = createLogoContainer(props);
  const contactElement = createContactContainer(props);
  wrapper.appendChild(logoElement);
  wrapper.appendChild(contactElement);

  makeThirdColumn();
  lock.appendChild(wrapper);
  container.appendChild(lock);
  return container;
};
