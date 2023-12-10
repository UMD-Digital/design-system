import { ELEMENTS, VARIABLES } from 'components/nav-drawer/globals';
import { UMDNavDrawer } from 'components/nav-drawer/component';
import { CreateDrawerButton, drawerButtonStyles } from './button-close';
import { CreateSlider, drawerSliderStyles } from '../slider';

// prettier-ignore
const testStyles = `
  .${ELEMENTS.NAV_DRAWER_BODY_OVERLAY} {
    display: block;
    opacity: 1;
  }

  .${ELEMENTS.NAV_DRAWER_CONTAINER} {
    display: flex;
    transform: translateX(0);
  }
`;

// prettier-ignore
const bodyOverlay = `
  .${ELEMENTS.NAV_DRAWER_BODY_OVERLAY} {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    background-color: rgba(0,0,0,0.5);
    transition: opacity ${VARIABLES.ANIMATION_TIME}ms ease-in-out;
    z-index: 999999;
    cursor: pointer;
    display: none;
    opacity: 0;
  }
`;

// prettier-ignore
export const drawerStyles = `
  .${ELEMENTS.NAV_DRAWER_CONTAINER} {
    position: fixed;
    bottom: 0;
    left: 0;
    top: 0;
    transition: transform ${VARIABLES.ANIMATION_TIME}ms ease-in-out;
    z-index: 9;
    display: none;
    transform: translateX(-100%);
  }

  ${bodyOverlay}
  ${drawerButtonStyles}
  ${drawerSliderStyles}
  ${testStyles}
`;

export const CreateDrawer = ({ element }: { element: UMDNavDrawer }) => {
  const bodyOverlay = document.createElement('div');
  const drawer = document.createElement('div');
  const slider = CreateSlider({ element });
  const closeButton = CreateDrawerButton({ element });

  drawer.appendChild(slider);
  drawer.appendChild(closeButton);

  bodyOverlay.appendChild(drawer);
  bodyOverlay.classList.add(ELEMENTS.NAV_DRAWER_BODY_OVERLAY);
  bodyOverlay.addEventListener('click', element.eventClose.bind(element));

  drawer.classList.add(ELEMENTS.NAV_DRAWER_CONTAINER);

  return bodyOverlay;
};
