import {
  Tokens,
  Typography,
  Layout,
  Elements,
} from '@universityofmaryland/variables';
import { AnimationCarouselBlocks } from 'macros';
import { Styles } from 'utilities';

type TypeCarouselCardsRequirements = {
  headline?: HTMLElement | null;
  text?: HTMLElement | null;
  actions?: HTMLElement | null;
  slide: HTMLElement;
  shadowRef?: HTMLElement;
  cards: HTMLElement[];
};

const { ConvertJSSObjectToStyles } = Styles;
const { Text } = Elements;
const { Colors, Spacing } = Tokens;
const { SansMedium, SansLargest } = Typography;
const { LockMax } = Layout;

const MEDIUM = 768;
const LARGE = 1024;

const BACKGROUND_TEXTURE = `<svg aria-hidden="true" width="1599" height="618" viewBox="0 0 1599 618" fill="none" xmlns="http://www.w3.org/2000/svg"
"><mask id="mask0_2135_11278" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="1600" height="618"><rect width="1600" height="618" fill="#242424"></rect></mask><g mask="url(#mask0_2135_11278)"><g opacity="0.5"><mask id="mask1_2135_11278" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="-17" y="-56" width="1823" height="408"><path d="M-17 351.98V-56H1806V351.98" fill="white"></path></mask><g mask="url(#mask1_2135_11278)"><path d="M807.562 -68.3515L-433.759 1173.58L-217.501 1389.94L1023.82 148.012L807.562 -68.3515Z" fill="#262626"></path><path d="M360.649 -82.8017L-880.672 1159.13L-649.997 1389.92L591.324 147.986L360.649 -82.8017Z" fill="black"></path><path d="M1154.8 1173.26L-533.139 -515.499L-677.311 -371.256L1010.63 1317.51L1154.8 1173.26Z" fill="#262626"></path><path d="M2162.77 710.525L1312.18 -140.478L1168.01 3.76505L2018.6 854.768L2162.77 710.525Z" fill="black"></path><path d="M1312.16 -140.485L202.096 -1251.09L57.9241 -1106.85L1167.99 3.75794L1312.16 -140.485Z" fill="#EDEDED"></path><path d="M2133.89 -1251.07L1023.83 -140.458L1168 3.78455L2278.07 -1106.83L2133.89 -1251.07Z" fill="#383838"></path><path d="M591.343 147.968L-634.061 -1078.04L-864.736 -847.248L360.668 378.756L591.343 147.968Z" fill="black"></path><path d="M1023.82 147.97L-217.503 -1093.96L-433.761 -877.595L807.559 364.333L1023.82 147.97Z" fill="#383838"></path></g><mask id="mask2_2135_11278" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="-17" y="351" width="1823" height="780"><path d="M-17 351.938V753.629L837.67 753.672L845.662 1130.18L1806 1130.26V352.094" fill="white"></path></mask><g mask="url(#mask2_2135_11278)"><path d="M1023.81 555.952L-217.506 -685.977L-433.764 -469.613L807.557 772.316L1023.81 555.952Z" fill="#262626"></path><path d="M591.347 555.967L-649.973 -685.962L-880.648 -455.174L360.672 786.755L591.347 555.967Z" fill="black"></path><path d="M1010.63 -613.543L-677.305 1075.22L-533.133 1219.46L1154.8 -469.3L1010.63 -613.543Z" fill="#262626"></path><path d="M1760.63 110.929L910.039 961.932L1054.21 1106.17L1904.8 255.172L1760.63 110.929Z" fill="black"></path><path d="M360.674 325.168L-864.73 1551.17L-634.055 1781.96L591.349 555.956L360.674 325.168Z" fill="black"></path><path d="M807.565 339.631L-433.756 1581.56L-217.498 1797.92L1023.82 555.995L807.565 339.631Z" fill="#383838"></path></g></g></g></svg>`;

const ELEMENT_NAME = 'umd-element-carousel-cards';

const ELEMENT_DECLARATION = 'carousel-cards-declaration';
const CAROUSEL_CONTAINER = 'element-carousel-container';
const CAROUSEL_LOCK = 'element-carousel-lock';

const INTRO_CONTAINER = 'carousel-cards-intro-container';
const INTRO_CONTAINER_LOCK = 'carousel-cards-intro-container-lock';
const INTRO_CONTAINER_HEADLINE = 'carousel-cards-intro-container-headline';
const INTRO_CONTAINER_TEXT = 'carousel-cards-intro-container-text';
const INTRO_CONTAINER_CTA = 'carousel-cards-intro-container-cta';

const OVERWRITE_ANIMATION_CAROUSEL_DECLARATION = `.${CAROUSEL_CONTAINER} .${AnimationCarouselBlocks.Elements.declaration}`;
const OVERWRITE_ANIMATION_CAROUSEL_CONTAINER = `.${CAROUSEL_CONTAINER} .${AnimationCarouselBlocks.Elements.container}`;
const OVERWRITE_ANIMATION_CAROUSEL_BUTTON = `.${CAROUSEL_CONTAINER} .${AnimationCarouselBlocks.Elements.button}`;

// prettier-ignore
const OverwriteCarouselStyles = `
  @container ${ELEMENT_NAME} (min-width: ${LARGE}px) {
    ${OVERWRITE_ANIMATION_CAROUSEL_DECLARATION} {
      width: 60%;
    }
  }

    @container ${ELEMENT_NAME} (max-width: ${LARGE - 1}px) {
    ${OVERWRITE_ANIMATION_CAROUSEL_CONTAINER} {
      padding-bottom: 60px;
    }
  }

  @container ${ELEMENT_NAME} (max-width: ${LARGE - 1}px) {
    ${OVERWRITE_ANIMATION_CAROUSEL_BUTTON} {
      bottom: 0;
    }
  }

  @container ${ELEMENT_NAME} (min-width: ${LARGE}px) {
    ${OVERWRITE_ANIMATION_CAROUSEL_BUTTON} {
      top: 50%;
      transform: translateY(-50%);
    }
  }

  @container ${ELEMENT_NAME} (max-width: ${LARGE - 1}px) {
    ${OVERWRITE_ANIMATION_CAROUSEL_BUTTON}:first-of-type {
      left: 49px;
    }
  }

  @container ${ELEMENT_NAME} (min-width: ${LARGE}px) {
    ${OVERWRITE_ANIMATION_CAROUSEL_BUTTON}:first-of-type {
      right: -52px;
    }
  }

  @container ${ELEMENT_NAME} (max-width: ${LARGE - 1}px) {
    ${OVERWRITE_ANIMATION_CAROUSEL_BUTTON}:last-of-type {
      left: 0;
    }
  }

  @container ${ELEMENT_NAME} (min-width: ${LARGE}px) {
    ${OVERWRITE_ANIMATION_CAROUSEL_BUTTON}:last-of-type {
      left: -52px;
    }
  }
`;

// prettier-ignore
const HeadlineStyles = `
  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${INTRO_CONTAINER_HEADLINE}`]: SansLargest,
    },
  })}

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${INTRO_CONTAINER_HEADLINE} *`]: SansLargest,
    },
  })}

  .${INTRO_CONTAINER_HEADLINE},
  .${INTRO_CONTAINER_HEADLINE} * {
    color: ${Colors.white};
    font-weight: 800;
    text-transform: uppercase;
  }
`;

// prettier-ignore
const TextStyles = `
  * + .${INTRO_CONTAINER_TEXT} {
    margin-top: ${Spacing.md};
  }

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${INTRO_CONTAINER_TEXT}`]: Text.RichTextDark,
    },
  })}

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${INTRO_CONTAINER_TEXT}`]: SansMedium,
    },
  })}
`;

// prettier-ignore
const ActionStyles = `
  * + .${INTRO_CONTAINER_CTA} {
    margin-top: ${Spacing.md};
  }

  .${INTRO_CONTAINER_CTA} a {
    color: ${Colors.white};
  }
`;

// prettier-ignore
const IntroContainer = `
  @container ${ELEMENT_NAME} (max-width: ${LARGE - 1}px) {
    .${INTRO_CONTAINER} {
      margin-bottom: ${Spacing.md};
    }
  }

  @container ${ELEMENT_NAME} (min-width: ${LARGE}px) {
    .${INTRO_CONTAINER} {
      width: calc(40% - ${Spacing['2xl']});
      padding-right: ${Spacing['2xl']};
    }
  }

  @media (min-width: ${LARGE}px) {
    .${INTRO_CONTAINER} .${INTRO_CONTAINER_LOCK} {
      max-width: inherit;
      padding: 0;
    }
  }
`;

// prettier-ignore
const ContainerLock = `
  .${CAROUSEL_LOCK} {
    position: relative;
    ${ConvertJSSObjectToStyles({
      styleObj: LockMax ,
    })}
  }

  @media (min-width: ${LARGE}px) {
    .${CAROUSEL_LOCK} {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }

  @media umd-carousel-card (max-width: ${LARGE - 1}px) {
    .${CAROUSEL_LOCK} {
      max-width: inherit;
      padding: 0;
    }
  }
`;

// prettier-ignore
const ContainerStyles = `
  .${CAROUSEL_CONTAINER} {
    background-color: ${Colors.black};
    padding: ${Spacing['3xl']} 0;
    position: relative;
    overflow: hidden;
  }

  @container ${ELEMENT_NAME} (max-width: 300px) {
    .${CAROUSEL_CONTAINER} {
      display: none;
    }
  }

  @container ${ELEMENT_NAME} (min-width: ${MEDIUM}px) {
    .${CAROUSEL_CONTAINER} {
      padding: ${Spacing['4xl']} 0;
    }
  }

  @container ${ELEMENT_NAME} (min-width: ${LARGE}px) {
    .${CAROUSEL_CONTAINER} {
      padding: ${Spacing['max']} 0;
    }
  }

  .${CAROUSEL_CONTAINER} > svg {
    width: auto;
    height: 100%;
    object-fit: cover;
    position: absolute;
    top: 0;
  }
`

// prettier-ignore
const STYLES_CAROUSEL_CARDS_ELEMENT = `
  .${ELEMENT_DECLARATION} {
    container: ${ELEMENT_NAME} / inline-size;
  }

  .${ELEMENT_DECLARATION} * {
    color: ${Colors.white};
  }
  
  ${AnimationCarouselBlocks.Styles}
  ${ContainerStyles}
  ${ContainerLock}
  ${HeadlineStyles}
  ${TextStyles}
  ${ActionStyles}
  ${IntroContainer}
  ${OverwriteCarouselStyles}
`;

const CreateIntro = (props: TypeCarouselCardsRequirements) => {
  const { headline, text, actions } = props;
  const introContainer = document.createElement('div');
  const introWrapper = document.createElement('div');

  introWrapper.classList.add(INTRO_CONTAINER_LOCK);

  if (headline) {
    headline.classList.add(INTRO_CONTAINER_HEADLINE);
    introWrapper.appendChild(headline);
  }

  if (text) {
    text.classList.add(INTRO_CONTAINER_TEXT);
    introWrapper.appendChild(text);
  }

  if (actions) {
    actions.classList.add(INTRO_CONTAINER_CTA);
    introWrapper.appendChild(actions);
  }

  introContainer.classList.add(INTRO_CONTAINER);
  introContainer.appendChild(introWrapper);

  return introContainer;
};

const CreateCarouselCardsElement = (props: TypeCarouselCardsRequirements) =>
  (() => {
    const declaration = document.createElement('div');
    const container = document.createElement('div');
    const wrapper = document.createElement('div');
    const carouselContainer = AnimationCarouselBlocks.CreateElement({
      ...props,
      blocks: props.cards,
      overwriteDisplayLogic: {
        showMobileHint: true,
      },
    });
    const introContainer = CreateIntro(props);

    wrapper.classList.add(CAROUSEL_LOCK);
    wrapper.appendChild(introContainer);
    wrapper.appendChild(carouselContainer.element);

    container.classList.add(CAROUSEL_CONTAINER);
    container.innerHTML = BACKGROUND_TEXTURE;
    container.appendChild(wrapper);

    declaration.classList.add(ELEMENT_DECLARATION);
    declaration.appendChild(container);

    return {
      element: declaration,
      events: {
        SetEventReize: carouselContainer.events.resize,
        Load: carouselContainer.events.load,
      },
    };
  })();

export default {
  CreateElement: CreateCarouselCardsElement,
  Styles: STYLES_CAROUSEL_CARDS_ELEMENT,
};
