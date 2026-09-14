import * as token from '@universityofmaryland/web-token-library';
import { ElementBuilder } from '@universityofmaryland/web-builder-library';
import { debounce } from '@universityofmaryland/web-utilities-library/performance';
import { findParent } from '@universityofmaryland/web-utilities-library/dom';
import {
  createCompositeNavigationSlides as Slides,
  TypeSlideProps,
} from './slides';

type TypeSubElements = TypeSlideProps;

export type TypeNavSliderRequirements = {
  primarySlideLinks?: HTMLElement | null;
  primarySlidesSecondaryLinks?: HTMLElement | null;
  primarySlideContent?: HTMLElement | null;
  childrenSlides?: HTMLElement | null;
  childrenSlideContent?: HTMLSlotElement[];
  displayType?: string;
  ATTRIBUTE_CHILD_REF?: string;
  ATTRIBUTE_PARENT_REF?: string;
  ATTRIBUTE_ACTIVE_SLIDE?: string;
  ATTRIBUTE_DATA_SLIDE?: string;
};

export type TypeNavSliderProps = TypeSubElements & TypeNavSliderRequirements;
const ANIMATION_TIME = 300;

const buildSliderChildren = (props: TypeNavSliderProps) => {
  const { displayType } = props;

  const isDisplayDrawerNav = displayType === 'drawer-nav';

  const sliderBuilder = new ElementBuilder()
    .withClassName('navigation-slider')
    .withStyles({
      element: {
        position: 'relative',
        overflow: 'hidden',
        height: '100%',

        '& > *': {
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: token.color.white,
          display: 'none',
        },

        '& > *[data-active]': {
          display: 'block',
        },
      },
    });

  sliderBuilder.withChildren(...Slides(props));

  const decorativeLine = new ElementBuilder()
    .withClassName('navigation-slider-decorative-line')
    .withStyles({
      element: {
        position: 'absolute',
        left: 0,
        bottom: 0,
        width: '100%',
        height: '8px',
        backgroundColor: token.color.red,
        display: 'none',

        ...(isDisplayDrawerNav && { display: 'block' }),
      },
    });

  const sliderContainerBuilder = new ElementBuilder()
    .withAttribute(
      'display-type',
      isDisplayDrawerNav ? 'drawer-nav' : 'interior-nav',
    )
    .withClassName('navigation-slider-container')
    .withChildren(decorativeLine, sliderBuilder)
    .withStyles({
      element: {
        position: 'relative',
        height: '100%',
        cursor: 'default',

        '& a[data-selected]': {
          position: 'relative',
        },

        '& a[data-selected] span': {
          display: 'inline',
          position: 'relative',
          backgroundPosition: 'left calc(100% - 0px)',
          backgroundRepeat: 'no-repeat',
          backgroundSize: '100% 2.5px',
          backgroundImage: 'linear-gradient(#ffd200, #ffd200)',
        },

        ...(isDisplayDrawerNav && {
          backgroundColor: token.color.white,
          padding: `${token.spacing['2xl']} 0`,
          width: `calc(100vw - ${token.spacing['8xl']})`,
          maxWidth: '400px',
          minWidth: '227px',

          '& .nav-slide-wrapper': {
            padding: `0 ${token.spacing.md}`,
          },

          '& .nav-slide-action-container': {
            paddingLeft: token.spacing.sm,
          },
        }),

        ...(!isDisplayDrawerNav && {
          '& .nav-slide-action-container': {
            borderBottom: `1px solid ${token.color.gray.light}`,
            paddingBottom: token.spacing.md,
            marginBottom: token.spacing.md,
          },
        }),
      },
    })
    .on('click', (event) => {
      event.stopPropagation();
    });

  return sliderContainerBuilder.build();
};

export const createCompositeNavigationSlider = (
  props: TypeNavSliderRequirements,
) => {
  const {
    ATTRIBUTE_CHILD_REF = 'data-child-ref',
    ATTRIBUTE_PARENT_REF = 'data-parent-ref',
    ATTRIBUTE_ACTIVE_SLIDE = 'data-active',
    ATTRIBUTE_DATA_SLIDE = 'data-slide',
  } = props;

  const elementContainerBuilder = new ElementBuilder();
  const elementContainer = elementContainerBuilder.getElement();

  const getUpcomingSlide = () => {
    const upcomingSlide = elementContainer.querySelector(
      `[${ATTRIBUTE_PARENT_REF}=${upcomingSlideRef}]`,
    ) as HTMLDivElement;

    return upcomingSlide;
  };
  const getUpcomingSlideParent = () => {
    const upcomingSlide = elementContainer.querySelector(
      `[${ATTRIBUTE_CHILD_REF}=${upcomingSlideRef}]`,
    ) as HTMLDivElement;
    const parent = findParent({
      element: upcomingSlide,
      attr: ATTRIBUTE_DATA_SLIDE,
    });

    return parent;
  };
  const sizeContainer = ({
    withTransition = false,
  }: {
    withTransition?: boolean;
  }) => {
    let containerSize = 500;
    if (currentSlide) {
      const children = Array.from(currentSlide.children) as HTMLDivElement[];
      containerSize = children.reduce((accumulator, currentElement) => {
        return accumulator + currentElement.offsetHeight;
      }, 50);
    }

    elementContainer.style.height = `${containerSize}px`;
    if (withTransition)
      elementContainer.style.transition = `height ${ANIMATION_TIME}ms ease-in-out`;

    setTimeout(() => {
      elementContainer.style.transition = 'none';
    }, ANIMATION_TIME);
  };
  const eventSlide = ({ isRight = false }: { isRight?: boolean }) => {
    if (isAnimating) return;

    const activeSlide = elementContainer.querySelector(
      `[${ATTRIBUTE_ACTIVE_SLIDE}]`,
    ) as HTMLDivElement;
    let upcomingSlide: HTMLElement = getUpcomingSlide();
    let startPositionForUpcomingSlide = '100%';
    let transitionPosition = '-100%';

    if (isRight) {
      upcomingSlide = getUpcomingSlideParent();
      startPositionForUpcomingSlide = '-100%';
      transitionPosition = '100%';
    }

    if (!upcomingSlide) {
      console.error('Missing slide for slide event');
      return null;
    }
    if (!activeSlide) throw new Error('Missing slide for slide event');

    const slides = [activeSlide, upcomingSlide];
    const firstLink = upcomingSlide.querySelector('a') as HTMLAnchorElement;

    isAnimating = true;

    upcomingSlide.style.left = startPositionForUpcomingSlide;
    upcomingSlide.style.display = 'block';

    // Defer to next frame so display:block is committed before the transition starts.
    let rafId: number | null = requestAnimationFrame(() => {
      rafId = null;
      slides.forEach((slide) => {
        slide.style.transition = `transform ${ANIMATION_TIME}ms ease-in-out`;
        slide.style.transform = `translateX(${transitionPosition})`;
      });
      setCurrentSlide({ element: upcomingSlide, withTransition: true });
    });

    let cleanedUp = false;
    const cleanup = () => {
      if (cleanedUp) return;
      cleanedUp = true;
      if (rafId !== null) cancelAnimationFrame(rafId);
      activeSlide.removeEventListener('transitionend', onTransitionEnd);

      // Toggle data-active before wiping styles so CSS display:none wins.
      upcomingSlide.setAttribute(ATTRIBUTE_ACTIVE_SLIDE, '');
      activeSlide.removeAttribute(ATTRIBUTE_ACTIVE_SLIDE);

      slides.forEach((slide) => {
        slide.removeAttribute('style');
      });

      if (firstLink) firstLink.focus({ preventScroll: true });
      isAnimating = false;
    };
    const onTransitionEnd = (event: TransitionEvent) => {
      // Ignore bubbled transitions from descendants (e.g. chevron icons).
      if (event.target !== activeSlide) return;
      if (event.propertyName !== 'transform') return;
      cleanup();
    };
    activeSlide.addEventListener('transitionend', onTransitionEnd);
    setTimeout(cleanup, ANIMATION_TIME + 100);

    if (upcomingSlide.offsetHeight > elementContainer.offsetHeight) {
      setTimeout(() => {
        upcomingSlide.style.overflowY = 'scroll';
        upcomingSlide.style.height = '100%';
      }, ANIMATION_TIME + 100);
    }
  };
  const setUpcomingSlide = (arg: string) => {
    upcomingSlideRef = arg;
  };
  const setCurrentSlide = ({
    element,
    withTransition = false,
  }: {
    element: HTMLElement;
    withTransition?: boolean;
  }) => {
    currentSlide = element;

    setTimeout(() => {
      sizeContainer({ withTransition });
    }, 100);
  };
  const eventSlideLeft = () => eventSlide({ isRight: false });
  const eventSlideRight = () => eventSlide({ isRight: true });
  const eventReize = () => {
    setTimeout(() => {
      sizeContainer({ withTransition: false });
    }, 200);
  };

  elementContainerBuilder.withEvents({ resize: eventReize });

  const GetContainer = () => elementContainer;
  let upcomingSlideRef: string | null = null;
  let currentSlide: HTMLElement | null = null;
  let isAnimating = false;

  const children = buildSliderChildren({
    ...props,
    GetContainer,
    eventSlideLeft,
    eventSlideRight,
    setUpcomingSlide,
    setCurrentSlide,
    ATTRIBUTE_CHILD_REF,
    ATTRIBUTE_PARENT_REF,
    ATTRIBUTE_DATA_SLIDE,
    ATTRIBUTE_ACTIVE_SLIDE,
    currentSlide,
  });

  elementContainerBuilder.withChild(children);

  window.addEventListener(
    'resize',
    debounce(() => {
      eventReize();
    }, 20),
  );

  return elementContainerBuilder.build();
};
