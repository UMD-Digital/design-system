import { layout, token } from '@universityofmaryland/web-styles-library';
import { ElementBuilder } from '@universityofmaryland/web-builder-library';
import createSocialCampaignColumns, {
  type SocialCampaignColumnsProps,
} from '../social';
import createLinkColumns, { type slotColumnsProps } from './link-columns';
import { BREAKPOINTS } from '../../../globals';
import { BaseProps } from '../../../_types';
import { type UMDElement } from '../../../../../_types';

const { LARGE } = BREAKPOINTS;

export interface RowLinksProps
  extends SocialCampaignColumnsProps,
    BaseProps,
    slotColumnsProps {}

export default (props: RowLinksProps): UMDElement => {
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
