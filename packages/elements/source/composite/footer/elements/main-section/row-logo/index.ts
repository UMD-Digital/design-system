import { token, layout } from '@universityofmaryland/web-styles-library';
import { ElementModel } from 'model';
import createSocialCampaignColumns, {
  type SocialCampaignColumnsProps,
} from '../social';
import createCallToActionContainer, {
  type CallToActionProps,
} from '../call-to-action';
import createContactContainer, { type ContactProps } from './contact';
import createLogoContainer, { LogoProps } from './logo';
import { BREAKPOINTS } from '../../../globals';
import { type ElementVisual } from '../../../../../_types';
import { BaseProps } from 'composite/footer/_types';

const { MEDIUM, LARGE } = BREAKPOINTS;

export interface RowLogoProps
  extends SocialCampaignColumnsProps,
    BaseProps,
    LogoProps,
    CallToActionProps,
    ContactProps {}

export default (props: RowLogoProps): ElementVisual => {
  const { isThemeLight, isTypeSimple } = props;

  const logoElement = createLogoContainer(props);
  const contactElement = createContactContainer(props);

  const thirdColumnElement =
    (isTypeSimple && createSocialCampaignColumns(props)) ||
    createCallToActionContainer(props);

  const wrapper = ElementModel.createDiv({
    className: 'umd-footer-row-logo-container-wrapper',
    children: [logoElement, contactElement, thirdColumnElement],
    elementStyles: {
      element: {
        [`@container (min-width: ${LARGE}px)`]: {
          display: 'flex',
          padding: `${token.spacing['5xl']} 0 ${token.spacing['2xl']}`,
        },

        [`@container (max-width: ${LARGE - 1}px)`]: {
          ['& > .umd-footer-call-to-action-container']: {
            display: 'none',
          },
        },

        [`@container (min-width: ${MEDIUM}px) and (max-width: ${LARGE}px)`]: {
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: token.spacing.md,
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
        backgroundColor:
          (!isThemeLight && token.color.black) || token.color.gray.lightest,

        [`@container (max-width: ${LARGE - 1}px)`]: {
          paddingTop: token.spacing['2xl'],
          paddingBottom: token.spacing['md'],

          ...(isTypeSimple && {
            [`& .umd-footer-element-wrapper`]: {
              display: 'none',
            },
          }),
        },
      },
    },
  });

  return rowLogoContainer;
};
