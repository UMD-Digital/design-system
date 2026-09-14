import * as token from '@universityofmaryland/web-token-library';
import { ElementBuilder } from '@universityofmaryland/web-builder-library';
import { handleKeyboardNavigation } from '@universityofmaryland/web-utilities-library/events';
import { close_large as iconCloseLarge } from '@universityofmaryland/web-icons-library/controls';
import { TypeMenuDisplayButtonRequirements } from '../menu-button';
import {
  createCompositeNavigationSlider as NavDrawerSlider,
  TypeNavSliderRequirements,
} from '../slider';

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

const createDrawerChrome = ({
  eventClose,
  sliderElement,
}: {
  eventClose: () => void;
  sliderElement: HTMLElement;
}) => {
  const closeButton = new ElementBuilder('button')
    .withClassName('nav-drawer-close-button')
    .withHTML(iconCloseLarge)
    .withAttribute('aria-label', 'Close navigation drawer')
    .withStyles({
      element: {
        backgroundColor: token.color.red,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: token.spacing['2xl'],
        width: token.spacing['2xl'],
        padding: '12px',
        transition: 'background .5s ease-in-out',
        order: 2,

        '&:hover, &:focus': {
          backgroundColor: token.color.redDark,
        },

        '& svg': {
          fill: token.color.white,
        },
      },
    })
    .on('click', () => eventClose());

  const sliderWrapper = new ElementBuilder(sliderElement)
    .withClassName('nav-drawer-slider')
    .withStyles({
      element: {
        ['& .nav-slide-overflow']: {
          overflowY: 'scroll',
          height: '100%',
        },
      },
    });

  const overlayWrapper = new ElementBuilder()
    .withClassName('nav-drawer-overlay-wrapper')
    .withChildren(closeButton, sliderWrapper)
    .withStyles({
      element: {
        display: 'flex',
        height: '100%',
        transition: `transform ${ANIMATION_TIME + 100}ms ease-in-out`,
        transform: 'translateX(-100%)',

        '& > *:not(.nav-drawer-close-button)': {
          height: '100% !important',
        },
      },
    });

  return new ElementBuilder()
    .withClassName('nav-drawer-overlay')
    .withChild(overlayWrapper)
    .withStyles({
      element: {
        position: 'fixed',
        top: 0,
        left: 0,
        height: '100vh',
        width: '100vw',
        backgroundColor: 'rgba(0,0,0,0.5)',
        transition: `opacity ${ANIMATION_TIME}ms ease-in-out`,
        cursor: 'pointer',
        opacity: 0,
      },
    })
    .on('click', () => eventClose())
    .build();
};

const buildDrawerContainer = (props: CombinedNavDrawerProps) => {
  const { eventClose } = props;
  const slider = NavDrawerSlider({
    ...props,
    displayType: 'drawer-nav',
  });
  const chrome = createDrawerChrome({
    eventClose,
    sliderElement: slider.element,
  });

  // The slider is handed over as a bare element, so its styles are not merged
  // by the chrome's build and have to be carried up alongside it.
  return { ...chrome, styles: chrome.styles + slider.styles };
};

export const createCompositeNavigationDrawer = (
  props: TypeNavDrawerRequirements,
) => {
  const { context, primarySlideLinks } = props;

  if (!primarySlideLinks) return null;

  const body = document.querySelector('body') as HTMLBodyElement;

  let containerBuilder = new ElementBuilder()
    .withClassName('nav-drawer-container')
    .withStyles({
      element: {
        position: 'fixed',
        bottom: 0,
        left: 0,
        top: 0,
        display: 'none',
        zIndex: 999999,
      },
    });

  const elementContainer = containerBuilder.getElement();

  const eventClose = () => {
    const bodyOverlay = elementContainer.querySelector(
      '.nav-drawer-overlay',
    ) as HTMLDivElement;
    const bodyOverlayWrapper = bodyOverlay.querySelector(
      '.nav-drawer-overlay-wrapper',
    ) as HTMLDivElement;
    const slider = bodyOverlay.querySelector(
      '.navigation-slider',
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
      slider.style.overflowY = 'hidden';
    }
  };

  const eventOpen = () => {
    const bodyOverlay = elementContainer.querySelector(
      '.nav-drawer-overlay',
    ) as HTMLDivElement;
    const bodyOverlayWrapper = bodyOverlay.querySelector(
      '.nav-drawer-overlay-wrapper',
    ) as HTMLDivElement;
    const closeButton = bodyOverlayWrapper.querySelector(
      '.nav-drawer-close-button',
    ) as HTMLButtonElement;
    const slider = bodyOverlayWrapper.querySelector(
      '.navigation-slider',
    ) as HTMLDivElement;
    const activeSlide = bodyOverlayWrapper.querySelector(
      '.navigation-slider div[data-active]',
    ) as HTMLDivElement;

    elementContainer.style.display = 'block';
    bodyOverlay.style.display = 'block';
    bodyOverlayWrapper.style.display = 'flex';

    setTimeout(() => {
      bodyOverlay.style.opacity = '1';
      bodyOverlayWrapper.style.transform = 'translateX(0)';
      body.style.overflow = 'hidden';
      closeButton.focus();

      handleKeyboardNavigation({
        element: elementContainer,
        action: () => eventClose(),
        shadowDomContext: context,
      });
    }, 100);

    setTimeout(() => {
      if (!activeSlide || !slider) return;
      if (activeSlide.offsetHeight > elementContainer.offsetHeight) {
        slider.style.overflowY = 'scroll';
      }
    }, 200);
  };

  const drawerContainer = buildDrawerContainer({
    ...props,
    eventOpen,
    eventClose,
  });

  return containerBuilder
    .withChild(drawerContainer)
    .withEvents({ eventOpen })
    .build();
};
