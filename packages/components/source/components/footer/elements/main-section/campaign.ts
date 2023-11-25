import { spacing } from '@universityofmaryland/umd-web-configuration';
import { CAMPAIGN_LOGO, CAMPAIGN_LOGO_DARK } from 'assets/logos';
import { ELEMENT_TYPE } from '../../component';
import { VARIABLES } from '../../globals';

export const CAMPAIGN_COLUMN_WRAPPER = 'campaign-column-wrapper';

export const CampaignStyles = `
  .${CAMPAIGN_COLUMN_WRAPPER} > a {
    display: block;
    margin-top: ${spacing.lg};
    max-width: 250px;
  }
`;

export const CreateCampaignRow = ({ element }: { element: ELEMENT_TYPE }) => {
  const theme = element._theme;
  const container = document.createElement('div');
  const link = document.createElement('a');
  link.href = 'https://fearlesslyforward.umd.edu';
  link.setAttribute('target', '_blank');
  link.setAttribute('rel', 'noopener noreferrer');
  link.setAttribute(
    'aria-label',
    'Link to the Fearlessly Forward Brand website',
  );

  link.innerHTML =
    theme === VARIABLES.THEME_OPTION_LIGHT ? CAMPAIGN_LOGO_DARK : CAMPAIGN_LOGO;

  container.classList.add(CAMPAIGN_COLUMN_WRAPPER);
  container.appendChild(link);

  return container;
};
