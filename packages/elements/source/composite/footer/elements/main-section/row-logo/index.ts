import { token, layout } from '@universityofmaryland/web-styles-library';
import { ElementModel } from 'model';
import * as Utils from 'utilities';
import createSocialCampaignColumns, {
  // SocialContainerStyles,
  SOCIAL_COLUMN_WRAPPER,
  type SocialCampaignColumnsProps,
} from '../social';
import createCallToActionContainer, {
  // CallToActionStyles,
  // CALL_TO_ACTION_CONTAINER,
  type CallToActionProps,
} from '../call-to-action';
import createContactContainer, {
  // ContactContainerStyles,
  type ContactProps,
} from './contact';
// import createLogoContainer, { LogoContainerStyles } from './logo';
import createLogoContainer from './logo';
import { BREAKPOINTS, VARIABLES, REFERENCES } from '../../../globals';
import { type ElementVisual } from '../../../../../_types';

const { MEDIUM, LARGE } = BREAKPOINTS;
const { ELEMENT_NAME } = VARIABLES;
const { IS_THEME_LIGHT, IS_VERSION_SIMPLE } = REFERENCES;

// const ROW_LOGO_CONTAINER_WRAPPER = 'umd-footer-row-logo-container-wrapper';

// const ctaOverwriteStyles = `
//   @container ${ELEMENT_NAME} (max-width: ${LARGE - 1}px) {
//     .${ROW_LOGO_CONTAINER_WRAPPER} > .umd-footer-call-to-action-container {
//       display: none;
//     }
//   }
// `;

// prettier-ignore
const themeOverwriteStyles = `
  .umd-footer-element-wrapper${IS_THEME_LIGHT} .umd-footer-row-logo-container {
    background-color: ${token.color.gray.lightest} !important;
  }

  @container ${ELEMENT_NAME} (max-width: ${LARGE - 1}px) {
    .umd-footer-element-wrapper${IS_VERSION_SIMPLE} .umd-footer-row-logo-container .${SOCIAL_COLUMN_WRAPPER} {
      display: none;
    }
  }
`;

// prettier-ignore
export const RowLogoStyles = `
  .umd-footer-row-logo-container {
    background-color: ${token.color.black};
  }

  @container ${ELEMENT_NAME} (max-width: ${LARGE - 1}px) {
    .umd-footer-row-logo-container {
      padding-top: ${token.spacing['2xl']};
    }
  }

  @container ${ELEMENT_NAME} (min-width: ${MEDIUM}px) and (max-width: ${LARGE}px) {
    .umd-footer-row-logo-container-wrapper {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: ${token.spacing.md};
    }
  }

  @container ${ELEMENT_NAME} (max-width: ${LARGE - 1}px) {
    .umd-footer-row-logo-container {
      padding-bottom: ${token.spacing['md']} ;
    }
  }

  @container ${ELEMENT_NAME} (min-width: ${LARGE}px) {
    .umd-footer-row-logo-container-wrapper {
      display: flex;
      padding: ${token.spacing['5xl']} 0 ${token.spacing['2xl']};
    }
  }

  ${Utils.theme.convertJSSObjectToStyles({
    styleObj: {
      [`.umd-footer-row-logo-container-lock`]: layout.space.horizontal.larger 
    },
  })}

  ${themeOverwriteStyles}
`;

//   ${ctaOverwriteStyles}
// ${ContactContainerStyles}
//  ${SocialContainerStyles}
// ${CallToActionStyles}
// ${LogoContainerStyles}

export interface RowLogoProps
  extends SocialCampaignColumnsProps,
    CallToActionProps,
    ContactProps {}

export default (props: RowLogoProps): ElementVisual => {
  const { isTypeSimple } = props;

  const logoElement = createLogoContainer(props);
  const contactElement = createContactContainer(props);

  const thirdColumnElement = isTypeSimple
    ? createSocialCampaignColumns(props)
    : createCallToActionContainer(props);

  const wrapper = ElementModel.createDiv({
    className: 'umd-footer-row-logo-container-wrapper',
    children: [logoElement, contactElement, thirdColumnElement],
    elementStyles: {
      element: {
        // Large screens
        [`@container ${ELEMENT_NAME} (min-width: ${LARGE}px)`]: {
          [`&`]: {
            display: 'flex',
            padding: `${token.spacing['5xl']} 0 ${token.spacing['2xl']}`,
          },
        },

        // Between MEDIUM and LARGE
        [`@container ${ELEMENT_NAME} (min-width: ${MEDIUM}px) and (max-width: ${LARGE}px)`]:
          {
            [`&`]: {
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: token.spacing.md,
            },
          },
      },
    },
  });

  const lock = ElementModel.createDiv({
    className: 'umd-footer-row-logo-container-lock',
    children: [wrapper],
    elementStyles: {
      element: {
        ...layout.space.horizontal.larger,
      },
    },
  });

  const rowLogoContainer = ElementModel.createDiv({
    className: 'umd-footer-row-logo-container',
    children: [lock],
    elementStyles: {
      element: {
        backgroundColor: token.color.black,
      },
    },
  });

  return rowLogoContainer;
};
