import { token } from '@universityofmaryland/web-styles-library';
import * as Utility from 'utilities';
import { TypeMenuDisplayButtonRequirements } from '../menu-button';
import NavDrawerSlider, { TypeNavSliderRequirements } from '../slider';

export type TypeNavDrawerRequirements = TypeNavSliderRequirements & {
  context?: HTMLElement;
};

type TypeDrawerCloseButton = {
  eventClose: () => void;
};

type CombinedNavDrawerProps = TypeNavDrawerRequirements &
  TypeDrawerCloseButton &
  TypeMenuDisplayButtonRequirements;

export type TypeDrawerProps = CombinedNavDrawerProps;

const ANIMATION_TIME = 300;

const ELEMENT_NAV_DRAWER_CONTAINER = 'nav-drawer-container';
const ELEMENT_NAV_DRAWER_OVERLAY = 'nav-drawer-overlay';
const ELEMENT_NAV_DRAWER_OVERLAY_WRAPPER = 'nav-drawer-overlay-wrapper';
const ELEMENT_NAV_DRAWER_CLOSE_BUTTON = 'nav-drawer-close-button';

// prettier-ignore
const DrawerButtonClose = `
  .${ELEMENT_NAV_DRAWER_CLOSE_BUTTON} {
    background-color: ${token.color.red};
    display: flex;
    align-items: center;
    justify-content: center;
    height: ${token.spacing['2xl']};
    width: ${token.spacing['2xl']};
    padding: 12px;
    transition: background .5s ease-in-out;
    order: 2;
  }

  .${ELEMENT_NAV_DRAWER_CLOSE_BUTTON}:hover,
  .${ELEMENT_NAV_DRAWER_CLOSE_BUTTON}:focus {
    background-color: ${token.color.redDark};
  }

  .${ELEMENT_NAV_DRAWER_CLOSE_BUTTON} svg {
    fill: ${token.color.white};
  }
`;

// prettier-ignore
const DrawerContainer = `
  .${ELEMENT_NAV_DRAWER_CONTAINER} {
    position: fixed;
    bottom: 0;
    left: 0;
    top: 0;
    display: none;
    z-index: 999999;
  }

  .${ELEMENT_NAV_DRAWER_OVERLAY} {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    background-color: rgba(0,0,0,0.5);
    transition: opacity ${ANIMATION_TIME}ms ease-in-out;
    cursor: pointer;
    opacity: 0;
  }

  .${ELEMENT_NAV_DRAWER_OVERLAY_WRAPPER} {
    display: flex;
    height: 100%;
    transition: transform ${ANIMATION_TIME + 100}ms ease-in-out;
    transform: translateX(-100%);
  }

  .${ELEMENT_NAV_DRAWER_OVERLAY_WRAPPER} > *:not(.${ELEMENT_NAV_DRAWER_CLOSE_BUTTON}) {
    height: 100% !important;
  }
`;

const STYLES_NAV_DRAWER_ELEMENT = `
  ${NavDrawerSlider.Styles}
  ${DrawerButtonClose}
  ${DrawerContainer}
`;

const CreateDrawerButton = (element: TypeDrawerCloseButton) => {
  const drawerCloseButton = document.createElement('button');

  drawerCloseButton.innerHTML = Utility.asset.icon.X;
  drawerCloseButton.classList.add(ELEMENT_NAV_DRAWER_CLOSE_BUTTON);
  drawerCloseButton.setAttribute('aria-label', 'Close navigation drawer');
  drawerCloseButton.addEventListener('click', element.eventClose.bind(element));

  return drawerCloseButton;
};

const CreateNavDrawerContainer = (props: TypeDrawerProps) => {
  const { eventClose } = props;
  const bodyOverlay = document.createElement('div');
  const bodyOverlayWrapper = document.createElement('div');
  const closeButton = CreateDrawerButton(props);
  const slider = NavDrawerSlider.CreateElement({
    ...props,
    displayType: 'drawer-nav',
  });

  bodyOverlayWrapper.classList.add(ELEMENT_NAV_DRAWER_OVERLAY_WRAPPER);

  bodyOverlayWrapper.appendChild(closeButton);
  bodyOverlayWrapper.appendChild(slider.container);

  bodyOverlay.classList.add(ELEMENT_NAV_DRAWER_OVERLAY);
  bodyOverlay.addEventListener('click', eventClose.bind(props));
  bodyOverlay.appendChild(bodyOverlayWrapper);

  return bodyOverlay;
};

const CreateNavDrawerElement = (props: TypeNavDrawerRequirements) =>
  (() => {
    const { context, primarySlideLinks } = props;
    const body = document.querySelector('body') as HTMLBodyElement;
    const elementContainer = document.createElement('div');

    if (!primarySlideLinks) return null;

    const eventClose = () => {
      const bodyOverlay = elementContainer.querySelector(
        `.${ELEMENT_NAV_DRAWER_OVERLAY}`,
      ) as HTMLDivElement;
      const bodyOverlayWrapper = bodyOverlay.querySelector(
        `.${ELEMENT_NAV_DRAWER_OVERLAY_WRAPPER}`,
      ) as HTMLDivElement;
      const slider = bodyOverlay.querySelector(
        `.${NavDrawerSlider.Elements.slider}`,
      ) as HTMLDivElement;

      bodyOverlay.style.opacity = '0';
      bodyOverlayWrapper.style.transform = 'translateX(-100%)';

      setTimeout(() => {
        bodyOverlay.removeAttribute('style');
        bodyOverlayWrapper.removeAttribute('style');
        body.style.overflow = 'auto';
        elementContainer.style.display = 'none';
      }, ANIMATION_TIME + 100);

      if (slider) {
        slider.style.overflowY = `hidden`;
      }
    };

    const eventOpen = () => {
      const bodyOverlay = elementContainer.querySelector(
        `.${ELEMENT_NAV_DRAWER_OVERLAY}`,
      ) as HTMLDivElement;
      const bodyOverlayWrapper = bodyOverlay.querySelector(
        `.${ELEMENT_NAV_DRAWER_OVERLAY_WRAPPER}`,
      ) as HTMLDivElement;
      const closeButton = bodyOverlayWrapper.querySelector(
        `.${ELEMENT_NAV_DRAWER_CLOSE_BUTTON}`,
      ) as HTMLButtonElement;
      const slider = bodyOverlayWrapper.querySelector(
        `.${NavDrawerSlider.Elements.slider}`,
      ) as HTMLDivElement;
      const activeSlide = bodyOverlayWrapper.querySelector(
        `.${NavDrawerSlider.Elements.slider} div[data-active]`,
      ) as HTMLDivElement;

      elementContainer.style.display = 'block';
      bodyOverlay.style.display = 'block';
      bodyOverlayWrapper.style.display = 'flex';

      setTimeout(() => {
        bodyOverlay.style.opacity = '1';
        bodyOverlayWrapper.style.transform = 'translateX(0)';
        body.style.overflow = 'hidden';
        closeButton.focus();

        Utility.accessibility.eventAccessibilityFocus({
          element: elementContainer,
          action: () => eventClose(),
          shadowDomContext: context,
        });
      }, 100);

      setTimeout(() => {
        if (!activeSlide || !slider) return;
        if (activeSlide.offsetHeight > elementContainer.offsetHeight) {
          slider.style.overflowY = `scroll`;
        }
      }, 200);
    };

    const children = CreateNavDrawerContainer({
      ...props,
      eventOpen,
      eventClose,
    });

    elementContainer.classList.add(ELEMENT_NAV_DRAWER_CONTAINER);
    elementContainer.appendChild(children);

    return {
      element: elementContainer,
      events: {
        eventOpen,
      },
    };
  })();

export default {
  CreateElement: CreateNavDrawerElement,
  Styles: STYLES_NAV_DRAWER_ELEMENT,
};
