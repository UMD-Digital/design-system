import {
  Layout,
  Tokens,
  Elements,
  Typography,
} from '@universityofmaryland/variables';
import { MarkupCreate, Styles } from 'utilities';

type TypeHeroBrandVideoProps = {
  video: HTMLVideoElement;
};

type TypeAnimationProps = {
  container: HTMLDivElement;
  getHeightDiff: () => number;
  getContainerHeight: () => number;
};

type TypeArrowProps = TypeAnimationProps & {
  id: string;
  isColorRed?: boolean;
  wrapperStyleRef?: string;
};

const { LockSmall } = Layout;
const { Colors, Spacing } = Tokens;
const { Eyebrow } = Elements;
const { CampaignLarge, SansLarger } = Typography;

const { ConvertJSSObjectToStyles } = Styles;
const { Node } = MarkupCreate;

const ELEMENT_NAME = 'umd-element-hero-brand-video';
const ELEMENT_HERO_ELEMENT_DECLARATION = 'hero-logo-brand-video-declaration';
const ELEMENT_HERO_ELEMENT_CONTAINER = 'hero-logo-brand-video-container';
const ELEMENT_HERO_ELEMENT_WRAPPER = 'hero-logo-brand-video-wrapper';
const ELEMENT_HERO_ELEMENT_VIDEO = 'hero-logo-brand-video';

const ELEMENT_OVERLAY_CONTAINER = 'animation-overlay-container';
const ELEMENT_SLIDE_IN_RED_ARROW_CONTAINER = 'animation-red-arrow-container';

const ELEMENT_GENERIC_ARROW = 'aninmation-arrow';
const ELEMENT_OVERLAY_LEFT = 'animation-overlay-left';
const ELEMENT_OVERLAY_RIGHT = 'animation-overlay-right';
const ELEMENT_SLIDE_IN_RED = 'slide-in-red-arrow';
const ELEMENT_ARROW_BEHIND_OVERLAY = 'animation-overlay-arrow';

const ANIMATION_ARROW_FIRST_TIME_IN = 1200;

const MainArrowStyles = `
  .${ELEMENT_SLIDE_IN_RED_ARROW_CONTAINER} {
    position: absolute;
    top: 50%;
    left: 0;
    transform: translate(-100%, -50%);
    height: 100%;
    z-index: 9;
  }

  .${ELEMENT_GENERIC_ARROW} {
    height: 100%;
  }
`;

const OverlayStyles = `
  .${ELEMENT_OVERLAY_CONTAINER} {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: auto;
    height: auto;
    min-width: 100%;
    min-height: 100%;
    z-index: 9;
    display: flex;
  }

  #${ELEMENT_OVERLAY_RIGHT} {
    padding-left: 50%;
    height: 100%;
  }

  #${ELEMENT_OVERLAY_LEFT} {
    position: absolute;
    top: 0;
    left: 0;
    width: 50%;
    height: 100%;
  }

  #${ELEMENT_ARROW_BEHIND_OVERLAY} {
    position: absolute;
    top: 50%;
    left: 0;
    transform: translate(-60%, -50%);
    height: 100%;
    z-index: 9;
    fill: #000;
  }

  #${ELEMENT_ARROW_BEHIND_OVERLAY} path {
    fill: #000;
  }
`;

const VideoStyles = `
  .${ELEMENT_HERO_ELEMENT_VIDEO} {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: auto;
    height: auto;
    min-width: 100%;
    min-height: 100%;
  }
`;

const STYLES_HERO_BRAND_VIDEO_ELEMENT = `
  .${ELEMENT_HERO_ELEMENT_DECLARATION} {
    container: ${ELEMENT_NAME} / inline-size;
  }

  .${ELEMENT_HERO_ELEMENT_CONTAINER} {
    aspect-ratio: 16 / 9;
  }

  .${ELEMENT_HERO_ELEMENT_WRAPPER} {
    position: relative;
    overflow: hidden;
    max-height: 90vh;
    height: 100%;
    width: 100%;
  }

  ${VideoStyles}
  ${OverlayStyles}
  ${MainArrowStyles}
`;

const CreateAnimatioOverlayContainer = (props: TypeAnimationProps) => {
  const { container } = props;
  const wrapper = document.createElement('div');
  const SVG_OVERLAY_LEFT = `<svg id="${ELEMENT_OVERLAY_LEFT}" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="60 0 857.57 976"><defs><style>.overlay-left{fill:#000;fill-rule:evenodd;stroke-width:0px;}</style></defs><path class="overlay-left" d="M492.28,0H0v976h503.46l414.11-481.49L492.28,0Z"/></svg>`;
  const SVG_OVERLAY_RIGHT = `<svg id="${ELEMENT_OVERLAY_RIGHT}" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 690.15 976"><defs><style>.overlay-right{fill:#000;fill-rule:evenodd;stroke-width:0px;}</style></defs><path class="overlay-right" d="M11.18,976l414.11-481.49L0,0h690.15v976H11.18Z"/></svg>`;

  wrapper.classList.add(ELEMENT_OVERLAY_CONTAINER);
  wrapper.innerHTML = `${SVG_OVERLAY_LEFT} ${SVG_OVERLAY_RIGHT}`;
  container.appendChild(wrapper);
  return wrapper;
};

const CreateAnimationArrowContainer = (props: TypeArrowProps) => {
  const { container, id, isColorRed = true, wrapperStyleRef } = props;
  const wrapper = document.createElement('div');

  console.log(isColorRed);
  const SVG_ANIMATION_ARROW = `<svg id="${id}" class="${ELEMENT_GENERIC_ARROW}" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 973.01 976"><defs><style>.arrow-video{fill:#e21833;fill-rule:evenodd;}</style></defs><path class="arrow-video" d="m427.44,497.01L0,0h545.57l427.44,497.01-411.96,478.99H15.48l411.96-478.99Z"/></svg>`;

  if (wrapperStyleRef) {
    wrapper.classList.add(wrapperStyleRef);
  }

  wrapper.innerHTML = `${SVG_ANIMATION_ARROW}`;

  container.appendChild(wrapper);

  return wrapper;
};

const SizeElements = {
  Arrow: ({ arrow, height }: { arrow: HTMLDivElement; height: number }) => {
    arrow.style.height = `${height}px`;
  },
  Arrows: (props: TypeAnimationProps) => {
    const { container, getContainerHeight } = props;
    const height = getContainerHeight();

    const ArrowContainers = Array.from(
      container.querySelectorAll(`.${ELEMENT_GENERIC_ARROW}`),
    ) as HTMLDivElement[];

    ArrowContainers.forEach((arrow) => SizeElements.Arrow({ arrow, height }));
  },
  All: (props: TypeAnimationProps) => {
    SizeElements.Arrows(props);
  },
};

const AnimateMainArrow = (props: TypeAnimationProps) => {
  const { container, getContainerHeight, getHeightDiff } = props;
  const arrow = CreateAnimationArrowContainer({
    ...props,
    id: ELEMENT_SLIDE_IN_RED,
    wrapperStyleRef: ELEMENT_SLIDE_IN_RED_ARROW_CONTAINER,
  });
  const height = getContainerHeight();
  const overlayLeft = container.querySelector(
    `#${ELEMENT_OVERLAY_LEFT}`,
  ) as SVGElement;
  const svg = arrow.querySelector('svg') as SVGElement;
  const diff = getHeightDiff();
  const TIME_OUT = 5000;

  const alignment =
    overlayLeft.getBoundingClientRect().width / 2 +
    Math.abs(arrow.getBoundingClientRect().left) +
    diff;

  SizeElements.Arrow({ arrow, height });
  svg.style.transition = `transform ${ANIMATION_ARROW_FIRST_TIME_IN}ms ease-in-out`;
  svg.style.transform = `translateX(${alignment}px)`;

  setTimeout(() => {
    svg.style.transition = `transform ${TIME_OUT}ms ease-in-out`;
    svg.style.transform = `translateX(${alignment * 3}px)`;
  }, ANIMATION_ARROW_FIRST_TIME_IN);
};

const AnimateOverlay = (props: TypeAnimationProps) => {
  const overlay = CreateAnimatioOverlayContainer(props);
  const overlayArrow = CreateAnimationArrowContainer({
    ...props,
    id: ELEMENT_ARROW_BEHIND_OVERLAY,
    isColorRed: false,
  });
  const parts = Array.from(overlay.querySelectorAll('svg')) as SVGElement[];
  const partOne = parts[0];
  const partTwo = parts[1];
  const partThree = overlayArrow.children[0] as SVGElement;
  const endPosition = window.innerWidth * 2;
  const FIRST_ELEMENT_TIME_OUT = 3500;
  const SYNC_TIME =
    ANIMATION_ARROW_FIRST_TIME_IN + FIRST_ELEMENT_TIME_OUT - 3000;

  setTimeout(() => {
    partTwo.style.transition = `transform ${FIRST_ELEMENT_TIME_OUT}ms ease-in-out`;
    partTwo.style.transform = `translateX(${endPosition}px`;
  }, ANIMATION_ARROW_FIRST_TIME_IN - 200);

  setTimeout(() => {
    partOne.style.transition = `transform ${FIRST_ELEMENT_TIME_OUT}ms ease-in-out`;
    partOne.style.transform = `translateX(${endPosition}px`;
  }, SYNC_TIME);

  setTimeout(() => {
    partThree.style.transition = `transform ${
      FIRST_ELEMENT_TIME_OUT + 300
    }ms ease-in-out`;
    partThree.style.transform = `translate(${endPosition}px, -50%)`;
  }, SYNC_TIME - 100);
};

const AnimationSequence = (props: TypeAnimationProps) => {
  AnimateOverlay(props);
  AnimateMainArrow(props);
};

const CreateHeroBrandVideoElement = (props: TypeHeroBrandVideoProps) => {
  const { video } = props;
  const declaration = document.createElement('div');
  const container = document.createElement('div');
  const wrapper = document.createElement('div');
  const getContainerHeight = () => container.offsetHeight;
  const getHeightDiff = () => {
    return container.offsetHeight - wrapper.offsetHeight;
  };
  const data = {
    container: wrapper,
    getHeightDiff,
    getContainerHeight,
  };
  const EventLoad = () => {
    AnimationSequence(data);
  };

  video.classList.add(ELEMENT_HERO_ELEMENT_VIDEO);

  wrapper.appendChild(video);
  wrapper.classList.add(ELEMENT_HERO_ELEMENT_WRAPPER);

  container.classList.add(ELEMENT_HERO_ELEMENT_CONTAINER);
  container.appendChild(wrapper);

  declaration.classList.add(ELEMENT_HERO_ELEMENT_DECLARATION);
  declaration.appendChild(container);

  window.addEventListener('resize', () => {
    SizeElements.All(data);
  });

  return {
    element: declaration,
    events: {
      load: EventLoad,
    },
  };
};

export default {
  CreateElement: CreateHeroBrandVideoElement,
  Styles: STYLES_HERO_BRAND_VIDEO_ELEMENT,
};
