import { ElementBuilder } from '@universityofmaryland/web-builder-library';

type TypeAnimationProps = {
  container: HTMLDivElement;
  getHeightDiff: () => number;
  getContainerHeight: () => number;
  completedCallback?: () => void;
};


const ID_OVERLAY_LEFT = 'animation-overlay-left';
const ID_OVERLAY_RIGHT = 'animation-overlay-right';
const ID_SLIDE_IN_RED = 'slide-in-red-arrow';
const ID_ARROW_BEHIND_OVERLAY = 'animation-overlay-arrow';
const ID_ARROW_BEHIND_FOLLOWING = 'animation-following-arrow';
const ID_ARROW_BEHIND_FOLLOWING_TWO = 'animation-following-arrow-two';
const CLASS_ANIMATION_ARROW = 'animation-arrow';

const TIMING_ANIMATION_ARROW_FIRST_TIME_IN = 1200;
const TIMING_ANIMATION_ARROW_FIRST_TIME_OUT = 4500;

const CreateAnimatioOverlayContainer = () => {
  const SVG_OVERLAY_LEFT = `<svg id="${ID_OVERLAY_LEFT}" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="60 0 857.57 976"><defs><style>.overlay-left{fill:#000;fill-rule:evenodd;stroke-width:0px;}</style></defs><path class="overlay-left" d="M492.28,0H0v976h503.46l414.11-481.49L492.28,0Z"/></svg>`;
  const SVG_OVERLAY_RIGHT = `<svg id="${ID_OVERLAY_RIGHT}" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 690.15 976"><defs><style>.overlay-right{fill:#000;fill-rule:evenodd;stroke-width:0px;}</style></defs><path class="overlay-right" d="M11.18,976l414.11-481.49L0,0h690.15v976H11.18Z"/></svg>`;

  return new ElementBuilder()
    .withClassName('animation-overlay-layer-container')
    .withHTML(`${SVG_OVERLAY_LEFT} ${SVG_OVERLAY_RIGHT}`)
    .withStyles({
      element: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 'auto',
        height: 'auto',
        minWidth: '100%',
        minHeight: '100%',
        zIndex: '9',
        display: 'flex',

        [`& #${ID_OVERLAY_RIGHT}`]: { width: '50%' },
        [`& #${ID_OVERLAY_LEFT}`]: { width: '50%' },
        [`& #${ID_ARROW_BEHIND_OVERLAY}`]: {
          position: 'absolute',
          top: '50%',
          left: '0',
          transform: 'translate(-60%, -50%)',
          height: '100%',
          zIndex: '9',
          fill: '#000',
          '& path': { fill: '#000' },
        },
      },
    })
    .build();
};

const createArrowSvg = (id: string) =>
  `<svg id="${id}" class="${CLASS_ANIMATION_ARROW}" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 973.01 976"><defs><style>.arrow-video{fill:#e21833;fill-rule:evenodd;}</style></defs><path class="arrow-video" d="m427.44,497.01L0,0h545.57l427.44,497.01-411.96,478.99H15.48l411.96-478.99Z"/></svg>`;

const CreateOverlayArrow = (id: string) =>
  new ElementBuilder().withHTML(createArrowSvg(id)).build();

const CreateRedArrow = (id: string) =>
  new ElementBuilder()
    .withClassName('animation-overlay-layer-red-arrow-container')
    .withHTML(createArrowSvg(id))
    .withStyles({
      element: {
        position: 'absolute',
        top: '50%',
        left: '0',
        transform: 'translate(-100%, -50%)',
        zIndex: '999',
        display: 'flex',
        alignItems: 'center',
        `& .${CLASS_ANIMATION_ARROW}`: { height: '100%' },
      },
    })
    .build();

const CreateBlackArrow = (id: string) =>
  new ElementBuilder()
    .withClassName('animation-overlay-layer-black-arrow-container')
    .withHTML(createArrowSvg(id))
    .withStyles({
      element: {
        position: 'absolute',
        top: '50%',
        left: '0',
        transform: 'translate(-140%, -50%)',
        height: '100%',
        zIndex: '99',
        '& path': { fill: '#000' },
        `& .${CLASS_ANIMATION_ARROW}`: { height: '100%' },
        [`& #${ID_ARROW_BEHIND_FOLLOWING}`]: {
          transform: 'translateX(-90%)',
        },
      },
    })
    .build();

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

  arrow.style.height = `${height}px`;
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

export const createAnimationChevronFlow = ({
  sizedContainer,
  completedCallback,
  isAnimationOnLoad = true,
}: {
  sizedContainer: HTMLElement;
  sizedWrapper: HTMLElement;
  completedCallback?: () => void;
  isAnimationOnLoad?: boolean;
}) =>
  (() => {
    let windowWidth = window.innerWidth;

    const getContainerHeight = () => sizedContainer.offsetHeight;
    const getHeightDiff = () => sizedContainer.offsetHeight;

    const containerBuilder = new ElementBuilder()
      .withClassName('animation-overlay-container')
      .withStyles({
        element: {
          '@media (prefers-reduced-motion: reduce)': {
            '& svg': { display: 'none' },
          },
        },
      });
    const containerEl = containerBuilder.getElement() as HTMLDivElement;

    const data = {
      container: containerEl,
      getHeightDiff,
      getContainerHeight,
      completedCallback,
    };

    const overlay = CreateAnimatioOverlayContainer();
    const overlayArrow = CreateOverlayArrow(ID_ARROW_BEHIND_OVERLAY);
    const slideInArrow = CreateRedArrow(ID_SLIDE_IN_RED);
    const slideInArrowBlackOne = CreateBlackArrow(ID_ARROW_BEHIND_FOLLOWING);
    const slideInArrowBlackTwo = CreateBlackArrow(ID_ARROW_BEHIND_FOLLOWING_TWO);
    const children = [
      overlay,
      overlayArrow,
      slideInArrow,
      slideInArrowBlackOne,
      slideInArrowBlackTwo,
    ];

    const EventLoad = () => {
      if (isAnimationOnLoad) {
        AnimationSequence(data);
        return;
      }

      const scrollEvent = () => {
        const containerPosition = containerEl.getBoundingClientRect();
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
        containerEl.remove();
      }
    };

    window.addEventListener('resize', EventResize);

    return containerBuilder
      .withChildren(...children)
      .withEvents({ load: EventLoad })
      .build();
  })();
