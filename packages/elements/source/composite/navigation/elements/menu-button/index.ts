import * as token from '@universityofmaryland/web-styles-library/token';

export type TypeMenuDisplayButtonRequirements = {
  eventOpen: () => void;
};

const NAV_DRAWER_BUTTON = 'nav-drawer-button';
const NAV_DRAWER_BUTTON_WRAPPER = 'nav-drawer-button-wrapper';

// prettier-ignore
const STYLES_MENU_DISPLAY_BUTTON = `
  .${NAV_DRAWER_BUTTON} {
    height: 44px;
    width: 34px;
    display: flex;
    align-items: center;
  }

  .${NAV_DRAWER_BUTTON}:hover .${NAV_DRAWER_BUTTON_WRAPPER} span,
  .${NAV_DRAWER_BUTTON}:focus .${NAV_DRAWER_BUTTON_WRAPPER} span {
    background-color: ${token.color.red};
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
    background-color: ${token.color.black};
    transition: background-color 0.3s ease-in-out;
  }

  .${NAV_DRAWER_BUTTON_WRAPPER} span:last-child {
    width: 17px;
  }
`;

const CreateMenuDisplayButton = (props: TypeMenuDisplayButtonRequirements) => {
  const { eventOpen } = props;
  const button = document.createElement('button');
  const wrapper = document.createElement('span');
  const spans = ['one', 'two', 'three'].map(() => {
    return document.createElement('span');
  });

  wrapper.classList.add(NAV_DRAWER_BUTTON_WRAPPER);
  spans.forEach((span) => wrapper.appendChild(span));

  button.appendChild(wrapper);
  button.setAttribute('aria-label', 'Open Navigation Drawer');
  button.classList.add(NAV_DRAWER_BUTTON);
  button.addEventListener('click', () => eventOpen());

  return button;
};

export default {
  CreateElement: CreateMenuDisplayButton,
  Styles: STYLES_MENU_DISPLAY_BUTTON,
};
