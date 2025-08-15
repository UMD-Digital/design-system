import * as Styles from '@universityofmaryland/web-styles-library';
import { ElementModel } from 'model';
import { type ElementVisual } from '../../../_types';
import * as Utils from 'utilities';
import { assets } from 'atomic';

const CONTAINER_QUERY_NAMED = 'umd-element-card-fireworks__container';
const REDUCE_MOTION = Utils.accessibility.isPrefferdReducedMotion() === true;

const RESPONSIVE_GAP = {
  gap: Styles.token.spacing.min,
  [`@container ${CONTAINER_QUERY_NAMED} (${Styles.token.media.queries.large.min})`]:
    {
      gap: Styles.token.spacing.md,
    },
  [`@container ${CONTAINER_QUERY_NAMED} (${Styles.token.media.queries.tablet.min})`]:
    {
      gap: Styles.token.spacing.lg,
    },
  [`@container ${CONTAINER_QUERY_NAMED} (${Styles.token.media.queries.desktop.min})`]:
    {
      gap: Styles.token.spacing.xl,
    },
};

const RESPONSIVE_PADDING = {
  padding: '0 5vw',

  [`@media (${Styles.token.media.queries.medium.min})`]: {
    padding: '0 10vw',
  },

  [`@media (${Styles.token.media.queries.desktop.min})`]: {
    padding: '0 15vw',
  },
};

const RESPONSIVE_STRETCH_HEIGHT = {
  height: '400vh',
  [`@media (${Styles.token.media.queries.large.min})`]: {
    height: '500vh',
  },
  [`@media (${Styles.token.media.queries.tablet.min})`]: {
    height: '600vh',
  },
};

const ANIMATION_CONFIG = {
  POP_IN: {
    NAME: 'popIn',
    STEP_MS: 400,
    LAYER_VAR: '--pop-layer',
    LAYER_BASE_ZINDEX: 800,
    KEYFRAME: `
      @keyframes popIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
    `,
  },

  GRID_FLARE: {
    NAME: 'gridFlare',
    KEYFRAME: `
      @keyframes gridFlare {
        from { transform: var(--stack-transform); }
        to { transform: none; }
      }
    `,
  },
  FULL_SCREEN: {
    NAME: 'fullscreen',
    KEYFRAME: `
     @keyframes fullscreen {
      from { transform: scale(1);  }
      to { transform: scale(var(--fs-end)); }
    }`,
  },

  CENTER_FEATURED: {
    NAME: 'centerFeatured',
    KEYFRAME: `
     @keyframes centerFeatured {
      from { top: 0%; }
      to   { top: 50%; }
    }`,
  },
};

const getAllMediaInGrid = (grid: ElementVisual) =>
  [
    ...grid.element.querySelectorAll(
      `.umd-element-card-fireworks__grid-element, .umd-element-card-fireworks__featured-wrapper`,
    ),
  ] as HTMLElement[];

const createElementContainer = (
  className: string,
  childElements: ElementVisual[],
  elementsLength: number,
) => {
  const isLeft = className === 'umd-element-card-fireworks__left';
  const isRight = className === 'umd-element-card-fireworks__right';
  const isLengthFive = elementsLength === 5;
  const isLengthSix = elementsLength === 6;

  return ElementModel.createDiv({
    className,
    children: childElements,
    elementStyles: {
      element: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        maxHeight: '80vh',
        ...RESPONSIVE_GAP,

        [` & > :first-child`]: {
          flexGrow: 0,
          ...(isLeft && { height: '60%' }),
          ...(isRight && { height: '50%' }),
        },

        ...(isLengthFive && { maxHeight: '90%' }),
        ...(isLengthSix && { maxHeight: '80%' }),

        [`&.umd-element-card-fireworks__shortened`]: { maxHeight: '90%' },

        [`& > *`]: {
          position: 'relative',
          width: '100%',
          objectFit: 'cover',
          flexGrow: 1,
          height: 'auto',
          minHeight: 0,
          willChange: 'opacity, transform',
          zIndex: `var(${ANIMATION_CONFIG.POP_IN.LAYER_VAR}, 0)`,
          animationName: ANIMATION_CONFIG.POP_IN.NAME,
          animationTimingFunction: 'steps(1,start)',
          animationFillMode: 'forwards',
          animationDirection: 'normal',
          animationTimeline: '--pop-timeline',
          animationRange: '0% 0%',

          '@media (prefers-reduced-motion: no-preference)': {
            opacity: 0,
          },
        },
      },
    },
  });
};

const createParentContainer = (grid: ElementVisual) => {
  return ElementModel.createDiv({
    className: 'umd-element-card-fireworks',
    children: [grid],
    elementStyles: {
      element: {
        containerName: `${CONTAINER_QUERY_NAMED}`,
        containerType: 'inline-size',
        overflow: 'visible',
        viewTimelineName: '--pop-timeline',
        viewTimelineAxis: 'block',

        '@media (prefers-reduced-motion: no-preference)': {
          ...RESPONSIVE_STRETCH_HEIGHT,
        },
      },
    },
  });
};

const createGrid = (
  left: ElementVisual,
  center: ElementVisual,
  right: ElementVisual,
) =>
  ElementModel.createDiv({
    className: 'umd-element-card-fireworks__grid',
    children: [left, center, right],
    elementStyles: {
      element: {
        display: 'grid',
        gridTemplateColumns: '1fr 2fr 1fr',
        alignItems: 'center',
        position: 'sticky',

        '@media (prefers-reduced-motion: no-preference)': {
          top: '50vh',
          translate: '0 -50%',
        },

        ...RESPONSIVE_GAP,
        ...RESPONSIVE_PADDING,
      },
    },
  });

const createFeaturedElement = (featured: HTMLElement) => {
  const featuredElement =
    featured instanceof HTMLVideoElement
      ? ElementModel.createDiv({
          className: 'umd-element-card-fireworks__featured-element',
          children: [
            assets.video.observedAutoPlay({
              video: featured as HTMLVideoElement,
              additionalElementStyles: {
                height: '100%',
                width: '100%',

                [`& video`]: {
                  objectFit: 'cover',
                  width: '100%',
                  height: '100%',
                },
              },
            }),
          ],
          elementStyles: { element: { height: '100%', width: '100%' } },
        })
      : ElementModel.create({
          element: featured,
          className: 'umd-element-card-fireworks__featured-element',
          elementStyles: {
            element: {
              height: '100%',
              width: '100%',
              objectFit: 'cover',
              animationTimeline: '--pop-timeline',
            },
          },
        });

  const featuredElementContainer = ElementModel.createDiv({
    className: 'umd-element-card-fireworks__featured-container',
    children: [featuredElement],
    elementStyles: {
      element: { height: '100%', width: '100%', position: 'relative' },
    },
  });

  const featuredElementWrapper = ElementModel.createDiv({
    className: 'umd-element-card-fireworks__featured-wrapper',
    children: [featuredElementContainer],
    elementStyles: {
      element: {
        top: 0,
        transform: 'scale(1)',
        transition: 'top 0.5s ease',
        zIndex: '999',
        position: 'relative',
        display: 'block',
        aspectRatio: '4 / 3',
        flexGrow: 0,

        [`&.umd-element-card-fireworks__full-screen`]: {
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          zIndex: 9999,
        },
      },
    },
  });

  return { featuredElement, featuredElementContainer, featuredElementWrapper };
};

const createNonFeaturedElement = (element: HTMLElement) =>
  ElementModel.create({
    element,
    className: 'umd-element-card-fireworks__grid-element',
  });

const getCenterElements = (
  featuredElement: ElementVisual,
  images: HTMLElement[],
) => {
  const centerElements: ElementVisual[] = [featuredElement];
  const isEvenCount = (images.length + 1) % 2 === 0;

  if (images.length === 0 || !isEvenCount) return centerElements;

  const firstMedia = createNonFeaturedElement(images[0]);
  centerElements.push(firstMedia);
  images.splice(0, 1);

  return centerElements;
};

const getSideElements = (images: HTMLElement[]) => {
  const leftElements: ElementVisual[] = [];
  const rightElements: ElementVisual[] = [];

  images.map((element, index) => {
    const visual = createNonFeaturedElement(element);
    (index % 2 === 0 ? leftElements : rightElements).push(visual);
  });

  return { leftElements, rightElements };
};

const distributeSideElementRatios = (
  left: ElementVisual,
  right: ElementVisual,
  center: ElementVisual,
) => {
  const leftChildren = Array.from(left.element.children) as HTMLElement[];
  const rightChildren = Array.from(right.element.children) as HTMLElement[];
  const centerHasMultiple = center.element.children.length >= 2;

  if (!leftChildren.length || !rightChildren.length) return;

  if (centerHasMultiple) {
    left.element.classList.add('umd-element-card-fireworks__shortened');
    right.element.classList.add('umd-element-card-fireworks__shortened');
  }
};

const calculateStackPosition = (
  grid: ElementVisual,
  center: ElementVisual,
  left: ElementVisual,
  right: ElementVisual,
) => {
  const gridRect = grid.element.getBoundingClientRect();
  const gridStyle = getComputedStyle(grid.element);

  const gridCenterX = gridRect.width / 2 - parseInt(gridStyle.paddingLeft);
  const gridCenterY = gridRect.height / 2;

  const randomTranslate = (min = 5, max = 20): string => {
    const randomNumber = (numOne: number, numTwo: number) => {
      const sign = Math.random() < 0.5 ? -1 : 1;
      return Math.round((Math.random() * (numTwo - numOne) + numOne) * sign);
    };
    return `translate(${randomNumber(min, max)}px, ${randomNumber(
      min,
      max,
    )}px)`;
  };

  const setStack = (element: HTMLElement, transformAmount: string) => {
    element.style.setProperty('--stack-transform', transformAmount);
  };

  const centerElements = [...center.element.children] as HTMLElement[];
  const leftElements = [...left.element.children] as HTMLElement[];
  const rightElements = [...right.element.children] as HTMLElement[];

  const posCenter = (elements: HTMLElement[]) => {
    elements.map((element, index) => {
      let transformAmount = randomTranslate();
      if (index === 0)
        transformAmount += `translateY(${gridCenterY}px) translate(0, -50%)`;
      else if (index === 1)
        transformAmount += `translateY(${-gridCenterY}px) translate(0, 50%)`;

      setStack(element, transformAmount);
    });
  };

  const posLeft = (elements: HTMLElement[]) => {
    const multiCount = elements.length >= 2;

    elements.map((element, index) => {
      let transformAmount = `translateX(${gridCenterX}px)` + randomTranslate();
      if (!multiCount) transformAmount += `translate(-50%, 0)`;
      else if (index === 0) transformAmount += `translate(-50%, 25%)`;
      else if (index === 1) transformAmount += `translate(-50%, -25%)`;

      setStack(element, transformAmount);
    });
  };

  const posRight = (elements: HTMLElement[]) => {
    const multiCount = elements.length >= 2;
    elements.map((element, index) => {
      let transformAmount = `translateX(${-gridCenterX}px)` + randomTranslate();
      if (!multiCount) transformAmount += `translate(50%, 0)`;
      else if (index === 0) transformAmount += `translate(50%, 25%)`;
      else if (index === 1) transformAmount += `translate(50%, -25%)`;

      setStack(element, transformAmount);
    });
  };

  posCenter(centerElements);
  posLeft(leftElements);
  posRight(rightElements);
};

const appendToStyle = (
  element: HTMLElement,
  property: string,
  value: string,
) => {
  const currPropertyValue = element.style.getPropertyValue(property).trim();

  if (!currPropertyValue) {
    element.style.setProperty(property, `${value}`);
    return;
  }

  element.style.setProperty(property, `${currPropertyValue}, ${value}`);
};

const attachPopInStack = (grid: ElementVisual, center: ElementVisual) => {
  const RANGE_START = 10;
  const RANGE_END = 20;
  const firstCenterChild = (center.element.children[0] as HTMLElement) ?? null;
  const allMedia = getAllMediaInGrid(grid);

  if (!firstCenterChild) {
    return;
  }

  const mediaPopInOrder = [
    ...allMedia.filter((element) => element !== firstCenterChild),
    firstCenterChild,
  ];
  const scrollInterval = (RANGE_END - RANGE_START) / mediaPopInOrder.length;

  mediaPopInOrder.map((element, index) => {
    const elementStart = RANGE_START + index * scrollInterval;
    const elementEnd = elementStart + scrollInterval;

    element.style.setProperty(
      ANIMATION_CONFIG.POP_IN.LAYER_VAR,
      String(ANIMATION_CONFIG.POP_IN.LAYER_BASE_ZINDEX + index),
    );
    element.style.setProperty('animation-name', ANIMATION_CONFIG.POP_IN.NAME);
    element.style.setProperty('animation-timing-function', 'steps(1,start)');
    element.style.setProperty('animation-fill-mode', 'both');
    element.style.setProperty('animation-direction', 'normal');
    element.style.setProperty('animation-timeline', '--pop-timeline');
    element.style.setProperty(
      'animation-range',
      `${elementStart}% ${elementEnd}%`,
    );
  });
};

const attachFlareToGridScroll = (grid: ElementVisual) => {
  const allMedia = getAllMediaInGrid(grid);

  if (!allMedia.length) {
    return;
  }

  const RANGE_START = 20;
  const RANGE_END = 50;

  allMedia.map((element) => {
    const currentTransform = getComputedStyle(element).transform;

    element.style.transform = `${currentTransform}`;
    appendToStyle(element, 'animation-name', ANIMATION_CONFIG.GRID_FLARE.NAME);
    appendToStyle(element, 'animation-timing-function', 'ease-out');
    appendToStyle(element, 'animation-fill-mode', 'both');
    appendToStyle(element, 'animation-direction', 'normal');
    appendToStyle(element, 'animation-timeline', '--pop-timeline');
    appendToStyle(element, 'animation-range', `${RANGE_START}% ${RANGE_END}%`);
  });
};

const attachFullscreenScroll = (
  grid: ElementVisual,
  featuredElement: ElementVisual,
) => {
  const computeFullscreenEnd = () => {
    const startingPosition =
      featuredElement.element.getBoundingClientRect() as DOMRect;
    const fullscreenScale = Math.max(
      window.innerWidth / startingPosition.width,
      window.innerHeight / startingPosition.height,
    );

    return fullscreenScale;
  };

  const handleFeaturedCentering = () => {
    const RANGE_START_CENTER = 50;
    const RANGE_END_CENTER = 60;

    appendToStyle(
      featuredElement.element,
      'animation-name',
      ANIMATION_CONFIG.CENTER_FEATURED.NAME,
    );
    appendToStyle(featuredElement.element, 'animation-fill-mode', 'both');
    appendToStyle(
      featuredElement.element,
      'animation-range',
      `${RANGE_START_CENTER}% ${RANGE_END_CENTER}%`,
    );
  };

  const expandScreen = () => {
    const fullscreenScale = computeFullscreenEnd();

    featuredElement.element.style.setProperty('transform-origin', '50% 50%');
    featuredElement.element.style.setProperty('--fs-end', `${fullscreenScale}`);
    featuredElement.element.style.setProperty('z-index', '9999');

    appendToStyle(
      featuredElement.element,
      'animation-name',
      ANIMATION_CONFIG.FULL_SCREEN.NAME,
    );
    appendToStyle(
      featuredElement.element,
      'animation-timing-function',
      'ease-out',
    );
    appendToStyle(featuredElement.element, 'animation-fill-mode', 'both');
    appendToStyle(featuredElement.element, 'animation-direction', 'normal');
    appendToStyle(
      featuredElement.element,
      'animation-timeline',
      '--pop-timeline',
    );
    appendToStyle(
      featuredElement.element,
      'animation-range',
      `${RANGE_START}% ${RANGE_END}%`,
    );
  };

  const RANGE_START = 60;
  const RANGE_END = 80;
  const allMedia = getAllMediaInGrid(grid);
  const resizeObserver = new ResizeObserver(() => expandScreen());

  if (allMedia.length === 4 || allMedia.length === 6) {
    handleFeaturedCentering();
  }

  resizeObserver.observe(grid.element);
};

export default ({
  featured,
  images,
  isExpandFeature,
}: {
  featured: HTMLImageElement | HTMLVideoElement;
  images: HTMLImageElement[];
  isExpandFeature: boolean;
}): ElementVisual => {
  const elementsLength = images.length + 1;

  const { featuredElement, featuredElementContainer, featuredElementWrapper } =
    createFeaturedElement(featured);

  const centerElements = getCenterElements(featuredElementWrapper, images);
  const { leftElements, rightElements } = getSideElements(images);

  const left = createElementContainer(
    'umd-element-card-fireworks__left',
    leftElements,
    elementsLength,
  );
  const center = createElementContainer(
    'umd-element-card-fireworks__center',
    centerElements,
    elementsLength,
  );
  const right = createElementContainer(
    'umd-element-card-fireworks__right',
    rightElements,
    elementsLength,
  );

  const grid = createGrid(left, center, right);
  const container = createParentContainer(grid);

  distributeSideElementRatios(left, right, center);

  container.styles += ANIMATION_CONFIG.POP_IN.KEYFRAME;
  container.styles += ANIMATION_CONFIG.GRID_FLARE.KEYFRAME;
  container.styles += ANIMATION_CONFIG.FULL_SCREEN.KEYFRAME;
  container.styles += ANIMATION_CONFIG.CENTER_FEATURED.KEYFRAME;

  const resizeObserver = new ResizeObserver(() =>
    calculateStackPosition(grid, center, left, right),
  );
  resizeObserver.observe(container.element);

  if (REDUCE_MOTION) {
    return container;
  }

  attachPopInStack(grid, center);
  attachFlareToGridScroll(grid);
  if (!isExpandFeature) {
    return container;
  }
  attachFullscreenScroll(grid, featuredElementContainer);

  return container;
};
