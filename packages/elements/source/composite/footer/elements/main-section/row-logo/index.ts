import { ElementBuilder } from '@universityofmaryland/web-builder-library';
import { token, layout } from '@universityofmaryland/web-styles-library';
import { createCompositeFooterSocial as createSocialCampaignColumns } from '../social';
import { createCompositeFooterCallToAction as createCallToActionContainer } from '../call-to-action';
import { createCompositeFooterContact as createContactContainer } from './contact';
import { createCompositeFooterLogo as createLogoContainer } from './logo';
import { BREAKPOINTS } from '../../../globals';
import { RowLogoProps } from '../../../_types';
import { type UMDElement } from '../../../../../_types';

const { MEDIUM, LARGE } = BREAKPOINTS;

const CreateRowLogoElement = (props: RowLogoProps): UMDElement => {
  const { isThemeLight, isTypeSimple } = props;

  const logoElement = createLogoContainer(props);
  const contactElement = createContactContainer(props);

  const thirdColumnElement =
    (isTypeSimple && createSocialCampaignColumns(props)) ||
    createCallToActionContainer(props);

  const wrapper = new ElementBuilder()
    .withClassName('umd-footer-row-logo-container-wrapper')
    .withStyles({
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
    })
    .withChildren(logoElement, contactElement, thirdColumnElement)
    .build();

  const lock = new ElementBuilder()
    .withClassName('umd-footer-row-logo-container-lock')
    .withStyles({
      element: {
        ...layout.space.horizontal.larger,
      },
    })
    .withChild(wrapper)
    .build();

  return new ElementBuilder()
    .withClassName('umd-footer-row-logo-container')
    .withStyles({
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
    })
    .withChild(lock)
    .build();
};

export const createCompositeFooterRowLogo = CreateRowLogoElement;
