import { token } from '@universityofmaryland/web-styles-library';
import { createRowLogo, RowLogoStyles, type RowLogoProps } from './row-logo';
import { createRowLinks, RowLinkStyles, type RowLinksProps } from './row-links';
import { CampaignStyles } from './campaign';
import { ELEMENTS, REFERENCES } from '../../globals';
import { BaseProps } from '../../_types';

const { ELEMENT_WRAPPER } = ELEMENTS;
const { IS_THEME_LIGHT, IS_VERSION_SIMPLE, IS_VERSION_VISUAL } = REFERENCES;

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

export interface MainSectionProps
  extends BaseProps,
    RowLinksProps,
    RowLogoProps {
  slotVisualImage: HTMLImageElement | null;
}

export const createMainSection = (props: MainSectionProps) => {
  const { isTypeMega, isTypeSimple, isTypeVisual, slotVisualImage } = props;
  const isShowVisualImage = isTypeVisual || isTypeSimple;
  const container = document.createElement('div');
  const logoRow = createRowLogo(props);

  container.classList.add(MAIN_CONTAINER);

  if (isShowVisualImage) {
    const visualContainer = document.createElement('div');
    const backgroundGraident = document.createElement('div');
    const backgroundImage = document.createElement('img');
    let altText = null;
    let imageSrc = null;

    if (slotVisualImage) {
      const source = slotVisualImage.getAttribute('src');
      const alt = slotVisualImage.getAttribute('alt');

      if (typeof source === 'string' && source.length > 0) {
        imageSrc = source;
      }

      if (typeof alt === 'string' && alt.length > 0) {
        altText = alt;
      }
    } else {
      if (isTypeVisual) {
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

  if (isTypeMega || isTypeVisual) {
    const linksRow = createRowLinks(props);
    container.appendChild(linksRow);
  }

  return container;
};
