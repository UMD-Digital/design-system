import { Tokens } from '@universityofmaryland/variables';
import { Accessibility } from 'utilities';
import NavCloseButton, { TypeDrawerCloseButton } from './button';
import NavDrawerSlider, { TypeDrawerSliderRequirements } from '../slider';

export type TypeDrawerRequirements = TypeDrawerSliderRequirements;

export type TypeDrawerProps = TypeDrawerRequirements &
  TypeDrawerCloseButton & {
    getContainer: () => HTMLElement;
    eventOpen: () => void;
    focusCallback?: () => void;
    setFocusCallback?: (arg: any) => void;
  };

const { Colors } = Tokens;
const { EventAccessibilityFocus } = Accessibility;

const ANIMATION_TIME = 300;

const NAV_DECLARATION = 'umd-nav-drawer-declaration';
const NAV_DRAWER_CONTAINER = 'umd-nav-drawer-container';
const NAV_DRAWER_BODY_OVERLAY = 'umd-nav-drawer-body-overlay';
const NAV_DRAWER_BUTTON = 'umd-nav-drawer-button';
const NAV_DRAWER_BUTTON_WRAPPER = 'umd-nav-drawer-button-wrapper';

const DisplayButtonStyles = `
  .${NAV_DRAWER_BUTTON} {
    height: 44px;
    width: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .${NAV_DRAWER_BUTTON}:hover .${NAV_DRAWER_BUTTON_WRAPPER} span,
  .${NAV_DRAWER_BUTTON}:focus .${NAV_DRAWER_BUTTON_WRAPPER} span {
    background-color: ${Colors.red};
  }

  .${NAV_DRAWER_BUTTON_WRAPPER} {
    position: relative;
    width: 20px;
    height: 15px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .${NAV_DRAWER_BUTTON_WRAPPER} span {
    width: 20px;
    height: 2px;
    background-color: ${Colors.black};
    transition: background-color 0.3s ease-in-out;
  }

  .${NAV_DRAWER_BUTTON_WRAPPER} span:last-child {
    width: 17px;
  }
`;

// prettier-ignore
export const DrawerContainerStyles = `
  .${NAV_DRAWER_CONTAINER} {
    position: fixed;
    bottom: 0;
    left: 0;
    top: 0;
    transition: transform ${ANIMATION_TIME}ms ease-in-out;
    z-index: 9;
    display: none;
    transform: translateX(-100%);
  }

  .${NAV_DRAWER_CONTAINER} > * {
    height: 100% !important;
  }

  .${NAV_DRAWER_BODY_OVERLAY} {
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

const STYLES_HEADER_NAV_DRAWER_ELEMENT = `
  ${DisplayButtonStyles}
  ${DrawerContainerStyles}
  ${NavCloseButton.Styles}
  ${NavDrawerSlider.Styles}
`;

const CreateDisplayButton = (props: TypeDrawerProps) => {
  const { eventOpen } = props;
  const button = document.createElement('button');
  const wrapper = document.createElement('span');
  const spans = ['one', 'two', 'three'].map(() => {
    return document.createElement('span');
  });

  wrapper.classList.add(NAV_DRAWER_BUTTON_WRAPPER);
  spans.forEach((span) => wrapper.appendChild(span));

  button.appendChild(wrapper);
  button.classList.add(NAV_DRAWER_BUTTON);
  button.addEventListener('click', () => eventOpen());

  return button;
};

const CreateDrawerElement = (props: TypeDrawerProps) => {
  const { eventClose } = props;
  const bodyOverlay = document.createElement('div');
  const drawer = document.createElement('div');
  const slider = NavDrawerSlider.CreateElement({
    ...props,
    displayType: 'drawer-nav',
  });
  const closeButton = NavCloseButton.CreateElement(props);

  console.log(slider);

  drawer.appendChild(slider);

  bodyOverlay.appendChild(drawer);
  bodyOverlay.classList.add(NAV_DRAWER_BODY_OVERLAY);
  bodyOverlay.addEventListener('click', eventClose.bind(props));

  drawer.classList.add(NAV_DRAWER_CONTAINER);

  return bodyOverlay;
};

const CreateHeaderNavDrawerContainer = (props: TypeDrawerProps) => {
  const container = document.createElement('div');
  const openButton = CreateDisplayButton(props);
  const drawer = CreateDrawerElement(props);

  container.appendChild(openButton);
  container.appendChild(drawer);

  return container;
};

const CreateHeaderNavDrawerElement = (props: TypeDrawerRequirements) =>
  (() => {
    const elementContainer = document.createElement('div');
    const focusCallback = () => {
      console.log('focus callback needs to be completed');
    };
    const setFocusCallback = (arg: any) => {};

    const eventClose = () => {
      const body = document.querySelector('body') as HTMLBodyElement;
      const bodyOverlay = elementContainer.querySelector(
        `.${NAV_DRAWER_BODY_OVERLAY}`,
      ) as HTMLDivElement;
      const drawer = elementContainer.querySelector(
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

    const eventOpen = () => {
      const body = document.querySelector('body') as HTMLBodyElement;
      const bodyOverlay = elementContainer.querySelector(
        `.${NAV_DRAWER_BODY_OVERLAY}`,
      ) as HTMLDivElement;
      const drawer = elementContainer.querySelector(
        `.${NAV_DRAWER_CONTAINER}`,
      ) as HTMLDivElement;

      setFocusCallback(
        EventAccessibilityFocus({
          element: elementContainer,
          action: () => eventClose(),
        }),
      );

      bodyOverlay.style.display = 'block';
      drawer.style.display = 'flex';

      setTimeout(() => {
        bodyOverlay.style.opacity = '1';
        drawer.style.transform = 'translateX(0)';
        body.style.overflow = 'hidden';
        // if (firstLink) firstLink.focus();
      }, 100);
    };

    const getContainer = () => elementContainer;

    const children = CreateHeaderNavDrawerContainer({
      ...props,
      getContainer,
      eventOpen,
      eventClose,
      setFocusCallback,
      focusCallback,
    });

    elementContainer.classList.add(NAV_DECLARATION);
    elementContainer.appendChild(children);

    return elementContainer;
  })();

export default {
  CreateElement: CreateHeaderNavDrawerElement,
  Styles: STYLES_HEADER_NAV_DRAWER_ELEMENT,
};
