import { colors, spacing } from '@universityofmaryland/variables';
import { ELEMENTS, VARIABLES } from 'components/nav-drawer/globals';
import { UMDNavDrawer } from 'components/nav-drawer/component';

const BUTTON_ICON = `<svg aria-hidden="true" width="96" height="96" viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="25.0241" y="13.2861" width="83" height="16.6" transform="rotate(45 25.0241 13.2861)"></rect><rect x="83.7139" y="25.0241" width="83" height="16.6" transform="rotate(135 83.7139 25.0241)"></rect></svg>`;
const DRAWER_CLOSE_BUTTON = 'umd-element-drawer-close-button';

// prettier-ignore
export const drawerButtonStyles = `
  .${DRAWER_CLOSE_BUTTON} {
    background-color: ${colors.red};
    display: flex;
    align-items: center;
    justify-content: center;
    height: ${spacing['2xl']};
    width: ${spacing['2xl']};
    padding: 12px;
    transition: background .5s ease-in-out;
  }

  .${DRAWER_CLOSE_BUTTON}:hover,
  .${DRAWER_CLOSE_BUTTON}:focus {
    background-color: #a90007;
  }

  .${DRAWER_CLOSE_BUTTON} svg {
    fill: ${colors.white};
  }
`;

export const CreateDrawerButton = ({ element }: { element: UMDNavDrawer }) => {
  const drawerCloseButton = document.createElement('button');

  drawerCloseButton.innerHTML = BUTTON_ICON;
  drawerCloseButton.classList.add(DRAWER_CLOSE_BUTTON);
  drawerCloseButton.addEventListener('click', element.eventClose.bind(element));

  return drawerCloseButton;
};
