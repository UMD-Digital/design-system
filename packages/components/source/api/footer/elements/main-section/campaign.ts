import { Tokens } from '@universityofmaryland/variables';
import { Utilities } from '@universityofmaryland/web-elements-library';
import { VARIABLES } from '../../globals';
import { UMDFooterElement } from '../../index';

const { Spacing } = Tokens;
const { Asset } = Utilities;

const { THEME_OPTION_LIGHT } = VARIABLES;

export const CAMPAIGN_COLUMN_WRAPPER = 'campaign-column-wrapper';

export const CampaignStyles = `
  .${CAMPAIGN_COLUMN_WRAPPER} > a {
    display: block;
    margin-top: ${Spacing.lg};
    max-width: 250px;
  }
`;

export const CreateCampaignRow = ({
  element,
}: {
  element: UMDFooterElement;
}) => {
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
    theme === THEME_OPTION_LIGHT
      ? Asset.logo.CAMPAIGN_LOGO_DARK
      : Asset.logo.CAMPAIGN_LOGO;

  container.classList.add(CAMPAIGN_COLUMN_WRAPPER);
  container.appendChild(link);

  return container;
};
