import { ELEMENTS, VARIABLES } from 'components/nav-drawer/globals';
import { UMDNavDrawer } from 'components/nav-drawer/component';

export const EventOpen = ({ element }: { element: UMDNavDrawer }) => {
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
  }, 100);
};

export const EventClose = ({ element }: { element: UMDNavDrawer }) => {
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
  }, VARIABLES.ANIMATION_TIME + 100);
};
