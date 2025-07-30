import * as Styles from '@universityofmaryland/web-styles-library';
import { ElementModel } from 'model';
import { type ElementVisual } from '../../../_types';
import * as Utils from 'utilities';
import { buttons } from 'atomic';

const CLASS_NAMES = {
  CONTAINER: 'umd-element-card-fireworks',
  GRID: 'umd-element-card-fireworks__grid',
  LEFT: 'umd-element-card-fireworks__left',
  CENTER: 'umd-element-card-fireworks__center',
  RIGHT: 'umd-element-card-fireworks__right',
  FEATURED: 'umd-element-card-fireworks__featured',
  FEATURED_WRAPPER: 'umd-element-card-fireworks__featured-wrapper',
  NO_GROW: 'umd-element-card-fireworks__no-grow',
  SHORTENED: 'umd-element-card-fireworks__shortened',
  FULL_SCREEN: 'umd-element-card-fireworks__full-screen',
  POPIN: 'umd-element-card-fireworks__popin',
  FIVE: 'umd-element-card-fireworks__five',
  SIX: 'umd-element-card-fireworks__six',
} as const;

const REDUCE_MOTION = Utils.accessibility.isPrefferdReducedMotion() === true;

const ANIMATION_CONFIG = {
  POP_IN: {
    NAME: 'popIn',
    STEP_MS: 400,
    LAYER_VAR: '--pop-layer',
    LAYER_BASE_ZINDEX: 800,
  },
  FULL_SCREEN: {
    NAME: 'fullscreen',
    DURATION_MS: 500,
    EASE: 'ease-out',
    FILL: 'forwards' as FillMode,
  },
};

const RESPONSIVE_GAP = {
  gap: Styles.token.spacing.min,
  [`@container ${CLASS_NAMES.CONTAINER} (${Styles.token.media.queries.large.min})`]:
    { gap: Styles.token.spacing.md },
  [`@container ${CLASS_NAMES.CONTAINER} (${Styles.token.media.queries.tablet.min})`]:
    { gap: Styles.token.spacing.lg },
  [`@container ${CLASS_NAMES.CONTAINER} (${Styles.token.media.queries.desktop.min})`]:
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

const popInKeyframe = `
@keyframes popIn {
  from { opacity: 1; }
  to   { opacity: 1; }
}
`;

const fadeOutKeyframe = `
@keyframes fadeOut {
  from { opacity: 1; }
  to   { opacity: 0; }
}
`;

const getAllMediaInGrid = (grid: ElementVisual) =>
  [
    ...grid.element.querySelectorAll(`img, .${CLASS_NAMES.FEATURED_WRAPPER}`),
  ] as HTMLElement[];

const createElementContainer = (className: string) =>
  ElementModel.createDiv({
    className,
    elementStyles: {
      element: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        maxHeight: '80vh',
        ...RESPONSIVE_GAP,

        [`&.${CLASS_NAMES.LEFT} > :first-child.${CLASS_NAMES.NO_GROW}`]: {
          height: '60%',
        },
        [`&.${CLASS_NAMES.RIGHT} > :first-child.${CLASS_NAMES.NO_GROW}`]: {
          height: '50%',
        },

        [`&.${CLASS_NAMES.LEFT}, &.${CLASS_NAMES.RIGHT}`]: {
          maxHeight: '90%',
          [`&.${CLASS_NAMES.FIVE}`]: { maxHeight: '90%' },
          [`&.${CLASS_NAMES.SIX}`]: { maxHeight: '80%' },
        },
        [`&.${CLASS_NAMES.SHORTENED}`]: { maxHeight: '90%' },
        [`& .${CLASS_NAMES.NO_GROW}`]: { flexGrow: 0 },

        [`& img, & .${CLASS_NAMES.FEATURED_WRAPPER}`]: {
          position: 'relative',
          width: '100%',
          objectFit: 'cover',
          flexGrow: 1,
          height: 'auto',
          minHeight: 0,
          willChange: 'opacity, transform',
          zIndex: `var(${ANIMATION_CONFIG.POP_IN.LAYER_VAR}, 0)`,
          opacity: 0,

          [`&.${CLASS_NAMES.POPIN}`]: {
            [`@media (prefers-reduced-motion: no-preference)`]: {
              animation: `popIn 1ms steps(1,end) forwards`,
            },
          },
        },
      },
    },
  });

const createParentContainer = ({ grid }: { grid: ElementVisual }) =>
  ElementModel.createDiv({
    className: CLASS_NAMES.CONTAINER,
    children: [grid],
    elementStyles: {
      element: {
        containerName: `${CLASS_NAMES.CONTAINER}`,
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

const createMainContainer = ({
  left,
  center,
  right,
}: {
  left: ElementVisual;
  center: ElementVisual;
  right: ElementVisual;
}) =>
  ElementModel.createDiv({
    className: CLASS_NAMES.GRID,
    children: [left, center, right],
    elementStyles: {
      element: {
        display: 'grid',
        gridTemplateColumns: '1fr 2fr 1fr',
        alignItems: 'center',
        ...RESPONSIVE_GAP,

        [`& .${CLASS_NAMES.FEATURED_WRAPPER}`]: {
          display: 'block',
          aspectRatio: '4 / 3',
          flexGrow: 0,

          [`&.${CLASS_NAMES.FULL_SCREEN}`]: {
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            zIndex: 9999,
          },

          [`& .${CLASS_NAMES.FEATURED}`]: {
            height: '100%',
            width: '100%',
            objectFit: 'cover',
          },
        },

        [`& .${CLASS_NAMES.FEATURED_WRAPPER}:nth-child(2)`]: {
          aspectRatio: '5 / 3',
        },
      },
    },
  });

const createFeaturedElement = ({
  featured,
}: {
  featured: HTMLVideoElement | HTMLImageElement;
}) => {
  const featuredElement = ElementModel.create({
    element: featured,
    className: CLASS_NAMES.FEATURED,
    elementStyles: { element: { height: '100%' } },
  });

  return ElementModel.create({
    element: document.createElement('div'),
    className: CLASS_NAMES.FEATURED_WRAPPER,
    children: [featuredElement],
    elementStyles: { element: { zIndex: '999', position: 'relative' } },
  });
};

const distributeCenterElements = ({
  center,
  featuredElement,
  images,
}: {
  center: ElementVisual;
  featuredElement: ElementVisual;
  images: HTMLElement[];
}) => {
  if (images.length == 0) {
    return;
  }
  const centerElement = center.element;
  const isEvenCount = (images.length + 1) % 2 === 0;
  const firstMedia = images[0];

  centerElement.appendChild(featuredElement.element);

  if (!isEvenCount) {
    return;
  }

  firstMedia.classList.add(CLASS_NAMES.FEATURED);
  centerElement.appendChild(firstMedia);
  images.splice(0, 1);
};

const distributeSideElements = (
  left: ElementVisual,
  right: ElementVisual,
  images: HTMLElement[],
) => {
  images.forEach((element, index) => {
    const isEvenIndex = index % 2 === 0;

    if (isEvenIndex) {
      left.element.appendChild(element);
    } else {
      right.element.appendChild(element);
    }
  });
};

const distributeSideElementRatios = (
  grid: ElementVisual,
  left: ElementVisual,
  right: ElementVisual,
  center: ElementVisual,
) => {
  const leftChildren = [...left.element.children] as HTMLElement[];
  const rightChildren = [...right.element.children] as HTMLElement[];
  const allMedia = getAllMediaInGrid(grid);
  const centerHasMultipleMedia = center.element.children.length >= 2;

  if (leftChildren.length <= 0 || rightChildren.length <= 0) {
    return;
  }
  const firstLeftChild = leftChildren[0];
  const firstRightChild = rightChildren[0];

  if (allMedia.length === 5) {
    left.element.classList.add(CLASS_NAMES.FIVE);
    right.element.classList.add(CLASS_NAMES.FIVE);
  }

  if (allMedia.length === 6) {
    left.element.classList.add(CLASS_NAMES.SIX);
    right.element.classList.add(CLASS_NAMES.SIX);
  }

  if (centerHasMultipleMedia) {
    left.element.classList.add(CLASS_NAMES.SHORTENED);
    right.element.classList.add(CLASS_NAMES.SHORTENED);
  }

  if (firstLeftChild) {
    firstLeftChild.classList.add(CLASS_NAMES.NO_GROW);
  }

  if (firstRightChild) {
    firstRightChild.classList.add(CLASS_NAMES.NO_GROW);
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
    element.classList.add(CLASS_NAMES.POPIN);
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
    featuredElement.element.classList.add(CLASS_NAMES.FULL_SCREEN);
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

const setVideoControls = (
  featured: HTMLElement,
  featuredWrapper: ElementVisual,
  container: ElementVisual,
) => {
  if (!(featured instanceof HTMLVideoElement)) {
    return;
  }

  const buttonState = buttons.videoState({ video: featured });
  container.styles += buttonState.styles;
  featuredWrapper.element.appendChild(buttonState.element);

  featured.muted = true;
  featured.loop = true;
  featured.playsInline = true;
  featured.autoplay = true;
  featured.preload = 'auto';
  featured.removeAttribute('controls');
  buttonState.events.setButtonPlay();

  if (REDUCE_MOTION) {
    featured.loop = false;
    featured.autoplay = false;
    featured.pause();
    buttonState.events.setButtonPause();
  }
};

const setLayoutGrid = (
  grid: ElementVisual,
  left: ElementVisual,
  center: ElementVisual,
  right: ElementVisual,
  featuredElement: ElementVisual,
  images: HTMLElement[],
) => {
  distributeCenterElements({ center, featuredElement, images });
  distributeSideElements(left, right, images);
  distributeSideElementRatios(grid, left, right, center);
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
  right: ElementVisual,
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
  const left = createElementContainer(CLASS_NAMES.LEFT);
  const center = createElementContainer(CLASS_NAMES.CENTER);
  const right = createElementContainer(CLASS_NAMES.RIGHT);

  const grid = createMainContainer({ left, center, right });
  const container = createParentContainer({ grid });
  const featuredElement = createFeaturedElement({ featured });

  setVideoControls(featured, featuredElement, container);
  setLayoutGrid(grid, left, center, right, featuredElement, images);

  if (REDUCE_MOTION) {
    setShowAllElements(grid);
    return container;
  }

  container.styles += fadeOutKeyframe;
  container.styles += popInKeyframe;

  observeResize(container, () =>
    calculateStackPosition(grid, center, left, right),
  );
  observeIntersection(container, () =>
    runAnimationSequence(grid, center, right, featuredElement, isExpandFeature),
  );

  return container;
};
