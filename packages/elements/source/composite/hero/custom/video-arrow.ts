import * as token from '@universityofmaryland/web-styles-library/token';
import * as typography from '@universityofmaryland/web-styles-library/typography';
import * as elementStyles from '@universityofmaryland/web-styles-library/element';
import { debounce } from '@universityofmaryland/web-utilities-library/performance';
import ElementBuilder from '@universityofmaryland/web-builder-library';
import { animations, assets } from 'atomic';
import { type HeroVideoArrowProps as BaseHeroVideoArrowProps } from '../_types';
import { type ElementVisual } from '../../../_types';

interface HeroVideoArrowProps extends Omit<BaseHeroVideoArrowProps, 'video'> {
  video: HTMLVideoElement;
  isAnimationOnLoad?: boolean;
}

const OVERLAY_CLASS = 'hero-logo-brand-text-overlay';

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

const createHeadline = (headline?: HTMLElement | null) => {
  if (!headline) return null;

  return ElementBuilder.styled.headline.campaignExtraLarge({
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
        marginTop: token.spacing.md,
      },
    },
  });
};

const createText = (text?: HTMLElement | null) => {
  if (!text) return null;

  return ElementBuilder.styled.richText.simpleLargest({
    element: text,
    elementStyles: {
      element: {
        maxWidth: '720px',
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

const createTextChildren = (
  props: Pick<HeroVideoArrowProps, 'headline' | 'text'>,
): ElementVisual[] => {
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

const createTextContainer = (
  props: Pick<HeroVideoArrowProps, 'headline' | 'text'>,
) => {
  const children = createTextChildren(props);

  if (children.length === 0) return null;

  const container = ElementBuilder.create.element({
    element: document.createElement('div'),
    className: 'hero-logo-brand-text-container',
    children,
    elementStyles: {
      element: {
        zIndex: 99,
        textAlign: 'center',
        width: `calc(100% - 24px)`,
        maxWidth: '950px',
        padding: `${token.spacing.xl} ${token.spacing.md}`,

        ['& *']: {
          color: token.color.white,
        },
      },
    },
  });

  return ElementBuilder.create.element({
    element: document.createElement('div'),
    className: OVERLAY_CLASS,
    children: [container],
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
        transition: `opacity ${ANIMATION_CONFIG.OVERLAY_FADE.DURATION} ${ANIMATION_CONFIG.OVERLAY_FADE.EASING}`,
      },
    },
  });
};

const createVideo = (video: HTMLVideoElement) => {
  return assets.video.observedAutoPlay({
    video,
    isScaled: true,
    additionalElementStyles: {
      width: '100%',
      height: '100%',
      position: 'absolute',
      top: 0,
      left: 0,
    },
  });
};

const createAnimationSequence = (container: HTMLElement) => {
  return () => {
    const overlay = container.querySelector(
      `.${OVERLAY_CLASS}`,
    ) as HTMLDivElement;
    const headline = container.querySelector(
      `.${typography.campaign.fonts.extraLarge.className}`,
    ) as HTMLDivElement;
    const text = container.querySelector(
      `.${elementStyles.text.rich.simpleLargest.className}`,
    ) as HTMLDivElement;

    if (overlay) overlay.style.opacity = '1';
    if (headline) headline.style.opacity = '1';
    if (text) text.style.opacity = '1';
  };
};

const createEventHandlers = (
  composite: ElementVisual,
  overlay: ReturnType<typeof animations.brand.chevronFlow>,
) => {
  const eventResize = () => {
    if (composite.element.offsetHeight > window.innerHeight) {
      composite.element.style.height = `${window.innerHeight * 0.9}px`;
    }
  };

  const eventLoad = () => {
    overlay.events.load();
    eventResize();
  };

  window.addEventListener('resize', debounce(eventResize, 20));

  return { load: eventLoad };
};

export default (props: HeroVideoArrowProps) => {
  const { video, isAnimationOnLoad } = props;

  const composite = ElementBuilder.create.element({
    element: document.createElement('section'),
    className: 'umd-element-hero-brand-video',
    elementStyles: {
      element: {
        aspectRatio: '16 / 9',
        width: '100%',
      },
    },
  });

  const videoElement = createVideo(video);
  const textContainer = createTextContainer(props);

  const wrapperChildren: ElementVisual[] = [videoElement];
  if (textContainer) {
    wrapperChildren.push(textContainer);
  }

  const wrapper = ElementBuilder.create.element({
    element: document.createElement('div'),
    className: 'hero-logo-brand-video-wrapper',
    children: wrapperChildren,
    elementStyles: {
      element: {
        containerType: 'inline-size',
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

  composite.element.appendChild(wrapper.element);
  composite.styles += wrapper.styles;

  const events = createEventHandlers(composite, overlay);

  return {
    ...composite,
    events,
  };
};
