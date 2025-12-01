import { ElementBuilder } from '@universityofmaryland/web-builder-library';
import * as token from '@universityofmaryland/web-token-library';
import { imageFromSvg } from '@universityofmaryland/web-utilities-library/media';
import * as Logos from '@universityofmaryland/web-icons-library/logos';
import { CampaignProps } from '../../_types';
import { BREAKPOINTS } from '../../globals';
import { type UMDElement } from '../../../../_types';

const { LARGE } = BREAKPOINTS;

const createFearlesslyForwardCampaign = (
  props: Pick<CampaignProps, 'isThemeLight'>,
) => {
  const { isThemeLight } = props;
  const SVG = (!isThemeLight && Logos.campaign.light) || Logos.campaign.dark;
  const img = imageFromSvg({ SVG });
  const link = document.createElement('a');

  img.alt = 'University of Maryland Fearlessly Forward Campaign Logo';

  link.href = 'https://fearlesslyforward.umd.edu';
  link.setAttribute('target', '_blank');
  link.setAttribute('rel', 'noopener noreferrer');
  link.setAttribute(
    'aria-label',
    'Link to the Fearlessly Forward Brand website',
  );

  link.appendChild(img);

  return link;
};

const createForwardCampaign = (props: Pick<CampaignProps, 'isThemeLight'>) => {
  const { isThemeLight } = props;

  const SVG = (!isThemeLight && Logos.forward.light) || Logos.forward.dark;
  const img = imageFromSvg({ SVG });
  const link = document.createElement('a');

  img.alt = `University of Maryland's Forward Campaign Logo`;

  link.href = 'https://forward.umd.edu';
  link.setAttribute('target', '_blank');
  link.setAttribute('rel', 'noopener noreferrer');
  link.setAttribute('aria-label', 'Link to the Forward Brand website');

  link.appendChild(img);

  return link;
};

export default (
  props: Pick<CampaignProps, 'isThemeLight' | 'isCampaignForward'>,
): UMDElement => {
  const { isCampaignForward } = props;

  const link = isCampaignForward
    ? createForwardCampaign(props)
    : createFearlesslyForwardCampaign(props);

  const linkElement = new ElementBuilder(link)
    .withClassName('campaign-column-link')
    .withStyles({
      element: {
        display: 'block',
        marginTop: token.spacing.lg,
        maxWidth: '250px',
      },
    })
    .build();

  return new ElementBuilder()
    .withClassName('campaign-column-wrapper')
    .withStyles({
      element: {
        [`& img`]: {
          maxWidth: '144px',
          width: '100%',
        },

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
    })
    .withChild(linkElement)
    .build();
};
