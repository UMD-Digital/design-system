import { Tokens } from '@universityofmaryland/variables';

const { Colors, Spacing } = Tokens;

export type TypeDrawerCloseButton = {
  eventClose: () => void;
};

const ANIMATION_TIME = 300;

const NAV_DRAWER_CONTAINER = 'umd-nav-drawer-container';
const NAV_DRAWER_BODY_OVERLAY = 'umd-nav-drawer-body-overlay';
const DRAWER_CLOSE_BUTTON = 'umd-element-drawer-close-button';

const BUTTON_ICON = `<svg aria-hidden="true" width="96" height="96" viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="25.0241" y="13.2861" width="83" height="16.6" transform="rotate(45 25.0241 13.2861)"></rect><rect x="83.7139" y="25.0241" width="83" height="16.6" transform="rotate(135 83.7139 25.0241)"></rect></svg>`;

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

  .${DRAWER_CLOSE_BUTTON} {
    background-color: ${Colors.red};
    display: flex;
    align-items: center;
    justify-content: center;
    height: ${Spacing['2xl']};
    width: ${Spacing['2xl']};
    padding: 12px;
    transition: background .5s ease-in-out;
  }

  .${DRAWER_CLOSE_BUTTON}:hover,
  .${DRAWER_CLOSE_BUTTON}:focus {
    background-color: #a90007;
  }

  .${DRAWER_CLOSE_BUTTON} svg {
    fill: ${Colors.white};
  }
`;

const STYLES_DRAWER_ELEMENT = `
  ${DrawerContainerStyles}
`;

const CreateDrawerButton = (element: TypeDrawerCloseButton) => {
  const drawerCloseButton = document.createElement('button');

  drawerCloseButton.innerHTML = BUTTON_ICON;
  drawerCloseButton.classList.add(DRAWER_CLOSE_BUTTON);
  drawerCloseButton.addEventListener('click', element.eventClose.bind(element));

  return drawerCloseButton;
};

export default {
  CreateElement: CreateDrawerButton,
  Styles: STYLES_DRAWER_ELEMENT,
};
