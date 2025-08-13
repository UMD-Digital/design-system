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
    { gap: Styles.token.spacing.lg },
  [`@container ${CONTAINER_QUERY_NAMED} (${Styles.token.media.queries.desktop.min})`]:
    { gap: Styles.token.spacing.xl },
};

const RESPONSIVE_HEIGHT = {
  height: '60vh',
  [`@media (${Styles.token.media.queries.large.min})`]: {
    height: '80vh',
    padding: '0 10vw',
  },
  [`@media (${Styles.token.media.queries.tablet.min})`]: {
    height: '100vh',
    padding: '0 15vw',
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
        from { opacity: 1; }
        to   { opacity: 1; }
      }
    `,
  },
  FULL_SCREEN: {
    NAME: 'fullscreen',
    DURATION_MS: 500,
    EASE: 'ease-out',
    FILL: 'forwards' as FillMode,
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

          ...(isLeft && {
            height: '60%',
          }),

          ...(isRight && {
            height: '50%',
          }),
        },

        ...(isLengthFive && {
          maxHeight: '90%',
        }),
        ...(isLengthSix && {
          maxHeight: '80%',
        }),

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
          opacity: 0,

          [`&.umd-element-card-fireworks__popin`]: {
            [`@media (prefers-reduced-motion: no-preference)`]: {
              animation: `popIn 1ms steps(1,end) forwards`,
            },
          },
        },
      },
    },
  });
};

const createParentContainer = (grid: ElementVisual) =>
  ElementModel.createDiv({
    className: 'umd-element-card-fireworks',
    children: [grid],
    elementStyles: {
      element: {
        containerName: `${CONTAINER_QUERY_NAMED}`,
        containerType: 'inline-size',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        margin: '0 auto',
        padding: '0 5vw',
        ...RESPONSIVE_HEIGHT,
      },
    },
  });

const createMainContainer = (
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

        ...RESPONSIVE_GAP,
      },
    },
  });

const createFeaturedElement = (featured: HTMLElement) => {
  const createFeaturedBasedOnType = () => {
    const featuredElementStyle = {
      height: '100%',
      width: '100%',
      objectFit: 'cover',
    };

    if (featured instanceof HTMLVideoElement) {
      const video = featured as HTMLVideoElement;
      const videoElement = assets.video.toggle({
        video,
        additionalElementStyles: {
          height: '100%',
          width: '100%',

          [`& video`]: featuredElementStyle,
        },
      });

      return ElementModel.createDiv({
        className: 'umd-element-card-fireworks__featured-element',
        children: [videoElement],
        elementStyles: {
          element: {
            height: '100%',
          },
        },
      });
    } else {
      return ElementModel.create({
        element: featured,
        className: 'umd-element-card-fireworks__featured-element',
        elementStyles: {
          element: featuredElementStyle,
        },
      });
    }
  };

  const featuredElement = createFeaturedBasedOnType();
  const featuredElementContainer = ElementModel.createDiv({
    className: 'umd-element-card-fireworks__featured-container',
    children: [featuredElement],
    elementStyles: {
      element: {
        height: '100%',
      },
    },
  });

  const featuredElementWrapper = ElementModel.createDiv({
    className: 'umd-element-card-fireworks__featured-wrapper',
    children: [featuredElementContainer],
    elementStyles: {
      element: {
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

  return featuredElementWrapper;
};

const createNonFeaturedElement = (element: HTMLElement) => {
  return ElementModel.create({
    element: element,
    className: 'umd-element-card-fireworks__grid-element',
  });
};

const getCenterElements = (
  featuredElement: ElementVisual,
  images: HTMLElement[],
) => {
  const centerElements: ElementVisual[] = [];
  const isEvenCount = (images.length + 1) % 2 === 0;

  centerElements.push(featuredElement);

  if (images.length == 0 || !isEvenCount) {
    return centerElements;
  }

  const firstMedia = createNonFeaturedElement(images[0]);
  centerElements.push(firstMedia);

  images.splice(0, 1);

  return centerElements;
};

const getSideElements = (images: HTMLElement[]) => {
  const leftElements: ElementVisual[] = [];
  const rightElements: ElementVisual[] = [];

  images.forEach((element, index) => {
    const isEvenIndex = index % 2 === 0;
    const visualElement = createNonFeaturedElement(element);

    if (isEvenIndex) {
      leftElements.push(visualElement);
    } else {
      rightElements.push(visualElement);
    }
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
  const centerHasMultipleMedia = center.element.children.length >= 2;

  if (leftChildren.length <= 0 || rightChildren.length <= 0) {
    return;
  }

  if (centerHasMultipleMedia) {
    left.element.classList.add('umd-element-card-fireworks__shortened');
    right.element.classList.add('umd-element-card-fireworks__shortened');
  }
};

const animatePopInStack = async (
  grid: ElementVisual,
  center: ElementVisual,
) => {
  const allMedia = getAllMediaInGrid(grid);
  const firstCenterChild = center.element.children[0] as
    | HTMLElement
    | undefined;

  const getOrdering = () => {
    if (firstCenterChild) {
      const ordered = allMedia.filter(
        (element) => element !== firstCenterChild,
      );
      ordered.push(firstCenterChild);
      return ordered;
    }

    return allMedia;
  };

  const ordered = getOrdering();

  ordered.forEach((element, index) => {
    element.classList.add('umd-element-card-fireworks__popin');
    element.style.setProperty(
      ANIMATION_CONFIG.POP_IN.LAYER_VAR,
      String(ANIMATION_CONFIG.POP_IN.LAYER_BASE_ZINDEX + index),
    );
    element.style.animationDelay = `${
      index * ANIMATION_CONFIG.POP_IN.STEP_MS
    }ms`;
  });

  const animationFinishes = ordered.flatMap((element) =>
    element
      .getAnimations({ subtree: false })
      .filter(
        (animation: any) =>
          animation.animationName === ANIMATION_CONFIG.POP_IN.NAME,
      )
      .map((animation) => animation.finished),
  );
  await Promise.all(animationFinishes);
};

const animateFlareOutToGrid = async (grid: ElementVisual): Promise<void> => {
  const allMedia = getAllMediaInGrid(grid);
  if (allMedia.length === 0) return;

  const animations = allMedia.map((element) => {
    const from = getComputedStyle(element).transform;
    const keyframes = [{ transform: from }, { transform: 'none' }];

    return element.animate(keyframes, {
      duration: ANIMATION_CONFIG.FULL_SCREEN.DURATION_MS,
      easing: ANIMATION_CONFIG.FULL_SCREEN.EASE,
      fill: ANIMATION_CONFIG.FULL_SCREEN.FILL,
    });
  });

  await Promise.all(animations.map((animation) => animation.finished));

  allMedia.forEach((element) => element.style.removeProperty('transform'));
};

const animateFeaturedToFullscreen = (
  grid: ElementVisual,
  featuredElement: ElementVisual,
) => {
  const fullScreenAnimation = async () => {
    const beginningElementRect =
      featuredElement.element.getBoundingClientRect();
    featuredElement.element.classList.add(
      'umd-element-card-fireworks__full-screen',
    );
    const lastElementRect = featuredElement.element.getBoundingClientRect();

    await new Promise((r) => requestAnimationFrame(r));

    const dx = beginningElementRect.left - lastElementRect.left;
    const dy = beginningElementRect.top - lastElementRect.top;
    const sx = beginningElementRect.width / lastElementRect.width;
    const sy = beginningElementRect.height / lastElementRect.height;

    featuredElement.element.style.transformOrigin = 'top left';
    featuredElement.element.style.willChange = 'transform';

    await featuredElement.element.animate(
      [
        { transform: `translate(${dx}px, ${dy}px) scale(${sx}, ${sy})` },
        { transform: 'none' },
      ],
      {
        duration: ANIMATION_CONFIG.FULL_SCREEN.DURATION_MS,
        easing: ANIMATION_CONFIG.FULL_SCREEN.EASE,
        fill: ANIMATION_CONFIG.FULL_SCREEN.FILL,
      },
    ).finished;

    featuredElement.element.style.removeProperty('transformOrigin');
    featuredElement.element.style.removeProperty('willChange');
    featuredElement.element.style.removeProperty('transform');
  };

  const rect = grid.element.getBoundingClientRect();
  const alreadyInView = rect.top <= 0 && rect.bottom > 0;

  const intersectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((element) => {
        if (element.isIntersecting) {
          fullScreenAnimation();
          intersectionObserver.disconnect();
        }
      });
    },
    { threshold: 1 },
  );

  intersectionObserver.observe(grid.element);

  if (alreadyInView) {
    intersectionObserver.disconnect();
    fullScreenAnimation();
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

  const gridCenterX = (gridRect.width - parseInt(gridStyle.paddingLeft)) / 2;
  const gridCenterY = gridRect.height / 2;

  const randomTranslate = (min = 5, max = 20): string => {
    const getRandomNumber = (a: number, b: number) => {
      const sign = Math.random() < 0.5 ? -1 : 1;
      const randomNumber = (Math.random() * (b - a) + a) * sign;

      return Math.round(randomNumber);
    };

    const randomX = getRandomNumber(min, max);
    const randomY = getRandomNumber(min, max);

    return `translate(${randomX}px, ${randomY}px)`;
  };

  const centerElements = [...center.element.children] as HTMLElement[];
  const leftElements = [...left.element.children] as HTMLElement[];
  const rightElements = [...right.element.children] as HTMLElement[];

  const positionCenter = (elements: HTMLElement[]) => {
    elements.forEach((element, index) => {
      element.style.transform = randomTranslate();

      if (index === 0) {
        element.style.transform += `translateY(${gridCenterY}px) translate(0, -50%)`;
      } else if (index === 1) {
        element.style.transform += `translateY(${-gridCenterY}px) translate(0, 50%)`;
      }
    });
  };

  const positionLeft = (elements: HTMLElement[]) => {
    const multipleMedia = elements.length >= 2;

    elements.forEach((element, index) => {
      element.style.transform = `translateX(${gridCenterX}px)`;
      element.style.transform += randomTranslate();

      if (!multipleMedia) {
        element.style.transform += `translate(-50%, 0)`;
        return;
      }

      if (index === 0) {
        element.style.transform += `translate(-50%, 25%)`;
      }

      if (index === 1) {
        element.style.transform += `translate(-50%, -25%)`;
      }
    });
  };

  const positionRight = (elements: HTMLElement[]) => {
    const multipleMedia = elements.length >= 2;

    elements.forEach((element, index) => {
      element.style.transform = `translateX(${-gridCenterX}px)`;
      element.style.transform += randomTranslate();

      if (!multipleMedia) {
        element.style.transform += `translate(50%, 0)`;
        return;
      }

      if (index === 0) {
        element.style.transform += `translate(50%, 25%)`;
      }

      if (index === 1) {
        element.style.transform += `translate(50%, -25%)`;
      }
    });
  };

  positionCenter(centerElements);
  positionLeft(leftElements);
  positionRight(rightElements);
};

const setShowAllElements = (grid: ElementVisual) => {
  getAllMediaInGrid(grid).forEach((element) => {
    element.style.opacity = '1';
  });
};

const observeResize = (container: ElementVisual, callback: () => void) => {
  const resizeObserver = new ResizeObserver(callback);
  resizeObserver.observe(container.element);
};

const observeIntersection = (
  container: ElementVisual,
  onIntersect: () => void,
) => {
  const intersectionObserver = new IntersectionObserver(
    (entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        onIntersect();
        intersectionObserver.disconnect();
      }
    },
    { threshold: 0.7 },
  );
  intersectionObserver.observe(container.element);
};

const runAnimationSequence = async (
  grid: ElementVisual,
  center: ElementVisual,
  featuredElement: ElementVisual,
  isExpandFeature: boolean,
) => {
  const delay = (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  await animatePopInStack(grid, center);
  await delay(200);
  await animateFlareOutToGrid(grid);
  await delay(400);

  if (isExpandFeature) {
    await animateFeaturedToFullscreen(grid, featuredElement);
  }
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

  const featuredElement = createFeaturedElement(featured);
  const centerElements = getCenterElements(featuredElement, images);
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

  const grid = createMainContainer(left, center, right);
  const container = createParentContainer(grid);

  distributeSideElementRatios(grid, left, right);

  if (REDUCE_MOTION) {
    setShowAllElements(grid);
    return container;
  }

  container.styles += ANIMATION_CONFIG.POP_IN.KEYFRAME;

  observeResize(container, () =>
    calculateStackPosition(grid, center, left, right),
  );
  observeIntersection(container, () =>
    runAnimationSequence(grid, center, featuredElement, isExpandFeature),
  );

  return container;
};
