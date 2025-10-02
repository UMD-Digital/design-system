import * as Styles from '@universityofmaryland/web-styles-library';
import { ElementModel } from 'model';
import { assets } from 'atomic';
import { theme, accessibility } from 'utilities';
import { type ElementVisual } from '../../../_types';

interface CardStackProps {
  featured: HTMLImageElement | HTMLVideoElement;
  images: HTMLImageElement[];
  isExpandFeature: boolean;
}

interface ConfigurationItem {
  column?: string;
  row?: string;
  zIndex?: number;
  featured?: boolean;
  matchWidth?: boolean;
  offset?: {
    top?: string;
    left?: string;
    right?: string;
    bottom?: string;
  };
}

interface Configuration {
  count: number;
  layout: {
    gridTemplateColumns: string;
    gridTemplateRows: string;
  };
  items: ConfigurationItem[];
}

const configuration: Configuration[] = [
  {
    count: 4,
    layout: {
      gridTemplateColumns: 'repeat(15, 10vw)',
      gridTemplateRows: 'repeat(15, 8vh)',
    },
    items: [
      {
        column: '3 / 8',
        row: '4 / 5',
        zIndex: 9,
        offset: {
          top: '-10%',
          left: '-5%',
        },
      },
      {
        column: '12 / 15',
        row: '2 / 6',
        offset: {
          top: '-1%',
          right: '-4%',
        },
      },
      {
        column: '4 / 7',
        row: '10 / 15',
        zIndex: 9,
        offset: {
          bottom: '-13%',
          left: '-4%',
        },
      },
      {
        column: '13 / 15',
        row: '10 / 14',
        offset: {
          right: '-8%',
          bottom: '-3%',
        },
      },
    ],
  },
  {
    count: 5,
    layout: {
      gridTemplateColumns: 'repeat(15, 10vw)',
      gridTemplateRows: 'repeat(15, 8vh)',
    },
    items: [
      {
        column: '2 / 6',
        row: '4 / 9',
        zIndex: 9,
        offset: {
          top: '-10%',
          left: '-6%',
        },
      },
      {
        column: '12 / 15',
        row: '2 / 5',
        offset: {
          top: '-3%',
          right: '-5%',
        },
      },
      {
        column: '10 / 12',
        row: '3 / 5',
        offset: {
          bottom: '-20%',
          right: '-1%',
        },
      },
      {
        column: '1 / 4',
        row: '8/ 13',
        zIndex: 9,
        offset: {
          bottom: '-10%',
          left: '-10%',
        },
      },
      {
        column: '12 / 15',
        row: '10 / 14',
        offset: {
          right: '-10%',
          bottom: '-7%',
        },
      },
    ],
  },
  {
    count: 6,
    layout: {
      gridTemplateColumns: 'repeat(15, 10vw)',
      gridTemplateRows: 'repeat(15, 8vh)',
    },
    items: [
      {
        column: '2 / 6',
        row: '4 / 9',
        zIndex: 9,
        offset: {
          top: '-10%',
          left: '-6%',
        },
      },
      {
        column: '12 / 15',
        row: '2 / 5',
        offset: {
          top: '-3%',
          right: '-5%',
        },
      },
      {
        column: '10 / 12',
        row: '3 / 5',
        offset: {
          bottom: '-20%',
          right: '-1%',
        },
      },
      {
        column: '12 / 15',
        row: '6 / 8',
        offset: {
          bottom: '-5%',
          right: '-20%',
        },
      },
      {
        column: '1 / 4',
        row: '8/ 13',
        zIndex: 9,
        offset: {
          bottom: '-10%',
          left: '-10%',
        },
      },
      {
        column: '12 / 15',
        row: '10 / 14',
        offset: {
          right: '-10%',
          bottom: '-7%',
        },
      },
    ],
  },
  {
    count: 7,
    layout: {
      gridTemplateColumns: 'repeat(15, 10vw)',
      gridTemplateRows: 'repeat(15, 8vh)',
    },
    items: [
      {
        column: '2 / 6',
        row: '4 / 9',
        zIndex: 9,
        offset: {
          top: '-10%',
          left: '-6%',
        },
      },
      {
        column: '12 / 15',
        row: '2 / 5',
        offset: {
          top: '-3%',
          right: '-5%',
        },
      },
      {
        column: '10 / 12',
        row: '3 / 5',
        offset: {
          bottom: '-20%',
          right: '-1%',
        },
      },
      {
        column: '12 / 15',
        row: '6 / 8',
        offset: {
          bottom: '-5%',
          right: '-20%',
        },
      },
      {
        column: '1 / 4',
        row: '8/ 13',
        zIndex: 9,
        offset: {
          bottom: '-10%',
          left: '-10%',
        },
      },
      {
        column: '12 / 15',
        row: '10 / 14',
        offset: {
          right: '-10%',
          bottom: '-7%',
        },
      },
      {
        column: '6 / 9',
        row: '10 / 15',
        offset: {
          right: '-10%',
          bottom: '-25%',
        },
      },
    ],
  },
  {
    count: 8,
    layout: {
      gridTemplateColumns: 'repeat(15, 10vw)',
      gridTemplateRows: 'repeat(15, 8vh)',
    },
    items: [
      {
        column: '2 / 6',
        row: '4 / 9',
        zIndex: 9,
        offset: {
          top: '-10%',
          left: '-6%',
        },
      },
      {
        column: '12 / 15',
        row: '2 / 5',
        offset: {
          top: '-3%',
          right: '-5%',
        },
      },
      {
        column: '10 / 12',
        row: '3 / 5',
        offset: {
          bottom: '-20%',
          right: '-1%',
        },
      },
      {
        column: '3 / 9',
        row: '1 / 3',
        offset: {
          right: '-10%',
          top: '-25%',
        },
      },
      {
        column: '12 / 15',
        row: '6 / 8',
        offset: {
          bottom: '-5%',
          right: '-20%',
        },
      },
      {
        column: '1 / 4',
        row: '8/ 13',
        zIndex: 9,
        offset: {
          bottom: '-10%',
          left: '-10%',
        },
      },
      {
        column: '12 / 15',
        row: '10 / 14',
        offset: {
          right: '-10%',
          bottom: '-7%',
        },
      },
      {
        column: '6 / 9',
        row: '10 / 15',
        offset: {
          right: '-10%',
          bottom: '-25%',
        },
      },
    ],
  },
];

// Class name constants
const STACK_CONTAINER_CLASS = 'brand-animations-card-stack';
const STACK_ELEMENT_CLASS = `${STACK_CONTAINER_CLASS}-element`;
const STACK_GRID_CLASS = `${STACK_CONTAINER_CLASS}-grid`;
const STACK_ITEM_CLASS = `${STACK_CONTAINER_CLASS}-item`;
const STACK_GRID_ERROR_CLASS = `${STACK_GRID_CLASS}-error`;

const KEY_FRAME_GRID_EXPAND = 'grid-expand';
const KEY_FRAME_GRID_ITEM = 'grid-item';
const KEY_FRAME_FEATURED_SIZE = 'featured-size';

const isPreferReducedMotion = accessibility.isPrefferdReducedMotion();
const isScrollTimelineSupported = () =>
  'ScrollTimeline' in window || CSS.supports('animation-timeline', 'scroll()');
const isDisplayWithoutAnimation =
  isPreferReducedMotion || !isScrollTimelineSupported();

const getResponsiveSizes = () => {
  const windowWidth = window.innerWidth;

  if (windowWidth >= 1024) {
    return { width: 0.4, height: 0.4 };
  } else if (windowWidth >= 768) {
    return { width: 0.5, height: 0.5 };
  } else {
    return { width: 0.8, height: 0.5 };
  }
};

const keyFrameGridExpand = `
  @keyframes ${KEY_FRAME_GRID_EXPAND} {
    to {
      transform: translate(0, 0);
      width: inherit;
    }
  }
`;

const keyFrameGridItem = `
  @keyframes ${KEY_FRAME_GRID_ITEM} {
    to {
      opacity: 0;
    }
  }
`;

const keyFrameFeaturedSize = `
  @keyframes ${KEY_FRAME_FEATURED_SIZE} {
    to {
      width: 100%;
      height: 100vh;
      top: 0%;
    }
  }
`;

/**
 * Waits for all media elements (images and videos) to load and render.
 *
 * @param container - The container element containing the media
 * @returns Promise that resolves when all media is loaded and rendered
 */
const waitForMediaLoad = async (container: HTMLElement): Promise<void> => {
  const images = Array.from(container.querySelectorAll('img'));
  const videos = Array.from(container.querySelectorAll('video'));

  const imagePromises = images.map((img) => {
    if (img.complete) {
      // Check if image loaded successfully or failed
      if (img.naturalWidth > 0) {
        return Promise.resolve();
      } else {
        // Image is complete but has no natural dimensions - it failed to load
        return Promise.reject(new Error(`Failed to load image: ${img.src}`));
      }
    }
    return new Promise<void>((resolve, reject) => {
      img.addEventListener('load', () => resolve(), { once: true });
      img.addEventListener(
        'error',
        () => reject(new Error(`Failed to load image: ${img.src}`)),
        { once: true },
      );
    });
  });

  const videoPromises = videos.map((video) => {
    if (video.readyState >= 3) {
      return Promise.resolve();
    }
    return new Promise<void>((resolve, reject) => {
      video.addEventListener('loadeddata', () => resolve(), { once: true });
      video.addEventListener(
        'error',
        () => reject(new Error(`Failed to load video: ${video.src}`)),
        { once: true },
      );
    });
  });

  await Promise.all([...imagePromises, ...videoPromises]);

  return new Promise<void>((resolve) => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        resolve();
      });
    });
  });
};

/**
 * Retrieves the configuration object for a specific element count.
 *
 * @param count - The number of elements to display
 * @returns The configuration object for the given count, or undefined if not found
 */
const getConfigurationByCount = (count: number) => {
  return configuration.find((c) => c.count === count);
};

/**
 * Gets the stack element from a grid item.
 *
 * @param gridItem - The grid item element
 * @param index - The index of the stack element
 * @returns The stack element or null if not found
 */
const getStackElementFromGridItem = (
  gridItem: HTMLElement,
  index: number,
): HTMLElement | null => {
  return gridItem.querySelector(
    `.${STACK_ELEMENT_CLASS}-${index}`,
  ) as HTMLElement;
};

/**
 * Calculates the transform values (x, y) needed to center an element
 * relative to the brand-animations-card-stack-grid container with optional offset.
 *
 * @param element - The element to be centered
 * @param gridContainer - The grid container element
 * @param offset - Optional offset values in percentages
 * @returns Transform values {x, y} in pixels to center the element with offset
 */
const calculateCenterTransform = (
  element: HTMLElement,
  centerElement: HTMLElement,
  offset?: {
    top?: string;
    left?: string;
    right?: string;
    bottom?: string;
  },
): { x: number; y: number } => {
  const elementRect = element.getBoundingClientRect();
  const centerRect = centerElement.getBoundingClientRect();

  const centerX = centerRect.left + centerRect.width / 2;
  const centerY = centerRect.top + centerRect.height / 2;

  const elementCenterX = elementRect.left + elementRect.width / 2;
  const elementCenterY = elementRect.top + elementRect.height / 2;

  let translateX = centerX - elementCenterX;
  let translateY = centerY - elementCenterY;

  if (offset) {
    const applyOffset = (
      value: string | undefined,
      dimension: number,
    ): number => {
      return value ? (parseFloat(value) / 100) * dimension : 0;
    };

    translateX += applyOffset(offset.left, centerRect.width);
    translateX -= applyOffset(offset.right, centerRect.width);
    translateY += applyOffset(offset.top, centerRect.height);
    translateY -= applyOffset(offset.bottom, centerRect.height);
  }

  return {
    x: translateX,
    y: translateY,
  };
};

/**
 * Clears animations from elements.
 *
 * @param featuredElement - The featured element
 * @param gridContainer - The grid container element
 */
const clearElementAnimations = (
  featuredElement: HTMLElement | null,
  gridContainer: HTMLElement | null,
): void => {
  if (featuredElement) {
    featuredElement.style.animation = 'none';
  }
  if (gridContainer) {
    gridContainer.style.animation = 'none';
  }
};

/**
 * Checks if the current device is mobile based on viewport width.
 *
 * @returns True if device is mobile (width < 768px)
 */
const isMobileDevice = (): boolean => {
  return window.innerWidth < 768;
};

/**
 * Creates a resize handler function that only executes on actual window resizes.
 *
 * @param onResize - Callback to execute on resize
 * @param delay - Delay in milliseconds before executing callback
 * @returns Resize handler function
 */
const createResizeHandler = (
  onResize: () => void,
  delay: number = 300,
): (() => void) => {
  let timeoutId: NodeJS.Timeout | null = null;
  let previousWidth = window.innerWidth;

  return () => {
    const currentWidth = window.innerWidth;

    // Only trigger on width changes (actual resize, not mobile scroll)
    if (currentWidth === previousWidth) {
      return;
    }

    previousWidth = currentWidth;

    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      onResize();
      timeoutId = null;
    }, delay);
  };
};

/**
 * Sets opacity with optional transition.
 *
 * @param element - The element to modify
 * @param opacity - The opacity value
 * @param transition - Optional transition string
 */
const setElementOpacity = (
  element: HTMLElement,
  opacity: string,
  transition?: string,
): void => {
  element.style.opacity = opacity;
  if (transition) {
    element.style.transition = transition;
  }
};

/**
 * Validates required elements for animation.
 *
 * @param gridContainer - The grid container element
 * @param config - Configuration object
 * @returns True if all required elements are present
 */
const validateAnimationElements = (
  gridContainer: HTMLElement | null,
  config: Configuration | undefined,
): boolean => {
  return gridContainer !== null && config !== undefined;
};

/**
 * Applies dimension and position transforms to a grid element.
 *
 * @param element - The element to transform
 * @param itemConfig - Configuration for this specific item
 * @param featuredElement - The featured element for sizing reference
 * @param gridContainer - The grid container for position reference
 */
const applyElementTransforms = (
  element: HTMLElement,
  itemConfig: ConfigurationItem,
  featuredElement: HTMLElement,
): void => {
  if (featuredElement) {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const featuredWidth = featuredElement.offsetWidth;
    const featuredHeight = featuredElement.offsetHeight;
    const isLargerThan40Percent =
      featuredWidth > windowWidth * 0.41 ||
      featuredHeight > windowHeight * 0.41;

    if (!isLargerThan40Percent) {
      element.style.width = `${featuredWidth}px`;
      element.style.height = `${featuredHeight}px`;
    } else {
      const parentContainer = featuredElement.parentElement;
      const parentWidth = parentContainer
        ? parentContainer.offsetWidth
        : windowWidth;

      const { width: widthPercentage, height: heightVh } = getResponsiveSizes();
      const width = Math.round(parentWidth * widthPercentage);
      const height = Math.round(windowHeight * heightVh);

      element.style.width = `${width}px`;
      element.style.height = `${height}px`;
    }
  }

  const transform = calculateCenterTransform(
    element,
    featuredElement,
    itemConfig?.offset,
  );
  element.style.transform = `translate(${transform.x}px, ${transform.y}px)`;
};

/**
 * Processes all grid items for animation.
 *
 * @param gridContainer - The grid container element
 * @param config - Configuration object
 * @returns void
 */
const processGridAnimation = (
  featuredElement: HTMLElement,
  gridContainer: HTMLElement,
  config: Configuration,
): void => {
  const gridItems = Array.from(gridContainer.children) as HTMLElement[];

  gridItems.forEach((gridItem, index) => {
    const element = getStackElementFromGridItem(gridItem, index);

    if (!element) {
      return;
    }

    const itemConfig = config.items[index];

    applyElementTransforms(element, itemConfig, featuredElement);
  });
};

const createGridElement = (
  element: HTMLImageElement | HTMLVideoElement,
  index: number,
  placement: ConfigurationItem,
) => {
  const children: ElementVisual[] = [];

  if (element.tagName === 'IMG') {
    children.push(
      assets.image.background({
        element: element as HTMLImageElement,
        isScaled: true,
      }),
    );
  }

  const rowStart = placement.row ? parseInt(placement.row.split(' / ')[0]) : 0;

  const getStartRange = (row: number): number => {
    if (row >= 13) return -70;
    if (row >= 10 && row <= 12) return -40;
    if (row >= 6 && row < 10) return 40;
    return 80;
  };

  const getEndRange = (row: number): number => {
    if (row >= 13) return 120;
    if (row >= 10 && row <= 12) return 140;
    if (row >= 6 && row < 10) return 160;
    return 170;
  };

  const startRange = getStartRange(rowStart);
  const endRange = getEndRange(rowStart);
  const animationRangeStart = `${startRange}vh`;
  const animationRangeEnd = `${endRange}vh`;

  return ElementModel.createDiv({
    className: `${STACK_ELEMENT_CLASS}-${index}`,
    children,
    elementStyles: {
      element: {
        overflow: 'clip',
        height: '100%',
        width: '100%',

        ...theme.media.withViewTimelineAnimation({
          animation: `${KEY_FRAME_GRID_EXPAND} ease-in-out forwards`,
          animationTimeline: 'view()',
          animationRangeStart,
          animationRangeEnd,
          animationDuration: '1ms',
        }),
      },
    },
  });
};

const createGridItem = (
  element: HTMLImageElement | HTMLVideoElement,
  placement: ConfigurationItem,
  index: number,
) => {
  const rowStart = placement.row ? parseInt(placement.row.split(' / ')[0]) : 0;
  const startRange = rowStart > 8 ? 0 : 80;
  const endRange = rowStart > 8 ? 200 : 200;
  const animationRangeStart = `${startRange}vh`;
  const animationRangeEnd = `${endRange}vh`;

  return ElementModel.createDiv({
    className: `${STACK_ITEM_CLASS}-${index}`,
    children: [createGridElement(element, index, placement)],
    elementStyles: {
      element: {
        gridColumn: placement.column,
        gridRow: placement.row,
        zIndex: placement.zIndex || 1,
        width: '100%',
        height: '100%',

        [`@media (${Styles.token.media.queries.large.max})`]: {
          [`@supports not (animation-timeline: scroll())`]: {
            display: 'none',
          },
        },

        ...(isDisplayWithoutAnimation && {
          display: 'none',
        }),

        ...theme.media.withViewTimelineAnimation({
          animation: `${KEY_FRAME_GRID_ITEM} ease-in-out forwards`,
          animationTimeline: 'view()',
          animationRangeStart,
          animationRangeEnd,
        }),
      },
    },
  });
};

const createGrid = (props: CardStackProps) => {
  const totalCount = props.images.length;
  const config = getConfigurationByCount(totalCount);

  if (!config) {
    console.warn(`No configuration found for ${totalCount} elements`);
    return ElementModel.createDiv({
      className: STACK_GRID_ERROR_CLASS,
    });
  }

  const gridItems = props.images.map((element, index) => {
    const placement = config.items[index];
    return createGridItem(element, placement, index);
  });

  return ElementModel.createDiv({
    className: STACK_GRID_CLASS,
    children: gridItems,
    elementStyles: {
      element: {
        display: 'grid',
        gridTemplateColumns: 'repeat(16, 1fr)',
        gridTemplateRows: 'repeat(16, 2vh)',
        gap: Styles.token.spacing.min,
        minHeight: '300px',

        [`@media (${Styles.token.media.queries.large.max})`]: {
          '@supports not (animation-timeline: scroll())': {
            width: '100%',
          },
        },

        ...theme.media.withViewTimelineAnimation({
          gridTemplateColumns: config.layout.gridTemplateColumns,
          gridTemplateRows: config.layout.gridTemplateRows,
          transform: 'translate(-50%, -25%)',
        }),
      },
    },
  });
};

const createFeatured = (
  element: HTMLImageElement | HTMLVideoElement,
  isExpand: boolean,
  totalCount: number,
) => {
  const children: ElementVisual[] = [];
  let video: (ElementVisual & { events: { setPlay: () => void } }) | undefined;

  if (element.tagName === 'IMG') {
    children.push(
      assets.image.background({
        element: element as HTMLImageElement,
        isScaled: true,
      }),
    );
  }

  if (element.tagName === 'VIDEO') {
    element.setAttribute('muted', 'true');
    element.setAttribute('playsinline', 'true');
    element.setAttribute('loop', 'true');

    video = assets.video.toggle({
      video: element as HTMLVideoElement,
      isScaled: true,
    });
    children.push(video);
  }

  const { width: widthPercentage, height: heightVh } = getResponsiveSizes();

  const featuredElement = ElementModel.createDiv({
    className: `${STACK_ELEMENT_CLASS}-featured`,
    children,
    elementStyles: {
      element: {
        position: 'absolute',
        top: '20vh',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 999,
        width: `${widthPercentage * 100}%`,
        height: `${heightVh * 100}vh`,

        ...(isDisplayWithoutAnimation && {
          top: '0',
        }),

        [`@media (${Styles.token.media.queries.large.max})`]: {
          '@supports not (animation-timeline: view())': {
            width: '100% !important',
            height: '100% !important',
            top: '0',
          },
        },

        ...(isExpand && {
          ...theme.media.withViewTimelineAnimation({
            top: '30vh',
            animation: `${KEY_FRAME_FEATURED_SIZE} ease-in-out forwards`,
            animationTimeline: 'view()',
            animationRangeStart: `${100 + (totalCount - 4) * 10}vh`,
            animationRangeEnd: '250vh',
          }),
        }),
      },
    },
  });

  if (isExpand && featuredElement.element instanceof HTMLElement) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (video) video.events.setPlay();
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: `-${100 + (totalCount - 4) * 10}px 0px 0px 0px`,
        threshold: 0,
      },
    );

    observer.observe(featuredElement.element);
  }

  return featuredElement;
};

const createSticky = (props: CardStackProps) => {
  const wrapper = ElementModel.createDiv({
    className: `${STACK_CONTAINER_CLASS}-sticky-wrapper`,
    children: [
      createGrid(props),
      createFeatured(
        props.featured,
        props.isExpandFeature,
        props.images.length,
      ),
    ],
    elementStyles: {
      element: {
        position: 'relative',

        ...theme.media.withViewTimelineAnimation({
          position: 'sticky',
          top: 0,
        }),
      },
    },
  });

  return ElementModel.createDiv({
    className: `${STACK_CONTAINER_CLASS}-sticky`,
    children: [wrapper],
    elementStyles: {
      element: {
        ...theme.media.withViewTimelineAnimation({
          height: '200vh',

          ...(props.isExpandFeature && {
            height: '250vh',
          }),
        }),
      },
    },
  });
};

export default (props: CardStackProps) => {
  const composite = ElementModel.createDiv({
    className: STACK_CONTAINER_CLASS,
    children: [createSticky(props)],
    elementStyles: {
      element: {
        containerType: 'inline-size',
        opacity: '0',
        overflow: 'clip',
      },
    },
  });

  const loadAnimation = async () => {
    const totalCount = props.images.length;
    const config = getConfigurationByCount(totalCount);
    const gridContainer = composite.element.querySelector(
      `.${STACK_GRID_CLASS}`,
    ) as HTMLElement;
    const featuredElement = composite.element.querySelector(
      `.${STACK_ELEMENT_CLASS}-featured`,
    ) as HTMLElement;
    let animationsCleared = false;

    if (!validateAnimationElements(gridContainer, config)) {
      return;
    }

    const clearAnimations = () => {
      if (animationsCleared) return;

      clearElementAnimations(featuredElement, gridContainer);
      animationsCleared = true;

      setTimeout(() => {
        processGridAnimation(props.featured, gridContainer!, config!);
      }, 100);
    };

    try {
      await waitForMediaLoad(gridContainer!);
    } catch (error) {
      console.warn('Media loading failed, proceeding with animation:', error);
    }

    processGridAnimation(props.featured, gridContainer!, config!);
    setElementOpacity(composite.element, '1');

    if (!isMobileDevice()) {
      const resizeHandler = createResizeHandler(() => {
        setTimeout(() => {
          processGridAnimation(props.featured, gridContainer!, config!);
          setTimeout(() => {
            setElementOpacity(composite.element, '1');
            animationsCleared = false;
          }, 100);
        }, 200);
      });

      window.addEventListener('resize', () => {
        if (isMobileDevice()) {
          return;
        }

        if (composite.element.style.opacity === '1') {
          setElementOpacity(composite.element, '0', 'opacity 0.3s ease-in-out');
        }

        clearAnimations();
        resizeHandler();
      });
    }
  };

  composite.styles += keyFrameGridExpand;
  composite.styles += keyFrameGridItem;
  composite.styles += keyFrameFeaturedSize;

  return {
    ...composite,
    events: {
      loadAnimation,
    },
  };
};
