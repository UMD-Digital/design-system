import { colors } from '@universityofmaryland/umd-web-configuration';
import { UMDNavDrawer } from 'components/nav-drawer/component';

const NAV_DRAWER_BUTTON = 'umd-nav-drawer-button';
const NAV_DRAWER_BUTTON_WRAPPER = 'umd-nav-drawer-button-wrapper';

export const buttonStyles = `
  .${NAV_DRAWER_BUTTON} {
    height: 44px;
    width: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .${NAV_DRAWER_BUTTON}:hover .${NAV_DRAWER_BUTTON_WRAPPER} span,
  .${NAV_DRAWER_BUTTON}:focus .${NAV_DRAWER_BUTTON_WRAPPER} span {
    background-color: ${colors.red};
  }

  .${NAV_DRAWER_BUTTON_WRAPPER} {
    position: relative;
    width: 20px;
    height: 16px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .${NAV_DRAWER_BUTTON_WRAPPER} span {
    width: 20px;
    height: 2.5px;
    background-color: ${colors.black};
    transition: background-color 0.3s ease-in-out;
  }

  .${NAV_DRAWER_BUTTON_WRAPPER} span:last-child {
    width: 17px;
  }
`;

export const CreateButton = ({ element }: { element: UMDNavDrawer }) => {
  const button = document.createElement('button');
  const wrapper = document.createElement('span');
  const spans = ['one', 'two', 'three'].map(() => {
    return document.createElement('span');
  });

  wrapper.classList.add(NAV_DRAWER_BUTTON_WRAPPER);
  spans.forEach((span) => wrapper.appendChild(span));

  button.appendChild(wrapper);
  button.classList.add(NAV_DRAWER_BUTTON);
  button.addEventListener('click', element.eventOpen.bind(element));

  return button;
};
