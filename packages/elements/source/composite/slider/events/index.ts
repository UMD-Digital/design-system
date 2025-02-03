import { token, typography } from '@universityofmaryland/web-styles-library';
import * as Utility from 'utilities';

type TypeSliderEventButtonProps = {
  SetCountForward: () => void;
  SetCountBackward: () => void;
  SetButtonVisibility: () => void;
  SetSlideDatesBackwards: () => void;
  SetSlideDatesForward: () => void;
};

type TypeSliderEventIntroProps = {
  headline?: HTMLElement | null;
  actions?: HTMLElement | null;
};

type TypeSliderEventSlideContentProps = {
  dataSlider: HTMLDivElement;
};

type TypeSliderEventSlideProps = TypeSliderEventSlideContentProps &
  TypeSliderEventButtonProps;

type TypeSliderEventScrollerProps = TypeSliderEventSlideProps &
  TypeSliderEventIntroProps;

type TypeSliderEventProps = TypeSliderEventSlideContentProps &
  TypeSliderEventIntroProps & {
    isThemeDark?: boolean;
  };

const { convertJSSObjectToStyles, convertPixelStringToNumber } = Utility.styles;

const TABLET = 750;
const DESKTOP = 1000;
const LARGE = 1300;

const ANIMATION_DURATION = 500;

const ATTRIBUTE_THEME = 'theme';
const THEME_DARK = 'dark';

const IS_THEME_DARK = `[${ATTRIBUTE_THEME}="${THEME_DARK}"]`;

const ELEMENT_NAME = 'umd-element-slider-events';
const ELEMENT_SLIDER_EVENT_DECLRATION = 'slider-events-declaration';
const ELEMENT_SLIDER_EVENT_CONTAINER = 'slider-events-container';
const ELEMENT_SLIDER_EVENT_CONTAINER_WRAPPER = 'slider-event-container-wrapper';
const ELEMENT_SLIDER_EVENT_COVER = 'slider-event-cover';

const ELEMENT_SLIDER_EVENT_INTRO = 'slider-event-intro-container';
const ELEMENT_SLIDER_EVENT_INTRO_HEADLINE = 'slider-event-intro-headline';
const ELEMENT_SLIDER_EVENT_INTRO_ACTIONS = 'slider-event-intro-actions';

const ELEMENT_SLIDER_EVENT_SLIDE_CONTAINTER = 'slider-event-slide-container';
const ELEMENT_SLIDER_EVENT_SLIDE_WRAPPER = 'slider-event-slide-wrapper';
const ELEMENT_SLIDER_EVENT_SLIDE_SCROLLER = 'slider-event-slide-scroller';

const ELEMENT_SLIDER_EVENT_SLIDE_BUTTON = 'slider-event-slide-button';
const ELEMENT_SLIDER_EVENT_SLIDE_BUTTON_FORWARD = 'slider-event-button-forward';
const ELEMENT_SLIDER_EVENT_SLIDE_BUTTON_BACK = 'slider-event-button-back';

const OVERWRITE_THEME_DARK_CONTAINER = `.${ELEMENT_SLIDER_EVENT_CONTAINER}${IS_THEME_DARK}`;
const OVERWRITE_THEME_DARK_CONTAINER_WRAPPER = `.${ELEMENT_SLIDER_EVENT_CONTAINER}${IS_THEME_DARK} .${ELEMENT_SLIDER_EVENT_CONTAINER_WRAPPER}`;
const OVERWRITE_THEME_DARK_INTRO_COVER = `.${ELEMENT_SLIDER_EVENT_CONTAINER}${IS_THEME_DARK} .${ELEMENT_SLIDER_EVENT_COVER}`;
const OVERWRITE_THEME_DARK_INTRO_HEADLINE = `.${ELEMENT_SLIDER_EVENT_CONTAINER}${IS_THEME_DARK} .${ELEMENT_SLIDER_EVENT_INTRO_HEADLINE}`;
const OVERWRITE_THEME_DARK_ARROW = `.${ELEMENT_SLIDER_EVENT_CONTAINER}${IS_THEME_DARK} .${ELEMENT_SLIDER_EVENT_SLIDE_BUTTON}`;

// prettier-ignore
const VariationThemeDark = `
  ${OVERWRITE_THEME_DARK_CONTAINER_WRAPPER} {
    background-color: ${token.color.gray.darker};
  }

  ${OVERWRITE_THEME_DARK_CONTAINER} * {
    color: #fff !important;
  }

  ${OVERWRITE_THEME_DARK_INTRO_COVER} {
    background-color: ${token.color.gray.darker};
  }

  ${OVERWRITE_THEME_DARK_INTRO_HEADLINE} {
    color: ${token.color.white};
  }

  ${OVERWRITE_THEME_DARK_ARROW} {
    background-color: ${token.color.gray.dark};
  }

  ${OVERWRITE_THEME_DARK_ARROW} svg {
    fill: ${token.color.white}
  }

  ${OVERWRITE_THEME_DARK_ARROW}:hover {
    background-color: ${token.color.white}
  }

  ${OVERWRITE_THEME_DARK_ARROW}:hover svg {
    fill: ${token.color.black}
  }
`

const ButtonStyles = `
  .${ELEMENT_SLIDER_EVENT_SLIDE_BUTTON} {
    border: none;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${token.color.gray.light};
    transition: background-color ${ANIMATION_DURATION}ms;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 99;
  }

  @container ${ELEMENT_NAME} (min-width: ${TABLET}px) {
    .${ELEMENT_SLIDER_EVENT_SLIDE_BUTTON} {
      width: 48px;
      height: 48px;
    }
  }

  .${ELEMENT_SLIDER_EVENT_SLIDE_BUTTON}:hover {
    background-color: ${token.color.black};
  }

  .${ELEMENT_SLIDER_EVENT_SLIDE_BUTTON}:hover svg {
    fill: ${token.color.white};
  }

  .${ELEMENT_SLIDER_EVENT_SLIDE_BUTTON} svg {
    transition: fill .5s;
    fill: ${token.color.black};
    width: 16px;
    height: 6px;
  }

  @container ${ELEMENT_NAME} (min-width: ${TABLET}px) {
    .${ELEMENT_SLIDER_EVENT_SLIDE_BUTTON} svg {
      width: 24px;
      height: 8px;
    }
  }

  .${ELEMENT_SLIDER_EVENT_SLIDE_BUTTON_BACK} {
    left: 0;
  }

  @container ${ELEMENT_NAME} (max-width: ${TABLET - 1}px) {
    .${ELEMENT_SLIDER_EVENT_SLIDE_BUTTON_BACK} {
      left: -24px;
      top: ${token.spacing.xs};
    }
  }

  .${ELEMENT_SLIDER_EVENT_SLIDE_BUTTON_FORWARD} {
    right: 0;
  }

  @container ${ELEMENT_NAME} (max-width: ${TABLET - 1}px) {
    .${ELEMENT_SLIDER_EVENT_SLIDE_BUTTON_FORWARD} {
      right: -24px;
      top: ${token.spacing.xs};
    }
  }
`;

const DatesStyles = `
  .${ELEMENT_SLIDER_EVENT_SLIDE_CONTAINTER} {
    display: flex;
    position: relative;
    padding: 0 36px;
  }
  
  @container ${ELEMENT_NAME} (min-width: ${TABLET}px) {
    .${ELEMENT_SLIDER_EVENT_SLIDE_CONTAINTER} {
      padding: 0 60px;
      width: calc(100% - 96px);
    }
  }
  
  .${ELEMENT_SLIDER_EVENT_SLIDE_WRAPPER} {
    position: relative;
    width: 100%;
    overflow: hidden;
    min-height: 44px;
  }

  .${ELEMENT_SLIDER_EVENT_SLIDE_WRAPPER} ::slotted(*) {
    margin-bottom: 0 !important;
  }
`;

const IntroStyles = `
  .${ELEMENT_SLIDER_EVENT_INTRO} {
    padding: 0 ${token.spacing.lg};
    position: relative;
  }

  @container ${ELEMENT_NAME} (max-width: ${TABLET - 1}px) {
    .${ELEMENT_SLIDER_EVENT_INTRO} {
      text-align: center;
    }
  }

  @container ${ELEMENT_NAME} (min-width: ${TABLET}px) {
    .${ELEMENT_SLIDER_EVENT_INTRO} {
      padding: 0;
      padding-right: 24px;
      padding-left: 0;
      width: 200px;
    }
  }

  @container ${ELEMENT_NAME} (min-width: ${LARGE}px) {
    .${ELEMENT_SLIDER_EVENT_INTRO} {
      width: 320px;
    }
  }

  .${ELEMENT_SLIDER_EVENT_INTRO_HEADLINE} {
    color: ${token.color.black};
    font-weight: 700;
  }

  .${ELEMENT_SLIDER_EVENT_INTRO_HEADLINE} + * {
    margin-top: ${token.spacing.min};
    display: block;
  }

  ${convertJSSObjectToStyles({
    styleObj: {
      [`.${ELEMENT_SLIDER_EVENT_INTRO_HEADLINE}`]: typography.sans.larger,
    },
  })}

  * + .${ELEMENT_SLIDER_EVENT_INTRO_ACTIONS} {
    text-decoration: none;
  }
  
  .${ELEMENT_SLIDER_EVENT_INTRO_ACTIONS} {
    margin-top: ${token.spacing.min};
  }
  

`;

const ScrollerStyles = `
  .${ELEMENT_SLIDER_EVENT_SLIDE_SCROLLER} {
    position: relative;
    z-index: 99;
  }
  
  @container ${ELEMENT_NAME} (min-width: ${TABLET}px) {
  .${ELEMENT_SLIDER_EVENT_SLIDE_SCROLLER} {
      display: flex;
      align-items: center;
    }
  }
`;

const CoverStyles = `
  .${ELEMENT_SLIDER_EVENT_COVER} {
    display: block;
    position: absolute;
    width: 200vw;
    height: 100%;
    top: 0;
    left: -100vw;
    background-color: ${token.color.gray.lighter};
  }
  
  @container ${ELEMENT_NAME} (min-width: ${TABLET}px) {
    .${ELEMENT_SLIDER_EVENT_COVER} {
      width: 40vw;
      left: calc(100% - 1px);
    }
  }
`;

// prettier-ignore
const STYLES_SLIDER_EVENTS_ELEMENT = `
  .${ELEMENT_SLIDER_EVENT_DECLRATION} {
    container: ${ELEMENT_NAME} / inline-size;
  }
  
  .${ELEMENT_SLIDER_EVENT_CONTAINER_WRAPPER} {
    padding: 24px 0;
    background-color: ${token.color.gray.lighter};
    position: relative;
    z-index: 99;
  }
  
  @container ${ELEMENT_NAME} (max-width: 260px) {
    .${ELEMENT_SLIDER_EVENT_CONTAINER_WRAPPER} {
      display: none
    }
  }
  
  @container ${ELEMENT_NAME} (min-width: ${TABLET}px) {
    .${ELEMENT_SLIDER_EVENT_CONTAINER_WRAPPER} {
      padding: 40px;
    }
  }
  
  ${CoverStyles}
  ${ScrollerStyles}
  ${IntroStyles}
  ${DatesStyles}
  ${ButtonStyles}
  ${VariationThemeDark}
`;

const CreateBackButton = ({
  SetCountBackward,
  SetButtonVisibility,
  SetSlideDatesBackwards,
}: TypeSliderEventButtonProps) => {
  const button = document.createElement('button');

  button.innerHTML = Utility.asset.icon.BACK_ARROW;
  button.classList.add(ELEMENT_SLIDER_EVENT_SLIDE_BUTTON);
  button.classList.add(ELEMENT_SLIDER_EVENT_SLIDE_BUTTON_BACK);
  button.style.display = 'none';
  button.setAttribute('type', 'button');
  button.setAttribute('aria-label', 'see previous date');

  const clickEvent = () => {
    if (button.hasAttribute('disabled')) return;
    SetCountBackward();
    SetButtonVisibility();
    SetSlideDatesBackwards();
  };

  button.addEventListener('click', clickEvent);
  button.addEventListener('touchstart', clickEvent);

  return button;
};

const CreateForwardButton = ({
  SetCountForward,
  SetButtonVisibility,
  SetSlideDatesForward,
}: TypeSliderEventButtonProps) => {
  const button = document.createElement('button');

  button.innerHTML = Utility.asset.icon.FORWARD_ARROW;
  button.classList.add(ELEMENT_SLIDER_EVENT_SLIDE_BUTTON);
  button.classList.add(ELEMENT_SLIDER_EVENT_SLIDE_BUTTON_FORWARD);
  button.setAttribute('type', 'button');
  button.setAttribute('aria-label', 'see next date');

  const clickEvent = () => {
    if (button.hasAttribute('disabled')) return;
    SetCountForward();
    SetButtonVisibility();
    SetSlideDatesForward();
  };

  button.addEventListener('click', clickEvent);
  button.addEventListener('touchstart', clickEvent);

  return button;
};

const CreateDatesContainer = (props: TypeSliderEventSlideProps) => {
  const { dataSlider } = props;
  const container = document.createElement('div');
  const datesWrapper = document.createElement('div');
  const backButton = CreateBackButton(props);
  const forwardButton = CreateForwardButton(props);

  datesWrapper.classList.add(ELEMENT_SLIDER_EVENT_SLIDE_WRAPPER);
  dataSlider.style.display = 'block';
  datesWrapper.appendChild(dataSlider);

  container.classList.add(ELEMENT_SLIDER_EVENT_SLIDE_CONTAINTER);
  container.appendChild(backButton);
  container.appendChild(datesWrapper);
  container.appendChild(forwardButton);

  return container;
};

const CreateIntroWrapper = (props: TypeSliderEventIntroProps) => {
  const { headline, actions } = props;
  const introductionWrapper = document.createElement('div');
  if (headline) {
    headline.classList.add(ELEMENT_SLIDER_EVENT_INTRO_HEADLINE);
    introductionWrapper.appendChild(headline);
  }
  if (actions) {
    introductionWrapper.appendChild(actions);
  }

  introductionWrapper.classList.add(ELEMENT_SLIDER_EVENT_INTRO);

  return introductionWrapper;
};

const CreateScrollerWrapper = (props: TypeSliderEventScrollerProps) => {
  const container = document.createElement('div');
  const introductionWrapper = CreateIntroWrapper(props);
  const datesContainer = CreateDatesContainer(props);

  container.classList.add(ELEMENT_SLIDER_EVENT_SLIDE_SCROLLER);

  container.appendChild(introductionWrapper);
  container.appendChild(datesContainer);

  return container;
};

const ShowNumberOfDates = ({ container }: { container: HTMLElement }) => {
  let count = 1;

  if (container.offsetWidth > TABLET) count = 2;
  if (container.offsetWidth > DESKTOP) count = 3;
  if (container.offsetWidth > LARGE) count = 4;

  return count;
};

const JumpToDate = ({
  dataSlider,
  currentPosition,
}: {
  dataSlider: HTMLElement;
  currentPosition: number;
}) => {
  const dateElements = Array.from(
    dataSlider.querySelectorAll(':scope > *'),
  ) as HTMLDivElement[];

  if (!dateElements) return;

  const firstElement = dateElements[0];
  const currentPositonAboveZero = currentPosition > 0;
  const currentElement = dateElements[currentPosition];
  let endPosition = 0;

  if (currentPositonAboveZero) {
    endPosition = currentElement.offsetLeft - firstElement.offsetLeft;
  }

  dataSlider.style.transform = `translateX(${-endPosition}px)`;
};

const ButtonVisibilityLogic = ({
  container,
  dataSlider,
  currentPosition,
}: {
  container: HTMLElement;
  dataSlider: HTMLElement;
  currentPosition: number;
}) => {
  const dateElements = Array.from(
    dataSlider.querySelectorAll(':scope > *'),
  ) as HTMLDivElement[];
  const buttons = Array.from(
    container.querySelectorAll(`.${ELEMENT_SLIDER_EVENT_SLIDE_BUTTON}`),
  ) as HTMLButtonElement[];
  const count = ShowNumberOfDates({ container });
  const length = dateElements.length;

  buttons.forEach((button) => {
    button.setAttribute('disabled', '');

    setTimeout(() => {
      button.removeAttribute('disabled');
    }, ANIMATION_DURATION + 100);
  });

  if (currentPosition === 0) {
    buttons[0].style.display = 'none';
  } else {
    buttons[0].style.display = 'flex';
  }

  if (currentPosition >= length - count) {
    buttons[1].style.display = 'none';
  } else {
    buttons[1].style.display = 'flex';
  }
};

const SizeDatesElements = ({
  container,
  dataSlider,
  isThemeDark,
  SetButtonVisibility,
}: {
  container: HTMLElement;
  dataSlider: HTMLElement;
  isThemeDark?: boolean;
  SetButtonVisibility: () => void;
}) => {
  const sliderWrapper = container.querySelector(
    `.${ELEMENT_SLIDER_EVENT_SLIDE_WRAPPER}`,
  ) as HTMLDivElement;

  const sizing = ({ sliderWrapper }: { sliderWrapper: HTMLDivElement }) => {
    const dateElements = Array.from(
      dataSlider.querySelectorAll(':scope > *'),
    ) as HTMLDivElement[];

    const sliderVisibility = ({ show = true }: { show?: boolean }) => {
      dataSlider.style.visibility = show ? 'visible' : 'hidden';
    };

    const setHeight = () => {
      const maxHeightElement = dateElements.sort((a, b) => {
        return a.offsetHeight - b.offsetHeight;
      })[0];
      const height =
        maxHeightElement.offsetHeight +
        convertPixelStringToNumber(maxHeightElement.style.marginTop);

      sliderWrapper.style.height = `${height}px`;
    };

    const setWidthPerDate = () => {
      const count = ShowNumberOfDates({ container });
      const dateElementSize = sliderWrapper.offsetWidth / count;
      const elementWidth = container.offsetWidth;
      const isMobile = elementWidth < TABLET;

      if (elementWidth === 0) {
        setTimeout(() => {
          sizing({ sliderWrapper });
        }, 200);
        return;
      }

      dataSlider.style.width = `${dateElements.length * dateElementSize}px`;

      dateElements.forEach((dateElement) => {
        dateElement.style.width = `${dateElementSize}px`;

        if (isMobile) {
          const lineColor = isThemeDark
            ? token.color.gray.mediumAA
            : token.color.gray.light;

          dateElement.style.display = `flex`;
          dateElement.style.justifyContent = `center`;
          dateElement.style.paddingRight = `0`;
          dateElement.style.marginTop = `${token.spacing.xs}`;
          dateElement.style.paddingTop = `${token.spacing.xs}`;
          dateElement.style.borderTop = `1px solid ${lineColor}`;
        } else {
          dateElement.style.display = `flex`;
          dateElement.style.justifyContent = `inherit`;
          dateElement.style.paddingRight = `${token.spacing.lg}`;

          dateElement.style.marginTop = `0`;
          dateElement.style.paddingTop = `0`;
          dateElement.style.borderTop = `none`;
        }
      });
    };

    sliderVisibility({ show: false });
    setWidthPerDate();
    setHeight();
    sliderVisibility({ show: true });
    SetButtonVisibility();
  };

  sizing({ sliderWrapper });
};

const EventSlideDates = ({
  forward,
  dataSlider,
}: {
  forward: boolean;
  dataSlider: HTMLElement;
}) => {
  const dateElements = Array.from(
    dataSlider.querySelectorAll(':scope > *'),
  ) as HTMLDivElement[];
  const width = dateElements[0].offsetWidth;
  const loop = 30;
  const sliderStyle = dataSlider.style.transform;
  const sliderPosition = sliderStyle
    ? parseInt(sliderStyle.replace(/[^\d.]/g, ''))
    : 0;
  const endPosition = forward
    ? Math.floor(sliderPosition + width)
    : Math.floor(sliderPosition - width);
  const increment = width / loop;
  let index = 1;

  const slideFunction = () => {
    const incrementIncrease = increment * index;
    const postion = forward
      ? sliderPosition + incrementIncrease
      : sliderPosition - incrementIncrease;

    if (loop > index) {
      index++;
      window.requestAnimationFrame(slideFunction);
      dataSlider.style.transform = `translateX(${-postion}px)`;
    } else {
      dataSlider.style.transform = `translateX(${-endPosition}px)`;
    }
  };

  window.requestAnimationFrame(slideFunction);
};

const EventSwipe = ({
  container,
  dataSlider,
  currentPosition,
  SetCountBackward,
  SetCountForward,
  SetSlideDatesBackwards,
  SetSlideDatesForward,
  SetButtonVisibility,
}: {
  container: HTMLElement;
  dataSlider: HTMLElement;
  currentPosition: number;
  SetCountBackward: () => void;
  SetCountForward: () => void;
  SetSlideDatesBackwards: () => void;
  SetSlideDatesForward: () => void;
  SetButtonVisibility: () => void;
}) => {
  const dateElements = Array.from(
    dataSlider.querySelectorAll(':scope > *'),
  ) as HTMLDivElement[];
  const count = ShowNumberOfDates({ container });
  const swipes = (isrightswipe: Boolean) => {
    if (isrightswipe) {
      if (currentPosition > 0) {
        SetCountBackward();
        SetSlideDatesBackwards();
      }
    } else {
      if (currentPosition <= dateElements.length - count) {
        SetCountForward();
        SetSlideDatesForward();
      }
    }

    SetButtonVisibility();
  };

  Utility.javascriptEvents.CreateEventSwipe({ container, callback: swipes });
};

const OnLoadStyles = ({ dataSlider }: { dataSlider: HTMLElement }) => {
  dataSlider.style.display = 'flex';
  dataSlider.style.position = 'absolute';
  dataSlider.style.top = '0';
  dataSlider.style.left = '0';
};

const CreateSliderEventsElement = (props: TypeSliderEventProps) =>
  (() => {
    const { isThemeDark, dataSlider } = props;
    const declaration = document.createElement('div');
    const container = document.createElement('div');
    const wrapper = document.createElement('div');
    const coverElement = document.createElement('div');
    const CommonDomElements = {
      container,
      dataSlider,
    };

    const SetCountForward = () => (currentPosition = currentPosition + 1);
    const SetCountBackward = () => (currentPosition = currentPosition - 1);
    const SetButtonVisibility = () =>
      ButtonVisibilityLogic({ ...CommonDomElements, currentPosition });
    const SetDateElementsSizes = () =>
      SizeDatesElements({
        ...CommonDomElements,
        isThemeDark,
        SetButtonVisibility,
      });
    const SetJumpToDate = () =>
      JumpToDate({ ...CommonDomElements, currentPosition });
    const SetSlideDatesForward = () =>
      EventSlideDates({ ...CommonDomElements, forward: true });
    const SetSlideDatesBackwards = () =>
      EventSlideDates({ ...CommonDomElements, forward: false });
    const SetEventSwipe = () =>
      EventSwipe({
        ...CommonDomElements,
        currentPosition,
        SetCountBackward,
        SetCountForward,
        SetSlideDatesBackwards,
        SetSlideDatesForward,
        SetButtonVisibility,
      });
    const EventResize = () => {
      SetDateElementsSizes();
      SetJumpToDate();
      SetButtonVisibility();
    };
    const containerWrapper = CreateScrollerWrapper({
      ...props,
      SetCountForward,
      SetCountBackward,
      SetButtonVisibility,
      SetSlideDatesBackwards,
      SetSlideDatesForward,
    });
    const Load = () => {
      OnLoadStyles({ dataSlider });
      EventResize();
      SetEventSwipe();
    };

    let currentPosition = 0;

    dataSlider.style.visibility = 'hidden';

    coverElement.classList.add(ELEMENT_SLIDER_EVENT_COVER);

    wrapper.classList.add(ELEMENT_SLIDER_EVENT_CONTAINER_WRAPPER);

    wrapper.appendChild(containerWrapper);
    wrapper.appendChild(coverElement);

    if (isThemeDark) container.setAttribute(ATTRIBUTE_THEME, THEME_DARK);
    container.classList.add(ELEMENT_SLIDER_EVENT_CONTAINER);
    container.appendChild(wrapper);

    declaration.classList.add(ELEMENT_SLIDER_EVENT_DECLRATION);
    declaration.appendChild(container);

    Load();
    window.addEventListener(
      'resize',
      Utility.performance.debounce(EventResize, 20),
    );

    return {
      element: declaration,
      events: {
        SetDateElementsSizes,
      },
    };
  })();

export default {
  CreateElement: CreateSliderEventsElement,
  Styles: STYLES_SLIDER_EVENTS_ELEMENT,
};
