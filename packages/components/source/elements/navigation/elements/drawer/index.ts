import { Tokens } from '@universityofmaryland/variables';
import { Accessibility, AssetIcon } from 'utilities';
import NavDisplayButton, {
  TypeMenuDisplayButtonRequirements,
} from '../menu-button';
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

const { Colors, Spacing } = Tokens;
const { EventAccessibilityFocus } = Accessibility;

const ANIMATION_TIME = 300;

const ELEMENT_NAV_DECLARATION = 'nav-drawer-declaration';
const ELEMENT_NAV_DRAWER_CONTAINER = 'nav-drawer-container';
const ELEMENT_NAV_DRAWER_BODY_OVERLAY = 'nav-drawer-body-overlay';
const ELEMENT_NAV_DRAWER_CLOSE_BUTTON = 'nav-drawer-close-button';

// prettier-ignore
export const DrawerButtonClose = `
  .${ELEMENT_NAV_DRAWER_CLOSE_BUTTON} {
    background-color: ${Colors.red};
    display: flex;
    align-items: center;
    justify-content: center;
    height: ${Spacing['2xl']};
    width: ${Spacing['2xl']};
    padding: 12px;
    transition: background .5s ease-in-out;
  }

  .${ELEMENT_NAV_DRAWER_CLOSE_BUTTON}:hover,
  .${ELEMENT_NAV_DRAWER_CLOSE_BUTTON}:focus {
    background-color: ${Colors.redDark};
  }

  .${ELEMENT_NAV_DRAWER_CLOSE_BUTTON} svg {
    fill: ${Colors.white};
  }
`;

// prettier-ignore
export const DrawerContainer = `
  .${ELEMENT_NAV_DRAWER_CONTAINER} {
    position: fixed;
    bottom: 0;
    left: 0;
    top: 0;
    transition: transform ${ANIMATION_TIME}ms ease-in-out;
    z-index: 9;
    display: none;
    transform: translateX(-100%);
  }

  .${ELEMENT_NAV_DRAWER_CONTAINER} > *:not(.${ELEMENT_NAV_DRAWER_CLOSE_BUTTON}) {
    height: 100% !important;
  }

  .${ELEMENT_NAV_DRAWER_BODY_OVERLAY} {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    background-color: rgba(0,0,0,0.5);
    transition: opacity ${ANIMATION_TIME}ms ease-in-out;
    z-index: 999999;
    cursor: pointer;
    display: none;
    opacity: 0;
  }
`;

const STYLES_NAV_DRAWER_ELEMENT = `
  ${NavDisplayButton.Styles}
  ${NavDrawerSlider.Styles}
  ${DrawerButtonClose}
  ${DrawerContainer}
`;

const CreateDrawerButton = (element: TypeDrawerCloseButton) => {
  const drawerCloseButton = document.createElement('button');

  drawerCloseButton.innerHTML = AssetIcon.X;
  drawerCloseButton.classList.add(ELEMENT_NAV_DRAWER_CLOSE_BUTTON);
  drawerCloseButton.addEventListener('click', element.eventClose.bind(element));

  return drawerCloseButton;
};

const CreateDrawerElement = (props: TypeDrawerProps) => {
  const { eventClose } = props;
  const bodyOverlay = document.createElement('div');
  const drawer = document.createElement('div');
  const closeButton = CreateDrawerButton(props);
  const slider = NavDrawerSlider.CreateElement({
    ...props,
    displayType: 'drawer-nav',
  });

  drawer.appendChild(slider);
  drawer.appendChild(closeButton);

  bodyOverlay.appendChild(drawer);
  bodyOverlay.classList.add(ELEMENT_NAV_DRAWER_BODY_OVERLAY);
  bodyOverlay.addEventListener('click', eventClose.bind(props));

  drawer.classList.add(ELEMENT_NAV_DRAWER_CONTAINER);

  return bodyOverlay;
};

const CreateNavDrawerContainer = (props: TypeDrawerProps) => {
  const container = document.createElement('div');
  const openButton = NavDisplayButton.CreateElement(props);
  const drawer = CreateDrawerElement(props);

  container.appendChild(openButton);
  container.appendChild(drawer);

  return container;
};

const CreateNavDrawerElement = (props: TypeNavDrawerRequirements) =>
  (() => {
    const { context } = props;
    const body = document.querySelector('body') as HTMLBodyElement;
    const elementContainer = document.createElement('div');

    const eventClose = () => {
      const bodyOverlay = elementContainer.querySelector(
        `.${ELEMENT_NAV_DRAWER_BODY_OVERLAY}`,
      ) as HTMLDivElement;
      const drawer = elementContainer.querySelector(
        `.${ELEMENT_NAV_DRAWER_CONTAINER}`,
      ) as HTMLDivElement;

      bodyOverlay.style.opacity = '0';
      drawer.style.transform = 'translateX(-100%)';

      setTimeout(() => {
        bodyOverlay.removeAttribute('style');
        drawer.removeAttribute('style');
        body.style.overflow = 'auto';
      }, ANIMATION_TIME + 100);
    };

    const eventOpen = () => {
      const bodyOverlay = elementContainer.querySelector(
        `.${ELEMENT_NAV_DRAWER_BODY_OVERLAY}`,
      ) as HTMLDivElement;
      const drawer = elementContainer.querySelector(
        `.${ELEMENT_NAV_DRAWER_CONTAINER}`,
      ) as HTMLDivElement;

      bodyOverlay.style.display = 'block';
      drawer.style.display = 'flex';

      setTimeout(() => {
        bodyOverlay.style.opacity = '1';
        drawer.style.transform = 'translateX(0)';
        body.style.overflow = 'hidden';

        EventAccessibilityFocus({
          element: context || elementContainer,
          action: () => eventClose(),
        });
      }, 100);
    };

    const children = CreateNavDrawerContainer({
      ...props,
      eventOpen,
      eventClose,
    });

    elementContainer.classList.add(ELEMENT_NAV_DECLARATION);
    elementContainer.appendChild(children);

    return elementContainer;
  })();

export default {
  CreateElement: CreateNavDrawerElement,
  Styles: STYLES_NAV_DRAWER_ELEMENT,
};
