import * as token from '@universityofmaryland/web-styles-library/token';
import {
  CAMPAIGN_LOGO,
  CAMPAIGN_LOGO_DARK,
} from '@universityofmaryland/web-icons-library/logos';
import { ElementModel } from 'model';
import { BaseProps } from '../../_types';
import { BREAKPOINTS } from '../../globals';
import { type ElementVisual } from '../../../../_types';

export interface CampaignProps extends BaseProps {}

const { LARGE } = BREAKPOINTS;

export default ({ isThemeLight }: CampaignProps): ElementVisual => {
  const link = document.createElement('a');
  link.href = 'https://fearlesslyforward.umd.edu';
  link.setAttribute('target', '_blank');
  link.setAttribute('rel', 'noopener noreferrer');
  link.setAttribute(
    'aria-label',
    'Link to the Fearlessly Forward Brand website',
  );

  link.innerHTML = (!isThemeLight && CAMPAIGN_LOGO) || CAMPAIGN_LOGO_DARK;

  const linkElement = ElementModel.create({
    element: link,
    className: 'campaign-column-link',
    elementStyles: {
      element: {
        display: 'block',
        marginTop: token.spacing.lg,
        maxWidth: '250px',
      },
    },
  });

  return ElementModel.createDiv({
    className: 'campaign-column-wrapper',
    children: [linkElement],
    elementStyles: {
      element: {
        [`@container (min-width: ${LARGE}px)`]: {
          display: 'flex',
          justifyContent: 'flex-end',
          marginLeft: 'auto',

          [`& .umd-footer-logo-container`]: {
            display: 'none',
          },
        },

        [`@container (max-width: ${LARGE - 1}px)`]: {
          [`& .umd-footer-social-column_wrapper &`]: {
            display: 'none',
          },
        },
      },
    },
  });
};
