import { token } from '@universityofmaryland/web-styles-library';
import { ElementModel } from 'model';
import * as utilities from 'utilities';
import { BaseProps } from '../../_types';
import { type ElementVisual } from '../../../../_types';

export const CAMPAIGN_COLUMN_WRAPPER = 'campaign-column-wrapper';
const CAMPAIGN_LINK = 'campaign-column-link';

export interface CampaignProps extends BaseProps {}

export default ({ isThemeLight }: CampaignProps): ElementVisual => {
  const link = document.createElement('a');
  link.href = 'https://fearlesslyforward.umd.edu';
  link.setAttribute('target', '_blank');
  link.setAttribute('rel', 'noopener noreferrer');
  link.setAttribute(
    'aria-label',
    'Link to the Fearlessly Forward Brand website',
  );

  link.innerHTML = !isThemeLight
    ? utilities.asset.logo.CAMPAIGN_LOGO
    : utilities.asset.logo.CAMPAIGN_LOGO_DARK;

  const linkElement = ElementModel.create({
    element: link,
    className: CAMPAIGN_LINK,
    elementStyles: {
      element: {
        display: 'block',
        marginTop: token.spacing.lg,
        maxWidth: '250px',

        [`& svg`]: {
          width: '100%',
          height: 'auto',
        },
      },
    },
  });

  return ElementModel.createDiv({
    className: CAMPAIGN_COLUMN_WRAPPER,
    children: [linkElement],
  });
};
