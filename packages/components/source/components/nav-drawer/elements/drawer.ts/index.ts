import { colors, spacing } from '@universityofmaryland/umd-web-configuration';
import { ELEMENTS, VARIABLES } from 'components/nav-drawer/globals';
import { UMDNavDrawer } from 'components/nav-drawer/component';

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

export const drawerStyles = `
  .${ELEMENTS.NAV_DRAWER_CONTAINER} {
    background-color: ${colors.white};
    position: fixed;
    bottom: 0;
    left: 0;
    top: 0;
    transition: transform ${VARIABLES.ANIMATION_TIME}ms ease-in-out;
    padding: ${spacing['2xl']} ${spacing['5xl']} ${spacing.md} ${spacing.md};
    width: calc(100% - 16px);
    max-width: 400px;
    min-width: 280px;
    overflow-x: hidden;
    overflow-y: auto;
    z-index: 9;
    cursor: default;
    display: none;
    transform: translateX(-100%);
  }

  ${bodyOverlay}
`;

export const CreateDrawer = ({ element }: { element: UMDNavDrawer }) => {
  const bodyOverlay = document.createElement('div');
  const drawer = document.createElement('div');

  drawer.classList.add(ELEMENTS.NAV_DRAWER_CONTAINER);

  bodyOverlay.appendChild(drawer);
  bodyOverlay.classList.add(ELEMENTS.NAV_DRAWER_BODY_OVERLAY);
  bodyOverlay.addEventListener('click', element.eventClose.bind(element));
  drawer.addEventListener('click', (event) => {
    event.stopPropagation();
  });

  return bodyOverlay;
};
