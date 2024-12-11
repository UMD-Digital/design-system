import { Tokens } from '@universityofmaryland/variables';
import { MarkupLocate, Performance } from 'utilities';
import Slides, { TypeSlideProps } from './slides';
import SlideFirst from './slide-first';
import SlideAction from './action';

type TypeSubElements = TypeSlideProps;

export type TypeNavSliderRequirements = {
  primarySlideLinks?: HTMLElement | null;
  primarySlidesSecondaryLinks?: HTMLElement | null;
  primarySlideContent?: HTMLElement | null;
  childrenSlides?: HTMLElement | null;
  childrenSlideContent?: HTMLSlotElement[];
  displayType?: string;
};

export type TypeNavSliderProps = TypeSubElements & TypeNavSliderRequirements;

const { Colors, Spacing } = Tokens;

const ANIMATION_TIME = 300;
const ATTRIBUTE_CHILD_REF = 'data-child-ref';
const ATTRIBUTE_PARENT_REF = 'data-parent-ref';
const ATTRIBUTE_ACTIVE_SLIDE = 'data-active';
const ATTRIBUTE_ACTIVE_SELECTED = 'data-selected';
const ATTRIBUTE_DATA_SLIDE = 'data-slide';
const ATTRIBUTE_DISPLAY_TYPE = 'display-type';

const DISPLAY_TYPE_DRAWER = 'drawer-nav';
const DISPLAY_TYPE_INTERIOR_NAV = 'interior-nav';

const ELEMENT_NAVIGATION_SLIDER_CONTAINER = 'navigation-slider-container';
const ELEMENT_NAVIGATION_SLIDER = 'navigation-slider';
const ELEMENT_SLIDER_DECORATIVE_LINE = 'navigation-slider-decorative-line';

const IS_DISPLAY_DRAWER = `[${ATTRIBUTE_DISPLAY_TYPE}=${DISPLAY_TYPE_DRAWER}]`;
const IS_DISPLAY_INTERIOR = `[${ATTRIBUTE_DISPLAY_TYPE}=${DISPLAY_TYPE_INTERIOR_NAV}]`;

const OVERWRITE_DISPLAY_DRAWER_CONTAINER = `.${ELEMENT_NAVIGATION_SLIDER_CONTAINER}${IS_DISPLAY_DRAWER}`;
const OVERWRITE_DISPLAY_DRAWER_DECORATION = `.${ELEMENT_NAVIGATION_SLIDER_CONTAINER}${IS_DISPLAY_DRAWER} .${ELEMENT_SLIDER_DECORATIVE_LINE}`;
const OVERWRITE_DISPLAY_DRAWER_SLIDE_WRAPPER = `.${ELEMENT_NAVIGATION_SLIDER_CONTAINER}${IS_DISPLAY_DRAWER} .${Slides.Elements.wrapper}`;
const OVERWRITE_DISPLAY_DRAWER_ACTION_CONTAINER = `.${ELEMENT_NAVIGATION_SLIDER_CONTAINER}${IS_DISPLAY_DRAWER} .${SlideAction.Elements.container}`;

const OVERWRITE_DISPLAY_INTERIOR_ACTION_CONTAINER = `.${ELEMENT_NAVIGATION_SLIDER_CONTAINER}${IS_DISPLAY_INTERIOR} .${SlideAction.Elements.container}`;
const OVERWRITE_DISPLAY_INTERIOR_SECONDARY_CONTAINER = `.${ELEMENT_NAVIGATION_SLIDER_CONTAINER}${IS_DISPLAY_INTERIOR} .${SlideFirst.Elements.secondaryContainer} .${SlideAction.Elements.container}`;
const OVERWRITE_DISPLAY_INTERIOR_HEADLINE = `.${ELEMENT_NAVIGATION_SLIDER_CONTAINER}${IS_DISPLAY_INTERIOR} .${Slides.Elements.headline}`;

// prettier-ignore
const OverwriteDisplayDrawer = `
  ${OVERWRITE_DISPLAY_DRAWER_CONTAINER} {
    background-color: ${Colors.white};
    padding: ${Spacing['2xl']} 0;
    width: calc(100vw - ${Spacing['8xl']});
    max-width: 400px;
    min-width: 227px;
  }

  ${OVERWRITE_DISPLAY_DRAWER_SLIDE_WRAPPER} {
    padding: 0 ${Spacing.md};
  }

  ${OVERWRITE_DISPLAY_DRAWER_DECORATION} {
    display: block;
  }

  ${OVERWRITE_DISPLAY_DRAWER_ACTION_CONTAINER} {
    padding-left: ${Spacing.sm};
  }
`;

// prettier-ignore
const OverwriteDisplayInterior = `
  ${OVERWRITE_DISPLAY_INTERIOR_ACTION_CONTAINER} {
    border-bottom: 1px solid ${Colors.gray.light};
    padding-bottom: ${Spacing.md};
    margin-bottom: ${Spacing.md};
  }

  ${OVERWRITE_DISPLAY_INTERIOR_SECONDARY_CONTAINER}:last-child {
    margin-bottom: 0;
  }

  ${OVERWRITE_DISPLAY_INTERIOR_HEADLINE} {
    border-bottom: 1px solid ${Colors.gray.light};
    padding-bottom: ${Spacing.md};
    margin-bottom: ${Spacing.md};
  }
`;

// prettier-ignore
const DecorativeLineStyles = `
  .${ELEMENT_SLIDER_DECORATIVE_LINE} {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 8px;
    background-color: ${Colors.red};
    display: none;
  }
`;

// prettier-ignore
const SliderStyles = `
  .${ELEMENT_NAVIGATION_SLIDER} {
    position: relative;
    overflow: hidden;
    height: 100%;
  }

  .${ELEMENT_NAVIGATION_SLIDER} > * {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    background-color: ${Colors.white};
    display: none;
  }

  .${ELEMENT_NAVIGATION_SLIDER} > *[${ATTRIBUTE_ACTIVE_SLIDE}] {
    display: block;
  }
`;

const SelectedLinkStyles = `
  .${ELEMENT_NAVIGATION_SLIDER_CONTAINER} a[${ATTRIBUTE_ACTIVE_SELECTED}] {
    position: relative;
  }

  .${ELEMENT_NAVIGATION_SLIDER_CONTAINER} a[${ATTRIBUTE_ACTIVE_SELECTED}] span {
    display: inline;
    position: relative;
    background-position: left calc(100% - 0px);
    background-repeat: no-repeat;
    background-size: 100% 2.5px;
    background-image: linear-gradient(#ffd200, #ffd200);
  }
`;

// prettier-ignore
const STYLES_NAV_SLIDER_ELEMENT = `
  .${ELEMENT_NAVIGATION_SLIDER_CONTAINER} {
    position: relative;
    height: 100%;
    cursor: default;
  }

  ${Slides.Styles}
  ${DecorativeLineStyles}
  ${SliderStyles}
  ${SelectedLinkStyles}
  ${OverwriteDisplayDrawer}
  ${OverwriteDisplayInterior}
`;

const CreateChildrenElements = (props: TypeNavSliderProps) => {
  const { displayType } = props;
  const sliderContainer = document.createElement('div');
  const slider = document.createElement('div');
  const decorativeLine = document.createElement('div');
  const isDisplayDrawerNav = displayType === DISPLAY_TYPE_DRAWER;
  let displayTypeSetting = DISPLAY_TYPE_INTERIOR_NAV;

  if (isDisplayDrawerNav) displayTypeSetting = DISPLAY_TYPE_DRAWER;

  Slides.CreateElement({ ...props, slider });

  slider.classList.add(ELEMENT_NAVIGATION_SLIDER);

  decorativeLine.classList.add(ELEMENT_SLIDER_DECORATIVE_LINE);
  sliderContainer.appendChild(decorativeLine);

  sliderContainer.setAttribute(ATTRIBUTE_DISPLAY_TYPE, displayTypeSetting);
  sliderContainer.classList.add(ELEMENT_NAVIGATION_SLIDER_CONTAINER);
  sliderContainer.appendChild(slider);

  sliderContainer.addEventListener('click', (event) => {
    event.stopPropagation();
  });

  return sliderContainer;
};

const CreateNavSliderElement = (props: TypeNavSliderRequirements) =>
  (() => {
    const elementContainer = document.createElement('div');
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
      const parent = MarkupLocate.FindParent({
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
        containerSize = children.reduce((acc, currentElement) => {
          return acc + currentElement.offsetHeight;
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
      const activeSlide = elementContainer.querySelector(
        `[${ATTRIBUTE_ACTIVE_SLIDE}]`,
      ) as HTMLDivElement;
      const upcomingSlide = isRight
        ? getUpcomingSlideParent()
        : getUpcomingSlide();
      const slides = [activeSlide, upcomingSlide];

      if (!upcomingSlide) {
        console.error('Missing slide for slide event');
        return null;
      }
      const firstLink = upcomingSlide.querySelector('a') as HTMLAnchorElement;

      const animate = () => {
        let startPositionForUpcomingSlide = '100%';
        let transitionPosition = '-100%';

        if (isRight) {
          startPositionForUpcomingSlide = '-100%';
          transitionPosition = '100%';
        }

        upcomingSlide.style.left = startPositionForUpcomingSlide;
        upcomingSlide.style.display = 'block';

        setTimeout(() => {
          slides.forEach((slide) => {
            slide.style.transition = `transform ${ANIMATION_TIME}ms ease-in-out`;
            slide.style.transform = `translateX(${transitionPosition})`;
          });
          setCurrentSlide({ element: upcomingSlide, withTransition: true });
        }, 100);

        setTimeout(() => {
          slides.forEach((slide) => {
            slide.style.transition = 'none';
            slide.style.transform = 'translateX(0)';
            slide.style.left = '0';
            slide.removeAttribute('style');
          });

          upcomingSlide.setAttribute(ATTRIBUTE_ACTIVE_SLIDE, '');
          activeSlide.removeAttribute(ATTRIBUTE_ACTIVE_SLIDE);
          if (firstLink) firstLink.focus();
        }, ANIMATION_TIME + 100);
      };

      if (!upcomingSlide || !activeSlide)
        throw new Error('Missing slide for slide event');

      animate();
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
    const GetContainer = () => elementContainer;
    let upcomingSlideRef: string | null = null;
    let currentSlide: HTMLElement | null = null;

    const children = CreateChildrenElements({
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

    elementContainer.appendChild(children);

    window.addEventListener(
      'resize',
      Performance.debounce(() => {
        eventReize();
      }, 20),
    );

    return {
      container: elementContainer,
      events: {
        resize: eventReize,
      },
    };
  })();

export default {
  CreateElement: CreateNavSliderElement,
  Styles: STYLES_NAV_SLIDER_ELEMENT,
  Elements: {
    slider: ELEMENT_NAVIGATION_SLIDER,
  },
};
