import { CreateDrawerButton, drawerButtonStyles } from './button-close';
import { CreateSlider, drawerSliderStyles } from '../slider';
import { ELEMENTS, VARIABLES } from '../../globals';
import { UMDNavDrawer } from '../../index';

const { ANIMATION_TIME } = VARIABLES;
const { NAV_DRAWER_BODY_OVERLAY, NAV_DRAWER_CONTAINER } = ELEMENTS;

// prettier-ignore
const bodyOverlay = `
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

// prettier-ignore
export const drawerStyles = `
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

  ${bodyOverlay}
  ${drawerButtonStyles}
  ${drawerSliderStyles}
`;

export const CreateDrawer = ({ element }: { element: UMDNavDrawer }) => {
  const bodyOverlay = document.createElement('div');
  const drawer = document.createElement('div');
  const slider = CreateSlider({ element });
  const closeButton = CreateDrawerButton({ element });

  drawer.appendChild(slider);
  drawer.appendChild(closeButton);

  bodyOverlay.appendChild(drawer);
  bodyOverlay.classList.add(NAV_DRAWER_BODY_OVERLAY);
  bodyOverlay.addEventListener('click', element.eventClose.bind(element));

  drawer.classList.add(NAV_DRAWER_CONTAINER);

  return bodyOverlay;
};
