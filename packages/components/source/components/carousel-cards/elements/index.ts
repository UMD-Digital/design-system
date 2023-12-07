import {
  colors,
  spacing,
  umdLock,
} from '@universityofmaryland/umd-web-configuration';
import { ConvertJSSObjectToStyles, Reset } from 'helpers/styles';
import { ELEMENT_TYPE } from 'components/carousel-cards/component';
import { BREAKPOINTS, SLOTS } from 'components/carousel-cards/globals';
import {
  EventResizeCarouselElementsWidth,
  EventResizeSetHeight,
} from 'components/carousel-cards/services/events';
import { CreateIntroColumn, IntroContainerStyles } from './intro';
import { CreateCarouselColumn, CarouselContainerStyles } from './carousel';

export const ELEMENT_NAME = 'umd-element-carousel-cards';

const BACKGROUND_TEXTURE = `<svg aria-hidden="true" width="1599" height="618" viewBox="0 0 1599 618" fill="none" xmlns="http://www.w3.org/2000/svg"
"><mask id="mask0_2135_11278" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="1600" height="618"><rect width="1600" height="618" fill="#242424"></rect></mask><g mask="url(#mask0_2135_11278)"><g opacity="0.5"><mask id="mask1_2135_11278" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="-17" y="-56" width="1823" height="408"><path d="M-17 351.98V-56H1806V351.98" fill="white"></path></mask><g mask="url(#mask1_2135_11278)"><path d="M807.562 -68.3515L-433.759 1173.58L-217.501 1389.94L1023.82 148.012L807.562 -68.3515Z" fill="#262626"></path><path d="M360.649 -82.8017L-880.672 1159.13L-649.997 1389.92L591.324 147.986L360.649 -82.8017Z" fill="black"></path><path d="M1154.8 1173.26L-533.139 -515.499L-677.311 -371.256L1010.63 1317.51L1154.8 1173.26Z" fill="#262626"></path><path d="M2162.77 710.525L1312.18 -140.478L1168.01 3.76505L2018.6 854.768L2162.77 710.525Z" fill="black"></path><path d="M1312.16 -140.485L202.096 -1251.09L57.9241 -1106.85L1167.99 3.75794L1312.16 -140.485Z" fill="#EDEDED"></path><path d="M2133.89 -1251.07L1023.83 -140.458L1168 3.78455L2278.07 -1106.83L2133.89 -1251.07Z" fill="#383838"></path><path d="M591.343 147.968L-634.061 -1078.04L-864.736 -847.248L360.668 378.756L591.343 147.968Z" fill="black"></path><path d="M1023.82 147.97L-217.503 -1093.96L-433.761 -877.595L807.559 364.333L1023.82 147.97Z" fill="#383838"></path></g><mask id="mask2_2135_11278" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="-17" y="351" width="1823" height="780"><path d="M-17 351.938V753.629L837.67 753.672L845.662 1130.18L1806 1130.26V352.094" fill="white"></path></mask><g mask="url(#mask2_2135_11278)"><path d="M1023.81 555.952L-217.506 -685.977L-433.764 -469.613L807.557 772.316L1023.81 555.952Z" fill="#262626"></path><path d="M591.347 555.967L-649.973 -685.962L-880.648 -455.174L360.672 786.755L591.347 555.967Z" fill="black"></path><path d="M1010.63 -613.543L-677.305 1075.22L-533.133 1219.46L1154.8 -469.3L1010.63 -613.543Z" fill="#262626"></path><path d="M1760.63 110.929L910.039 961.932L1054.21 1106.17L1904.8 255.172L1760.63 110.929Z" fill="black"></path><path d="M360.674 325.168L-864.73 1551.17L-634.055 1781.96L591.349 555.956L360.674 325.168Z" fill="black"></path><path d="M807.565 339.631L-433.756 1581.56L-217.498 1797.92L1023.82 555.995L807.565 339.631Z" fill="#383838"></path></g></g></g></svg>`;

const CAROUSEL_CONTAINER = 'umd-element-carousel-container';
const CAROUSEL_LOCK = 'umd-element-carousel-lock';

// prettier-ignore
const containerStyles = `
  .${CAROUSEL_CONTAINER} {
    background-color: ${colors.black};
    padding: ${spacing.md} 0;
    position: relative;
    overflow: hidden;
  }
  
  @container umd-carousel-card (max-width: 300px) {
    .${CAROUSEL_CONTAINER} {
      display: none;
    }
  }
  
  @container umd-carousel-card (min-width: ${BREAKPOINTS.medium}px) {
    .${CAROUSEL_CONTAINER} {
      padding: ${spacing['4xl']} 0;
    }
  }
  
  @container umd-carousel-card (min-width: ${BREAKPOINTS.large}px) {
    .${CAROUSEL_CONTAINER} {
      padding: ${spacing['max']} 0;
    }
  }
  
  .${CAROUSEL_CONTAINER} > svg {
    width: auto;
    height: 100%;
    object-fit: cover;
    position: absolute;
    top: 0;
  }
  
  .${CAROUSEL_CONTAINER} ::slotted(*) {
    color: ${colors.white};
  }
`

// prettier-ignore
const containerLockStyles = `
  .${CAROUSEL_LOCK} {
    position: relative;
    ${ConvertJSSObjectToStyles({
      styleObj: umdLock['.umd-lock'],
    })}
  }
  
  @media (min-width: ${BREAKPOINTS.large}px) {
    .${CAROUSEL_LOCK} {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
  
  @media umd-carousel-card (max-width: ${BREAKPOINTS.large - 1}px) {
    .${CAROUSEL_LOCK} {
      max-width: inherit;
      padding: 0;
    }
  }
`;

// prettier-ignore
export const ComponentStyles = `
  :host {
    display: block;
    background-color: ${colors.black};
    container: umd-carousel-card / inline-size; 
  }

  ${Reset}
  ${containerStyles}
  ${containerLockStyles}
  ${IntroContainerStyles}
  ${CarouselContainerStyles}
`;

export const OnLoadStyles = ({ element }: { element: ELEMENT_TYPE }) => {
  const cardsSlot = element.querySelector(
    `[slot="${SLOTS.CARDS}"]`,
  ) as HTMLSlotElement;
  const slotContent = Array.from(cardsSlot.children) as HTMLElement[];

  EventResizeCarouselElementsWidth({ element });
  EventResizeSetHeight({ element });

  cardsSlot.style.display = `flex`;
  cardsSlot.style.justifyContent = `space-between`;
  slotContent.forEach((card, index) => {
    if (index > 1) card.style.display = 'none';
  });
};

export const CreateShadowDom = ({ element }: { element: ELEMENT_TYPE }) => {
  const container = document.createElement('div');
  const wrapper = document.createElement('div');
  const intro = CreateIntroColumn({ element });
  const carousel = CreateCarouselColumn({ element });

  container.classList.add(CAROUSEL_CONTAINER);
  wrapper.classList.add(CAROUSEL_LOCK);

  wrapper.appendChild(intro);
  wrapper.appendChild(carousel);

  container.innerHTML = BACKGROUND_TEXTURE;
  container.appendChild(wrapper);

  return container;
};
