import * as Styles from '@universityofmaryland/web-styles-library';
import * as Utils from 'utilities';
import { animations, buttons } from 'atomic';
import { ElementModel } from 'model';
import { type ElementVisual } from '_types';
import { type HeroVideoArrowProps as BaseHeroVideoArrowProps } from '../_types';

// Extend base type to add animation property and ensure video is required
interface HeroVideoArrowProps extends Omit<BaseHeroVideoArrowProps, 'video'> {
  video: HTMLVideoElement;
  isAnimationOnLoad?: boolean;
}

const CLASS_NAMES = {
  COMPOSITE: 'umd-element-hero-brand-video-declaration',
  WRAPPER: 'hero-logo-brand-video-wrapper',
  VIDEO: 'hero-logo-brand-video',
  TEXT_CONTAINER: 'hero-logo-brand-text-container',
  OVERLAY: 'hero-logo-brand-text-overlay',
} as const;

const ANIMATION_CONFIG = {
  TEXT_FADE: {
    DURATION: '1000ms',
    EASING: 'ease-in-out',
    HEADLINE_DELAY: '600ms',
    TEXT_DELAY: '1500ms',
  },
  OVERLAY_FADE: {
    DURATION: '1500ms',
    EASING: 'ease-in-out',
  },
} as const;

const THEME_VALUES = {
  ASPECT_RATIO: '16 / 9',
  MAX_WIDTHS: {
    TEXT_CONTAINER: '950px',
    TEXT: '720px',
  },
  OVERLAY_BACKGROUND: 'rgba(0, 0, 0, 0.6)',
  HEIGHT_REDUCTION_FACTOR: 0.9,
  DEBOUNCE_DELAY: 20,
  CONTAINER_PADDING: '24px',
} as const;

const VIDEO_STYLES = {
  MOBILE: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  TABLET_AND_UP: {
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
} as const;

const createHeadline = (headline?: HTMLElement | null) => {
  if (!headline) return null;

  return ElementModel.headline.campaignExtraLarge({
    element: headline,
    elementStyles: {
      element: {
        textTransform: 'uppercase',
        opacity: 0,
        transition: `opacity ${ANIMATION_CONFIG.TEXT_FADE.DURATION} ${ANIMATION_CONFIG.TEXT_FADE.EASING}`,
        transitionDelay: ANIMATION_CONFIG.TEXT_FADE.HEADLINE_DELAY,
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
        maxWidth: THEME_VALUES.MAX_WIDTHS.TEXT,
        marginLeft: 'auto',
        marginRight: 'auto',
        opacity: 0,
        transition: `opacity ${ANIMATION_CONFIG.TEXT_FADE.DURATION} ${ANIMATION_CONFIG.TEXT_FADE.EASING}`,
        transitionDelay: ANIMATION_CONFIG.TEXT_FADE.TEXT_DELAY,

        [`@media (max-width: 649px)`]: {
          display: 'none',
        },
      },
    },
  });
};

const buildTextChildren = (props: Pick<HeroVideoArrowProps, 'headline' | 'text'>): ElementVisual[] => {
  const { headline, text } = props;
  const children: ElementVisual[] = [];

  const headlineElement = createHeadline(headline);
  if (headlineElement) {
    children.push(headlineElement);
  }

  const textElement = createText(text);
  if (textElement) {
    children.push(textElement);
  }

  return children;
};

const createTextContainer = (props: Pick<HeroVideoArrowProps, 'headline' | 'text'>) => {
  const children = buildTextChildren(props);

  if (children.length === 0) return null;

  const container = ElementModel.create({
    element: document.createElement('div'),
    className: CLASS_NAMES.TEXT_CONTAINER,
    children,
    elementStyles: {
      element: {
        zIndex: 99,
        textAlign: 'center',
        width: `calc(100% - ${THEME_VALUES.CONTAINER_PADDING})`,
        maxWidth: THEME_VALUES.MAX_WIDTHS.TEXT_CONTAINER,
        padding: `${Styles.token.spacing.xl} ${Styles.token.spacing.md}`,

        ['& *']: {
          color: Styles.token.color.white,
        },
      },
    },
  });

  return ElementModel.create({
    element: document.createElement('div'),
    className: CLASS_NAMES.OVERLAY,
    children: [container],
    elementStyles: {
      element: {
        height: '100%',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: THEME_VALUES.OVERLAY_BACKGROUND,
        zIndex: 98,
        opacity: 0,
        transition: `opacity ${ANIMATION_CONFIG.OVERLAY_FADE.DURATION} ${ANIMATION_CONFIG.OVERLAY_FADE.EASING}`,
      },
    },
  });
};

const createVideo = (video: HTMLVideoElement) => {
  return ElementModel.create({
    element: video,
    className: CLASS_NAMES.VIDEO,
    elementStyles: {
      element: {
        ...VIDEO_STYLES.MOBILE,
        ...VIDEO_STYLES.TABLET_AND_UP,
      },
    },
  });
};

const createAnimationSequence = (container: HTMLElement) => {
  return () => {
    const overlay = container.querySelector(
      `.${CLASS_NAMES.OVERLAY}`,
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
};

const createEventHandlers = (
  composite: ElementVisual,
  video: HTMLVideoElement,
  overlay: ReturnType<typeof animations.brand.chevronFlow>,
  buttonState: ReturnType<typeof buttons.videoState>,
) => {
  const eventResize = () => {
    if (composite.element.offsetHeight > window.innerHeight) {
      composite.element.style.height = `${
        window.innerHeight * THEME_VALUES.HEIGHT_REDUCTION_FACTOR
      }px`;
    }
  };

  const eventLoad = () => {
    overlay.events.load();
    buttonState.events.setButtonPlay();
    eventResize();

    if (Utils.accessibility.isPrefferdReducedMotion()) {
      video.pause();
      buttonState.events.setButtonPause();
    }
  };

  window.addEventListener(
    'resize',
    Utils.performance.debounce(eventResize, THEME_VALUES.DEBOUNCE_DELAY),
  );

  return { load: eventLoad };
};

export default (props: HeroVideoArrowProps) => {
  const { video, isAnimationOnLoad } = props;

  const composite = ElementModel.create({
    element: document.createElement('section'),
    className: CLASS_NAMES.COMPOSITE,
    elementStyles: {
      element: {
        aspectRatio: THEME_VALUES.ASPECT_RATIO,
        width: '100%',
      },
    },
  });

  const videoElement = createVideo(video);
  const textContainer = createTextContainer(props);
  const buttonState = buttons.videoState({ video });

  const wrapperChildren: ElementVisual[] = [videoElement];
  if (textContainer) {
    wrapperChildren.push(textContainer);
  }

  const wrapper = ElementModel.create({
    element: document.createElement('div'),
    className: CLASS_NAMES.WRAPPER,
    children: wrapperChildren,
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

  const overlay = animations.brand.chevronFlow({
    sizedContainer: composite.element,
    sizedWrapper: wrapper.element,
    completedCallback: createAnimationSequence(composite.element),
    isAnimationOnLoad,
  });

  wrapper.element.appendChild(overlay.element);
  wrapper.styles += overlay.styles;
  wrapper.element.appendChild(buttonState.element);
  wrapper.styles += buttonState.styles;

  composite.element.appendChild(wrapper.element);
  composite.styles += wrapper.styles;

  const events = createEventHandlers(composite, video, overlay, buttonState);

  return {
    ...composite,
    events,
  };
};