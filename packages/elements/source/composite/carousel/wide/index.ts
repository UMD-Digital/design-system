import { ElementBuilder } from '@universityofmaryland/web-builder-library';
import * as token from '@universityofmaryland/web-styles-library/token';
import { assets } from 'atomic';
import { createContainer } from './container';
import { type CarouselWideProps } from '../_types';

interface CarouselState {
  currentIndex: number;
  isAnimating: boolean;
  slides: CarouselWideProps['slides'];
}

interface CarouselRefs {
  container: HTMLElement;
  slidesContainer: HTMLDivElement;
  slides: HTMLElement[];
  previews: {
    left: HTMLElement;
    right: HTMLElement;
  };
  controls: {
    prev: HTMLButtonElement;
    next: HTMLButtonElement;
  };
  indicator: {
    element: HTMLElement;
    position: (index: number) => void;
  };
  info: HTMLParagraphElement;
}

// Constants
const ANIMATION_TIME: 500 = 500;
const PREVIEW_ANIMATION_TIME: 440 = 440; // 60ms faster than main animation

// Pure animation functions
const getAdjacentIndices = (
  currentIndex: number,
  totalSlides: number,
): { leftIndex: number; rightIndex: number } => {
  const lastIndex = totalSlides - 1;
  return {
    leftIndex: currentIndex === 0 ? lastIndex : currentIndex - 1,
    rightIndex: currentIndex === lastIndex ? 0 : currentIndex + 1,
  };
};

const positionSlideOffScreen = (
  slide: HTMLElement,
  direction: 'left' | 'right',
): void => {
  slide.setAttribute('data-direction', direction);
  slide.setAttribute('data-animating', 'true');
  slide.offsetHeight; // Force reflow
};

const activateSlideTransition = (
  slide: HTMLElement,
  direction?: 'left' | 'right',
): void => {
  if (direction) {
    slide.setAttribute('data-direction', direction);
  } else {
    slide.removeAttribute('data-direction');
    slide.setAttribute('data-active', 'true');
  }
};

const cleanupSlideTransition = (slide: HTMLElement, isNew: boolean): void => {
  if (isNew) {
    slide.removeAttribute('data-animating');
  } else {
    slide.removeAttribute('data-active');
    slide.removeAttribute('data-direction');
    slide.removeAttribute('data-content-visible');
  }
};

// Pure preview functions
const createPreviewElement = (
  slide: CarouselWideProps['slides'][0],
): HTMLElement => {
  const imageCopy = slide.image.cloneNode(true) as HTMLImageElement;
  const preview = assets.image.background({
    element: imageCopy,
    isScaled: true,
  });

  preview.element.style.transition = `transform ${PREVIEW_ANIMATION_TIME}ms ease-in-out`;
  return preview.element;
};

const clearPreviewContainer = (container: HTMLElement): void => {
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
};

const appendPreviewWithAnimation = (
  container: HTMLElement,
  preview: HTMLElement,
  animationDirection: 'reverse' | 'advance',
): void => {
  // Position off-screen initially based on animation direction
  // For advance (forward), new content comes from right
  // For reverse (backward), new content comes from left
  preview.style.transform =
    animationDirection === 'advance' ? 'translateX(100%)' : 'translateX(-100%)';

  container.appendChild(preview);

  // Trigger animation to slide in
  requestAnimationFrame(() => {
    preview.style.transform = 'translateX(0)';
  });
};

const animatePreviewOut = (
  preview: HTMLElement,
  animationDirection: 'reverse' | 'advance',
): Promise<void> => {
  return new Promise((resolve) => {
    // For advance (forward), old content exits to left
    // For reverse (backward), old content exits to right
    preview.style.transform =
      animationDirection === 'advance'
        ? 'translateX(-100%)'
        : 'translateX(100%)';

    setTimeout(() => {
      if (preview.parentNode) {
        preview.parentNode.removeChild(preview);
      }
      resolve();
    }, PREVIEW_ANIMATION_TIME);
  });
};

// State management
const updatePreviews = (
  refs: CarouselRefs,
  state: CarouselState,
  direction?: 'reverse' | 'advance',
): void => {
  const { currentIndex, slides } = state;
  const { leftIndex, rightIndex } = getAdjacentIndices(
    currentIndex,
    slides.length,
  );

  // Handle left preview
  if (slides[leftIndex]) {
    const existingLeft = refs.previews.left.firstElementChild as HTMLElement;
    if (existingLeft && direction) {
      animatePreviewOut(existingLeft, direction);
    } else if (existingLeft) {
      clearPreviewContainer(refs.previews.left);
    }

    const leftPreview = createPreviewElement(slides[leftIndex]);
    if (direction) {
      appendPreviewWithAnimation(refs.previews.left, leftPreview, direction);
    } else {
      refs.previews.left.appendChild(leftPreview);
    }
  }

  // Handle right preview
  if (slides[rightIndex]) {
    const existingRight = refs.previews.right.firstElementChild as HTMLElement;
    if (existingRight && direction) {
      animatePreviewOut(existingRight, direction);
    } else if (existingRight) {
      clearPreviewContainer(refs.previews.right);
    }

    const rightPreview = createPreviewElement(slides[rightIndex]);
    if (direction) {
      appendPreviewWithAnimation(refs.previews.right, rightPreview, direction);
    } else {
      refs.previews.right.appendChild(rightPreview);
    }
  }
};

const updateInfo = (refs: CarouselRefs, newIndex: number) => {
  refs.info.textContent = `Slide ${newIndex + 1} Selected`;
};

const animateSlides = (
  refs: CarouselRefs,
  state: CarouselState,
  newIndex: number,
  direction: 'reverse' | 'advance',
) => {
  if (state.isAnimating || state.currentIndex === newIndex) return;
  state.isAnimating = true;

  const currentSlide = refs.slides[state.currentIndex];
  const newSlide = refs.slides[newIndex];

  // Disable controls during animation
  refs.controls.prev.setAttribute('disabled', '');
  refs.controls.next.setAttribute('disabled', '');

  // Position new slide off-screen
  const newSlideDirection = direction === 'reverse' ? 'left' : 'right';
  positionSlideOffScreen(newSlide, newSlideDirection);

  // Update indicator position
  refs.indicator.position(newIndex);

  // Start synchronized animations for all frames
  requestAnimationFrame(() => {
    // Animate main slides
    activateSlideTransition(newSlide);
    const currentSlideDirection = direction === 'reverse' ? 'right' : 'left';
    activateSlideTransition(currentSlide, currentSlideDirection);

    // Update previews with animation (this will animate in sync)
    const nextState = { ...state, currentIndex: newIndex };
    updatePreviews(refs, nextState, direction);
  });

  // Clean up after animation
  setTimeout(() => {
    // Clean up main slides
    cleanupSlideTransition(currentSlide, false);
    cleanupSlideTransition(newSlide, true);

    // Show content with fade-in animation
    newSlide.setAttribute('data-content-visible', 'true');

    // Re-enable controls
    refs.controls.prev.removeAttribute('disabled');
    refs.controls.next.removeAttribute('disabled');

    // Update state
    state.currentIndex = newIndex;
    state.isAnimating = false;

    // Update accessibility info
    updateInfo(refs, newIndex);
  }, ANIMATION_TIME);
};

const setupSliderControls = (refs: CarouselRefs, state: CarouselState) => {
  const lastIndex = state.slides.length - 1;

  refs.controls.prev.addEventListener('click', () => {
    if (state.isAnimating) return;

    const newIndex =
      state.currentIndex === lastIndex ? 0 : state.currentIndex + 1;
    animateSlides(refs, state, newIndex, 'advance');
  });

  refs.controls.next.addEventListener('click', () => {
    if (state.isAnimating) return;

    const newIndex =
      state.currentIndex === 0 ? lastIndex : state.currentIndex - 1;
    animateSlides(refs, state, newIndex, 'reverse');
  });
};

// Main component
export default (props: CarouselWideProps) => {
  const { title } = props;

  // Initialize state early
  const state: CarouselState = {
    currentIndex: 0,
    isAnimating: false,
    slides: props.slides,
  };

  const container = createContainer(props, (index: number) => {
    if (state.isAnimating || state.currentIndex === index) return;

    const direction = state.currentIndex > index ? 'reverse' : 'advance';
    animateSlides(refs, state, index, direction);
  });

  const builder = new ElementBuilder();

  builder.withClassName('umd-carousel-wide');
  builder.withChild(container);

  if (title) {
    builder.withAttribute('title', title);
  } else {
    builder.withAttribute('title', 'Animated Image Carousel');
  }

  builder.withStyles({
    element: {
      container: 'umd-carousel-wide / inline-size',
      display: 'block',
      position: 'relative',

      [`@media (${token.media.queries.large.min})`]: {
        paddingBottom: 0,
      },
    },
  });

  const composite = builder.build();

  // Initialize refs
  const refs: CarouselRefs = {
    container: composite.element,
    ...container.refs,
  };

  // Set up event handlers after DOM is ready
  requestAnimationFrame(() => {
    setupSliderControls(refs, state);
    updatePreviews(refs, state); // Initial preview setup without animation
  });

  return composite;
};
