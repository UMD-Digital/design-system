import { ElementBuilder } from '@universityofmaryland/web-builder-library';
import * as token from '@universityofmaryland/web-token-library';
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

const ANIMATION_TIME = 500;
const PREVIEW_ANIMATION_TIME = 440;

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
  slide.offsetHeight;
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

const createPreviewElement = (
  slide: CarouselWideProps['slides'][0],
): HTMLElement => {
  const imageCopy = slide.image.cloneNode(true) as HTMLImageElement;
  const preview = assets.image.background({
    element: imageCopy,
    isScaled: true,
    imageLoading: 'lazy',
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
  preview.style.transform =
    animationDirection === 'advance' ? 'translateX(100%)' : 'translateX(-100%)';

  container.appendChild(preview);

  requestAnimationFrame(() => {
    preview.style.transform = 'translateX(0)';
  });
};

const animatePreviewOut = (
  preview: HTMLElement,
  animationDirection: 'reverse' | 'advance',
): Promise<void> => {
  return new Promise((resolve) => {
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

  refs.controls.prev.setAttribute('disabled', '');
  refs.controls.next.setAttribute('disabled', '');

  const newSlideDirection = direction === 'reverse' ? 'left' : 'right';
  positionSlideOffScreen(newSlide, newSlideDirection);

  refs.indicator.position(newIndex);

  requestAnimationFrame(() => {
    activateSlideTransition(newSlide);
    const currentSlideDirection = direction === 'reverse' ? 'right' : 'left';
    activateSlideTransition(currentSlide, currentSlideDirection);

    const nextState = { ...state, currentIndex: newIndex };
    updatePreviews(refs, nextState, direction);
  });

  setTimeout(() => {
    cleanupSlideTransition(currentSlide, false);
    cleanupSlideTransition(newSlide, true);

    newSlide.setAttribute('data-content-visible', 'true');

    refs.controls.prev.removeAttribute('disabled');
    refs.controls.next.removeAttribute('disabled');

    state.currentIndex = newIndex;
    state.isAnimating = false;

    updateInfo(refs, newIndex);
  }, ANIMATION_TIME);
};

const setupSliderControls = (refs: CarouselRefs, state: CarouselState) => {
  const lastIndex = state.slides.length - 1;

  refs.controls.prev.addEventListener('click', () => {
    if (state.isAnimating) return;

    const newIndex =
      state.currentIndex === 0 ? lastIndex : state.currentIndex - 1;
    animateSlides(refs, state, newIndex, 'reverse');
  });

  refs.controls.next.addEventListener('click', () => {
    if (state.isAnimating) return;

    const newIndex =
      state.currentIndex === lastIndex ? 0 : state.currentIndex + 1;
    animateSlides(refs, state, newIndex, 'advance');
  });
};

export const createCompositeCarouselWide = (props: CarouselWideProps) => {
  const { title } = props;

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

  const carouselTitle = title || 'Animated Image Carousel';

  const composite = new ElementBuilder()
    .withClassName('umd-carousel-wide')
    .withAttribute('title', carouselTitle)
    .withStyles({
      element: {
        containerType: 'inline-size',
        display: 'block',
        position: 'relative',

        [`@media (${token.media.queries.large.min})`]: {
          paddingBottom: 0,
        },
      },
    })
    .withChild(container)
    .build();

  const refs: CarouselRefs = {
    container: composite.element,
    ...container.refs,
  };

  requestAnimationFrame(() => {
    setupSliderControls(refs, state);
    updatePreviews(refs, state);
  });

  return composite;
};
