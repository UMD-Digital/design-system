import { layout, token } from '@universityofmaryland/web-styles-library';
import { ElementModel } from 'model';
import createSocialCampaignColumns, {
  type SocialCampaignColumnsProps,
} from '../social';
import createLinkColumns, { type slotColumnsProps } from './link-columns';
import { BREAKPOINTS, VARIABLES, REFERENCES } from '../../../globals';
import { type ElementVisual } from '../../../../../_types';

const { LARGE } = BREAKPOINTS;
const { ELEMENT_NAME } = VARIABLES;
const { IS_THEME_LIGHT } = REFERENCES;

export interface RowLinksProps
  extends SocialCampaignColumnsProps,
    slotColumnsProps {}

export default (props: RowLinksProps): ElementVisual => {
  const socialColumnWrapper = createSocialCampaignColumns(props);
  const linkColumnWrapper = createLinkColumns(props);

  const wrapperElement = ElementModel.createDiv({
    className: 'umd-footer-row-links-wrapper',
    children: [linkColumnWrapper, socialColumnWrapper],
    elementStyles: {
      element: {
        display: 'flex',

        [`@container ${ELEMENT_NAME} (max-width: ${LARGE - 1}px)`]: {
          flexDirection: 'column-reverse',
          flexWrap: 'wrap',
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

        [`@container ${ELEMENT_NAME} (min-width: ${LARGE}px)`]: {
          paddingBottom: token.spacing['2xl'],
        },

        [`.umd-footer-element-wrapper${IS_THEME_LIGHT} &`]: {
          backgroundColor: token.color.gray.lightest,
        },

        [`@container ${ELEMENT_NAME} (max-width: ${LARGE - 1}px)`]: {
          [`.umd-footer-social-column_wrapper`]: {
            display: 'none',
          },
        },
        [`@container ${ELEMENT_NAME} (min-width: ${LARGE}px)`]: {
          [`.umd-footer-social-column_wrapper`]: {
            display: 'block !important',
          },
        },
      },
    },
  });
};
