import * as token from '@universityofmaryland/web-token-library';
import * as typography from '@universityofmaryland/web-styles-library/typography';
import { ElementBuilder } from '@universityofmaryland/web-builder-library';
import { setupSwipeDetection } from '@universityofmaryland/web-utilities-library/events';
import { debounce } from '@universityofmaryland/web-utilities-library/performance';
import { parsePixelValue } from '@universityofmaryland/web-utilities-library/styles';
import {
  arrow_left as iconArrowLeft,
  arrow_right as iconArrowRight,
} from '@universityofmaryland/web-icons-library/arrows';

type TypeThemeProps = {
  isThemeDark?: boolean;
};

type TypeSliderEventButtonProps = {
  SetCountForward: () => void;
  SetCountBackward: () => void;
  SetButtonVisibility: () => void;
  SetSlideDatesBackwards: () => void;
  SetSlideDatesForward: () => void;
};

type TypeSliderEventIntroProps = TypeThemeProps & {
  headline?: HTMLElement | null;
  actions?: HTMLElement | null;
};

type TypeSliderEventSlideContentProps = {
  dataSlider: HTMLDivElement;
};

type TypeSliderEventSlideProps = TypeSliderEventSlideContentProps &
  TypeSliderEventButtonProps &
  TypeThemeProps;

type TypeSliderEventScrollerProps = TypeSliderEventSlideProps &
  TypeSliderEventIntroProps;

type TypeSliderEventProps = TypeSliderEventSlideContentProps &
  TypeSliderEventIntroProps;

const TABLET = 750;
const DESKTOP = 1000;
const LARGE = 1300;
const ANIMATION_DURATION = 500;

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
  const firstElement = dateElements[0];
  const currentElement = dateElements[currentPosition];
  let endPosition = 0;

  if (currentPosition > 0) {
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
  const [backButton, forwardButton] = Array.from(
    container.querySelectorAll('.slider-event-slide-button'),
  ) as HTMLButtonElement[];
  const count = ShowNumberOfDates({ container });
  const length = dateElements.length;

  [backButton, forwardButton].forEach((button) => {
    button.setAttribute('disabled', '');

    setTimeout(() => {
      button.removeAttribute('disabled');
    }, ANIMATION_DURATION + 100);
  });

  if (currentPosition === 0) {
    backButton.style.display = 'none';
  } else {
    backButton.style.display = 'flex';
  }

  if (currentPosition >= length - count) {
    forwardButton.style.display = 'none';
  } else {
    forwardButton.style.display = 'flex';
  }
};

const SizeDatesElements = ({
  container,
  dataSlider,
  SetButtonVisibility,
}: {
  container: HTMLElement;
  dataSlider: HTMLElement;
  SetButtonVisibility: () => void;
}) => {

  const sizing = () => {
    const dateElements = Array.from(
      dataSlider.querySelectorAll(':scope > *'),
    ) as HTMLDivElement[];

		const sliderWrapper = container.querySelector(
			'.slider-event-slide-wrapper',
		) as HTMLDivElement;

    const sliderVisibility = ({ show = true }: { show?: boolean }) => {
      if (show) {
        dataSlider.style.visibility = 'visible';
      } else {
        dataSlider.style.visibility = 'hidden';
      }
    };

    const setHeight = () => {
      const maxHeightElement = dateElements.sort((a, b) => {
        return a.offsetHeight - b.offsetHeight;
      })[0];
      const height =
        maxHeightElement.offsetHeight +
        parsePixelValue(getComputedStyle(maxHeightElement).marginTop);

      sliderWrapper.style.height = `${height}px`;
    };

    const setWidthPerDate = () => {
      const count = ShowNumberOfDates({ container });
      const dateElementSize = sliderWrapper.offsetWidth / count;
      const containerWidth = container.offsetWidth;

      if (containerWidth === 0) {
        setTimeout(() => {
          sizing();
        }, 200);
        return;
      }

      dataSlider.style.width = `${dateElements.length * dateElementSize}px`;

      dateElements.forEach((dateElement) => {
        dateElement.style.width = `${dateElementSize}px`;
      });
    };

    sliderVisibility({ show: false });
    setWidthPerDate();
    setHeight();
    sliderVisibility({ show: true });
    SetButtonVisibility();
  };

  sizing();
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

  setupSwipeDetection({ container, callback: swipes });
};

const CreateBackButton = (props: TypeSliderEventSlideProps) => {
  const { SetCountBackward, SetButtonVisibility, SetSlideDatesBackwards, isThemeDark } = props;

  const clickEvent = (event: Event) => {
    const button = event.currentTarget as HTMLButtonElement;
    if (button.hasAttribute('disabled')) return;
    SetCountBackward();
    SetButtonVisibility();
    SetSlideDatesBackwards();
  };

  return new ElementBuilder('button')
    .withClassName('slider-event-button-back')
    .withClassName('slider-event-slide-button')
    .withHTML(iconArrowLeft)
    .withAttribute('type', 'button')
    .withAria({ label: 'see previous date' })
    .withStyles({
      element: {
        border: 'none',
        width: token.spacing.lg,
        height: token.spacing.lg,
        display: 'none',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: token.color.gray.light,
        transition: `background-color ${ANIMATION_DURATION}ms`,
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 99,
        left: 0,
        ...(isThemeDark && { backgroundColor: token.color.gray.dark }),
        [`@container (min-width: ${TABLET}px)`]: {
          width: token.spacing['2xl'],
          height: token.spacing['2xl'],
        },
        [`@container (max-width: ${TABLET - 1}px)`]: {
          left: `-${token.spacing.md}`,
          top: token.spacing.xs,
        },
        '&:hover': {
          backgroundColor: token.color.black,
          ...(isThemeDark && { backgroundColor: token.color.white }),
        },
        '& svg': {
          transition: 'fill .5s',
          fill: token.color.black,
          width: token.spacing.sm,
          height: '6px',
          ...(isThemeDark && { fill: token.color.white }),
          [`@container (min-width: ${TABLET}px)`]: {
            width: token.spacing.md,
            height: '8px',
          },
        },
        '&:hover svg': {
          fill: token.color.white,
          ...(isThemeDark && { fill: token.color.black }),
        },
      },
    })
    .on('click', clickEvent)
    .on('touchstart', clickEvent)
    .build();
};

const CreateForwardButton = (props: TypeSliderEventSlideProps) => {
  const { SetCountForward, SetButtonVisibility, SetSlideDatesForward, isThemeDark } = props;

  const clickEvent = (event: Event) => {
    const button = event.currentTarget as HTMLButtonElement;
    if (button.hasAttribute('disabled')) return;
    SetCountForward();
    SetButtonVisibility();
    SetSlideDatesForward();
  };

  return new ElementBuilder('button')
    .withClassName('slider-event-button-forward')
    .withClassName('slider-event-slide-button')
    .withHTML(iconArrowRight)
    .withAttribute('type', 'button')
    .withAria({ label: 'see next date' })
    .withStyles({
      element: {
        border: 'none',
        width: token.spacing.lg,
        height: token.spacing.lg,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: token.color.gray.light,
        transition: `background-color ${ANIMATION_DURATION}ms`,
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 99,
        right: 0,
        ...(isThemeDark && { backgroundColor: token.color.gray.dark }),
        [`@container (min-width: ${TABLET}px)`]: {
          width: token.spacing['2xl'],
          height: token.spacing['2xl'],
        },
        [`@container (max-width: ${TABLET - 1}px)`]: {
          right: `-${token.spacing.md}`,
          top: token.spacing.xs,
        },
        '&:hover': {
          backgroundColor: token.color.black,
          ...(isThemeDark && { backgroundColor: token.color.white }),
        },
        '& svg': {
          transition: 'fill .5s',
          fill: token.color.black,
          width: token.spacing.sm,
          height: '6px',
          ...(isThemeDark && { fill: token.color.white }),
          [`@container (min-width: ${TABLET}px)`]: {
            width: token.spacing.md,
            height: '8px',
          },
        },
        '&:hover svg': {
          fill: token.color.white,
          ...(isThemeDark && { fill: token.color.black }),
        },
      },
    })
    .on('click', clickEvent)
    .on('touchstart', clickEvent)
    .build();
};

const CreateDatesContainer = (props: TypeSliderEventSlideProps) => {
  const { dataSlider, isThemeDark } = props;

  const backButton = CreateBackButton(props);
  const forwardButton = CreateForwardButton(props);

  const dataSliderModel = new ElementBuilder(dataSlider)
    .withClassName('slider-event-data-slider')
    .withStyles({
      element: {
        display: 'flex',
        position: 'absolute',
        top: 0,
        left: 0,
        '& > *': {
          display: 'flex',
          justifyContent: 'inherit',
          paddingRight: token.spacing.lg,
          [`@container (max-width: ${TABLET - 1}px)`]: {
            justifyContent: 'center',
            paddingRight: 0,
            marginTop: token.spacing.xs,
            paddingTop: token.spacing.xs,
            borderTop: `1px solid ${token.color.gray.light}`,
            ...(isThemeDark && {
              borderTop: `1px solid ${token.color.gray.mediumAA}`,
            }),
          },
        },
      },
    })
    .build();

  const datesWrapper = new ElementBuilder()
    .withClassName('slider-event-slide-wrapper')
    .withStyles({
      element: {
        position: 'relative',
        width: '100%',
        overflow: 'hidden',
        minHeight: '44px',
        '& ::slotted(*)': {
          marginBottom: '0 !important',
        },
      },
    })
    .withChild(dataSliderModel)
    .build();

  return new ElementBuilder()
    .withClassName('slider-event-slide-container')
    .withStyles({
      element: {
        display: 'flex',
        position: 'relative',
        padding: '0 36px',
        [`@container (min-width: ${TABLET}px)`]: {
          padding: '0 60px',
          width: 'calc(100% - 96px)',
        },
      },
    })
    .withChildren(backButton, datesWrapper, forwardButton)
    .build();
};

const CreateIntroWrapper = (props: TypeSliderEventIntroProps) => {
  const { headline, actions, isThemeDark } = props;

  const createHeadline = () => {
    if (!headline) {
      console.warn('CreateIntroWrapper: headline element is required');
      return null;
    }

    return new ElementBuilder(headline)
      .withClassName('slider-event-intro-headline')
      .withStyles({
        element: {
          ...typography.sans.larger,
          color: token.color.black,
          fontWeight: 700,
          ...(isThemeDark && { color: token.color.white }),
          '& + *': {
            marginTop: token.spacing.min,
            display: 'block',
          },
        },
      })
      .build();
  };

  const createActions = () => {
    if (!actions) return null;

    return new ElementBuilder(actions)
      .withClassName('slider-event-intro-actions')
      .withStyles({
        element: {
          marginTop: token.spacing.min,
        },
      })
      .build();
  };

  return new ElementBuilder()
    .withClassName('slider-event-intro-container')
    .withStyles({
      element: {
        padding: `0 ${token.spacing.lg}`,
        position: 'relative',
        [`@container (max-width: ${TABLET - 1}px)`]: {
          textAlign: 'center',
        },
        [`@container (min-width: ${TABLET}px)`]: {
          padding: 0,
          paddingRight: '24px',
          width: '200px',
        },
        [`@container (min-width: ${LARGE}px)`]: {
          width: '320px',
        },
      },
    })
    .withChild(createHeadline())
    .withChild(createActions())
    .build();
};

const CreateScrollerWrapper = (props: TypeSliderEventScrollerProps) => {
  const introductionWrapper = CreateIntroWrapper(props);
  const datesContainer = CreateDatesContainer(props);

  return new ElementBuilder()
    .withClassName('slider-event-slide-scroller')
    .withStyles({
      element: {
        position: 'relative',
        zIndex: 99,
        [`@container (min-width: ${TABLET}px)`]: {
          display: 'flex',
          alignItems: 'center',
        },
      },
    })
    .withChildren(introductionWrapper, datesContainer)
    .build();
};

export const createCompositeSliderEvents = (props: TypeSliderEventProps) =>
  (() => {
    const { isThemeDark, dataSlider } = props;
    let currentPosition = 0;
    let container!: HTMLElement;

    const SetCountForward = () => (currentPosition = currentPosition + 1);
    const SetCountBackward = () => (currentPosition = currentPosition - 1);
    const SetButtonVisibility = () =>
      ButtonVisibilityLogic({ container, dataSlider, currentPosition });
    const size = () =>
      SizeDatesElements({
        container,
        dataSlider,
        SetButtonVisibility,
      });
    const SetJumpToDate = () =>
      JumpToDate({ dataSlider, currentPosition });
    const SetSlideDatesForward = () =>
      EventSlideDates({ dataSlider, forward: true });
    const SetSlideDatesBackwards = () =>
      EventSlideDates({ dataSlider, forward: false });
    const SetEventSwipe = () =>
      EventSwipe({
        container,
        dataSlider,
        currentPosition,
        SetCountBackward,
        SetCountForward,
        SetSlideDatesBackwards,
        SetSlideDatesForward,
        SetButtonVisibility,
      });
    const EventResize = () => {
      size();
      SetJumpToDate();
      SetButtonVisibility();
    };
    const load = () => {
      EventResize();
      SetEventSwipe();
    };

    const scrollerModel = CreateScrollerWrapper({
      ...props,
      SetCountForward,
      SetCountBackward,
      SetButtonVisibility,
      SetSlideDatesBackwards,
      SetSlideDatesForward,
    });

    const coverModel = new ElementBuilder()
      .withClassName('slider-event-cover')
      .withStyles({
        element: {
          display: 'block',
          position: 'absolute',
          width: '200vw',
          height: '100%',
          top: 0,
          left: '-100vw',
          backgroundColor: token.color.gray.lighter,
          ...(isThemeDark && { backgroundColor: token.color.gray.darker }),
          [`@container (min-width: ${TABLET}px)`]: {
            width: '40vw',
            left: 'calc(100% - 1px)',
          },
        },
      })
      .build();

    const wrapperModel = new ElementBuilder()
      .withClassName('slider-event-container-wrapper')
      .withStyles({
        element: {
          padding: '24px 0',
          backgroundColor: token.color.gray.lighter,
          position: 'relative',
          zIndex: 99,
          ...(isThemeDark && { backgroundColor: token.color.gray.darker }),
          '@container (max-width: 260px)': {
            display: 'none',
          },
          [`@container (min-width: ${TABLET}px)`]: {
            padding: '40px',
          },
        },
      })
      .withChildren(scrollerModel, coverModel)
      .build();

    const containerModel = new ElementBuilder()
      .withClassName('slider-events-container')
      .withStylesIf(!!isThemeDark, {
        element: {
          '& *': { color: '#fff !important' },
        },
      })
      .ref((element) => {
        container = element;
      })
      .withChild(wrapperModel)
      .build();

    const declarationModel = new ElementBuilder()
      .withClassName('slider-events-declaration')
      .withStyles({
        element: {
          containerType: 'inline-size',
        },
      })
      .withChild(containerModel)
      .withEvents({ load, size })
      .build();

    dataSlider.style.visibility = 'hidden';
    window.addEventListener('resize', debounce(EventResize, 20));

    return declarationModel;
  })();
