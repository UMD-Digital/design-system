import * as token from '@universityofmaryland/web-styles-library/token';
import * as Logos from '@universityofmaryland/web-icons-library/logos';
import { imageFromSvg } from '@universityofmaryland/web-utilities-library/media';
import { ElementModel } from 'model';
import { BaseProps } from '../../_types';
import { BREAKPOINTS } from '../../globals';
import { type ElementVisual } from '../../../../_types';

export interface CampaignProps
  extends Pick<BaseProps, 'isThemeLight' | 'isCampaignForward'> {}

const { LARGE } = BREAKPOINTS;

const createFearlesslyForwardCampaign = (isThemeLight: boolean) => {
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

const createForwardCampaign = (isThemeLight: boolean) => {
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

export default ({
  isThemeLight,
  isCampaignForward,
}: CampaignProps): ElementVisual => {
  const link = isCampaignForward
    ? createForwardCampaign(!!isThemeLight)
    : createFearlesslyForwardCampaign(!!isThemeLight);

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
    },
  });
};
