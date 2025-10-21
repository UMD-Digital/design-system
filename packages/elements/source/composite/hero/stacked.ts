import * as token from '@universityofmaryland/web-styles-library/token';
import * as elementStyles from '@universityofmaryland/web-styles-library/element';
import { withViewTimelineAnimation } from '@universityofmaryland/web-utilities-library/styles';
import { assets, textLockup } from 'atomic';
import ElementBuilder from '@universityofmaryland/web-builder-library';
import { type ElementVisual } from '../../_types';
import { type HeroStackedProps } from './_types';

const REF_KEY_FRAME_FADE_OVER = 'hero-stacked-fade-over';
const REF_KEY_FRAME_FONT_COLOR = 'hero-stacked-font-color';

const keyFrameFadeOver = `
  @keyframes ${REF_KEY_FRAME_FADE_OVER} {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;

const keyFrameFontColor = `
  @keyframes ${REF_KEY_FRAME_FONT_COLOR} {
    from { color: ${token.color.black}; }
    to { color: ${token.color.white}; }
  }
`;

const createVideoAsset = (video: HTMLVideoElement) => {
  return assets.video.observedAutoPlay({
    video,
    isScaled: true,
  });
};

const createImageAsset = (image: HTMLImageElement) => {
  return assets.image.background({
    element: image,
    isScaled: true,
    isGifAllowed: true,
    isShowCaption: true,
    customStyles: {
      [`@media (${token.media.queries.large.max})`]: {
        [`&:has(.${elementStyles.asset.gif.toggle.className})`]: {
          minHeight: '56vw',
        },
      },

      [`@media (${token.media.queries.tablet.min})`]: {
        [`&:has(.${elementStyles.asset.gif.toggle.className})`]: {
          minHeight: '550px',
        },
      },

      [`& .${elementStyles.asset.gif.toggle.className} button`]: {
        zIndex: 99999,
      },
    },
  });
};

const createOverlay = (includesAnimation?: boolean) => {
  return ElementBuilder.create.div({
    className: 'umd-hero-stacked__overlay',
    elementStyles: {
      element: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        height: '100vh',
        width: '100vw',
        display: 'block',
        backgroundColor: 'rgba(0,0,0,.7)',
        zIndex: 99,
        opacity: 0,

        ...(includesAnimation && {
          [`@media (${token.media.queries.tablet.min})`]: {
            [`@media (prefers-reduced-motion: no-preference)`]: {
              [`@supports (animation-timeline: scroll())`]: {
                animation: `${REF_KEY_FRAME_FADE_OVER} ease-in-out forwards`,
                animationTimeline: 'view()',
                animationRangeStart: '30vh',
                animationRangeEnd: '70vh',
              },
            },
          },
        }),
      },
    },
  });
};

const createAsset = ({
  image,
  video,
  includesAnimation,
  isWidthLarge = false,
  isHeightSmall = false,
}: Pick<
  HeroStackedProps,
  'image' | 'video' | 'includesAnimation' | 'isWidthLarge' | 'isHeightSmall'
>) => {
  let mediaElement: ElementVisual | null = null;

  if (video && video instanceof HTMLVideoElement) {
    mediaElement = createVideoAsset(video);
  } else if (image) {
    mediaElement = createImageAsset(image);
  }

  if (!mediaElement) {
    return null;
  }

  const assetInteriorElement = ElementBuilder.create.div({
    className: 'umd-hero-stacked__asset--interior',
    children: [mediaElement, createOverlay(includesAnimation)],
    elementStyles: {
      element: {
        overflow: 'clip',
        position: 'relative',
        height: '100%',
      },
    },
  });

  const horizontalLock = ElementBuilder.styled.layout.spaceHorizontalLarger({
    element: document.createElement('div'),
    children: [assetInteriorElement],
    elementStyles: {
      element: {
        height: '100%',
        width: '100%',
      },
    },
  });

  const assetContainer = ElementBuilder.create.div({
    className: 'umd-hero-stacked__asset',
    children: isWidthLarge
      ? [horizontalLock]
      : [mediaElement, createOverlay(includesAnimation)],
    elementStyles: {
      element: {
        position: 'relative',
        overflow: 'clip',
        display: 'grid',

        ['& img, & video']: {
          objectFit: 'cover',
          aspectRatio: '5 / 4',

          [`@container (${token.media.queries.tablet.min})`]: {
            maxHeight: '700px',
            minHeight: '300px',

            ...(!isHeightSmall && {
              minHeight: '400px',
              height: '65vh !important',
            }),
          },
        },
      },
    },
  });

  return assetContainer;
};

const createHeadline = (
  props: Pick<
    HeroStackedProps,
    'headline' | 'isHeightSmall' | 'includesAnimation' | 'isThemeDark'
  >,
) => {
  const { headline, isHeightSmall, includesAnimation, isThemeDark } = props;
  const characterCount = headline?.textContent?.trim().length || 0;
  const isOverwriteHeadline = characterCount < 30;

  if (!headline) return null;

  const desktopStyles = {
    [`@container (${token.media.queries.desktop.min})`]: {
      ...(isOverwriteHeadline && {
        fontSize: '80px',
      }),
    },
  };

  const animationStyles = {
    [`@container (${token.media.queries.tablet.min})`]: {
      ...withViewTimelineAnimation({
        animation: `${REF_KEY_FRAME_FONT_COLOR} ease-in-out forwards`,
        animationTimeline: 'view()',
        animationRangeStart: '100vh',
        animationRangeEnd: '130vh',

        ...(isHeightSmall && {
          animationRangeStart: '120vh',
          animationRangeEnd: '150vh',
        }),
      }),
    },
  };

  const elementStyles = {
    element: {
      color: token.color.black,
      margin: '0 auto',
      textTransform: 'uppercase',
      marginTop: `${token.spacing.sm}`,

      ...(isThemeDark && {
        color: token.color.white,
      }),

      ...(includesAnimation && {
        ...(!isThemeDark && {
          ...animationStyles,
        }),
      }),

      ...desktopStyles,
    },
    siblingAfter: {
      marginTop: `${token.spacing.md}`,
    },
  };

  return ElementBuilder.styled.headline.campaignLarge({
    element: headline,
    elementStyles,
  });
};

const createText = (
  props: Omit<HeroStackedProps, 'image' | 'video' | 'isWidthLarge'>,
) => {
  const { topPosition, isThemeDark, includesAnimation, isHeightSmall } = props;
  const additionalSpread = topPosition ? parseInt(topPosition) : null;
  const textLockupElement = textLockup.large({
    ...props,
    ribbon: props.eyebrow,
    headlineComposite: createHeadline(props),
    textLargest: props.text,
  });

  const lock = ElementBuilder.styled.layout.spaceHorizontalSmall({
    element: document.createElement('div'),
    children: [textLockupElement],
    elementStyles: {
      element: {
        position: 'relative',
      },
    },
  });

  return ElementBuilder.create.div({
    className: 'umd-hero-stacked__text',
    children: [lock],
    elementStyles: {
      element: {
        padding: `${token.spacing.lg} 0`,
        display: 'flex',
        justifyContent: 'center',
        textAlign: 'center',
        position: 'relative',
        zIndex: '999',

        [`@container (${token.media.queries.tablet.min})`]: {
          padding: `${token.spacing['6xl']} 0 ${token.spacing['3xl']}`,
        },

        ...(includesAnimation && {
          [`@container (${token.media.queries.tablet.min})`]: {
            ...withViewTimelineAnimation({
              position: 'sticky',
              top: additionalSpread || 0,
            }),
          },
        }),

        [`& *`]: {
          ...(includesAnimation && {
            ...(!isThemeDark && {
              [`@container (${token.media.queries.tablet.min})`]: {
                ...withViewTimelineAnimation({
                  animation: `${REF_KEY_FRAME_FONT_COLOR} ease-in-out forwards`,
                  animationTimeline: 'view()',
                  animationRangeStart: '90vh',
                  animationRangeEnd: '110vh',

                  ...(isHeightSmall && {
                    animationRangeStart: '90vh',
                    animationRangeEnd: '110vh',
                  }),
                }),
              },
            }),
          }),
        },

        [`& .${elementStyles.text.decoration.ribbon.className[0]}`]: {
          animation: 'none !important',
        },

        [`& .${elementStyles.text.rich.simpleLargest.className}`]: {
          maxWidth: '860px',
          marginLeft: 'auto',
          marginRight: 'auto',
        },
      },
    },
  });
};

export default (props: HeroStackedProps) => {
  const asset = createAsset(props);
  const hasAsset = asset !== null;
  const shouldAnimateText = hasAsset && props.includesAnimation;

  const text = createText({
    ...props,
    includesAnimation: shouldAnimateText,
  });

  const children: ElementVisual[] = [text];
  if (hasAsset) {
    children.push(asset);
  }

  const composite = ElementBuilder.create.div({
    className: 'umd-hero-stacked',
    children,
    elementStyles: {
      element: {
        containerType: 'inline-size',

        ...(props.isThemeDark && {
          backgroundColor: token.color.black,
        }),
      },
    },
  });

  composite.styles += keyFrameFadeOver;
  composite.styles += keyFrameFontColor;

  return composite;
};
