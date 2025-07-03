import * as Styles from '@universityofmaryland/web-styles-library';
import { animations, buttons } from 'atomic';
import { ElementModel } from 'model';
import * as Utility from 'utilities';

interface AnimationProps {
  isAnimationOnLoad?: boolean;
}

interface VideoProps extends AnimationProps {
  video: HTMLVideoElement;
}

interface TextProps extends VideoProps {
  headline?: HTMLElement | null;
  text?: HTMLElement | null;
}

interface HeroBrandVideoProps extends TextProps {}

const OVERLAY_CLASS_NAME = 'hero-logo-brand-text-overlay';

const createHeadline = (headline?: HTMLElement | null) => {
  if (!headline) return null;

  return ElementModel.headline.campaignExtraLarge({
    element: headline,
    elementStyles: {
      element: {
        textTransform: 'uppercase',
        opacity: 0,
        transition: 'opacity 1000ms ease-in-out',
        transitionDelay: '600ms',
        textWrap: 'balance',
      },
      siblingAfter: {
        marginTop: Styles.token.spacing.md,
      },
    },
  });
};

const createText = (text?: HTMLElement | null) => {
  if (!text) return null;

  return ElementModel.richText.simpleLargest({
    element: text,

    elementStyles: {
      element: {
        maxWidth: '720px',
        marginLeft: 'auto',
        marginRight: 'auto',
        opacity: 0,
        transition: 'opacity 1000ms ease-in-out',
        transitionDelay: '1500ms',

        [`@media (max-width: 649px)`]: {
          display: 'none',
        },
      },
    },
  });
};

const createTextContainer = (props: TextProps) => {
  const { headline, text } = props;
  const headlineElement = createHeadline(headline);
  const textElement = createText(text);

  if (!headlineElement && !textElement) return null;

  const container = ElementModel.create({
    element: document.createElement('div'),
    className: 'hero-logo-brand-text-container',
    elementStyles: {
      element: {
        zIndex: 99,
        textAlign: 'center',
        width: 'calc(100% - 24px)',
        maxWidth: '950px',
        padding: `${Styles.token.spacing.xl} ${Styles.token.spacing.md}`,

        ['& *']: {
          color: Styles.token.color.white,
        },
      },
    },
  });

  if (headlineElement) {
    container.element.appendChild(headlineElement.element);
    container.styles += headlineElement.styles;
  }

  if (textElement) {
    container.element.appendChild(textElement.element);
    container.styles += textElement.styles;
  }

  const overlay = ElementModel.create({
    element: document.createElement('div'),
    className: OVERLAY_CLASS_NAME,
    elementStyles: {
      element: {
        height: '100%',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        zIndex: 98,
        opacity: 0,
        transition: 'opacity 1500ms ease-in-out',
      },
    },
  });

  overlay.element.appendChild(container.element);
  overlay.styles += container.styles;

  return overlay;
};

const createVideo = (video: HTMLVideoElement) => {
  return ElementModel.create({
    element: video,
    className: 'hero-logo-brand-video',
    elementStyles: {
      element: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0,

        [`@media (${Styles.token.media.queries.tablet.min})`]: {
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 'auto',
          height: 'auto',
          minWidth: '100%',
          minHeight: '100%',
        },
      },
    },
  });
};

const animationSequence = ({ container }: { container: HTMLElement }) => {
  const overlay = container.querySelector(
    `.${OVERLAY_CLASS_NAME}`,
  ) as HTMLDivElement;
  const headline = container.querySelector(
    `.${Styles.typography.campaign.fonts.extraLarge.className}`,
  ) as HTMLDivElement;
  const text = container.querySelector(
    `.${Styles.element.text.rich.simpleLargest.className}`,
  ) as HTMLDivElement;

  if (overlay) overlay.style.opacity = '1';
  if (headline) headline.style.opacity = '1';
  if (text) text.style.opacity = '1';
};

export default (props: HeroBrandVideoProps) =>
  (() => {
    const { video, isAnimationOnLoad } = props;

    const composite = ElementModel.create({
      element: document.createElement('section'),
      className: 'umd-element-hero-brand-video-declaration',
      elementStyles: {
        element: {
          aspectRatio: '16 / 9',
          width: '100%',
        },
      },
    });

    const wrapper = ElementModel.create({
      element: document.createElement('div'),
      className: 'hero-logo-brand-video-wrapper',
      elementStyles: {
        element: {
          position: 'relative',
          overflow: 'hidden',
          height: '100%',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        },
      },
    });

    const videoElement = createVideo(video);
    wrapper.element.appendChild(videoElement.element);
    wrapper.styles += videoElement.styles;

    const textContainer = createTextContainer(props);
    if (textContainer) {
      wrapper.element.appendChild(textContainer.element);
      wrapper.styles += textContainer.styles;
    }

    const completedCallback = () =>
      animationSequence({ container: composite.element });

    const overlay = animations.brand.chevronFlow({
      sizedContainer: composite.element,
      sizedWrapper: wrapper.element,
      completedCallback,
      isAnimationOnLoad,
    });
    wrapper.element.appendChild(overlay.element);
    wrapper.styles += overlay.styles;

    const buttonState = buttons.videoState({ video });
    wrapper.element.appendChild(buttonState.element);
    wrapper.styles += buttonState.styles;

    composite.element.appendChild(wrapper.element);
    composite.styles += wrapper.styles;

    const eventResize = () => {
      if (composite.element.offsetHeight > window.innerHeight) {
        composite.element.style.height = `${(window.innerHeight / 10) * 9}px`;
      }
    };

    const eventLoad = () => {
      overlay.events.load();
      buttonState.events.setButtonPlay();
      eventResize();

      if (Utility.accessibility.isPrefferdReducedMotion()) {
        video.pause();
        buttonState.events.setButtonPause();
      }
    };

    window.addEventListener(
      'resize',
      Utility.performance.debounce(() => {
        eventResize();
      }, 20),
    );

    return {
      ...composite,
      events: {
        load: eventLoad,
      },
    };
  })();
