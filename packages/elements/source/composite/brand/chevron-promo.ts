import { ElementBuilder } from '@universityofmaryland/web-builder-library';
import * as token from '@universityofmaryland/web-token-library';
import * as typography from '@universityofmaryland/web-styles-library/typography';
import * as layout from '@universityofmaryland/web-styles-library/layout';
import { theme } from '@universityofmaryland/web-utilities-library/theme';
import { animations, textLockup } from 'atomic';
import { type ContentElement, type ElementModel } from '../../_types';

interface BrandChevronPromoProps {
  headline: ContentElement;
  eyebrow?: ContentElement;
  text?: ContentElement;
  actions?: ContentElement;
  isAnimationOnLoad?: boolean;
}

const CONTENT_OVERLAY_CLASS = 'brand-chevron-promo-content-overlay';

const ANIMATION_CONFIG = {
  FADE_UP: {
    DURATION: '1000ms',
    EASING: 'ease-in-out',
    TRANSFORM: {
      FROM: 'translateY(25px)',
      TO: 'translateY(0)',
    },
  },
} as const;

const MIN_HEIGHT = {
  MOBILE: '355px',
  DESKTOP: '500px',
} as const;

const createHeadline = (headline: ContentElement) => {
  if (!headline) return null;

  return new ElementBuilder(headline)
    .styled(
      typography.campaign.compose('large', {
        theme: theme.fontColor(true),
      }),
    )
    .withStyles({
      element: {
        textTransform: 'uppercase',
        textWrap: 'balance',
      },
      siblingAfter: {
        marginTop: token.spacing.sm,
      },
    })
    .build();
};

const createContent = (props: BrandChevronPromoProps) => {
  const { headline, eyebrow, text, actions } = props;

  const lockup = textLockup.medium({
    ribbon: eyebrow,
    compositeHeadline: createHeadline(headline),
    text,
    actions,
    isThemeDark: true,
  });

  const container = new ElementBuilder()
    .withClassName('brand-chevron-promo-content')
    .withChild(lockup)
    .withStyles({
      element: {
        position: 'relative',
        textAlign: 'center',
        width: `calc(100% - 24px)`,
        maxWidth: '950px',
        padding: `${token.spacing.xl} ${token.spacing.md}`,

        [`& .${layout.grid.stacked.className}`]: {
          justifyContent: 'center',
          justifyItems: 'center',
        },
      },
      pseudoBefore: {
        content: '""',
        position: 'absolute',
        top: '-15%',
        left: '-25%',
        width: '150%',
        height: '130%',
        background:
          'radial-gradient(ellipse 50% 50% at center, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0.75) 55%, rgba(0, 0, 0, 0) 100%)',
        zIndex: -1,
        pointerEvents: 'none',
      },
    })
    .build();

  return new ElementBuilder()
    .withClassName(CONTENT_OVERLAY_CLASS)
    .withChild(container)
    .withStyles({
      element: {
        position: 'relative',
        height: '100%',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 98,
        opacity: 0,
        transform: ANIMATION_CONFIG.FADE_UP.TRANSFORM.FROM,
        transition: `opacity ${ANIMATION_CONFIG.FADE_UP.DURATION} ${ANIMATION_CONFIG.FADE_UP.EASING}, transform ${ANIMATION_CONFIG.FADE_UP.DURATION} ${ANIMATION_CONFIG.FADE_UP.EASING}`,

        ['@media (prefers-reduced-motion: reduce)']: {
          opacity: '1 !important',
          transform: 'none !important',
          transition: 'none',
        },
      },
    })
    .build();
};

const createAnimationSequence = (container: HTMLElement) => {
  return () => {
    const overlay = container.querySelector(
      `.${CONTENT_OVERLAY_CLASS}`,
    ) as HTMLDivElement;

    if (overlay) {
      overlay.style.opacity = '1';
      overlay.style.transform = ANIMATION_CONFIG.FADE_UP.TRANSFORM.TO;
    }
  };
};

export const createCompositeBrandChevronPromo = (
  props: BrandChevronPromoProps,
): ElementModel<HTMLElement> & { events: { load: () => void } } => {
  const { isAnimationOnLoad } = props;

  const composite = new ElementBuilder('section')
    .withClassName('umd-element-brand-chevron-promo')
    .withStyles({
      element: {
        position: 'relative',
        width: '100%',
        minHeight: MIN_HEIGHT.MOBILE,
        backgroundColor: token.color.black,
        containerType: 'inline-size',

        [`@media (${token.media.queries.tablet.min})`]: {
          minHeight: MIN_HEIGHT.DESKTOP,
        },
      },
    })
    .build();

  const wrapper = new ElementBuilder()
    .withClassName('brand-chevron-promo-wrapper')
    .withChild(createContent(props))
    .withStyles({
      element: {
        position: 'relative',
        overflow: 'hidden',
        height: '100%',
        width: '100%',
        minHeight: 'inherit',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
    })
    .build();

  const overlay = animations.brand.chevronDrift({
    sizedContainer: composite.element,
    completedCallback: createAnimationSequence(composite.element),
    isAnimationOnLoad,
  });

  wrapper.element.appendChild(overlay.element);
  wrapper.styles += overlay.styles;

  composite.element.appendChild(wrapper.element);
  composite.styles += wrapper.styles;

  const events = {
    load: () => {
      overlay.events?.load();
    },
  };

  return {
    ...composite,
    events,
    destroy: overlay.destroy,
  };
};
