import { Tokens } from '@universityofmaryland/variables';
import { Accessibility } from 'utilities';
import NavDrawerSlider from '../slider';
import NavDrawer, { TypeDrawerCloseButton } from './button';

const { Colors } = Tokens;
const { EventAccessibilityFocus } = Accessibility;

type TypeDrawerOpenButton = {
  eventOpen: () => void;
};

type TypeHeaderNavDrawer = {
  primarySlideLinks?: HTMLElement | null;
  primarySlidesSecondaryLinks?: HTMLElement | null;
  primarySlideContent?: HTMLElement | null;
  childrenSlides?: HTMLElement | null;
};

const ANIMATION_TIME = 300;

const NAV_DECLARATION = 'umd-nav-drawer-declaration';
const NAV_DRAWER_CONTAINER = 'umd-nav-drawer-container';
const NAV_DRAWER_BODY_OVERLAY = 'umd-nav-drawer-body-overlay';
const NAV_DRAWER_BUTTON = 'umd-nav-drawer-button';
const NAV_DRAWER_BUTTON_WRAPPER = 'umd-nav-drawer-button-wrapper';

const elementContainer = document.createElement('div');

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
  ${NavDrawer.Styles}
  ${NavDrawerSlider.Styles}
`;

const EventClose = (props: {
  getContainer: () => Element | null;
  focusCallback: () => void | null;
}) => {
  const { getContainer, focusCallback } = props;
  const element = getContainer();

  if (!element) return;

  const body = document.querySelector('body') as HTMLBodyElement;
  const bodyOverlay = element.querySelector(
    `.${NAV_DRAWER_BODY_OVERLAY}`,
  ) as HTMLDivElement;
  const drawer = element.querySelector(
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

const CreateDisplayButton = (props: {
  getContainer: () => Element | null;
  eventClose: () => void;
  setFocusCallback: (arg: any) => void;
  ATTRIBUTE_ACTIVE_SLIDE: string;
}) => {
  const button = document.createElement('button');
  const wrapper = document.createElement('span');
  const spans = ['one', 'two', 'three'].map(() => {
    return document.createElement('span');
  });

  wrapper.classList.add(NAV_DRAWER_BUTTON_WRAPPER);
  spans.forEach((span) => wrapper.appendChild(span));

  button.appendChild(wrapper);
  button.classList.add(NAV_DRAWER_BUTTON);
  button.addEventListener('click', EventOpen.bind(null, props));

  return button;
};

const EventOpen = (props: {
  getContainer: () => Element | null;
  eventClose: () => void;
  setFocusCallback: (arg: any) => void;
  ATTRIBUTE_ACTIVE_SLIDE: string;
}) => {
  const { getContainer, eventClose, setFocusCallback, ATTRIBUTE_ACTIVE_SLIDE } =
    props;

  const element = getContainer();

  if (!element) return;

  const body = document.querySelector('body') as HTMLBodyElement;
  const bodyOverlay = element.querySelector(
    `.${NAV_DRAWER_BODY_OVERLAY}`,
  ) as HTMLDivElement;
  const drawer = element.querySelector(
    `.${NAV_DRAWER_CONTAINER}`,
  ) as HTMLDivElement;
  const activeSlide = element.querySelector(
    `[${ATTRIBUTE_ACTIVE_SLIDE}]`,
  ) as HTMLDivElement;

  if (!activeSlide) return;

  const firstLink = activeSlide.querySelector(`a`) as HTMLAnchorElement;

  setFocusCallback(
    EventAccessibilityFocus({
      element,
      action: () => eventClose(),
    }),
  );

  bodyOverlay.style.display = 'block';
  drawer.style.display = 'flex';

  setTimeout(() => {
    bodyOverlay.style.opacity = '1';
    drawer.style.transform = 'translateX(0)';
    body.style.overflow = 'hidden';
    if (firstLink) firstLink.focus();
  }, 100);
};

const CreateHeaderNavDrawerContainer = (element: any) => {
  const container = document.createElement('div');
  const openButton = CreateDisplayButton(element);
  const drawer = NavDrawer.CreateElement(element);

  container.appendChild(openButton);
  container.appendChild(drawer);

  return container;
};

type TypeState = {
  ATTRIBUTE_CHILD_REF: string;
  ATTRIBUTE_PARENT_REF: string;
  ATTRIBUTE_DATA_SLIDE: string;
  ATTRIBUTE_ACTIVE_SLIDE: string;
  ATTRIBUTE_ACTIVE_SELECTED: string;
  upcomingSlide: HTMLElement | null;
  previousSlide: HTMLElement | null;
  currentSlide: HTMLElement | null;
  previousSlideRef: string | null;
  upcomingSlideRef: string | null;
  parentRef: string | null;
  focusCallback: any;
  setFocusCallback: (arg: any) => void;
  setPreviousSlide: () => void;
  setUpcomingSlide: (arg: string) => void;
  setCurrentSlide: (arg: HTMLElement) => void;
  eventOpen: () => void;
  eventClose: () => void;
  eventSlideRight: () => void;
  getContainer: () => Element | null;
};

export const State: TypeState = {
  ATTRIBUTE_CHILD_REF: 'data-child-ref',
  ATTRIBUTE_PARENT_REF: 'data-parent-ref',
  ATTRIBUTE_DATA_SLIDE: 'data-slide',
  ATTRIBUTE_ACTIVE_SLIDE: 'data-active',
  ATTRIBUTE_ACTIVE_SELECTED: 'data-selected',
  upcomingSlide: null,
  previousSlide: null,
  previousSlideRef: null,
  upcomingSlideRef: null,
  parentRef: null,
  currentSlide: null,
  focusCallback: () => {},
  setFocusCallback: (arg: any) => {
    State.focusCallback = arg;
  },
  setPreviousSlide: () => {
    State.previousSlide = State.currentSlide;
  },
  eventSlideRight: () => {},
  setUpcomingSlide: (arg: string) => {
    State.upcomingSlideRef = arg;
  },
  setCurrentSlide: (arg: HTMLElement) => {
    State.currentSlide = arg;
  },
  eventOpen: () => EventOpen(State),
  eventClose: () => EventClose(State),
  getContainer: () => elementContainer.querySelector(`.${NAV_DECLARATION}`),
};

const CreateHeaderNavDrawerElement = (props: TypeHeaderNavDrawer) => {
  const content = CreateHeaderNavDrawerContainer({ ...State });
  content.classList.add(NAV_DECLARATION);

  elementContainer.classList.add('test');
  elementContainer.appendChild(content);

  elementContainer.style.width = '50px';
  elementContainer.style.height = '50px';
  elementContainer.style.backgroundColor = 'blue';

  return elementContainer;
};

export default {
  CreateElement: CreateHeaderNavDrawerElement,
  Styles: STYLES_HEADER_NAV_DRAWER_ELEMENT,
};
