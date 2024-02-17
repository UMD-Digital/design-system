import { Tokens } from '@universityofmaryland/variables';
import { ELEMENT_TYPE } from 'components/footer/component';
import { VARIABLES, ELEMENTS } from 'components/footer/globals';
import { CreateRowLogo, RowLogoStyles } from './row-logo';
import { CreateRowLinks, RowLinkStyles } from './row-links';
import { CampaignStyles } from './campaign';

const { colors } = Tokens;

const SLOT_BACKGROUND_IMAGE_NAME = 'background-image';
const MAIN_CONTAINER = 'umd-footer-main-container';
const BACKGROUND_IMAGE_CONTAINER = 'umd-footer-background-image-container';
const BACKGROUND_IMAGE_GRADIENT = 'umd-footer-background-image-graident';

const VariationVisualStyles = `
  .${ELEMENTS.ELEMENT_WRAPPER}[type="${VARIABLES.VERSION_TYPE_VISUAL}"] .${BACKGROUND_IMAGE_CONTAINER}  {
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
  .${ELEMENTS.ELEMENT_WRAPPER} p,
  .${ELEMENTS.ELEMENT_WRAPPER} a,
  .${ELEMENTS.ELEMENT_WRAPPER} span {
    color: ${colors.white};
  }

  .${ELEMENTS.ELEMENT_WRAPPER}[theme="${VARIABLES.THEME_OPTION_LIGHT}"] p,
  .${ELEMENTS.ELEMENT_WRAPPER}[theme="${VARIABLES.THEME_OPTION_LIGHT}"] span,
  .${ELEMENTS.ELEMENT_WRAPPER}[theme="${VARIABLES.THEME_OPTION_LIGHT}"] a {
    color: ${colors.gray.darker}
  }

  ${RowLogoStyles}
  ${RowLinkStyles}
  ${CampaignStyles}
  ${VariationVisualStyles}
`;

export const CreateMain = ({ element }: { element: ELEMENT_TYPE }) => {
  const type = element._type;
  const container = document.createElement('div');
  const logoRow = CreateRowLogo({ element });

  container.classList.add(MAIN_CONTAINER);

  if (type === VARIABLES.VERSION_TYPE_VISUAL) {
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

  if (
    type === VARIABLES.VERSION_TYPE_MEGA ||
    type === VARIABLES.VERSION_TYPE_VISUAL
  ) {
    const linksRow = CreateRowLinks({ element });
    container.appendChild(linksRow);
  }

  return container;
};
