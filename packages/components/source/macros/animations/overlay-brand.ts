type TypeAnimationProps = {
  container: HTMLDivElement;
  getHeightDiff: () => number;
  getContainerHeight: () => number;
  completedCallback?: () => void;
};

type TypeArrowProps = TypeAnimationProps & {
  id: string;
  wrapperStyleRef?: string;
};

const ELEMENT_CONTAINER = 'animation-overlay-container';
const ELEMENT_LAYER_OVERLAY_CONTAINER = 'animation-overlay-layer-container';
const ELEMENT_LAYER_RED_ARROW_CONTAINER =
  'animation-overlay-layer-red-arrow-container';
const ELEMENT_LAYER_BLACK_ARROW_CONTAINER =
  'animation-overlay-layer-black-arrow-container';
const ELEMENT_GENERIC_ARROW = 'aninmation-arrow';

const ID_OVERLAY_LEFT = 'animation-overlay-left';
const ID_OVERLAY_RIGHT = 'animation-overlay-right';
const ID_SLIDE_IN_RED = 'slide-in-red-arrow';
const ID_ARROW_BEHIND_OVERLAY = 'animation-overlay-arrow';
const ID_ARROW_BEHIND_FOLLOWING = 'animation-following-arrow';
const ID_ARROW_BEHIND_FOLLOWING_TWO = 'animation-following-arrow-two';

const TIMING_ANIMATION_ARROW_FIRST_TIME_IN = 1200;
const TIMING_ANIMATION_ARROW_FIRST_TIME_OUT = 4500;

const FollowingArrowStyles = `
  .${ELEMENT_LAYER_BLACK_ARROW_CONTAINER} {
    position: absolute;
    top: 50%;
    left: 0;
    transform: translate(-140%, -50%);
    height: 100%;
    z-index: 99;
  }

  .${ELEMENT_LAYER_BLACK_ARROW_CONTAINER} path {
    fill: #000;
  }

  #${ID_ARROW_BEHIND_FOLLOWING} {
    transform: translateX(-90%);
  }
`;

const MainArrowStyles = `
  .${ELEMENT_LAYER_RED_ARROW_CONTAINER} {
    position: absolute;
    top: 50%;
    left: 0;
    transform: translate(-100%, -50%);
    z-index: 999;
    display: flex;
    align-items: center;
  }

  .${ELEMENT_GENERIC_ARROW} {
    height: 100%;
  }
`;

const OverlayStyles = `
  .${ELEMENT_LAYER_OVERLAY_CONTAINER} {
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

  #${ID_OVERLAY_RIGHT} {
    width: 50%;
  }

  #${ID_OVERLAY_LEFT} {
    width: 50%;
  }

  #${ID_ARROW_BEHIND_OVERLAY} {
    position: absolute;
    top: 50%;
    left: 0;
    transform: translate(-60%, -50%);
    height: 100%;
    z-index: 9;
    fill: #000;
  }

  #${ID_ARROW_BEHIND_OVERLAY} path {
    fill: #000;
  }
`;

const STYLES_ANIMATION_BRAND_OVERLAY_ELEMENT = `
  ${OverlayStyles}
  ${MainArrowStyles}
  ${FollowingArrowStyles}

  @media (prefers-reduced-motion: reduce) {
    .${ELEMENT_CONTAINER} svg {
      display: none;
    }
  }
`;

const CreateAnimatioOverlayContainer = (props: TypeAnimationProps) => {
  const { container } = props;
  const wrapper = document.createElement('div');
  const SVG_OVERLAY_LEFT = `<svg id="${ID_OVERLAY_LEFT}" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="60 0 857.57 976"><defs><style>.overlay-left{fill:#000;fill-rule:evenodd;stroke-width:0px;}</style></defs><path class="overlay-left" d="M492.28,0H0v976h503.46l414.11-481.49L492.28,0Z"/></svg>`;
  const SVG_OVERLAY_RIGHT = `<svg id="${ID_OVERLAY_RIGHT}" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 690.15 976"><defs><style>.overlay-right{fill:#000;fill-rule:evenodd;stroke-width:0px;}</style></defs><path class="overlay-right" d="M11.18,976l414.11-481.49L0,0h690.15v976H11.18Z"/></svg>`;

  wrapper.classList.add(ELEMENT_LAYER_OVERLAY_CONTAINER);
  wrapper.innerHTML = `${SVG_OVERLAY_LEFT} ${SVG_OVERLAY_RIGHT}`;
  container.appendChild(wrapper);
  return wrapper;
};

const CreateAnimationArrowContainer = (props: TypeArrowProps) => {
  const { container, id, wrapperStyleRef } = props;
  const wrapper = document.createElement('div');

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

const AnimateFollowingArrows = (props: TypeAnimationProps) => {
  const { container } = props;
  const arrow = container.querySelector(
    `#${ID_ARROW_BEHIND_FOLLOWING}`,
  ) as HTMLDivElement;
  const arrowTwo = container.querySelector(
    `#${ID_ARROW_BEHIND_FOLLOWING_TWO}`,
  ) as HTMLDivElement;

  setTimeout(() => {
    arrow.style.transition = `transform ${
      TIMING_ANIMATION_ARROW_FIRST_TIME_OUT - 2400
    }ms ease-in-out`;
    arrow.style.transform = `translateX(200vw)`;
  }, TIMING_ANIMATION_ARROW_FIRST_TIME_IN + 120);

  setTimeout(() => {
    arrowTwo.style.transition = `transform ${
      TIMING_ANIMATION_ARROW_FIRST_TIME_OUT - 2800
    }ms ease-in-out`;
    arrowTwo.style.transform = `translateX(200vw)`;
  }, TIMING_ANIMATION_ARROW_FIRST_TIME_IN + 200);
};

const AnimateMainArrow = (props: TypeAnimationProps) => {
  const { container, getContainerHeight, getHeightDiff } = props;
  const arrow = container.querySelector(
    `#${ID_SLIDE_IN_RED}`,
  ) as HTMLDivElement;
  const height = getContainerHeight();
  const overlayLeft = container.querySelector(
    `#${ID_OVERLAY_LEFT}`,
  ) as SVGElement;
  const overlayPosition = overlayLeft.getBoundingClientRect();
  const arrowPosition = arrow.getBoundingClientRect();
  const diff = getHeightDiff();
  const alignment =
    overlayPosition.width / 2 +
    Math.abs(arrowPosition.left) +
    diff -
    Math.abs(overlayPosition.left);

  SizeElements.Arrow({ arrow, height });
  arrow.style.transition = `transform ${TIMING_ANIMATION_ARROW_FIRST_TIME_IN}ms ease-in-out`;
  arrow.style.transform = `translateX(${alignment}px)`;

  setTimeout(() => {
    arrow.style.transition = `transform ${TIMING_ANIMATION_ARROW_FIRST_TIME_OUT}ms ease-in-out`;
    arrow.style.transform = `translateX(${alignment * 3}px)`;
  }, TIMING_ANIMATION_ARROW_FIRST_TIME_IN);
};

const AnimateOverlay = (props: TypeAnimationProps) => {
  const { container, completedCallback } = props;
  const partOne = container.querySelector(`#${ID_OVERLAY_LEFT}`) as SVGElement;
  const partTwo = container.querySelector(`#${ID_OVERLAY_RIGHT}`) as SVGElement;
  const partThree = container.querySelector(
    `#${ID_ARROW_BEHIND_OVERLAY}`,
  ) as SVGElement;
  const endPosition = window.innerWidth * 2;
  const FIRST_ELEMENT_TIME_OUT = 3500;
  const SYNC_TIME =
    TIMING_ANIMATION_ARROW_FIRST_TIME_IN + FIRST_ELEMENT_TIME_OUT - 3000;
  const completedTiming = TIMING_ANIMATION_ARROW_FIRST_TIME_OUT - 3600;

  setTimeout(() => {
    partTwo.style.transition = `transform ${FIRST_ELEMENT_TIME_OUT}ms ease-in-out`;
    partTwo.style.transform = `translateX(${endPosition}px`;
  }, TIMING_ANIMATION_ARROW_FIRST_TIME_IN - 200);

  setTimeout(() => {
    partOne.style.transition = `transform ${completedTiming}ms ease-in-out`;
    partOne.style.transform = `translateX(${endPosition}px`;
  }, SYNC_TIME + 100);

  setTimeout(() => {
    partThree.style.transition = `transform ${completedTiming}ms ease-in-out`;
    partThree.style.transform = `translate(${endPosition}px, -50%)`;
  }, SYNC_TIME + 50);

  if (completedCallback) {
    setTimeout(() => completedCallback(), SYNC_TIME);
  }
};

const AnimationSequence = (props: TypeAnimationProps) => {
  AnimateOverlay(props);
  AnimateMainArrow(props);
  AnimateFollowingArrows(props);
};

const CreateAnimationOverlayBrandElement = ({
  sizedContainer,
  completedCallback,
  isAnimationOnLoad = true,
}: {
  sizedContainer: HTMLDivElement;
  sizedWrapper: HTMLDivElement;
  completedCallback?: () => void;
  isAnimationOnLoad?: boolean;
}) =>
  (() => {
    const container = document.createElement('div');
    let windowWidth = window.innerWidth;

    const getContainerHeight = () => sizedContainer.offsetHeight;
    const getHeightDiff = () => {
      return sizedContainer.offsetHeight;
    };
    const data = {
      container: container,
      getHeightDiff,
      getContainerHeight,
      completedCallback,
    };
    const overlay = CreateAnimatioOverlayContainer(data);
    const overlayArrow = CreateAnimationArrowContainer({
      ...data,
      id: ID_ARROW_BEHIND_OVERLAY,
    });
    const slideInArrow = CreateAnimationArrowContainer({
      ...data,
      id: ID_SLIDE_IN_RED,
      wrapperStyleRef: ELEMENT_LAYER_RED_ARROW_CONTAINER,
    });
    const slideInArrowBlackOne = CreateAnimationArrowContainer({
      ...data,
      id: ID_ARROW_BEHIND_FOLLOWING,
      wrapperStyleRef: ELEMENT_LAYER_BLACK_ARROW_CONTAINER,
    });
    const slideInArrowBlackTwo = CreateAnimationArrowContainer({
      ...data,
      id: ID_ARROW_BEHIND_FOLLOWING_TWO,
      wrapperStyleRef: ELEMENT_LAYER_BLACK_ARROW_CONTAINER,
    });
    const EventLoad = () => {
      if (isAnimationOnLoad) {
        AnimationSequence(data);
        return;
      }

      const scrollEvent = () => {
        const containerPosition = container.getBoundingClientRect();
        const top = containerPosition.top;

        if (top < window.innerHeight && window.scrollY !== 0) {
          AnimationSequence(data);
          window.removeEventListener('scroll', scrollEvent);
        }
      };

      window.addEventListener('scroll', scrollEvent);
    };
    const EventResize = () => {
      if (windowWidth !== window.innerWidth) {
        window.removeEventListener('resize', EventResize);
        container.remove();
      }
    };

    container.classList.add(ELEMENT_CONTAINER);
    container.appendChild(overlay);
    container.appendChild(overlayArrow);
    container.appendChild(slideInArrow);
    container.appendChild(slideInArrowBlackOne);
    container.appendChild(slideInArrowBlackTwo);

    window.addEventListener('resize', EventResize);

    return {
      element: container,
      events: {
        load: EventLoad,
      },
    };
  })();

export default {
  CreateElement: CreateAnimationOverlayBrandElement,
  Styles: STYLES_ANIMATION_BRAND_OVERLAY_ELEMENT,
};
