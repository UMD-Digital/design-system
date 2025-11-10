import { ElementBuilder } from '@universityofmaryland/web-builder-library';
import * as token from '@universityofmaryland/web-styles-library/token';
import * as typography from '@universityofmaryland/web-styles-library/typography';
import * as elementStyles from '@universityofmaryland/web-styles-library/element';
import { debounce } from '@universityofmaryland/web-utilities-library/performance';
import { theme } from '@universityofmaryland/web-utilities-library/theme';
import { animations, assets } from 'atomic';
import { type HeroVideoArrowProps as BaseHeroVideoArrowProps } from '../_types';
import { type ElementModel } from '../../../_types';

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

  return new ElementBuilder(headline)
    .styled(typography.campaign.extralarge)
    .withStyles({
      element: {
        textTransform: 'uppercase',
        opacity: 0,
        transition: `opacity ${ANIMATION_CONFIG.TEXT_FADE.DURATION} ${ANIMATION_CONFIG.TEXT_FADE.EASING}`,
        transitionDelay: ANIMATION_CONFIG.TEXT_FADE.HEADLINE_DELAY,
        textWrap: 'balance',
        color: token.color.white,
      },
      siblingAfter: {
        marginTop: token.spacing.md,
      },
    })
    .build();
};

const createText = (text?: HTMLElement | null) => {
  if (!text) return null;

  return new ElementBuilder(text)
    .styled(elementStyles.text.rich.simpleLargest)
    .withStyles({
      element: {
        maxWidth: '720px',
        marginLeft: 'auto',
        marginRight: 'auto',
        opacity: 0,
        transition: `opacity ${ANIMATION_CONFIG.TEXT_FADE.DURATION} ${ANIMATION_CONFIG.TEXT_FADE.EASING}`,
        transitionDelay: ANIMATION_CONFIG.TEXT_FADE.TEXT_DELAY,

        ['& p']: {
          color: token.color.white,
        },

        [`@media (max-width: 649px)`]: {
          display: 'none',
        },
      },
    })
    .build();
};

const createTextChildren = (
  props: Pick<HeroVideoArrowProps, 'headline' | 'text'>,
): ElementModel<HTMLElement>[] => {
  const { headline, text } = props;
  const children: ElementModel<HTMLElement>[] = [];

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

  const container = new ElementBuilder()
    .withClassName('hero-logo-brand-text-container')
    .withChildren(...children)
    .withStyles({
      element: {
        zIndex: 99,
        textAlign: 'center',
        width: `calc(100% - 24px)`,
        maxWidth: '950px',
        padding: `${token.spacing.xl} ${token.spacing.md}`,
      },
    })
    .build();

  return new ElementBuilder()
    .withClassName(OVERLAY_CLASS)
    .withChild(container)
    .withStyles({
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
    })
    .build();
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
  composite: ElementModel<HTMLElement>,
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

  const videoElement = createVideo(video);
  const textContainer = createTextContainer(props);

  const composite = new ElementBuilder('section')
    .withClassName('umd-element-hero-brand-video')
    .withStyles({
      element: {
        aspectRatio: '16 / 9',
        width: '100%',
      },
    })
    .build();

  const wrapper = new ElementBuilder()
    .withClassName('hero-logo-brand-video-wrapper')
    .withChild(videoElement)
    .withStyles({
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
    });

  if (textContainer) {
    wrapper.withChild(textContainer);
  }

  const wrapperBuilt = wrapper.build();

  const overlay = animations.brand.chevronFlow({
    sizedContainer: composite.element,
    sizedWrapper: wrapperBuilt.element,
    completedCallback: createAnimationSequence(composite.element),
    isAnimationOnLoad,
  });

  wrapperBuilt.element.appendChild(overlay.element);
  wrapperBuilt.styles += overlay.styles;

  composite.element.appendChild(wrapperBuilt.element);
  composite.styles += wrapperBuilt.styles;

  const events = createEventHandlers(composite, overlay);

  return {
    ...composite,
    events,
  };
};
