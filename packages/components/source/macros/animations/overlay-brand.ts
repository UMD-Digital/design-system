import { Performance } from 'utilities';

type TypeAnimationProps = {
  container: HTMLDivElement;
  getHeightDiff: () => number;
  getContainerHeight: () => number;
};

type TypeArrowProps = TypeAnimationProps & {
  id: string;
  wrapperStyleRef?: string;
};

const { Debounce } = Performance;

const ELEMENT_LAYER_OVERLAY_CONTAINER = 'animation-overlay-layer-container';
const ELEMENT_LAYER_RED_ARROW_CONTAINER =
  'animation-overlay-layer-red-arrow-container';
const ELEMENT_GENERIC_ARROW = 'aninmation-arrow';

const ID_OVERLAY_LEFT = 'animation-overlay-left';
const ID_OVERLAY_RIGHT = 'animation-overlay-right';
const ID_SLIDE_IN_RED = 'slide-in-red-arrow';
const ID_ARROW_BEHIND_OVERLAY = 'animation-overlay-arrow';

const TIMING_ANIMATION_ARROW_FIRST_TIME_IN = 1200;

const MainArrowStyles = `
  .${ELEMENT_LAYER_RED_ARROW_CONTAINER} {
    position: absolute;
    top: 50%;
    left: 0;
    transform: translate(-100%, -50%);
    height: 100%;
    z-index: 9;
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
    padding-left: 50%;
    height: 100%;
  }

  #${ID_OVERLAY_LEFT} {
    position: absolute;
    top: 0;
    left: 0;
    width: 50%;
    height: 100%;
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

const AnimateMainArrow = (props: TypeAnimationProps) => {
  const { container, getContainerHeight, getHeightDiff } = props;
  const arrow = container.querySelector(
    `#${ID_SLIDE_IN_RED}`,
  ) as HTMLDivElement;
  const height = getContainerHeight();
  const overlayLeft = container.querySelector(
    `#${ID_OVERLAY_LEFT}`,
  ) as SVGElement;
  const diff = getHeightDiff();
  const TIME_OUT = 5000;

  const alignment =
    overlayLeft.getBoundingClientRect().width / 2 +
    Math.abs(arrow.getBoundingClientRect().left) +
    diff;

  SizeElements.Arrow({ arrow, height });
  arrow.style.transition = `transform ${TIMING_ANIMATION_ARROW_FIRST_TIME_IN}ms ease-in-out`;
  arrow.style.transform = `translateX(${alignment}px)`;

  setTimeout(() => {
    arrow.style.transition = `transform ${TIME_OUT}ms ease-in-out`;
    arrow.style.transform = `translateX(${alignment * 3}px)`;
  }, TIMING_ANIMATION_ARROW_FIRST_TIME_IN);
};

const AnimateOverlay = (props: TypeAnimationProps) => {
  const { container } = props;
  const partOne = container.querySelector(`#${ID_OVERLAY_LEFT}`) as SVGElement;
  const partTwo = container.querySelector(`#${ID_OVERLAY_RIGHT}`) as SVGElement;
  const partThree = container.querySelector(
    `#${ID_ARROW_BEHIND_OVERLAY}`,
  ) as SVGElement;
  const endPosition = window.innerWidth * 2;
  const FIRST_ELEMENT_TIME_OUT = 3500;
  const SYNC_TIME =
    TIMING_ANIMATION_ARROW_FIRST_TIME_IN + FIRST_ELEMENT_TIME_OUT - 3000;

  setTimeout(() => {
    partTwo.style.transition = `transform ${FIRST_ELEMENT_TIME_OUT}ms ease-in-out`;
    partTwo.style.transform = `translateX(${endPosition}px`;
  }, TIMING_ANIMATION_ARROW_FIRST_TIME_IN - 200);

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

const CreateAnimationOverlayBrandElement = ({
  sizedContainer,
  sizedWrapper,
}: {
  sizedContainer: HTMLDivElement;
  sizedWrapper: HTMLDivElement;
}) => {
  const container = document.createElement('div');

  const getContainerHeight = () => sizedContainer.offsetHeight;
  const getHeightDiff = () => {
    return sizedContainer.offsetHeight - sizedWrapper.offsetHeight;
  };
  const data = {
    container: container,
    getHeightDiff,
    getContainerHeight,
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
  const EventLoad = () => {
    if (window.innerWidth > 768) {
      const scrollEvent = () => {
        AnimationSequence(data);
        window.removeEventListener('scroll', scrollEvent);
      };

      window.addEventListener('scroll', scrollEvent);
    } else {
      AnimationSequence(data);
    }
  };
  const EventResize = () => {
    SizeElements.All(data);
  };

  container.appendChild(overlay);
  container.appendChild(overlayArrow);
  container.appendChild(slideInArrow);

  window.addEventListener(
    'resize',
    Debounce(() => {
      EventResize();
    }, 100),
  );

  return {
    element: container,
    events: {
      load: EventLoad,
    },
  };
};

export default {
  CreateElement: CreateAnimationOverlayBrandElement,
  Styles: STYLES_ANIMATION_BRAND_OVERLAY_ELEMENT,
};
