import { ElementBuilder } from '@universityofmaryland/web-builder-library';
import { layout, token } from '@universityofmaryland/web-styles-library';
import { createCompositeFooterSocial as createSocialCampaignColumns } from '../social';
import { createCompositeFooterLinkColumns as createLinkColumns } from './link-columns';
import { BREAKPOINTS } from '../../../globals';
import { RowLinksProps } from '../../../_types';
import { type UMDElement } from '../../../../../_types';

const { LARGE } = BREAKPOINTS;

const CreateRowLinksElement = (props: RowLinksProps): UMDElement => {
  const { isThemeLight } = props;
  const socialColumnWrapper = createSocialCampaignColumns(props);
  const linkColumnWrapper = createLinkColumns(props);

  const wrapperElement = new ElementBuilder()
    .withClassName('umd-footer-row-links-wrapper')
    .withStyles({
      element: {
        display: 'flex',

        [`@container (max-width: ${LARGE - 1}px)`]: {
          flexDirection: 'column-reverse',
          flexWrap: 'wrap',

          ['& .umd-footer-social-column_wrapper']: {
            display: 'none',
          },
        },
      },
    })
    .withChildren(linkColumnWrapper, socialColumnWrapper)
    .build();

  const lockElement = new ElementBuilder()
    .withClassName('umd-footer-row-links-lock')
    .withStyles({
      element: {
        ...layout.space.horizontal.larger,
      },
    })
    .withChild(wrapperElement)
    .build();

  return new ElementBuilder()
    .withClassName('umd-footer-row-links')
    .withStyles({
      element: {
        paddingBottom: token.spacing.lg,
        backgroundColor: token.color.black,

        ...(isThemeLight && {
          backgroundColor: token.color.gray.lightest,
        }),

        [`@container  (min-width: ${LARGE}px)`]: {
          paddingBottom: token.spacing['2xl'],
        },
      },
    })
    .withChild(lockElement)
    .build();
};

export const createCompositeFooterRowLinks = CreateRowLinksElement;
