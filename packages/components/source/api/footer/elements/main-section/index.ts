import { token } from '@universityofmaryland/web-styles-library';
import { CreateRowLogo, RowLogoStyles } from './row-logo';
import { CreateRowLinks, RowLinkStyles } from './row-links';
import { CampaignStyles } from './campaign';
import { ELEMENTS, VARIABLES, REFERENCES } from '../../globals';
import { UMDFooterElement } from '../../index';

const { ELEMENT_WRAPPER } = ELEMENTS;
const { VERSION_TYPE_MEGA, VERSION_TYPE_VISUAL, VERSION_TYPE_SIMPLE } =
  VARIABLES;
const { IS_THEME_LIGHT, IS_VERSION_SIMPLE, IS_VERSION_VISUAL } = REFERENCES;

const SLOT_BACKGROUND_IMAGE_NAME = 'background-image';
const MAIN_CONTAINER = 'umd-footer-main-container';
const BACKGROUND_IMAGE_CONTAINER = 'umd-footer-background-image-container';
const BACKGROUND_IMAGE_GRADIENT = 'umd-footer-background-image-graident';

const VariationVisualStyles = `
  .${ELEMENT_WRAPPER}${IS_VERSION_VISUAL} .${BACKGROUND_IMAGE_CONTAINER},
  .${ELEMENT_WRAPPER}${IS_VERSION_SIMPLE} .${BACKGROUND_IMAGE_CONTAINER} {
    padding-top: 100px;
  }

  .${BACKGROUND_IMAGE_CONTAINER} {
    position: relative;
  }

  .${BACKGROUND_IMAGE_GRADIENT} {
    display: block;
    position: absolute;
    left: 0;
    top: 2px;
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
  .${ELEMENT_WRAPPER} a,
  .${ELEMENT_WRAPPER} span {
    color: ${token.color.white};
  }

  .${ELEMENT_WRAPPER}${IS_THEME_LIGHT} p,
  .${ELEMENT_WRAPPER}${IS_THEME_LIGHT} span,
  .${ELEMENT_WRAPPER}${IS_THEME_LIGHT} a {
    color: ${token.color.gray.dark}
  }

  ${RowLogoStyles}
  ${RowLinkStyles}
  ${CampaignStyles}
  ${VariationVisualStyles}
`;

export const CreateMain = ({ element }: { element: UMDFooterElement }) => {
  const type = element._type;
  const container = document.createElement('div');
  const logoRow = CreateRowLogo({ element });

  container.classList.add(MAIN_CONTAINER);

  if (type === VERSION_TYPE_VISUAL || type === VERSION_TYPE_SIMPLE) {
    const slottedDate = element.querySelector(
      `[slot="${SLOT_BACKGROUND_IMAGE_NAME}"]`,
    ) as HTMLImageElement;
    const visualContainer = document.createElement('div');
    const backgroundGraident = document.createElement('div');
    const backgroundImage = document.createElement('img');
    let altText = null;
    let imageSrc = null;

    if (slottedDate) {
      const source = slottedDate.getAttribute('src');
      const alt = slottedDate.getAttribute('alt');

      if (typeof source === 'string' && source.length > 0) {
        imageSrc = source;
      }

      if (typeof alt === 'string' && alt.length > 0) {
        altText = alt;
      }
    } else {
      if (type === VERSION_TYPE_VISUAL) {
        altText = 'The University of Maryland Campus';
        imageSrc = require('../../assets/visual-default.jpg').default;
      }
    }

    if (imageSrc && altText) {
      visualContainer.classList.add(BACKGROUND_IMAGE_CONTAINER);
      backgroundImage.setAttribute('src', imageSrc);
      backgroundImage.setAttribute('alt', `${altText}`);

      backgroundGraident.classList.add(BACKGROUND_IMAGE_GRADIENT);

      visualContainer.appendChild(backgroundGraident);
      visualContainer.appendChild(backgroundImage);

      container.appendChild(visualContainer);
    }
  }

  container.appendChild(logoRow);

  if (type === VERSION_TYPE_MEGA || type === VERSION_TYPE_VISUAL) {
    const linksRow = CreateRowLinks({ element });
    container.appendChild(linksRow);
  }

  return container;
};
