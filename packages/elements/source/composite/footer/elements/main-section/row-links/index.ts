import { layout, token } from '@universityofmaryland/web-styles-library';
import { ElementModel } from 'model';
import createSocialCampaignColumns, {
  type SocialCampaignColumnsProps,
} from '../social';
import createLinkColumns, { type slotColumnsProps } from './link-columns';
import { BREAKPOINTS } from '../../../globals';
import { BaseProps } from '../../../_types';
import { type ElementVisual } from '../../../../../_types';

const { LARGE } = BREAKPOINTS;

export interface RowLinksProps
  extends SocialCampaignColumnsProps,
    BaseProps,
    slotColumnsProps {}

export default (props: RowLinksProps): ElementVisual => {
  const { isThemeLight } = props;
  const socialColumnWrapper = createSocialCampaignColumns(props);
  const linkColumnWrapper = createLinkColumns(props);
  const wrapperElement = ElementModel.createDiv({
    className: 'umd-footer-row-links-wrapper',
    children: [linkColumnWrapper, socialColumnWrapper],
    elementStyles: {
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
    },
  });
  const lockElement = ElementModel.createDiv({
    className: 'umd-footer-row-links-lock',
    children: [wrapperElement],
    elementStyles: {
      element: {
        ...layout.space.horizontal.larger,
      },
    },
  });

  return ElementModel.createDiv({
    className: 'umd-footer-row-links',
    children: [lockElement],
    elementStyles: {
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
    },
  });
};
