import { colors } from '@universityofmaryland/design-system-configuration/dist/configuration/tokens/colors.js';
import { CreateRowLogo, RowLogoStyles } from './row-logo';
import { CreateRowLinks, RowLinkStyles } from './row-links';
import { CampaignStyles } from './campaign';
import {
  ELEMENT_WRAPPER,
  VERSION_TYPE_VISUAL,
  THEME_OPTION_LIGHT,
  VERSION_TYPE_MEGA,
} from '../../variables';

const SLOT_BACKGROUND_IMAGE_NAME = 'background-image';
const MAIN_CONTAINER = 'umd-footer-main-container';
const BACKGROUND_IMAGE_CONTAINER = 'umd-footer-background-image-container';
const BACKGROUND_IMAGE_GRADIENT = 'umd-footer-background-image-graident';

const VariationVisualStyles = `
  .${ELEMENT_WRAPPER}[type="${VERSION_TYPE_VISUAL}"] .${BACKGROUND_IMAGE_CONTAINER}  {
    padding-top: 100px;
  }

  .${BACKGROUND_IMAGE_CONTAINER} {
    position: relative;
  }
  
  .${BACKGROUND_IMAGE_GRADIENT} {
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    width: 500vw;
    height: 100px;
    background: linear-gradient( 180deg, rgba(255, 255, 255, 1) 0%, #e4edf9 100% );
  }

  .${BACKGROUND_IMAGE_CONTAINER} img {
    width: 100% !important;
    object-fit: cover !important;
    display: block !important;
    object-position: center;
  }
`;

export const MainContainerStyles = `
  .${ELEMENT_WRAPPER} p,
  .${ELEMENT_WRAPPER} a {
    color: ${colors.white};
  }

  .${ELEMENT_WRAPPER} a {
    background-image: linear-gradient(${colors.white}, ${colors.white});
    background-position: 0 100%;
    background-repeat: no-repeat;
    background-size: 0 1px;
    display: inline-block;
    position: relative;
    transition: background-size 0.4s;
  }

  .${ELEMENT_WRAPPER}[theme="${THEME_OPTION_LIGHT}"] p, 
  .${ELEMENT_WRAPPER}[theme="${THEME_OPTION_LIGHT}"] a {
    color: ${colors.gray.darker}
  }

  ${RowLogoStyles}
  ${RowLinkStyles}
  ${CampaignStyles}
  ${VariationVisualStyles}
`;

export const CreateMain = ({
  type,
  theme,
  element,
}: {
  type: string;
  theme: string;
  element: HTMLElement;
}) => {
  const container = document.createElement('div');
  const logoRow = CreateRowLogo({ theme, type, element });

  container.classList.add(MAIN_CONTAINER);

  if (type === VERSION_TYPE_VISUAL) {
    const slottedDate = element.querySelector(
      `[slot="${SLOT_BACKGROUND_IMAGE_NAME}"]`,
    ) as HTMLImageElement;
    const visualContainer = document.createElement('div');
    const backgroundGraident = document.createElement('div');
    const backgroundImage = document.createElement('img');
    let altText = 'The University of Maryland Campus';
    let imageSrc = require('../../assets/visual-default.jpg').default;

    if (slottedDate) {
      const source = slottedDate.getAttribute('src');
      const alt = slottedDate.getAttribute('alt');

      if (typeof source === 'string' && source.length > 0) {
        imageSrc = source;
      }

      if (typeof alt === 'string' && alt.length > 0) {
        altText = alt;
      }
    }

    visualContainer.classList.add(BACKGROUND_IMAGE_CONTAINER);
    backgroundImage.setAttribute('src', imageSrc);
    backgroundImage.setAttribute('alt', `${altText}`);

    backgroundGraident.classList.add(BACKGROUND_IMAGE_GRADIENT);

    visualContainer.appendChild(backgroundGraident);
    visualContainer.appendChild(backgroundImage);

    container.appendChild(visualContainer);
  }

  container.appendChild(logoRow);

  if (type === VERSION_TYPE_MEGA || type === VERSION_TYPE_VISUAL) {
    const linksRow = CreateRowLinks({ element, theme });
    container.appendChild(linksRow);
  }

  return container;
};
