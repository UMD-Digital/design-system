import { Accessibility } from 'utilities';
import { ELEMENTS, VARIABLES } from 'components/nav-drawer/globals';
import { UMDNavDrawer } from 'components/nav-drawer';

const { EventAccessibilityFocus } = Accessibility;

const { NAV_DRAWER_BODY_OVERLAY, NAV_DRAWER_CONTAINER } = ELEMENTS;
const {
  ATTRIBUTE_ACTIVE_SLIDE,
  ANIMATION_TIME,
  ATTRIBUTE_PARENT_REF,
  ATTRIBUTE_DATA_SLIDE,
  ATTRIBUTE_CHILD_REF,
} = VARIABLES;

export const EventOpen = ({ element }: { element: UMDNavDrawer }) => {
  const body = document.querySelector('body') as HTMLBodyElement;
  const ShadowRoot = element._shadow as ShadowRoot;
  const bodyOverlay = ShadowRoot.querySelector(
    `.${NAV_DRAWER_BODY_OVERLAY}`,
  ) as HTMLDivElement;
  const drawer = ShadowRoot.querySelector(
    `.${NAV_DRAWER_CONTAINER}`,
  ) as HTMLDivElement;
  const activeSlide = ShadowRoot.querySelector(
    `[${ATTRIBUTE_ACTIVE_SLIDE}]`,
  ) as HTMLDivElement;
  const firstLink = activeSlide.querySelector(`a`) as HTMLAnchorElement;

  element._focusCallback = EventAccessibilityFocus({
    element,
    action: () => element.eventClose(),
  });

  bodyOverlay.style.display = 'block';
  drawer.style.display = 'flex';

  setTimeout(() => {
    bodyOverlay.style.opacity = '1';
    drawer.style.transform = 'translateX(0)';
    body.style.overflow = 'hidden';
    if (firstLink) firstLink.focus();
  }, 100);
};

export const EventClose = ({ element }: { element: UMDNavDrawer }) => {
  const body = document.querySelector('body') as HTMLBodyElement;
  const focusCallback = element._focusCallback;
  const ShadowRoot = element._shadow as ShadowRoot;
  const bodyOverlay = ShadowRoot.querySelector(
    `.${NAV_DRAWER_BODY_OVERLAY}`,
  ) as HTMLDivElement;
  const drawer = ShadowRoot.querySelector(
    `.${NAV_DRAWER_CONTAINER}`,
  ) as HTMLDivElement;

  if (focusCallback) focusCallback();

  bodyOverlay.style.opacity = '0';
  drawer.style.transform = 'translateX(-100%)';

  setTimeout(() => {
    bodyOverlay.removeAttribute('style');
    drawer.removeAttribute('style');
    body.style.overflow = 'auto';
  }, ANIMATION_TIME + 100);
};

const FindParent = ({
  element,
  attr,
}: {
  element: HTMLElement;
  attr: string;
}) => {
  let parent = element;

  const findParentElementByAttribute: any = ({
    element,
    attr,
  }: {
    element: HTMLElement | null;
    attr: string;
  }) => {
    if (!element || element.hasAttribute(attr)) {
      return element;
    } else {
      return findParentElementByAttribute({
        element: element.parentElement,
        attr,
      });
    }
  };

  const foundElement = findParentElementByAttribute({ element, attr });
  if (foundElement) parent = foundElement;

  return parent;
};

const GetUpcomingSlide = ({ element }: { element: UMDNavDrawer }) => {
  const ShadowRoot = element._shadow as ShadowRoot;
  const upcomingSlideRef = element._upcomingSlide;
  const upcomingSlide = ShadowRoot.querySelector(
    `[${ATTRIBUTE_PARENT_REF}=${upcomingSlideRef}]`,
  ) as HTMLDivElement;

  return upcomingSlide;
};

const GetUpcomingSlideParent = ({ element }: { element: UMDNavDrawer }) => {
  const ShadowRoot = element._shadow as ShadowRoot;
  const upcomingSlideRef = element._upcomingSlide;
  const upcomingSlide = ShadowRoot.querySelector(
    `[${ATTRIBUTE_CHILD_REF}=${upcomingSlideRef}]`,
  ) as HTMLDivElement;
  const parent = FindParent({
    element: upcomingSlide,
    attr: ATTRIBUTE_DATA_SLIDE,
  });

  return parent;
};

export const EventSlide = ({
  element,
  isRight = false,
}: {
  element: UMDNavDrawer;
  isRight?: boolean;
}) => {
  const ShadowRoot = element._shadow as ShadowRoot;
  const activeSlide = ShadowRoot.querySelector(
    `[${ATTRIBUTE_ACTIVE_SLIDE}]`,
  ) as HTMLDivElement;
  const upcomingSlide = isRight
    ? GetUpcomingSlideParent({ element })
    : GetUpcomingSlide({ element });
  const slides = [activeSlide, upcomingSlide];

  const setPreviousSlide = () => {
    const previousSlideContext = isRight ? activeSlide : upcomingSlide;
    const previousSlideRef =
      previousSlideContext.getAttribute(ATTRIBUTE_PARENT_REF);
    element._previousSlide = previousSlideRef;
  };

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
    }, ANIMATION_TIME + 100);
  };

  if (!upcomingSlide || !activeSlide)
    throw new Error('Missing slide for slide event');

  setPreviousSlide();
  animate();
};
