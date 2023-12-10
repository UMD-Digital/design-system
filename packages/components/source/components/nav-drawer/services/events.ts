import { ELEMENTS, VARIABLES } from 'components/nav-drawer/globals';
import { UMDNavDrawer } from 'components/nav-drawer/component';

export const EventOpen = ({ element }: { element: UMDNavDrawer }) => {
  const body = document.querySelector('body') as HTMLBodyElement;
  const ShadowRoot = element._shadow as ShadowRoot;
  const bodyOverlay = ShadowRoot.querySelector(
    `.${ELEMENTS.NAV_DRAWER_BODY_OVERLAY}`,
  ) as HTMLDivElement;
  const drawer = ShadowRoot.querySelector(
    `.${ELEMENTS.NAV_DRAWER_CONTAINER}`,
  ) as HTMLDivElement;

  bodyOverlay.style.display = 'block';
  drawer.style.display = 'flex';

  setTimeout(() => {
    bodyOverlay.style.opacity = '1';
    drawer.style.transform = 'translateX(0)';
    body.style.overflow = 'hidden';
  }, 100);
};

export const EventClose = ({ element }: { element: UMDNavDrawer }) => {
  const body = document.querySelector('body') as HTMLBodyElement;
  const ShadowRoot = element._shadow as ShadowRoot;
  const bodyOverlay = ShadowRoot.querySelector(
    `.${ELEMENTS.NAV_DRAWER_BODY_OVERLAY}`,
  ) as HTMLDivElement;
  const drawer = ShadowRoot.querySelector(
    `.${ELEMENTS.NAV_DRAWER_CONTAINER}`,
  ) as HTMLDivElement;

  bodyOverlay.style.opacity = '0';
  drawer.style.transform = 'translateX(-100%)';

  setTimeout(() => {
    bodyOverlay.removeAttribute('style');
    drawer.removeAttribute('style');
    body.style.overflow = 'auto';
  }, VARIABLES.ANIMATION_TIME + 100);
};

export const EventSlide = ({
  element,
  isRight = true,
}: {
  element: UMDNavDrawer;
  isRight?: boolean;
}) => {
  const ShadowRoot = element._shadow as ShadowRoot;
  const upcomingSlideRef = element._upcomingSlide;
  const activeSlide = ShadowRoot.querySelector(
    `[${VARIABLES.ATTRIBUTE_ACTIVE_SLIDE}]`,
  ) as HTMLDivElement;
  const upcomingSlide = ShadowRoot.querySelector(
    `[${VARIABLES.ATTRIBUTE_PARENT_REF}=${upcomingSlideRef}]`,
  ) as HTMLDivElement;
  const previousSlideContext = isRight ? activeSlide : upcomingSlide;
  const previousSlideRef = previousSlideContext.getAttribute(
    VARIABLES.ATTRIBUTE_PARENT_REF,
  );
  const activeSlideDirection = isRight
    ? VARIABLES.ATTRIBUTE_SLIDE_OUT_LEFT
    : VARIABLES.ATTRIBUTE_SLIDE_OUT_RIGHT;
  const upcomingSlideDirection = isRight
    ? VARIABLES.ATTRIBUTE_SLIDE_IN_LEFT
    : VARIABLES.ATTRIBUTE_SLIDE_IN_RIGHT;

  if (!upcomingSlide || !activeSlide)
    throw new Error('Missing slide for slide event');

  element._previousSlide = previousSlideRef;

  if (isRight) {
    upcomingSlide.style.transform = 'translateX(-100%)';
  }

  activeSlide.removeAttribute(VARIABLES.ATTRIBUTE_ACTIVE_SLIDE);
  upcomingSlide.setAttribute(VARIABLES.ATTRIBUTE_ACTIVE_SLIDE, '');

  activeSlide.setAttribute(activeSlideDirection, '');
  upcomingSlide.setAttribute(upcomingSlideDirection, '');

  setTimeout(() => {
    activeSlide.style.display = 'none';
  }, VARIABLES.ANIMATION_TIME);

  setTimeout(() => {
    activeSlide.removeAttribute(activeSlideDirection);
    upcomingSlide.removeAttribute(upcomingSlideDirection);
    activeSlide.removeAttribute('style');
  }, VARIABLES.ANIMATION_TIME + 100);
};
