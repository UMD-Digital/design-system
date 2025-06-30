import * as Styles from '@universityofmaryland/web-styles-library';
import { assets, textLockup } from 'atomic';
import { ElementModel } from 'model';

interface AnimationProps {
  includesAnimation?: boolean;
}

interface TextStyleProps {
  isThemeDark?: boolean;
  isInterior?: boolean;
}

interface AssetProps extends AnimationProps {
  image?: HTMLImageElement | null;
  video?: HTMLVideoElement | null;
  isWithLock?: boolean;
}

interface HeadlineProps extends TextStyleProps, AnimationProps {
  headline?: HTMLElement | null;
}

interface TextProps extends AnimationProps, HeadlineProps {
  eyebrow?: HTMLElement | null;
  text?: HTMLElement | null;
  actions?: HTMLElement | null;
}

interface HeroStackedProps extends AssetProps, TextProps {}

const keyFrameFadeOver = `
  @keyframes hero-stacked-fade-over {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;

const keyFrameFontColor = `
  @keyframes hero-stacked-font-color {
    from { color: ${Styles.token.color.black}; }
    to { color: ${Styles.token.color.white}; }
  }
`;

const createAsset = ({
  image,
  video,
  includesAnimation,
  isWithLock = false,
}: AssetProps) => {
  const assetContainer = ElementModel.create({
    element: document.createElement('div'),
    className: 'umd-hero-stacked__asset',
    elementStyles: {
      element: {
        overflow: 'clip',
        position: 'relative',

        ['& img, & video']: {
          maxHeight: '700px',
          minHeight: '40vh',
        },
      },
    },
  });

  const lock = ElementModel.layout.spaceHorizontalMax({
    element: document.createElement('div'),
  });

  const wrapper = ElementModel.create({
    element: document.createElement('div'),
    className: 'umd-hero-stacked__asset',
    elementStyles: {
      element: {
        position: 'relative',
      },
    },
  });

  const overlay = ElementModel.create({
    element: document.createElement('div'),
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
          [`@media (${Styles.token.media.queries.tablet.min})`]: {
            [`@media (prefers-reduced-motion: no-preference)`]: {
              [`@supports (animation-timeline: view())`]: {
                animation: 'hero-stacked-fade-over ease-in-out forwards',
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

  let mediaElement;

  if (video && video instanceof HTMLVideoElement) {
    mediaElement = assets.video.observedAutoPlay({
      video,
      isScaled: true,
    });
  } else if (image) {
    mediaElement = assets.image.background({
      image,
      isScaled: true,
      isShowCaption: true,
    });
  } else {
    return null;
  }

  const appendToContainer = (
    contentElement: ReturnType<
      typeof assets.video.observedAutoPlay | typeof assets.image.background
    >,
  ) => {
    wrapper.element.appendChild(contentElement.element);
    wrapper.styles += contentElement.styles;
    wrapper.element.appendChild(overlay.element);
    wrapper.styles += overlay.styles;

    if (isWithLock) {
      lock.element.appendChild(wrapper.element);
      lock.styles += wrapper.styles;
      assetContainer.element.appendChild(lock.element);
      assetContainer.styles += lock.styles;
    } else {
      assetContainer.element.appendChild(wrapper.element);
      assetContainer.styles += wrapper.styles;
    }
  };

  appendToContainer(mediaElement);

  return assetContainer;
};

const createHeadline = (props: HeadlineProps) => {
  const { headline, isInterior, includesAnimation } = props;
  const characterCount = headline?.textContent?.trim().length || 0;
  const isOverwriteHeadline = characterCount > 30 && !isInterior;

  let headlineElement = null;

  if (headline) {
    const desktopStyles = {
      ...(isOverwriteHeadline && { fontSize: '80px' }),
    };

    const animationStyles = {
      ...(includesAnimation && {
        [`@container (${Styles.token.media.queries.tablet.min})`]: {
          [`@media (prefers-reduced-motion: no-preference)`]: {
            [`@supports (animation-timeline: view())`]: {
              animation: 'hero-stacked-font-color ease-in-out forwards',
              animationTimeline: 'view()',

              ...(props.isInterior && {
                animationRangeStart: '140vh',
                animationRangeEnd: '200vh',
              }),

              ...(!props.isInterior && {
                animationRangeStart: '100vh',
                animationRangeEnd: '150vh',
              }),
            },
          },
        },
      }),
    };

    const elementStyles = {
      element: {
        color: Styles.token.color.black,
        maxWidth: '700px',
        margin: '0 auto',
        textTransform: 'uppercase',
        marginTop: `${Styles.token.spacing.sm}`,
        ...desktopStyles,
        ...animationStyles,
      },
      siblingAfter: {
        marginTop: `${Styles.token.spacing.md}`,
      },
    };

    if (isInterior) {
      headlineElement = ElementModel.headline.campaignExtraLarge({
        element: headline,
        elementStyles,
      });
    } else {
      headlineElement = ElementModel.headline.campaignLarge({
        element: headline,
        elementStyles,
      });
    }
  }

  return headlineElement;
};

const createText = (props: TextProps) => {
  const textContainer = ElementModel.create({
    element: document.createElement('div'),
    className: 'umd-hero-stacked__text',
    elementStyles: {
      element: {
        padding: `${Styles.token.spacing.lg} 0`,
        display: 'flex',
        justifyContent: 'center',
        textAlign: 'center',
        position: 'relative',
        zIndex: '999',

        [`@container (${Styles.token.media.queries.tablet.min})`]: {
          padding: `${Styles.token.spacing['6xl']} 0 ${Styles.token.spacing['3xl']}`,
        },

        ...(props.includesAnimation && {
          [`@container (${Styles.token.media.queries.tablet.min})`]: {
            [`@media (prefers-reduced-motion: no-preference)`]: {
              [`@supports (animation-timeline: view())`]: {
                position: 'sticky',
                top: 0,
              },
            },
          },
        }),

        [`& *`]: {
          ...(props.includesAnimation && {
            [`@container (${Styles.token.media.queries.tablet.min})`]: {
              [`@media (prefers-reduced-motion: no-preference)`]: {
                [`@supports (animation-timeline: view())`]: {
                  animation: 'hero-stacked-font-color ease-in-out forwards',
                  animationTimeline: 'view()',

                  ...(props.isInterior && {
                    animationRangeStart: '140vh',
                    animationRangeEnd: '200vh',
                  }),

                  ...(!props.isInterior && {
                    animationRangeStart: '80vh',
                    animationRangeEnd: '100vh',
                  }),
                },
              },
            },
          }),
        },

        [`& .${Styles.element.text.decoration.ribbon.className[0]}`]: {
          animation: 'none !important',
        },

        [`& .${Styles.element.text.rich.simpleLargest.className}`]: {
          maxWidth: '860px',
          marginLeft: 'auto',
          marginRight: 'auto',
        },
      },
    },
  });

  const lock = ElementModel.layout.spaceHorizontalMax({
    element: document.createElement('div'),
    elementStyles: {
      element: {
        position: 'relative',
      },
    },
  });

  const textLockupProps = {
    ribbon: props.eyebrow,
    headline: createHeadline(props),
    textLargest: props.text,
    actions: props.actions,
    isTextCenter: true,
    isThemeDark: false,
  };

  const text = textLockup.large(textLockupProps);

  lock.element.appendChild(text.element);
  lock.styles += text.styles;

  textContainer.element.appendChild(lock.element);
  textContainer.styles += lock.styles;

  return textContainer;
};

export default (props: HeroStackedProps) =>
  (() => {
    const composite = ElementModel.create({
      element: document.createElement('div'),
      className: 'umd-hero-stacked',
    });

    const asset = createAsset(props);
    const hasAsset = asset !== null && asset.element !== null;
    const shouldAnimateText = hasAsset && props.includesAnimation;

    const text = createText({
      ...props,
      includesAnimation: shouldAnimateText,
    });

    composite.element.appendChild(text.element);
    composite.styles += text.styles;

    if (hasAsset) {
      composite.element.appendChild(asset.element);
      composite.styles += asset.styles;
    }

    composite.styles = `
      ${keyFrameFadeOver}
      ${keyFrameFontColor}
      ${composite.styles}
    `;

    return composite;
  })();
