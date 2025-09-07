import { token } from '@universityofmaryland/web-styles-library';
import * as utilities from 'utilities';
import { BaseProps } from '../../_types';

export const CAMPAIGN_COLUMN_WRAPPER = 'campaign-column-wrapper';

export const CampaignStyles = `
  .${CAMPAIGN_COLUMN_WRAPPER} > a {
    display: block;
    margin-top: ${token.spacing.lg};
    max-width: 250px;
  }
`;

export interface CampaignProps extends BaseProps {}

export const createCampaign = ({ isThemeLight }: CampaignProps) => {
  const container = document.createElement('div');
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

  container.classList.add(CAMPAIGN_COLUMN_WRAPPER);
  container.appendChild(link);

  return container;
};
